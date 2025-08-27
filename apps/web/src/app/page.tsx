import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Download, 
  Image as ImageIcon,
  CheckCircle,
  Star,
  ArrowRight,
  Play
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Portreva</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Özellikler
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Fiyatlandırma
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-white transition-colors">
              Hakkında
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Giriş Yap
            </Button>
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
              Başla
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Destekli Arka Plan Kaldırma
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Profesyonel
            <span className="gradient-text block">Arka Plan Kaldırma</span>
            Platformu
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Yapay zeka teknolojisi ile görsellerin arka planlarını anında kaldırın. 
            Profesyonel kalite, çoklu format desteği ve kurumsal düzeyde güvenilirlik.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg px-8 py-6">
              <Play className="w-5 h-5 mr-2" />
              Demo İzle
            </Button>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
                <ImageIcon className="w-5 h-5 mr-2" />
                Hemen Dene
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Neden Portreva?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            En gelişmiş AI teknolojileri ile donatılmış, kullanıcı dostu platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass-dark border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle className="text-white text-xl">Anında İşleme</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Gelişmiş AI algoritmaları ile görsellerinizi saniyeler içinde işleyin
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass-dark border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle className="text-white text-xl">Çoklu Format</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                PNG, JPG, WebP formatlarında indirin ve farklı kalite seçenekleri
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="glass-dark border-white/10 text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardHeader>
              <CardTitle className="text-white text-xl">Güvenli & Hızlı</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                SSL şifreleme, GDPR uyumluluğu ve yüksek performans
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Canlı Demo
          </h2>
          <p className="text-xl text-gray-300">
            Platformumuzun gücünü kendiniz deneyimleyin
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-dark border-white/10 p-8">
            <CardContent className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <ImageIcon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Görsel Yükleyin veya URL Girin
              </h3>
              <p className="text-gray-300 mb-8">
                Desteklenen formatlar: JPG, PNG, WebP (Maksimum 10MB)
              </p>
              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Demo Başlat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Fiyatlandırma
          </h2>
          <p className="text-xl text-gray-300">
            Her ihtiyaca uygun esnek planlar
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="glass-dark border-white/10 p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Ücretsiz</CardTitle>
              <CardDescription className="text-gray-300">
                Kişisel kullanım için
              </CardDescription>
              <div className="text-4xl font-bold text-white mt-4">
                ₺0<span className="text-lg text-gray-400">/ay</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  3 görsel/ay
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Temel formatlar
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Standart kalite
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Başla
              </Button>
            </CardContent>
          </Card>
          
          {/* Pro Plan */}
          <Card className="glass-dark border-primary/20 border-2 p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white">
                <Star className="w-4 h-4 mr-1" />
                Popüler
              </Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Pro</CardTitle>
              <CardDescription className="text-gray-300">
                Profesyonel kullanım için
              </CardDescription>
              <div className="text-4xl font-bold text-white mt-4">
                ₺99<span className="text-lg text-gray-400">/ay</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  100 görsel/ay
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Tüm formatlar
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Yüksek kalite
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  API erişimi
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                Pro'ya Geç
              </Button>
            </CardContent>
          </Card>
          
          {/* Business Plan */}
          <Card className="glass-dark border-white/10 p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl">Business</CardTitle>
              <CardDescription className="text-gray-300">
                Kurumsal kullanım için
              </CardDescription>
              <div className="text-4xl font-bold text-white mt-4">
                ₺299<span className="text-lg text-gray-400">/ay</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Sınırsız görsel
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Öncelikli işleme
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Özel arka planlar
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Beyaz etiket
                </li>
              </ul>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                İletişime Geç
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <Card className="glass-dark border-white/10 max-w-2xl mx-auto p-12">
            <CardContent className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Hemen Başlayın
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                AI destekli arka plan kaldırma teknolojisini deneyimleyin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-lg px-8 py-6">
                    Ücretsiz Deneyin
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
                    Demo İzleyin
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Portreva</span>
            </div>
            <p className="text-gray-400">
              AI destekli profesyonel arka plan kaldırma platformu
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Ürün</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Özellikler</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kariyer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">Yardım</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Durum</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Portreva. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
