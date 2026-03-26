# ✅ BEWARE!: JOBS — Geliştirme Görev Listesi (PRD + Idea Uyumlu)

Bu görev listesi `pdr.md` ve `idea.md` dokümanlarının tamamı ile uyumlu olacak şekilde hazırlanmıştır.

## 1) Proje Kurulumu ve Altyapı (HTML + Tailwind + JS + Gemini)

- [ ] Proje klasör yapısını oluştur (`index.html`, `styles/`, `scripts/`, `assets/`).
- [ ] Tailwind CSS kurulumunu tamamla ve temel tema renklerini belirle.
- [ ] JavaScript modüler yapı kur (`api.js`, `testFlow.js`, `results.js`, `chat.js`).
- [ ] Gemini API anahtarını `.env` ile güvenli şekilde yönetme yapısını hazırla.
- [ ] Gemini 1.5 Flash modeli için ortak istemci katmanını hazırla.
- [ ] Vercel/Lovable deployment için başlangıç konfigürasyonunu ekle.

## 2) Giriş Sayfası (Landing)

- [ ] “BEWARE!: JOBS” başlıklı karşılama ekranını tasarla.
- [ ] Ürün amacı ve kısa kullanım adımlarını ekle.
- [ ] “Teste Başla” CTA butonunu test akışına bağla.
- [ ] Mobil uyumluluk ve temel erişilebilirlik kontrollerini yap.

## 3) Stratejik Karakter Testi (RIASEC 12-15 + 3)

- [ ] 12-15 soruluk başlangıç soru setini JSON formatında oluştur.
- [ ] Soru ekranında tek tek soru gösterimi ve cevap toplama mekanizmasını geliştir.
- [ ] Kullanıcı cevaplarını local state’te tut ve JSON olarak hazırla.
- [ ] Kararsız cevap paternini tespit eden kural setini ekle.
- [ ] Gerekli durumda Gemini ile +3 derinleştirme sorusu üretme akışını kur.
- [ ] Test bitiminde tüm cevapları analiz endpoint’ine gönder.

## 4) Yükleme Ekranı ve AI Analiz Akışı

- [ ] “AI Geleceğini İnşa Ediyor...” mesajlı loading ekranını tasarla.
- [ ] Gemini API çağrısı için istemci/servis katmanını oluştur.
- [ ] Hata yönetimi (timeout, boş cevap, API hatası) ekle.
- [ ] Başarılı analiz sonrası sonuç ekranına yönlendirme yap.

## 5) Akıllı Kariyer Kartları (Sonuç Sayfası)

- [ ] AI çıktısından baskın 2-3 RIASEC tipini parse et.
- [ ] Bu tiplere uygun 3 meslek önerisini kartlar halinde göster.
- [ ] Her kart için “Neden bu meslek?” kişiselleştirilmiş açıklamayı ekle.
- [ ] Maaş skalası alanını tasarla ve veri bağla.
- [ ] 2030+ otomasyon riski ve piyasa projeksiyonu alanını görsel olarak sun.

## 6) Gelecek Skoru Grafikleri (Chart.js)

- [ ] Chart.js entegrasyonunu yap.
- [ ] Meslek bazlı gelecek skoru/otomasyon riski grafiğini oluştur.
- [ ] Grafik veri modelini AI çıktı formatı ile uyumlu hale getir.
- [ ] Mobilde grafik okunabilirliğini optimize et.

## 7) Deneyim Odası (Multimodal)

- [ ] YouTube “Day in the Life” video arama/eşleştirme mantığını kur.
- [ ] Sonuç kartına göre ilgili videoları gömülü biçimde göster.
- [ ] Vlog içeriğini kısa rutin özetiyle birlikte sun.
- [ ] Mesleğe özel 1 dakikalık “Text-Adventure” kriz senaryosu üretim prompt’unu yaz.
- [ ] Senaryo oynatma alanını (seçim butonları + çıktı metni) geliştir.

## 8) 7/24 AI Kariyer Mentoru (Chat)

- [ ] Sonuç sayfasına sabit bir sohbet bileşeni ekle.
- [ ] Gemini tabanlı soru-cevap akışını kur.
- [ ] Sohbete kullanıcı sonuç özetini context olarak ekle.
- [ ] Sık sorulan sorular için hazır öneri soruları ekle (maaş, yurt dışı, pişmanlık riski vb.).
- [ ] Güvenlik için prompt injection’a karşı temel filtreler ekle.

## 9) Smart Roadmap (PDF) — Kişiselleştirilmiş Yol Haritası

- [ ] Seçilen mesleğe göre ders odakları ve önerilen sertifikalar için veri şemasını tanımla.
- [ ] AI’dan kişiye özel yol haritası içeriğini üreten prompt akışını kur.
- [ ] Yol haritasını uygulama içinde okunabilir bir özet kartı olarak göster.
- [ ] “PDF indir” butonu ve PDF üretim modülünü ekle.
- [ ] İndirilen PDF’de öğrenci profili, önerilen adımlar ve kısa aksiyon planı alanlarını doğrula.

## 10) Kalite, Test ve Güvenlik

- [ ] Kullanıcı akışının uçtan uca manuel test senaryolarını yaz.
- [ ] API hata durumları ve fallback mesajlarını doğrula.
- [ ] Form doğrulama ve boş input kontrollerini tamamla.
- [ ] API key yönetimini .env dosyası ile sağla (Vercel Environment Variables kullanarak).
- [ ] Temel performans kontrolü (ilk yükleme, API bekleme süreleri) yap.

## 11) Yayına Alma ve Dokümantasyon

- [ ] Vercel/Lovable üzerinde canlıya al.
- [ ] README’ye kurulum, env değişkenleri ve kullanım adımlarını ekle.
- [ ] Demo kullanıcı akışını ekran görüntüleriyle dokümante et (Landing > Test > Loading > Sonuç > Chat > PDF).
- [ ] “Neden farklı?” bölümünü dokümana ekle (Simülasyon + Vlog + Mentor yaklaşımı).