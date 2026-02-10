'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useSiteConfig } from '@/contexts/site-config-context'
import { useRouter } from 'next/navigation'
import { useContentSection } from '@/hooks/use-content-section'

interface ParasutHeroSectionProps {
  isAuthenticated?: boolean
}

export function ParasutHeroSection({ isAuthenticated = false }: ParasutHeroSectionProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const { config } = useSiteConfig()
  const [scrolled, setScrolled] = useState(false)

  const heroTitle = useContentSection('landing_hero_main_title', language, {
    en: 'Focus on Your Business, Not Your Accounting.',
    tr: 'İşinize Odaklanın, Muhasebenize Değil.'
  })

  const heroSubtitle = useContentSection('landing_hero_main_subtitle', language, {
    en: 'Modulus makes business management as simple as sending a text. No accounting degree required.',
    tr: 'Modulus, iş yönetimini mesaj göndermek kadar basit hale getirir. Muhasebe diploması gerektirmez.'
  })

  const ctaStartFree = useContentSection('landing_hero_cta_start_free', language, {
    en: 'Start Free',
    tr: 'Ücretsiz Başla'
  })

  const ctaSeeHow = useContentSection('landing_hero_cta_see_how', language, {
    en: 'See How It Works',
    tr: 'Nasıl Çalışır?'
  })

  const ctaDashboard = useContentSection('landing_hero_cta_dashboard', language, {
    en: 'Go to Dashboard',
    tr: 'Panoya Git'
  })

  const benefit1 = useContentSection('landing_hero_benefit_1', language, {
    en: 'No credit card required',
    tr: 'Kredi kartı gerekmez'
  })

  const benefit2 = useContentSection('landing_hero_benefit_2', language, {
    en: '14-day free trial',
    tr: '14 günlük ücretsiz deneme'
  })

  const benefit3 = useContentSection('landing_hero_benefit_3', language, {
    en: 'Setup in 5 minutes',
    tr: '5 dakikada kurulum'
  })

  const floatingCta = useContentSection('landing_floating_cta', language, {
    en: 'Try for Free',
    tr: 'Ücretsiz Dene'
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const benefits = [
    benefit1.content,
    benefit2.content,
    benefit3.content
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/20 to-white section-spacing" style={{ paddingTop: '136px', paddingBottom: '96px' }}>
        <div className="absolute inset-0 bg-[url('/patterns/soft-waves.svg')] opacity-5"></div>

        <div className="container-marketing relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-10" style={{ backgroundColor: 'var(--secondary-color, #E0F4FF)', borderColor: 'var(--primary-color, #111827)20' }}>
              <Sparkles className="h-4 w-4" style={{ color: 'var(--primary-color, #111827)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--primary-color, #111827)', fontSize: 'var(--small-text-font-size, 16px)' }}>
                {config
                  ? (language === 'en' ? config.trust_badge_en : config.trust_badge_tr)
                  : (language === 'en' ? 'Trusted by 10,000+ businesses' : '10.000+ işletme tarafından güveniliyor')
                }
              </span>
            </div>

            <h1 className="text-hero mb-8" style={{ fontFamily: 'var(--font-inter), sans-serif', color: 'var(--primary-color, #111827)', fontSize: 'var(--hero-title-font-size, 56px)', lineHeight: '1.15', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {heroTitle.content}
            </h1>

            <p className="text-body-large mb-12 max-w-3xl mx-auto" style={{ fontSize: 'var(--hero-subtitle-font-size, 20px)', lineHeight: '1.6', color: 'hsl(0 0% 40%)', letterSpacing: '-0.01em' }}>
              {heroSubtitle.content}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14">
              {isAuthenticated ? (
                <Button
                  size="lg"
                  className="gap-2 shadow-lg font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--primary-color, #111827)',
                    color: '#ffffff',
                    fontSize: 'var(--body-text-font-size, 18px)',
                    padding: '1.25rem 2.5rem',
                    height: 'auto',
                    borderRadius: 'var(--border-radius, 12px)'
                  }}
                  onClick={() => router.push('/dashboard')}
                >
                  {ctaDashboard.content}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      size="lg"
                      className="gap-2 shadow-lg font-semibold transition-all duration-200"
                      style={{
                        backgroundColor: 'var(--primary-color, #111827)',
                        color: '#ffffff',
                        fontSize: 'var(--body-text-font-size, 18px)',
                        padding: '1.25rem 2.5rem',
                        height: 'auto',
                        borderRadius: 'var(--border-radius, 12px)'
                      }}
                    >
                      {ctaStartFree.content}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 font-semibold transition-all duration-200"
                      style={{
                        borderColor: 'var(--primary-color, #111827)',
                        borderWidth: '2px',
                        color: 'var(--primary-color, #111827)',
                        fontSize: 'var(--body-text-font-size, 18px)',
                        padding: '1.25rem 2.5rem',
                        height: 'auto',
                        borderRadius: 'var(--border-radius, 12px)'
                      }}
                    >
                      {ctaSeeHow.content}
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--primary-color, #0D1B2A)' }} />
                  <span className="font-medium" style={{ fontSize: 'var(--small-text-font-size, 16px)', color: 'hsl(0 0% 40%)' }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {scrolled && !isAuthenticated && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
          <Link href="/login">
            <Button
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-2xl"
            >
              {floatingCta.content}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}
