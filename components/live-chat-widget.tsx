'use client'

import { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle, Send, X, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useTenant } from '@/contexts/tenant-context'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { format } from 'date-fns'

interface Message {
  id: string
  message: string
  is_admin_reply: boolean
  sender_name: string
  created_at: string
}

interface LiveChatWidgetProps {
  onClose?: () => void
  embedded?: boolean
}

function ModulusChatLogo({ size = 24 }: { size?: number; onDark?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`chat-grad-${size}`} x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1A8FE3" />
          <stop offset="100%" stopColor="#0D5C9E" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#chat-grad-${size})`} />
      <path
        d="M16 46V18L32 34L48 18V46"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g transform="translate(38,38)">
        <circle cx="9" cy="9" r="11" fill="white" />
        <rect x="5" y="3" width="8" height="13" rx="4" fill="#1A6FB5" stroke="#1A6FB5" strokeWidth="1.5" />
        <line x1="4" y1="14" x2="6" y2="12" stroke="#1A6FB5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="14" x2="12" y2="12" stroke="#1A6FB5" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function LiveChatWidget({ onClose, embedded = false }: LiveChatWidgetProps) {
  const { t, language } = useLanguage()
  const { tenantId } = useTenant()
  const [isOpen, setIsOpen] = useState(embedded)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState('+905551234567')
  const [whatsappEnabled, setWhatsappEnabled] = useState(true)

  useEffect(() => {
    checkBusinessHours()
    loadWhatsAppConfig()
    const interval = setInterval(checkBusinessHours, 60000)
    return () => clearInterval(interval)
  }, [])

  async function loadWhatsAppConfig() {
    try {
      const { data } = await supabase
        .from('site_config')
        .select('whatsapp_number, whatsapp_enabled')
        .maybeSingle()

      if (data) {
        if (data.whatsapp_number) setWhatsappNumber(data.whatsapp_number)
        if (typeof data.whatsapp_enabled === 'boolean') setWhatsappEnabled(data.whatsapp_enabled)
      }
    } catch (error) {
      console.error('Error loading WhatsApp config:', error)
    }
  }

  useEffect(() => {
    if (chatStarted && tenantId) {
      loadOrCreateSession()
    }
  }, [chatStarted, tenantId])

  useEffect(() => {
    const savedSessionId = localStorage.getItem(`chat_session_${tenantId}`)
    if (savedSessionId && tenantId) {
      setSessionId(savedSessionId)
      loadMessages(savedSessionId)
    }
  }, [tenantId])

  useEffect(() => {
    if (!sessionId) return

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages(prev => [...prev, newMessage])
          scrollToBottom()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [sessionId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function checkBusinessHours() {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    const online = day >= 1 && day <= 5 && hour >= 9 && hour < 17
    setIsOnline(online)
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function loadOrCreateSession() {
    if (!tenantId) return

    try {
      setLoading(true)

      const { data: existingSessions } = await supabase
        .from('support_chat_sessions')
        .select('id')
        .eq('tenant_id', tenantId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)

      if (existingSessions && existingSessions.length > 0) {
        const session = existingSessions[0]
        setSessionId(session.id)
        localStorage.setItem(`chat_session_${tenantId}`, session.id)
        await loadMessages(session.id)
      } else {
        const { data: session, error } = await supabase
          .from('support_chat_sessions')
          .insert({
            tenant_id: tenantId,
            status: 'waiting',
            user_name: userName || 'Guest',
            user_email: userEmail || '',
            is_read_by_admin: false
          })
          .select()
          .single()

        if (error) throw error
        setSessionId(session.id)
        localStorage.setItem(`chat_session_${tenantId}`, session.id)
        await sendSystemMessage(session.id, t.support.youAreConnected)
      }
    } catch (error: any) {
      console.error('Error loading/creating session:', error)
      toast.error(error.message || 'Failed to start chat')
    } finally {
      setLoading(false)
    }
  }

  async function loadMessages(sessionId: string) {
    try {
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error: any) {
      console.error('Error loading messages:', error)
    }
  }

  async function sendSystemMessage(sessionId: string, message: string) {
    await supabase.from('support_messages').insert({
      session_id: sessionId,
      tenant_id: tenantId,
      message,
      sender_name: 'System',
      is_admin_reply: true,
      is_read: true
    })
  }

  async function sendMessage() {
    if (!inputMessage.trim() || !sessionId || !tenantId) return

    try {
      const { error } = await supabase.from('support_messages').insert({
        session_id: sessionId,
        tenant_id: tenantId,
        message: inputMessage,
        sender_name: userName || 'Guest',
        is_admin_reply: false,
        is_read: false
      }).select()

      if (error) throw error
      setInputMessage('')
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast.error(error.message || 'Failed to send message')
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleStartChat() {
    if (!userName.trim()) {
      toast.error(t.support.enterYourName)
      return
    }
    setChatStarted(true)
  }

  function renderOnlineIndicator() {
    return (
      <div className="flex items-center gap-1.5">
        <span className={`relative flex h-2.5 w-2.5 ${isOnline ? '' : ''}`}>
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        </span>
        <span className="text-xs font-medium">
          {isOnline ? t.support.online : t.support.offline}
        </span>
      </div>
    )
  }

  function renderChatForm() {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center mb-2">
            <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center mx-auto mb-3 ring-2 ring-[#B8E6FF]/20">
              <ModulusChatLogo size={32} onDark />
            </div>
            <p className="text-sm text-muted-foreground">
              {t.support.startChat}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block text-foreground">{t.support.enterYourName}</label>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="John Doe"
              className="border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block text-foreground">{t.support.enterYourEmail}</label>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="john@example.com"
              className="border-border"
            />
          </div>
          <Button
            onClick={handleStartChat}
            className="w-full bg-[#0D1B2A] hover:bg-[#1a2d42] text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {t.support.startChat}
          </Button>
        </div>
      </div>
    )
  }

  function renderMessages() {
    return (
      <>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.is_admin_reply ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${
                    msg.is_admin_reply
                      ? 'bg-muted text-foreground'
                      : 'bg-[#0D1B2A] text-white'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${msg.is_admin_reply ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {msg.is_admin_reply ? t.support.supportTeam : msg.sender_name}
                  </div>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</div>
                  <div className={`text-[10px] mt-1 ${msg.is_admin_reply ? 'text-muted-foreground' : 'text-white/50'}`}>
                    {format(new Date(msg.created_at), 'HH:mm')}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="border-t border-border p-3 bg-background">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.support.typeYourMessage}
              disabled={loading}
              className="border-border"
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !inputMessage.trim()}
              size="icon"
              className="bg-[#0D1B2A] hover:bg-[#1a2d42] text-white shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
    )
  }

  function renderOfflineState() {
    const whatsappMessage = encodeURIComponent(
      language === 'tr'
        ? 'Merhaba, destek almak istiyorum.'
        : 'Hello, I would like to get support.'
    )

    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="w-full max-w-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <ModulusChatLogo size={32} />
          </div>
          <p className="text-sm text-muted-foreground">{t.support.currentlyOffline}</p>
          {whatsappEnabled && whatsappNumber && (
            <>
              <p className="text-xs text-muted-foreground">
                {language === 'tr'
                  ? 'Ancak WhatsApp üzerinden bize ulaşabilirsiniz'
                  : 'However, you can reach us via WhatsApp'}
              </p>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {language === 'tr' ? 'WhatsApp ile İletişime Geç' : 'Contact via WhatsApp'}
              </a>
            </>
          )}
        </div>
      </div>
    )
  }

  if (embedded) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="border-b border-border py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0D1B2A] flex items-center justify-center">
                <ModulusChatLogo size={20} onDark />
              </div>
              <CardTitle className="text-base text-foreground">{t.support.liveSupport}</CardTitle>
            </div>
            {renderOnlineIndicator()}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {!isOnline ? renderOfflineState() : !chatStarted ? renderChatForm() : renderMessages()}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#132d46] z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-[#B8E6FF]/40 hover:ring-[#B8E6FF]/70"
          style={{ boxShadow: '0 4px 20px rgba(184, 230, 255, 0.25)' }}
        >
          <MessageCircle className="h-6 w-6 text-[#B8E6FF]" />
          {isOnline && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[560px] shadow-2xl rounded-2xl overflow-hidden z-50 border border-border">
          <Card className="h-full flex flex-col rounded-2xl">
            <div className="bg-[#0D1B2A] text-white px-4 py-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#B8E6FF]/15 flex items-center justify-center ring-1 ring-[#B8E6FF]/30">
                    <ModulusChatLogo size={22} onDark />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{t.support.liveSupport}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                      <span className="text-[11px] text-white/70">
                        {isOnline ? t.support.online : t.support.offline}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                  onClick={() => {
                    setIsOpen(false)
                    onClose?.()
                  }}
                >
                  <X className="h-4.5 w-4.5 text-white" />
                </button>
              </div>
            </div>
            <CardContent className="flex-1 flex flex-col p-0 bg-background">
              {!isOnline ? renderOfflineState() : !chatStarted ? renderChatForm() : renderMessages()}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
