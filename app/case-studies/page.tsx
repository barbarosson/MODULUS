'use client'

import { MarketingLayout } from '@/components/marketing/marketing-layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingDown, TrendingUp, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: 'TechFlow Industries',
      industry: 'Manufacturing',
      size: '250+ employees',
      location: 'Istanbul, Turkey',
      challenge: 'TechFlow was struggling with manual inventory tracking across three warehouses. Stockouts were costing them thousands daily, while excess inventory tied up valuable capital. Their spreadsheet-based system couldn\'t keep up with growing demand.',
      solution: 'We implemented ModulusTech\'s real-time inventory management system with automated reordering thresholds and demand forecasting algorithms. The system integrated seamlessly with their existing POS and accounting software.',
      implementation: '2 weeks from kickoff to full deployment, including data migration and team training.',
      results: [
        { label: 'Inventory costs reduced', value: '35%', icon: TrendingDown },
        { label: 'Fulfillment speed increased', value: '2x', icon: TrendingUp },
        { label: 'Weekly time saved', value: '20hrs', icon: Clock },
        { label: 'Stockout incidents', value: '-90%', icon: TrendingDown },
      ],
      testimonial: {
        quote: 'ModulusTech completely transformed our operations. The ROI was clear within the first quarter, and we\'ve seen consistent improvements ever since. The team\'s support throughout implementation was exceptional.',
        author: 'Ahmet Yılmaz',
        title: 'Operations Director',
      },
      keyFeatures: [
        'Real-time inventory tracking across multiple locations',
        'Automated reorder point calculations',
        'Demand forecasting based on historical data',
        'Mobile app for warehouse staff',
      ],
    },
    {
      company: 'RetailHub Solutions',
      industry: 'E-commerce & Retail',
      size: '150+ employees',
      location: 'Ankara, Turkey',
      challenge: 'RetailHub operated both online and physical stores but lacked a unified system. Inventory discrepancies between channels led to overselling online and disappointed customers. Order processing was slow and error-prone.',
      solution: 'We deployed an omnichannel platform that synchronized inventory in real-time across all sales channels. Automated order routing ensured efficient fulfillment from the nearest location, whether warehouse or store.',
      implementation: '3 weeks including integration with their e-commerce platform, POS systems, and existing warehouse management.',
      results: [
        { label: 'Order accuracy', value: '99.8%', icon: TrendingUp },
        { label: 'Processing time reduced', value: '65%', icon: TrendingDown },
        { label: 'Customer satisfaction', value: '+45%', icon: TrendingUp },
        { label: 'Return rate decreased', value: '28%', icon: TrendingDown },
      ],
      testimonial: {
        quote: 'The integration was seamless, and the impact on our customer satisfaction has been remarkable. We can now promise and deliver accurate ETAs, which has significantly boosted our repeat purchase rate.',
        author: 'Elif Demir',
        title: 'CEO',
      },
      keyFeatures: [
        'Unified inventory across all channels',
        'Intelligent order routing',
        'Real-time stock synchronization',
        'Customer-facing order tracking',
      ],
    },
    {
      company: 'GreenLogistics Co.',
      industry: 'Distribution & Logistics',
      size: '300+ employees',
      location: 'Izmir, Turkey',
      challenge: 'Managing a fleet of 50+ vehicles and coordinating deliveries across 5 warehouses was overwhelming. Route planning was inefficient, leading to high fuel costs and late deliveries. Customer complaints were increasing.',
      solution: 'Implemented comprehensive logistics management with AI-powered route optimization, real-time vehicle tracking, and automated dispatch. Integrated with their existing accounting and customer communication systems.',
      implementation: '4 weeks including GPS hardware installation, driver training, and system integration.',
      results: [
        { label: 'Fuel costs reduced', value: '42%', icon: TrendingDown },
        { label: 'On-time deliveries', value: '96%', icon: TrendingUp },
        { label: 'Daily deliveries increased', value: '+35%', icon: TrendingUp },
        { label: 'Customer complaints', value: '-78%', icon: TrendingDown },
      ],
      testimonial: {
        quote: 'The ROI exceeded our expectations. Not only did we cut costs significantly, but our delivery reliability has made us the preferred partner for major retailers. The system practically runs itself now.',
        author: 'Mehmet Kaya',
        title: 'Logistics Manager',
      },
      keyFeatures: [
        'AI-powered route optimization',
        'Real-time fleet tracking',
        'Automated dispatch and scheduling',
        'Driver mobile app with navigation',
      ],
    },
  ]

  return (
    <MarketingLayout>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="container-marketing">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Case Studies
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Real businesses, real results
            </h1>
            <p className="text-xl text-[#475569]">
              See how companies across different industries achieved measurable success with ModulusTech
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden bg-white">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 p-8 lg:p-12 space-y-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="text-3xl font-bold">{study.company}</h2>
                        <Badge variant="secondary" className="text-base">
                          {study.industry}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-[#475569]">
                        <span>{study.size}</span>
                        <span>•</span>
                        <span>{study.location}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-red-600 uppercase tracking-wide text-sm mb-3">
                        The Challenge
                      </h3>
                      <p className="text-lg text-[#475569] leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-primary uppercase tracking-wide text-sm mb-3">
                        The Solution
                      </h3>
                      <p className="text-lg text-[#475569] leading-relaxed mb-4">
                        {study.solution}
                      </p>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-primary">
                          ⏱️ Implementation: {study.implementation}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold uppercase tracking-wide text-sm mb-4">
                        Key Features Deployed
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {study.keyFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[#475569]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <blockquote className="relative">
                        <div className="text-4xl text-primary/20 absolute -top-2 -left-2">"</div>
                        <p className="text-lg italic text-foreground pl-6 mb-4">
                          {study.testimonial.quote}
                        </p>
                        <footer className="flex items-center gap-3 pl-6">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold">
                            {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold">{study.testimonial.author}</div>
                            <div className="text-sm text-[#475569]">
                              {study.testimonial.title}, {study.company}
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 lg:p-12">
                    <h3 className="font-semibold uppercase tracking-wide text-sm mb-6">
                      Measurable Results
                    </h3>
                    <div className="space-y-4">
                      {study.results.map((result, i) => {
                        const Icon = result.icon
                        return (
                          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="h-6 w-6 text-green-600" />
                              <span className="text-3xl font-bold">{result.value}</span>
                            </div>
                            <p className="text-sm text-[#475569]">{result.label}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center p-12 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to write your success story?</h2>
            <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto">
              Join these companies and hundreds more who have transformed their operations with ModulusTech
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/landing#pricing">
                <Button size="lg" variant="outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
