'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useSiteConfig } from '@/contexts/site-config-context'
import { ModulusLogo } from '@/components/modulus-logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function MarketingHeader() {
  const { language, setLanguage, t } = useLanguage()
  const { config } = useSiteConfig()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t.marketing.nav.product, href: '/landing#product' },
    { name: t.marketing.nav.solutions, href: '/landing#solutions' },
    { name: t.marketing.nav.caseStudies, href: '/case-studies' },
    { name: t.marketing.nav.pricing, href: '/landing#pricing' },
    { name: t.marketing.nav.contact, href: '/contact' },
    { name: 'Admin', href: '/admin/login' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      style={{ height: 'var(--header-height, 88px)' }}
    >
      <nav className="container-marketing" style={{ padding: '0 var(--header-padding-x, 32px)', height: '100%' }}>
        <div className="flex items-center justify-between h-full">
          <Link href="/landing" className="flex items-center shrink-0 mr-8">
            <span
              className="text-xl font-bold tracking-tight"
              style={{ color: 'var(--primary-color, #0D1B2A)' }}
            >
              Modulus
            </span>
          </Link>

          <div className="hidden lg:flex items-center" style={{ gap: 'var(--nav-item-spacing, 32px)' }}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium transition-colors duration-200"
                style={{
                  fontSize: 'var(--nav-text-font-size, 16px)',
                  color: 'var(--primary-color, #111827)',
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-accent/50"
                  style={{ color: 'var(--primary-color, #111827)' }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="uppercase font-medium">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage('tr')}
                  className={language === 'tr' ? 'bg-accent' : ''}
                >
                  Türkçe (TR)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-accent' : ''}
                >
                  English (EN)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="font-medium hover:bg-accent/50"
                style={{ color: 'var(--primary-color, #111827)' }}
              >
                {t.marketing.nav.signIn}
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="sm"
                className="font-semibold shadow-sm"
                style={{
                  backgroundColor: 'var(--primary-color, #111827)',
                  color: '#ffffff'
                }}
              >
                {t.marketing.nav.bookDemo}
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="container-marketing py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-base font-medium transition-colors"
                style={{
                  color: 'var(--primary-color, #111827)',
                  fontSize: 'var(--nav-text-font-size, 16px)'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t space-y-3">
              <div className="flex gap-2">
                <Button
                  variant={language === 'tr' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 font-semibold"
                  style={language === 'tr' ? {
                    backgroundColor: 'var(--primary-color, #111827)',
                    color: '#ffffff'
                  } : {}}
                  onClick={() => {
                    setLanguage('tr')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  TR
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1 font-semibold"
                  style={language === 'en' ? {
                    backgroundColor: 'var(--primary-color, #111827)',
                    color: '#ffffff'
                  } : {}}
                  onClick={() => {
                    setLanguage('en')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  EN
                </Button>
              </div>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full font-medium" style={{ borderColor: 'var(--primary-color, #111827)', color: 'var(--primary-color, #0D1B2A)' }}>
                  {t.marketing.nav.signIn}
                </Button>
              </Link>
              <Link href="/contact" className="block">
                <Button className="w-full font-semibold" style={{ backgroundColor: 'var(--primary-color, #0D1B2A)', color: '#ffffff' }}>
                  {t.marketing.nav.bookDemo}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
