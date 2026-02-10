'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Github, Circle } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { useSiteConfig } from '@/contexts/site-config-context'
import { Badge } from '@/components/ui/badge'

export function ParasutFooter() {
  const { language } = useLanguage()
  const { config } = useSiteConfig()

  const footerSections = {
    product: {
      title: language === 'en' ? 'Product' : 'Ürün',
      links: [
        { name: language === 'en' ? 'Features' : 'Özellikler', href: '/landing#features' },
        { name: language === 'en' ? 'Pricing' : 'Fiyatlandırma', href: '/pricing' },
        { name: language === 'en' ? 'Integrations' : 'Entegrasyonlar', href: '#' },
        { name: language === 'en' ? 'API Documentation' : 'API Dokümantasyon', href: '#' },
        { name: language === 'en' ? 'Changelog' : 'Güncellemeler', href: '#' }
      ]
    },
    resources: {
      title: language === 'en' ? 'Resources' : 'Kaynaklar',
      links: [
        { name: language === 'en' ? 'Help Center' : 'Yardım Merkezi', href: '/help' },
        { name: language === 'en' ? 'Blog' : 'Blog', href: '#' },
        { name: language === 'en' ? 'Case Studies' : 'Başarı Hikayeleri', href: '/case-studies' },
        { name: language === 'en' ? 'Tutorials' : 'Eğitimler', href: '#' },
        { name: language === 'en' ? 'Community' : 'Topluluk', href: '#' }
      ]
    },
    company: {
      title: language === 'en' ? 'Company' : 'Şirket',
      links: [
        { name: language === 'en' ? 'About Us' : 'Hakkımızda', href: '#' },
        { name: language === 'en' ? 'Careers' : 'Kariyer', href: '#' },
        { name: language === 'en' ? 'Contact' : 'İletişim', href: '/contact' },
        { name: language === 'en' ? 'Press Kit' : 'Basın Kiti', href: '#' },
        { name: language === 'en' ? 'Partners' : 'Partnerler', href: '#' }
      ]
    },
    legal: {
      title: language === 'en' ? 'Legal' : 'Yasal',
      links: [
        { name: language === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası', href: '#' },
        { name: language === 'en' ? 'Terms of Service' : 'Kullanım Şartları', href: '#' },
        { name: language === 'en' ? 'Cookie Policy' : 'Çerez Politikası', href: '#' },
        { name: language === 'en' ? 'GDPR' : 'KVKK', href: '#' },
        { name: language === 'en' ? 'Security' : 'Güvenlik', href: '#' }
      ]
    }
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' }
  ]

  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--secondary-color, #E0F4FF)05' }}>
      <div className="container-marketing">
        <div className="py-20 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-16">
            {Object.values(footerSections).map((section) => (
              <div key={section.title}>
                <h3 className="font-bold mb-5" style={{ fontFamily: 'var(--font-inter), sans-serif', color: 'var(--primary-color, #111827)', fontSize: 'var(--small-text-font-size, 16px)', letterSpacing: '-0.01em' }}>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-200"
                        style={{
                          fontSize: 'var(--small-text-font-size, 16px)',
                          color: 'hsl(0 0% 40%)',
                          fontWeight: 400
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t" style={{ borderColor: 'hsl(200 30% 90%)' }}>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                {config?.logo_url ? (
                  <Image
                    src={config.logo_url}
                    alt={config.site_name_en || 'Modulus ERP'}
                    width={110}
                    height={75}
                    className="object-contain"
                    style={{
                      width: 'var(--logo-footer-width, 110px)',
                      height: 'var(--logo-footer-height, 75px)',
                    }}
                  />
                ) : (
                  <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-inter), sans-serif', color: 'var(--primary-color, #111827)' }}>
                    Modulus ERP
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6">
                <Badge className="px-4 py-2" style={{ backgroundColor: 'var(--secondary-color, #E0F4FF)', color: 'var(--primary-color, #111827)', borderColor: 'var(--primary-color, #111827)20' }}>
                  <Circle className="h-2 w-2 mr-2" style={{ fill: 'var(--primary-color, #111827)', color: 'var(--primary-color, #111827)' }} />
                  {language === 'en' ? 'All Systems Operational' : 'Tüm Sistemler Çalışıyor'}
                </Badge>

                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        className="transition-colors duration-200"
                        style={{ color: 'hsl(0 0% 40%)' }}
                        aria-label={social.name}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <p style={{ fontSize: 'var(--small-text-font-size, 16px)', color: 'hsl(0 0% 40%)' }}>
                © 2026 Modulus ERP.{' '}
                {language === 'en' ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
                {' '}
                {language === 'en' ? 'Built with' : 'Şununla yapıldı'}{' '}
                <span style={{ color: 'var(--primary-color, #111827)' }}>♥</span>{' '}
                {language === 'en' ? 'for business owners' : 'işletme sahipleri için'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
