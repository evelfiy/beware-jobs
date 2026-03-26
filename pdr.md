# 📋 PRD: BEWARE!: JOBS — AI-Powered Career Navigator

## 1. Ürün Vizyonu
Lise ve hazırlık öğrencilerinin karakterlerini **RIASEC (Holland Kodları)** modeliyle analiz eden, onlara sadece meslek ismi değil; o mesleğin günlük rutinini (Vlog), kriz anlarını (Simülasyon) ve gelecekteki yerini (AI Tahmini) sunan interaktif bir rehberlik platformu.

## 2. Hedef Kullanıcılar
- Kariyer planlaması yapan lise öğrencileri.
- Bölüm seçimi öncesi araştırma yapan üniversite hazırlık öğrencileri.

## 3. Temel Özellikler (MVP)
### A. Stratejik Karakter Testi
- **İçerik:** 12-15 soruluk (kararsız kalınan noktalarda AI tarafından üretilen +3 derinleştirme sorusu), RIASEC tabanlı kişilik envanteri.
- **Teknoloji:** Kullanıcı cevaplarını JSON formatında toplar ve analiz için Gemini API'a gönderir.

### B. Akıllı Kariyer Kartları
- **Analiz:** AI, kullanıcının en baskın 2-3 RIASEC tipini belirler ve buna uygun 3 meslek önerir.
- **Neden Uygun?:** Her meslek için kişiselleştirilmiş "Neden bu meslek?" açıklaması.
- **Maaş & Gelecek:** Tahmini maaş skalası ve 2030+ otomasyon riski analizi.

### C. Deneyim Odası (Multimodal)
- **Vlog Entegrasyonu:** YouTube'dan otomatik "Day in the Life" videolarının gösterimi.
- **Kriz Simülatörü:** Mesleğe dair anlık üretilen 1 dakikalık "Text-Adventure" senaryosu.

### D. 7/24 Kariyer Mentoru (AI Chat)
- **Etkileşim:** Sonuç sayfasında kullanıcının merak ettiği soruları cevaplayan Gemini tabanlı sohbet kutusu.

## 4. Kullanıcı Akışı (User Flow)
1. **Giriş Sayfası:** Projenin amacını anlatan "BEWARE!: JOBS" karşılaması.
2. **Test Sayfası:** Soruların tek tek akıllıca sorulduğu arayüz.
3. **Yükleme Ekranı:** "AI Geleceğini İnşa Ediyor..." mesajlı animasyon.
4. **Sonuç Sayfası:** Meslek kartları, grafikler, videolar ve en altta AI Mentor Chat.

## 5. Teknik Gereksinimler
- **Frontend:** HTML5, Tailwind CSS, JavaScript.
- **Backend/AI:** Google Gemini API (Gemini 1.5 Flash).
- **Görselleştirme:** Chart.js (Gelecek skoru grafikleri için).
- **Barındırma:** Lovable veya Vercel.