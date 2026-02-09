import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Package,
  Users,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  FileText,
  Smartphone
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0">
            Yeni Versiyon: v2.0
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent leading-tight">
            Modulus ERP
          </h1>
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            İşletmenizi Dönüştüren Modern ERP Sistemi
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            Stok yönetimi, muhasebe, satış ve raporlamayı tek platformda birleştiren, açık kaynak kodlu ERP çözümü
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/download">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/30">
                <Download className="w-5 h-5 mr-2" />
                Ücretsiz İndir
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              Canlı Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            ✓ Kurulum 5 dakika  ✓ Açık kaynak  ✓ Tüm özellikler ücretsiz
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Güçlü Özellikler
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              İşletmeniz için ihtiyacınız olan her şey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Stok Yönetimi</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gerçek zamanlı stok takibi, otomatik uyarılar ve detaylı envanter raporları
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-cyan-200 dark:hover:border-cyan-800">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Müşteri Yönetimi</h3>
              <p className="text-slate-600 dark:text-slate-400">
                CRM entegrasyonu, müşteri geçmişi ve satış fırsatları takibi
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Satış & Sipariş</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Hızlı faturalama, sipariş takibi ve otomatik e-fatura entegrasyonu
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-violet-200 dark:hover:border-violet-800">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Gelişmiş Raporlar</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Kar-zarar, stok hareketleri ve satış performansı analizleri
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-amber-200 dark:hover:border-amber-800">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Muhasebe</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Cari hesap takibi, ödeme planları ve finansal raporlar
              </p>
            </Card>

            <Card className="p-6 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-rose-200 dark:hover:border-rose-800">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">Mobil Uyumlu</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Responsive tasarım ile her cihazdan erişim ve yönetim
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-2">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Modern Teknoloji</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Next.js 14 & React 18 ile modern UI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Supabase ile güvenli veritabanı</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">TypeScript ile tip güvenliği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Tailwind CSS ile özelleştirilebilir</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Açık Kaynak</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Tam kaynak kodu erişimi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Ücretsiz kullanım ve değişiklik</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Topluluk desteği</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Kendi sunucunuzda barındırın</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Bugün Başlayın
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Kurulum 5 dakika. Kredi kartı gerekmez. Tüm özellikler hemen kullanıma hazır.
          </p>
          <Link href="/download">
            <Button size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/30">
              <Download className="w-6 h-6 mr-2" />
              Ücretsiz İndirin
            </Button>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
            v2.0 • Tüm kaynak kodları dahil • MIT Lisansı
          </p>
        </div>
      </section>

    </div>
  );
}
