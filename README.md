# BEWARE!: JOBS

BEWARE!: JOBS, meslek seçimi sürecini daha bilinçli hale getirmek için hazırlanmış AI destekli bir kariyer keşif uygulamasıdır.

Uygulama içinde:
- RIASEC kişilik testi
- 3 meslek önerisi
- AI kariyer mentoru
- kriz simülatörü
- AI görsel promptu
- PDF kariyer raporu
- YouTube vlog ve LinkedIn yönlendirmeleri
bulunur.

## Projenin Amacı

Bu proje, kullanıcının ilgi alanlarına ve kişilik tipine göre meslek önerileri sunar. Kullanıcı sadece test çözmez; aynı zamanda seçtiği meslek hakkında AI mentor ile soru sorabilir, kriz senaryolarını inceleyebilir ve geleceğe dair bir kariyer vizyonu oluşturabilir.

## Kullanılan Teknolojiler

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Gemini API
- n8n workflow entegrasyonu
- Chart.js
- jsPDF

## Kurulum

1. Bu projeyi bilgisayarına indir.
2. Terminal aç.
3. Proje klasörüne gir:

```bash
cd /Users/elifsoy/Documents
```

4. Gerekli paketleri yükle:

```bash
npm install
```

5. `.env.example` dosyasını örnek alarak `.env` oluştur.

6. Eğer AI kariyer analizi backend üzerinden çalışacaksa `.env` içine kendi Gemini anahtarını yaz:

```env
GEMINI_API_KEY=buraya_kendi_gemini_keyin
GEMINI_TEXT_MODEL=gemini-2.0-flash
GEMINI_IMAGE_MODEL=gemini-2.5-flash-image-preview
PORT=3000
```

## Çalıştırma

Projeyi başlatmak için:

```bash
npm start
```

Daha sonra tarayıcıda şu adresi aç:

```text
http://127.0.0.1:3000
```

Sayfa eski görünüyorsa sert yenile:

```text
Cmd + Shift + R
```

## n8n ile AI Mentor Kurulumu

AI Kariyer Mentoru bölümü doğrudan n8n webhook akışı ile çalışır. Uygulamada varsayılan bir webhook adresi hazır gelir. Eğer kendi n8n akışını kullanmak istersen mentor alanındaki webhook kutusundan bu adresi değiştirebilirsin.

Kısa kurulum:

1. n8n içinde mentor workflow'unu import et.
2. Gemini node'una kendi geçerli Gemini API key'ini ekle.
3. Workflow'u publish et.
4. `Production Webhook URL` adresini kopyala.
5. Uygulamada `AI Kariyer Mentorun` bölümündeki webhook alanına yapıştır.
6. `Kaydet` butonuna bas.

Bu adımdan sonra mentor sohbeti uygulamanın içinde çalışır. Eğer varsayılan webhook doğruysa bu adımı yapmana gerek kalmaz.

## Temel Özellikler

### 1. RIASEC Testi
Kullanıcının cevaplarına göre kişilik tipi analiz edilir ve uygun meslekler önerilir.

### 2. AI Kariyer Mentoru
Kullanıcı seçtiği meslek hakkında soru sorabilir ve n8n webhook üzerinden çalışan AI destekli cevap alabilir.

### 3. Kriz Simülatörü
Her meslek için özel kriz senaryoları sunulur. Kullanıcı bu senaryoları kendi AI aracıyla derinleştirebilir.

### 4. AI Görsel Promptu
Seçilen meslek için uygun bir görsel üretim promptu hazırlanır.

### 5. PDF Raporu
Kullanıcı seçtiği meslek için kısa bir kariyer raporunu PDF olarak indirebilir.

### 6. LinkedIn ve Vlog Yönlendirmeleri
Kullanıcı mesleği gerçek hayatta daha iyi tanımak için LinkedIn ve YouTube bağlantılarına yönlendirilir.

## AI Akışı

Uygulamada kullanıcı girdisi alınır, AI ile işlenir ve kullanıcıya çıktı olarak geri verilir.

Örnek akış:

```text
Kullanıcı testi çözer -> sistem meslek önerir -> kullanıcı meslek seçer -> webhooku kaydeder -> AI mentor ile soru sorar -> çıktı ekranda gösterilir
```

Bu yapı, ödevde istenen “kullanıcı input -> AI output” mantığını karşılar.

## Not

`.env` dosyası repoya yüklenmemelidir. Gizli API anahtarları yalnızca yerel ortamda tutulmalıdır.
