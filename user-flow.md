# 🌊 User Flow: BEWARE!: JOBS

1. **Giriş Sayfası (Landing):**
   - **Görünüm:** Modern, sade, koyu temalı bir karşılama ekranı. "Geleceğin Seni Bekliyor" sloganı ve "Kariyer Yolculuğuna Başla" butonu.
   - **Eylem:** Kullanıcı projenin kapsamını (RIASEC + AI Mentor + Simülasyon) görür ve teste başlar.

2. **Dinamik Stratejik Analiz (RIASEC Testi):**
   - **Görünüm:** Tek tek gelen, günlük hayat senaryoları içeren sorular ve ilerleme çubuğu (progress bar).
   - **Eylem:** Kullanıcı başlangıçtaki 12-15 soruyu yanıtlar. 
   - **Zeka Katmanı:** Eğer skorlar birbirine çok yakınsa (belirsizlik durumu), AI otomatik olarak sistemi netleştirmek için +3 derinleştirme sorusu daha üretir ve sorar.

3. **İşleme Ekranı (AI Processing):**
   - **Görünüm:** "AI Kariyer Geleceğini İnşa Ediyor..." yazan profesyonel bir yükleme animasyonu.
   - **Süreç:** Arka planda Gemini API, RIASEC verilerini analiz ederek kişiye özel 3 meslek kartı hazırlar.

4. **Sonuç Dashboard'u (Kariyer Paketi):**
   - **Görünüm:** - **Karakter Analizi:** RIASEC tipine göre kişilik özeti.
     - **Meslek Kartları:** Önerilen 3 meslek, gerekçeleri, maaş skalası ve gelecek skoru.
     - **Deneyim Odası:** Mesleğe özel YouTube vlog linkleri ve "Kriz Simülasyonu" butonu.

5. **Etkileşim ve Derinleşme (AI Mentor & Simülasyon):**
   - **Kriz Simülatörü:** Kullanıcı mesleğe dair 1 dakikalık bir senaryoyu (Text-Adventure) oynar ve kararlarının sonucunu görür.
   - **AI Kariyer Mentoru:** Kullanıcı sayfanın altındaki chat kutusuna "Yurt dışı imkanı nedir?", "Hangi derslere çalışmalıyım?" gibi sorular sorar; AI mentor test verilerine dayanarak cevaplar.

6. **Final ve Çıktı (Smart Roadmap):**
   - **Sonuç:** Kullanıcı tüm bu analizi, önerilen eğitimleri ve sertifika yol haritasını içeren profesyonel bir **PDF raporu** olarak indirir.