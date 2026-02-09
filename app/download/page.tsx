"use client";

import { Download, FileArchive, CheckCircle2, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DownloadPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/modulus-erp-complete.zip';
    link.download = 'modulus-erp-complete.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 mb-6">
              <FileArchive className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Modulus ERP v2 - Kaynak Kodları
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Tüm kaynak kodları, veritabanı migrasyonları ve Edge Functions ile birlikte
            </p>
          </div>

          <Card className="mb-8 border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Proje Dosyaları Hazır!</CardTitle>
              <CardDescription className="text-base">
                Projenizi indirmeye hazır. Tek tıkla indirebilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">15 MB</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Dosya Boyutu</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">520+</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Toplam Dosya</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">145</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Migration</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    İndir (modulus-erp-complete.zip)
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Tam Kaynak Kod</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Tüm TypeScript/React dosyaları</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">145 Migration</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Supabase veritabanı şemaları</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">15 Edge Function</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Serverless API fonksiyonları</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Git Yapılandırması</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Versiyon kontrolü hazır</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Kurulum Talimatları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center flex-shrink-0">1</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">ZIP dosyasını çıkartın</div>
                    <code className="text-sm text-slate-600 dark:text-slate-400 block mt-1">
                      unzip modulus-erp-complete.zip
                    </code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center flex-shrink-0">2</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">Proje klasörüne girin</div>
                    <code className="text-sm text-slate-600 dark:text-slate-400 block mt-1">
                      cd project
                    </code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center flex-shrink-0">3</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">Bağımlılıkları yükleyin</div>
                    <code className="text-sm text-slate-600 dark:text-slate-400 block mt-1">
                      npm install
                    </code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center flex-shrink-0">4</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">Environment dosyasını yapılandırın</div>
                    <code className="text-sm text-slate-600 dark:text-slate-400 block mt-1">
                      cp .env.example .env
                    </code>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Badge variant="outline" className="w-8 h-8 flex items-center justify-center flex-shrink-0">5</Badge>
                  <div className="flex-1">
                    <div className="font-semibold">Development server başlatın</div>
                    <code className="text-sm text-slate-600 dark:text-slate-400 block mt-1">
                      npm run dev
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex gap-2 items-start">
                  <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Supabase Kurulumu Gerekli
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Projeyi çalıştırabilmek için Supabase projesi oluşturmalı ve .env dosyasına connection bilgilerinizi eklemelisiniz.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Modulus ERP v2 - Next.js 14 + Supabase + TypeScript</p>
            <p className="mt-1">Tüm hakları saklıdır © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
