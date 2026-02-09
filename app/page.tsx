import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Modulus ERP v2
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Modern Enterprise Resource Planning System
          </p>
          <Link href="/download">
            <Button size="lg" className="text-lg px-8 py-6">
              <Download className="w-5 h-5 mr-2" />
              İndir
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
