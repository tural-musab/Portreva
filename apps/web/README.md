# Portreva - Professional AI Background Removal Platform

AI destekli profesyonel arka plan kaldırma platformu. Mevcut N8N workflow'unuzu backend olarak kullanarak modern bir Next.js uygulaması.

## 🚀 Özellikler

- **AI Destekli Arka Plan Kaldırma**: Remove.bg API entegrasyonu
- **Çoklu Format Desteği**: PNG, JPG, WebP formatlarında indirme
- **Modern UI/UX**: Tailwind CSS ve Shadcn/ui bileşenleri
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Gerçek Zamanlı İşleme**: Progress bar ve durum takibi
- **Drag & Drop**: Kolay dosya yükleme
- **URL Desteği**: Direkt URL'den görsel işleme

## 🏗️ Teknik Altyapı

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **UI Bileşenleri**: Shadcn/ui
- **Backend**: N8N Workflow (mevcut)
- **Veritabanı**: Prisma + PostgreSQL (opsiyonel)
- **State Management**: React Hooks
- **File Handling**: React Dropzone

## 🔧 Kurulum

### Gereksinimler

- Node.js 18+
- npm veya pnpm
- N8N workflow erişimi

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Environment değişkenlerini ayarlayın:**
```bash
# .env dosyası oluşturun
N8N_WEBHOOK_URL="https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg"
NEXTAUTH_SECRET="your-secret-key"
DATABASE_URL="postgresql://username:password@localhost:5432/portreva"
```

3. **Veritabanını hazırlayın (opsiyonel):**
```bash
npx prisma generate
npx prisma db push
```

4. **Uygulamayı başlatın:**
```bash
npm run dev
```

5. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🌐 API Endpoints

### Arka Plan Kaldırma
```http
POST /api/process
Content-Type: application/json

{
  "imageUrl": "https://example.com/image.jpg",
  "fileName": "image.jpg"
}
```

### N8N Test
```http
GET /api/test-n8n
```

## 🔗 N8N Workflow Entegrasyonu

Mevcut N8N workflow'unuz şu endpoint'i kullanır:
```
https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg
```

**Bu workflow şunları yapar:**
- Remove.bg API entegrasyonu (3 retry ile)
- Otomatik Cloudinary yükleme
- Çoklu format oluşturma (PNG, JPG, WebP)
- Thumbnail oluşturma
- Rate limiting takibi
- Hata yönetimi

## 📱 Kullanım

1. **Ana Sayfa**: Landing page ve özellikler
2. **Demo Sayfası**: `/demo` - Canlı arka plan kaldırma
3. **Görsel Yükleme**: Drag & drop veya URL
4. **İşleme**: AI ile otomatik arka plan kaldırma
5. **İndirme**: Çoklu format seçenekleri

## 🎨 Tasarım Sistemi

- **Renkler**: Indigo, Purple, Pink gradient
- **Tipografi**: Inter font
- **Bileşenler**: Glassmorphism efektleri
- **Animasyonlar**: Framer Motion
- **Responsive**: Mobile-first yaklaşım

## 🚧 Geliştirme Durumu

- [x] Landing page
- [x] Demo sayfası
- [x] N8N webhook entegrasyonu
- [x] Dosya yükleme sistemi
- [x] UI bileşenleri
- [ ] Kullanıcı kimlik doğrulama
- [ ] Veritabanı entegrasyonu
- [ ] Ödeme sistemi
- [ ] Kullanıcı dashboard'u

## 🔮 Gelecek Özellikler

- Kullanıcı hesapları ve geçmiş
- Batch işleme
- API anahtarları
- Stripe entegrasyonu
- Dark/Light mode toggle
- Gelişmiş görsel düzenleme
- Photoshop/Figma eklentileri

## 🐛 Sorun Giderme

### N8N Bağlantı Hatası
```bash
# Test endpoint'ini kontrol edin
curl http://localhost:3000/api/test-n8n
```

### Dosya Yükleme Hatası
- Dosya boyutu 10MB'dan küçük olmalı
- Sadece görsel dosyaları kabul edilir
- JPG, PNG, WebP formatları desteklenir

## 📄 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Proje**: [Portreva](https://github.com/your-username/portreva)
- **N8N Workflow**: [https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg](https://p01--n8n-main--2qrbwq25xs9w.code.run/webhook/ai/removebg)

---

**Not**: Bu uygulama mevcut N8N workflow'unuzu backend olarak kullanır. Workflow'da yapılan değişiklikler otomatik olarak uygulamaya yansır.
