# BEWARE!: JOBS

## Problem
Meslek seçimi öğrenciler için zor bir süreç çünkü sadece internetten meslek adı okumak yeterli olmuyor. Kullanıcıların hem kendilerine uygun alanları görmesi, hem bu alanları daha derin araştırması, hem de daha gerçekçi örneklerle değerlendirmesi gerekiyor.

## Çözüm
BEWARE!: JOBS, RIASEC tabanlı test ile kullanıcıya 3 kariyer önerisi sunan AI destekli bir kariyer keşif uygulamasıdır. Kullanıcı seçtiği meslek için AI kariyer mentoru, mesleğe özel kriz simülatörü, görsel üretim promptu, LinkedIn yönlendirmeleri, YouTube vlog aramaları ve tarihten ilham veren isimler gibi alanlarla daha derin bir keşif deneyimi yaşar. AI tarafında özellikle mentor akışında n8n webhook ve Gemini tabanlı yapı kullanılmıştır.

## Canlı Demo
Yayın Linki: https://beware-jobs.onrender.com

Demo Video: https://youtu.be/lVwuqp7qdIE

## Kullanıcı Geri Bildirimleri
- 5 kullanıcı ile test edildi.
- Uygulamanın kullanım kolaylığı puanı: **5/5**
- Meslek önerilerinin mantıklılığı puanı: **4.8/5**
- AI kariyer mentorunun yararlılığı puanı: **4.8/5**
- Uygulamayı arkadaşına önerme oranı: **%100**
- En çok beğenilen özellikler: RIASEC testi, AI kariyer mentoru ve ilham veren kişiler bölümü.
- En sık gelen öneriler: meslekleri karşılaştırabilme, sonuçları kaydedebilme ve veri tabanını daha da geliştirme.


## Kullanılan Teknolojiler
- HTML
- CSS
- JavaScript
- Node.js
- Express
- Gemini API
- n8n
- Chart.js

## Nasıl Çalıştırılır?
1. Projeyi bilgisayarına indir.
2. Terminal aç ve proje klasörüne gir:

```bash
cd /Users/elifsoy/Documents
```

3. Gerekli paketleri yükle:

```bash
npm install
```

4. `.env.example` dosyasını örnek alarak `.env` oluştur ve kendi Gemini anahtarını ekle:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_TEXT_MODEL=gemini-2.0-flash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview
PORT=3000
```

5. Uygulamayı başlat:

```bash
npm start
```

6. Tarayıcıda şu adresi aç:

```text
http://127.0.0.1:3000
```

## GitHub
Repo Linki: https://github.com/ElifSoy/beware-jobs
