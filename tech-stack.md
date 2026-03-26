# 🛠️ Tech Stack: BEWARE!: JOBS

## 1. Teknoloji Seçimleri
- **Frontend (Arayüz):** HTML5, Vanilla JavaScript, Tailwind CSS (Hızlı ve modern tasarım için).
- **Intelligence (Zeka):** Google Gemini 1.5 Flash API (Google AI Studio).
- **Görselleştirme:** Chart.js (Gelecek skoru ve otomasyon riski grafikleri için).
- **Dokümantasyon:** jspdf (Kişiselleştirilmiş PDF raporu üretimi için).
- **Deployment:** Vercel (Hızlı canlıya alma ve Environment Variables yönetimi).

## 2. Neden Bu Teknolojileri Seçiyoruz?
- **Hız ve Sadelik:** Başlangıç seviyesinde kurulum karmaşasından (React/Node.js vb.) kurtulup doğrudan AI deneyimine ve kodlamaya odaklanmak için en sade yığını seçtik.
- **Tailwind CSS:** Tasarımı sıfırdan CSS yazmak yerine hazır sınıfları kullanarak profesyonel, neon-dark bir temayı saniyeler içinde oluşturmak için.
- **Gemini 1.5 Flash:** Düşük gecikme süresi (low-latency), yüksek analiz kapasitesi ve geniş ücretsiz kotası sayesinde Buildathon süresince sınırsız test imkanı sunması.

## 3. Kurulum Adımları
1. **Dosya Yapısı:** `index.html`, `script.js`, `style.css` ve `questions.json` dosyaları Cursor üzerinde oluşturulur.
2. **Kütüphane Entegrasyonu:** Tailwind, Chart.js ve jspdf kütüphaneleri CDN üzerinden `index.html`'e eklenir.
3. **API Bağlantısı:** Google AI Studio üzerinden alınan API anahtarı `script.js` dosyasına tanımlanır (Vercel deployment aşamasında güvenli değişkene taşınacaktır).