/**
 * BEWARE!: JOBS - FULL AI INTEGRATION VERSION
 * AI islemleri guvenli backend uzerinden calisir.
 */

const API_BASE_URL = window.location.origin.startsWith("http") ? window.location.origin : "http://localhost:3000";

const RIASEC_KEYS = ["R", "I", "A", "S", "E", "C"];
const USER_NAME_KEY = "beware_jobs_user_name_v1";
const NOTES_FOLDER_MODEL_KEY = "beware_jobs_notes_folder_model_v1";
const CHAT_HISTORY_KEY = "beware_jobs_chat_history_v1";
const AI_MENTOR_WEBHOOK_KEY = "beware_jobs_ai_mentor_webhook_v1";
const DEFAULT_MENTOR_WEBHOOK_URL = "https://elifffff.app.n8n.cloud/webhook/beware-jobs-ai-mail";

const INSPIRATION_QUOTES = [
  "En değerli sensin. Potansiyelin sınavdan büyüktür.",
  "Küçük bir adım, büyük bir geleceği başlatır.",
  "Başarı önce kendi hikayene inanmakla başlar.",
  "AI ile keşfettiğin yol, senin gerçek potansiyelindir.",
  "Doğru meslek seni her sabah motive ederek uyandırandır."
];

const FUTURE_SCORE_CRITERIA = [
  "Rutinlik ve Tekrar Düzeyi",
  "Sosyal ve Duygusal Zeka Gereksinimi",
  "Yaratıcılık ve Özgünlük",
  "Fiziksel El Becerisi ve Hareket Kabiliyeti",
  "Karar Verme ve Etik Sorumluluk Düzeyi",
  "Gerekli Eğitim ve Uzmanlık Derinliği",
  "Yapay Zekaya Adaptasyon ve Entegrasyon Kolaylığı",
  "Pazar Talebi ve Demografik Trendler",
  "Algoritmik Tahmin Edilebilirlik",
  "Yasal ve Etik Mevzuatlar"
];

const CAREER_FUTURE_FACTORS = {
  "Yazılım Geliştirici": [6, 7, 8, 3, 7, 8, 9, 9, 5, 6],
  "Veri Bilimcisi": [5, 6, 7, 2, 8, 9, 10, 9, 4, 6],
  "Yapay Zeka Mühendisi": [4, 6, 8, 2, 8, 10, 10, 10, 4, 7],
  "Siber Güvenlik Uzmanı": [4, 7, 6, 2, 9, 9, 9, 10, 3, 9],
  "Psikolojik Danışman": [7, 10, 6, 2, 9, 8, 5, 8, 2, 9],
  "Klinik Psikolog": [6, 10, 7, 2, 10, 9, 5, 8, 2, 10],
  "Endüstriyel Tasarımcı": [5, 7, 10, 7, 7, 8, 7, 8, 4, 6],
  "Grafik Tasarımcı": [6, 6, 10, 5, 6, 6, 8, 7, 4, 5],
  "Mimari Restorasyon Uzmanı": [5, 7, 8, 8, 8, 9, 7, 8, 4, 9],
  "Mimar": [5, 7, 9, 6, 8, 9, 8, 8, 5, 8],
  "Dijital Pazarlama Uzmanı": [6, 8, 8, 2, 7, 7, 10, 9, 5, 6],
  "İnsan Kaynakları Uzmanı": [7, 10, 6, 2, 8, 7, 7, 8, 4, 8],
  "Proje Yöneticisi": [5, 9, 6, 2, 9, 8, 9, 9, 4, 8],
  "Mekatronik Mühendisi": [4, 6, 7, 8, 8, 9, 9, 9, 4, 7],
  "Biyomedikal Mühendisi": [4, 7, 7, 6, 9, 10, 9, 9, 4, 9],
  "Çevre Mühendisi": [5, 7, 7, 5, 8, 8, 8, 9, 5, 9],
  "Doktor (Tıp)": [4, 10, 6, 8, 10, 10, 6, 10, 3, 10],
  "Diş Hekimi": [5, 8, 6, 9, 9, 9, 7, 8, 4, 9],
  "Eczacı": [7, 8, 5, 4, 9, 9, 7, 8, 5, 10],
  "Hukukçu (Avukat)": [5, 9, 7, 2, 10, 9, 6, 9, 4, 10],
  "Öğretmen": [6, 10, 7, 3, 9, 8, 7, 9, 3, 9],
  "Akademisyen": [6, 8, 8, 2, 8, 10, 8, 8, 4, 8],
  "Gazeteci": [5, 8, 8, 3, 8, 7, 8, 7, 3, 8],
  "Fotoğrafçı": [5, 7, 10, 8, 6, 6, 7, 7, 4, 5],
  "Müzisyen": [4, 8, 10, 7, 6, 7, 7, 6, 3, 5]
};

// ============ MESLEK HAVUZU - 25+ FARKLI MESLEK ============
const ALL_CAREERS = [
  { title: "Yazılım Geliştirici", type: "Teknoloji", riasecMatch: ["R", "I"], description: "Yazılım dilleriyle uygulama ve sistem geliştirir.", salary: "45.000 - 85.000 TL", futureScore: 92 },
  { title: "Veri Bilimcisi", type: "Teknoloji", riasecMatch: ["I", "C"], description: "Büyük veriyi analiz edip anlamlı çıkarımlar yapar.", salary: "50.000 - 90.000 TL", futureScore: 94 },
  { title: "Yapay Zeka Mühendisi", type: "Teknoloji", riasecMatch: ["R", "I"], description: "Makine öğrenmesi ve derin öğrenme modelleri geliştirir.", salary: "55.000 - 100.000 TL", futureScore: 96 },
  { title: "Siber Güvenlik Uzmanı", type: "Teknoloji", riasecMatch: ["R", "C"], description: "Bilgi sistemlerini siber saldırılara karşı korur.", salary: "50.000 - 95.000 TL", futureScore: 95 },
  { title: "Psikolojik Danışman", type: "Sağlık & Sosyal", riasecMatch: ["S", "E"], description: "Bireylere psikolojik destek ve rehberlik sağlar.", salary: "30.000 - 55.000 TL", futureScore: 78 },
  { title: "Klinik Psikolog", type: "Sağlık & Sosyal", riasecMatch: ["S", "I"], description: "Terapi ve psikolojik değerlendirme yapar.", salary: "35.000 - 65.000 TL", futureScore: 82 },
  { title: "Endüstriyel Tasarımcı", type: "Sanat & Tasarım", riasecMatch: ["A", "R"], description: "Ürünlerin kullanılabilir ve estetik tasarımlarını yapar.", salary: "35.000 - 70.000 TL", futureScore: 82 },
  { title: "Grafik Tasarımcı", type: "Sanat & Tasarım", riasecMatch: ["A", "E"], description: "Görsel iletişim tasarımları oluşturur.", salary: "25.000 - 50.000 TL", futureScore: 75 },
  { title: "Mimari Restorasyon Uzmanı", type: "Mimarlık", riasecMatch: ["R", "A"], description: "Tarihi yapıları koruma ve onarma çalışmaları yapar.", salary: "35.000 - 65.000 TL", futureScore: 85 },
  { title: "Mimar", type: "Mimarlık", riasecMatch: ["A", "R"], description: "Yapıların tasarım ve projelendirmesini yapar.", salary: "40.000 - 75.000 TL", futureScore: 80 },
  { title: "Dijital Pazarlama Uzmanı", type: "İş & Yönetim", riasecMatch: ["E", "S"], description: "Dijital kanallarda marka bilinirliğini artırır.", salary: "35.000 - 65.000 TL", futureScore: 88 },
  { title: "İnsan Kaynakları Uzmanı", type: "İş & Yönetim", riasecMatch: ["S", "E"], description: "Çalışanların işe alım ve gelişim süreçlerini yönetir.", salary: "30.000 - 55.000 TL", futureScore: 75 },
  { title: "Proje Yöneticisi", type: "İş & Yönetim", riasecMatch: ["E", "C"], description: "Projelerin planlama, yürütme ve kontrolünü sağlar.", salary: "45.000 - 85.000 TL", futureScore: 85 },
  { title: "Mekatronik Mühendisi", type: "Mühendislik", riasecMatch: ["R", "I"], description: "Robotik ve otomasyon sistemleri tasarlar.", salary: "40.000 - 75.000 TL", futureScore: 88 },
  { title: "Biyomedikal Mühendisi", type: "Mühendislik", riasecMatch: ["I", "R"], description: "Tıbbi cihaz ve ekipmanların geliştirilmesini sağlar.", salary: "38.000 - 70.000 TL", futureScore: 90 },
  { title: "Çevre Mühendisi", type: "Mühendislik", riasecMatch: ["R", "I"], description: "Çevre koruma ve sürdürülebilirlik projeleri geliştirir.", salary: "35.000 - 65.000 TL", futureScore: 86 },
  { title: "Doktor (Tıp)", type: "Sağlık", riasecMatch: ["I", "S"], description: "Hastalıkları teşhis ve tedavi eder.", salary: "50.000 - 120.000 TL", futureScore: 85 },
  { title: "Diş Hekimi", type: "Sağlık", riasecMatch: ["R", "S"], description: "Ağız ve diş sağlığı hizmeti verir.", salary: "45.000 - 90.000 TL", futureScore: 83 },
  { title: "Eczacı", type: "Sağlık", riasecMatch: ["I", "C"], description: "İlaç danışmanlığı ve hasta takibi yapar.", salary: "35.000 - 65.000 TL", futureScore: 78 },
  { title: "Hukukçu (Avukat)", type: "Hukuk", riasecMatch: ["E", "S"], description: "Hukuki danışmanlık ve dava takibi yapar.", salary: "40.000 - 100.000 TL", futureScore: 80 },
  { title: "Öğretmen", type: "Eğitim", riasecMatch: ["S", "A"], description: "Eğitim ve öğretim faaliyetlerini yürütür.", salary: "30.000 - 50.000 TL", futureScore: 75 },
  { title: "Akademisyen", type: "Eğitim", riasecMatch: ["I", "S"], description: "Üniversitelerde araştırma ve eğitim yapar.", salary: "40.000 - 80.000 TL", futureScore: 82 },
  { title: "Gazeteci", type: "Medya", riasecMatch: ["A", "S"], description: "Haber toplar, yazar ve yayınlar.", salary: "25.000 - 50.000 TL", futureScore: 70 },
  { title: "Fotoğrafçı", type: "Sanat", riasecMatch: ["A", "R"], description: "Profesyonel fotoğraf çekimi ve düzenleme yapar.", salary: "20.000 - 45.000 TL", futureScore: 68 },
  { title: "Müzisyen", type: "Sanat", riasecMatch: ["A"], description: "Müzik icra eder veya besteler.", salary: "Değişken", futureScore: 65 }
];

// Tarihten ünlü kişiler
const FAMOUS_PEOPLE = {
  "Yazılım Geliştirici": {
    turkish: { name: "Gökçe Yıldırım", era: "Günümüz", trait: "Azim, yenilikçilik, liderlik", story: "Türkiye'nin ilk kadın yazılım mühendislerinden." },
    foreign: { name: "Linus Torvalds", era: "1969 - Günümüz", trait: "Yaratıcılık, açık kaynak ruhu", story: "Linux işletim sisteminin yaratıcısı." }
  },
  "Veri Bilimcisi": {
    turkish: { name: "Cem Say", era: "1966 - Günümüz", trait: "Analitik düşünme, araştırma, veri merakı", story: "Bilgisayar bilimi ve veri odaklı düşünceyi geniş kitlelere anlatan önemli isimlerden biri oldu." },
    foreign: { name: "Geoffrey Hinton", era: "1947 - Günümüz", trait: "Araştırma, derin analiz, yenilik", story: "Makine öğrenmesi ve veri odaklı yapay zeka çalışmalarında en etkili isimlerden biri kabul edilir." }
  },
  "Yapay Zeka Mühendisi": {
    turkish: { name: "Selçuk Bayraktar", era: "1979 - Günümüz", trait: "Teknik vizyon, üretkenlik, kararlılık", story: "Yüksek teknoloji üretimi ve mühendislik vizyonuyla gençlere ilham veren isimlerden biri oldu." },
    foreign: { name: "Andrew Ng", era: "1976 - Günümüz", trait: "Öğreticilik, teknik derinlik, vizyon", story: "Yapay zeka eğitimini ve uygulamasını dünyada yaygınlaştıran önde gelen isimlerden biri." }
  },
  "Siber Güvenlik Uzmanı": {
    turkish: { name: "Refik Molva", era: "Günümüz", trait: "Dikkat, sistem düşüncesi, güvenlik bakışı", story: "Siber güvenlik ve ağ güvenliği alanındaki çalışmalarıyla öne çıkan akademik isimlerden biri." },
    foreign: { name: "Kevin Mitnick", era: "1963 - 2023", trait: "Merak, teknik beceri, güvenlik farkındalığı", story: "Siber güvenlik alanında hem saldırı hem savunma perspektifiyle dünyaca tanınan isimlerden biri oldu." }
  },
  "Psikolojik Danışman": {
    turkish: { name: "Prof. Dr. Suna Tan", era: "Günümüz", trait: "Empati, akademik mükemmellik", story: "Türkiye'de psikolojik danışmanlık alanının öncülerinden." },
    foreign: { name: "Carl Rogers", era: "1902-1987", trait: "Empati, koşulsuz kabul", story: "Modern psikolojik danışmanlığın kurucusu." }
  },
  "Klinik Psikolog": {
    turkish: { name: "Gülseren Budayıcıoğlu", era: "1947 - Günümüz", trait: "Empati, gözlem, insan hikâyelerine duyarlılık", story: "Klinik psikoloji alanındaki deneyimini geniş kitlelerle paylaşarak ilham verdi." },
    foreign: { name: "Aaron Beck", era: "1921 - 2021", trait: "Analiz, bilimsel yaklaşım, yenilik", story: "Bilişsel terapi yaklaşımıyla klinik psikolojide derin etki yaratan isimlerden biri oldu." }
  },
  "Endüstriyel Tasarımcı": {
    turkish: { name: "Hüseyin B. Çağlayan", era: "Günümüz", trait: "Yaratıcılık, kültürel miras", story: "Türk tasarımının dünyadaki yüzü." },
    foreign: { name: "Jonathan Ive", era: "1967 - Günümüz", trait: "Minimalizm, detaycılık", story: "Apple'ın efsanevi tasarımcısı." }
  },
  "Grafik Tasarımcı": {
    turkish: { name: "Bülent Erkmen", era: "1957 - Günümüz", trait: "Görsel düşünme, özgünlük, iletişim gücü", story: "Türkiye'de grafik tasarım alanında uzun yıllardır etkili işler üreten en önemli isimlerden biri." },
    foreign: { name: "Paula Scher", era: "1948 - Günümüz", trait: "Yaratıcılık, tipografi, güçlü anlatım", story: "Grafik tasarım ve görsel kimlik alanında dünyaca tanınan tasarımcılardan biri oldu." }
  },
  "Mimari Restorasyon Uzmanı": {
    turkish: { name: "Zeynep Ahunbay", era: "1946 - Günümüz", trait: "Koruma bilinci, tarih duyarlılığı, sabır", story: "Kültürel miras ve restorasyon alanında Türkiye'nin önde gelen uzmanlarından biri oldu." },
    foreign: { name: "Eugène Viollet-le-Duc", era: "1814 - 1879", trait: "Tarih bilgisi, teknik dikkat, koruma yaklaşımı", story: "Mimari restorasyon tarihinde temel isimlerden biri olarak kabul edilir." }
  },
  "Mimar": {
    turkish: { name: "Mimar Sinan", era: "1489 - 1588", trait: "Estetik, ustalık, teknik deha", story: "Mimarlık tarihinde hem sanatsal hem yapısal açıdan zamansız eserler bıraktı." },
    foreign: { name: "Zaha Hadid", era: "1950 - 2016", trait: "Cesur tasarım, yenilik, yaratıcılık", story: "Çağdaş mimarlıkta sınırları zorlayan tasarımlarıyla dünya çapında ilham verdi." }
  },
  "Dijital Pazarlama Uzmanı": {
    turkish: { name: "A. Ercüment Büyükşener", era: "Günümüz", trait: "İletişim, dijital düşünce, yenilik", story: "Dijital pazarlama ve yeni medya alanında Türkiye'de görünür isimlerden biri oldu." },
    foreign: { name: "Seth Godin", era: "1960 - Günümüz", trait: "Yaratıcılık, strateji, iletişim gücü", story: "Pazarlama dünyasında farklı düşünme biçimiyle öne çıkan en etkili isimlerden biri." }
  },
  "İnsan Kaynakları Uzmanı": {
    turkish: { name: "Fatma Dilek Türker", era: "Günümüz", trait: "İnsan odaklılık, liderlik, organizasyon", story: "İnsan kaynakları ve kurumsal yönetim alanında örnek gösterilen Türk yöneticilerden biri oldu." },
    foreign: { name: "Dave Ulrich", era: "1953 - Günümüz", trait: "Strateji, insan yönetimi, sistem kurma", story: "Modern insan kaynakları yaklaşımına yön veren en tanınmış isimlerden biri kabul edilir." }
  },
  "Proje Yöneticisi": {
    turkish: { name: "Ali Sabancı", era: "1969 - Günümüz", trait: "Liderlik, planlama, karar verme", story: "Yönetim ve organizasyon tarafındaki görünürlüğüyle proje ve ekip yönetimi açısından ilham veren isimlerden biri oldu." },
    foreign: { name: "Elon Musk", era: "1971 - Günümüz", trait: "Hedef odaklılık, hız, organizasyon gücü", story: "Büyük ölçekli projeleri yönetme ve yüksek hedefler koyma biçimiyle dikkat çeken isimlerden biri." }
  },
  "Mekatronik Mühendisi": {
    turkish: { name: "Selçuk Bayraktar", era: "1979 - Günümüz", trait: "Üretim, sistem düşüncesi, mühendislik vizyonu", story: "Mekanik, elektronik ve yazılım birleşimini kullanan teknolojik üretim yaklaşımıyla ilham verdi." },
    foreign: { name: "Dean Kamen", era: "1951 - Günümüz", trait: "İnovasyon, prototipleme, mühendislik zekâsı", story: "Robotik ve mekatronik düşünceye yakın icatlarıyla tanınan önemli isimlerden biri oldu." }
  },
  "Biyomedikal Mühendisi": {
    turkish: { name: "Canan Dağdeviren", era: "1985 - Günümüz", trait: "Bilimsel merak, yenilikçilik, azim", story: "Biyomedikal teknoloji ve giyilebilir sağlık cihazları alanında dünya çapında ilham veren bir Türk bilim insanı oldu." },
    foreign: { name: "Robert Langer", era: "1948 - Günümüz", trait: "Araştırma, yenilik, sağlık teknolojisi", story: "Biyomedikal mühendislik ve sağlık teknolojileri alanında çok sayıda yeniliğe katkı sağladı." }
  },
  "Çevre Mühendisi": {
    turkish: { name: "Aysel Aziz", era: "Günümüz", trait: "Toplumsal duyarlılık, sürdürülebilirlik, analiz", story: "Çevre ve toplum ilişkisini düşünen yaklaşımıyla çevre bilincine katkı sunan isimlerden biri oldu." },
    foreign: { name: "Wangari Maathai", era: "1940 - 2011", trait: "Sürdürülebilirlik, liderlik, çevre duyarlılığı", story: "Çevre koruma ve toplumsal etkiyi bir araya getiren çalışmalarıyla küresel ölçekte ilham verdi." }
  },
  "Doktor (Tıp)": {
    turkish: { name: "Aziz Sancar", era: "1946 - Günümüz", trait: "Disiplin, bilimsel merak, sabır", story: "Tıp ve biyomedikal araştırmalar alanında Nobel ödülüyle dünya çapında ilham veren bir isim oldu." },
    foreign: { name: "Hippocrates", era: "MÖ 460 - MÖ 370", trait: "Etik, gözlem, temel tıp yaklaşımı", story: "Tıp tarihinin en bilinen öncü figürlerinden biri olarak hekimlik anlayışını derinden etkiledi." }
  },
  "Diş Hekimi": {
    turkish: { name: "Sami Ulus", era: "1884 - 1954", trait: "Titizlik, sağlık odağı, sorumluluk", story: "Sağlık alanında etkili çalışmalarıyla öne çıkan öncü hekimlerden biri olarak anılır." },
    foreign: { name: "Pierre Fauchard", era: "1678 - 1761", trait: "Yenilik, detaycılık, uzmanlaşma", story: "Modern diş hekimliğinin kurucu isimlerinden biri kabul edilir." }
  },
  "Eczacı": {
    turkish: { name: "Besim Ömer Akalın", era: "1862 - 1940", trait: "Bilimsel yaklaşım, sağlık bilgisi, disiplin", story: "Sağlık alanında eğitim ve bilgi yayılımına katkılarıyla öne çıkan isimlerden biri oldu." },
    foreign: { name: "Tu Youyou", era: "1930 - Günümüz", trait: "Araştırma, sabır, ilaç geliştirme", story: "İlaç ve sağlık araştırmaları alanında Nobel ödülü kazanarak ilham verdi." }
  },
  "Akademisyen": {
    turkish: { name: "Aziz Sancar", era: "1946 - Günümüz", trait: "Disiplin, bilimsel merak, sabır", story: "Nobel ödüllü Türk bilim insanı olarak akademik üretimin küresel etkisini gösterdi." },
    foreign: { name: "Marie Curie", era: "1867 - 1934", trait: "Azim, araştırma tutkusu, bilimsel cesaret", story: "Bilim tarihinin en etkili akademik figürlerinden biri olarak iki Nobel ödülü aldı." }
  },
  "Hukukçu (Avukat)": {
    turkish: { name: "Süreyya Ağaoğlu", era: "1903 - 1989", trait: "Kararlılık, öncülük, cesaret", story: "Türkiye'nin ilk kadın avukatlarından biri olarak hukuk alanında öncü bir isim oldu." },
    foreign: { name: "Ruth Bader Ginsburg", era: "1933 - 2020", trait: "Adalet duygusu, analitik düşünme, dayanıklılık", story: "Hukuk alanında eşitlik mücadelesiyle küresel ölçekte ilham veren bir isim haline geldi." }
  },
  "Öğretmen": {
    turkish: { name: "Hasan Âli Yücel", era: "1897 - 1961", trait: "Eğitim vizyonu, sabır, toplumsal katkı", story: "Eğitim alanında uzun vadeli düşünmenin ve kültürel gelişimin güçlü temsilcilerinden biri oldu." },
    foreign: { name: "Maria Montessori", era: "1870 - 1952", trait: "Öğrenci odağı, sabır, yenilikçilik", story: "Öğretim yöntemlerine getirdiği yeni bakışla eğitim dünyasında kalıcı etki bıraktı." }
  },
  "Gazeteci": {
    turkish: { name: "Uğur Mumcu", era: "1942 - 1993", trait: "Cesaret, araştırma, yazma gücü", story: "Araştırmacı gazeteciliğin Türkiye'deki en ilham verici isimlerinden biri oldu." },
    foreign: { name: "Oriana Fallaci", era: "1929 - 2006", trait: "Sorgulama, cesaret, anlatım gücü", story: "Gazetecilikte derinlemesine röportajlarıyla dünya çapında iz bırakan bir isim oldu." }
  },
  "Fotoğrafçı": {
    turkish: { name: "Ara Güler", era: "1928 - 2018", trait: "Gözlem, hikâye anlatımı, estetik bakış", story: "Fotoğrafla şehirleri ve insan hikâyelerini hafızaya dönüştüren en etkili isimlerden biri oldu." },
    foreign: { name: "Annie Leibovitz", era: "1949 - Günümüz", trait: "Yaratıcılık, kadraj gücü, anlatım", story: "Portre ve görsel anlatım alanında dünya çapında etkili işler üretti." }
  },
  "Müzisyen": {
    turkish: { name: "Fazıl Say", era: "1970 - Günümüz", trait: "Disiplin, yaratıcılık, ifade gücü", story: "Müzik alanında üretimi ve yorumculuğuyla Türkiye'den çıkan en ilham verici isimlerden biri oldu." },
    foreign: { name: "Ludwig van Beethoven", era: "1770 - 1827", trait: "Azim, yaratıcılık, duygusal derinlik", story: "Müzik tarihinde üretim gücü ve kalıcı eserleriyle en büyük ilham kaynaklarından biri kabul edilir." }
  }
};

function calculateFutureScore(careerTitle) {
  const factors = CAREER_FUTURE_FACTORS[careerTitle];
  if (!factors || !factors.length) return 75;
  return Math.round(factors.reduce((sum, value) => sum + value, 0) / factors.length * 10);
}

function getFutureScoreDetails(careerTitle) {
  const factors = CAREER_FUTURE_FACTORS[careerTitle] || [];
  return FUTURE_SCORE_CRITERIA.map((label, index) => ({
    label,
    value: factors[index] || 0
  }));
}

function getFutureScoreExplanation(careerTitle) {
  const details = getFutureScoreDetails(careerTitle);
  return `Bu gelecek yüzdesi şu 10 kritere göre hesaplandı: ${details.map(item => `${item.label} (${item.value}/10)`).join(", ")}.`;
}

function enrichCareerData(career) {
  const baseCareer = ALL_CAREERS.find(item => item.title === career.title) || {};
  const score = calculateFutureScore(career.title);
  return {
    ...baseCareer,
    ...career,
    salaryRange: career.salaryRange || career.salary || baseCareer.salary || "Bilgi yakında",
    futureScore: score,
    futureScoreExplanation: getFutureScoreExplanation(career.title),
    futureCriteriaDetails: getFutureScoreDetails(career.title)
  };
}

function getLinkedInSearchUrl(careerTitle) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(careerTitle)}`;
}

// RIASEC tipine göre meslekleri filtrele
function getCareersByRIASEC(scores) {
  const topTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 2).map(e => e[0]);
  const scoredCareers = ALL_CAREERS.map(career => {
    let matchScore = 0;
    career.riasecMatch.forEach(type => { if (topTypes.includes(type)) matchScore += scores[type] || 0; });
    return { ...career, matchScore: matchScore + (Math.random() * 10) };
  });
  const topCareers = scoredCareers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
  return topCareers.sort(() => 0.5 - Math.random()).slice(0, 3).map(enrichCareerData);
}

function getYouTubeSearchUrl(careerTitle) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(careerTitle + " day in the life vlog Türkçe")}`;
}

const appState = {
  questions: [], currentIndex: 0, selectedOptionIndex: null, userName: "",
  scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
  selectedCareer: null, riasecChart: null, chatHistory: [], currentCase: null
};

// UI Elements
const ui = {
  greetingScreen: document.getElementById("greeting-screen"), landingScreen: document.getElementById("landing-screen"),
  testScreen: document.getElementById("test-screen"), loadingScreen: document.getElementById("loading-screen"),
  resultsScreen: document.getElementById("results-screen"), nameStep: document.getElementById("name-step"),
  nameInput: document.getElementById("name-input"), saveNameBtn: document.getElementById("save-name-btn"),
  dailyInspiration: document.getElementById("daily-inspiration"), resultsContainer: document.getElementById("results-container"),
  progressFill: document.getElementById("progress-fill"), questionCounter: document.getElementById("question-counter"),
  questionText: document.getElementById("question-text"), optionsContainer: document.getElementById("options-container"),
  nextBtn: document.getElementById("next-btn"), notesInput: document.getElementById("notes-input"),
  notesFolderSelect: document.getElementById("notes-folder-select"), notesStatus: document.getElementById("notes-status"),
  portraitModal: document.getElementById("portrait-modal"), portraitImg: document.getElementById("portrait-img"),
  portraitLoading: document.getElementById("portrait-loading"), portraitSubtitle: document.getElementById("portrait-subtitle"),
  portraitPromptOutput: document.getElementById("portrait-prompt-output"), copyPortraitPromptBtn: document.getElementById("copy-portrait-prompt-btn"),
  visionBoardPreview: document.getElementById("vision-board-preview"), chatMessages: document.getElementById("chat-messages"),
  chatInput: document.getElementById("chat-input"), chatSendBtn: document.getElementById("chat-send-btn"),
  mentorWebhookInput: document.getElementById("mentor-webhook-input"),
  saveMentorWebhookBtn: document.getElementById("save-mentor-webhook-btn"),
  resetMentorWebhookBtn: document.getElementById("reset-mentor-webhook-btn"),
  mentorWebhookStatus: document.getElementById("mentor-webhook-status"),
  simulationText: document.getElementById("simulation-text"), simulationCards: document.getElementById("simulation-cards"),
  simulationPromptPanel: document.getElementById("simulation-prompt-panel"),
  simulationPromptOutput: document.getElementById("simulation-prompt-output"),
  simulationSelectedTitle: document.getElementById("simulation-selected-title"),
  simulationFeedback: document.getElementById("simulation-feedback"),
  openGeminiCaseBtn: document.getElementById("open-gemini-case-btn"),
  copyGeminiCaseBtn: document.getElementById("copy-gemini-case-btn"),
  youtubeVlogs: document.getElementById("youtube-vlogs"), successStories: document.getElementById("success-stories")
};

async function postJSON(path, payload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "AI servisine ulasilamadi.");
  }

  return data;
}

function isQuotaError(message = "") {
  return /quota|billing|rate limit|insufficient/i.test(message);
}

function saveChatHistory() {
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(appState.chatHistory.slice(-20)));
}

function loadChatHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(CHAT_HISTORY_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter(item => item && item.role && item.content) : [];
  } catch {
    return [];
  }
}

function getAiMailWorkflowUrl() {
  return localStorage.getItem(AI_MENTOR_WEBHOOK_KEY) || DEFAULT_MENTOR_WEBHOOK_URL;
}

function setAiMailWorkflowUrl(url) {
  localStorage.setItem(AI_MENTOR_WEBHOOK_KEY, url);
}

function clearAiMailWorkflowUrl() {
  localStorage.removeItem(AI_MENTOR_WEBHOOK_KEY);
}

function syncMentorWebhookUI() {
  const savedUrl = getAiMailWorkflowUrl();
  if (ui.mentorWebhookInput) {
    ui.mentorWebhookInput.value = savedUrl;
  }
  if (ui.mentorWebhookStatus) {
    ui.mentorWebhookStatus.textContent = savedUrl
      ? "Webhook hazır. İstersen bu adresi değiştirebilirsin, değiştirmezsen mentor bu kayıtlı adresle çalışır."
      : "Mentorun çalışması için webhook adresini bir kez girmen gerekir.";
  }
}

function getSelectedCareerData() {
  return ALL_CAREERS.find(item => item.title === appState.selectedCareer?.title) || appState.selectedCareer || null;
}

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

function normalizeAiDisplayText(text = "") {
  return String(text)
    .replace(/\*\*/g, "")
    .replace(/�/g, "")
    .replace(/Ã§/g, "ç")
    .replace(/Ãœ/g, "Ü")
    .replace(/Ã¼/g, "ü")
    .replace(/Ã–/g, "Ö")
    .replace(/Ã¶/g, "ö")
    .replace(/ÄŸ/g, "ğ")
    .replace(/Äž/g, "Ğ")
    .replace(/ÅŸ/g, "ş")
    .replace(/Åž/g, "Ş")
    .replace(/Ä±/g, "ı")
    .replace(/Ä°/g, "İ")
    .replace(/Pi\uFFFDman/g, "Pişman")
    .replace(/mesle\uFFFDi/g, "mesleği")
    .replace(/de\uFFFDer/g, "değer")
    .replace(/geli\uFFFDir/g, "geliştir")
    .replace(/s\uFFFDrekli/g, "sürekli")
    .replace(/do\uFFFDrudan/g, "doğrudan")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildFallbackCareerReply(message) {
  const careerData = getSelectedCareerData();
  const career = careerData?.title || "seçtiğin meslek";
  const lowerMessage = normalizeText(message);
  const recentAssistantText = normalizeText([...appState.chatHistory].reverse().find(item => item.role === "assistant")?.content || "");

  const typeHints = {
    teknoloji: ["analitik düşünme", "proje geliştirme", "sürekli öğrenme"],
    "saglik & sosyal": ["empati", "sorumluluk", "insanlarla iletişim"],
    saglik: ["disiplin", "dikkat", "insan odaklılık"],
    "sanat & tasarim": ["yaratıcılık", "portfolyo", "gözlem gücü"],
    sanat: ["yaratıcılık", "pratik", "kendini ifade etme"],
    "is & yonetim": ["iletişim", "planlama", "karar verme"],
    muhendislik: ["problem çözme", "matematik", "sistem düşüncesi"],
    egitim: ["sabır", "anlatım gücü", "insan gelişimine ilgi"],
    hukuk: ["ikna", "okuma-yazma gücü", "detay dikkati"],
    medya: ["merak", "hikaye anlatımı", "hızlı düşünme"],
    mimarlik: ["estetik bakış", "teknik çizim", "mekansal düşünce"]
  };
  const strengths = typeHints[normalizeText(careerData?.type || "")] || ["merak", "çalışma disiplini", "gelişim isteği"];

  if ((lowerMessage === "cikar" || lowerMessage === "cikart" || lowerMessage === "cikarir misin" || lowerMessage === "tamam" || lowerMessage === "evet") && recentAssistantText.includes("6 adimlik bir hazirlik plani")) {
    return `${career} için yurt dışı hazırlık planı: 1. İngilizce seviyeni güçlendir. 2. Bu alana uygun gönüllülük, staj veya gözlem deneyimi biriktir. 3. Kendini anlatan güçlü bir CV ve LinkedIn profili hazırla. 4. Hedef ülkelerde denklik ve eğitim koşullarını araştır. 5. Hocalar, uzmanlar ve mezunlarla network kur. 6. Başvuru tarihlerini, dil sınavlarını ve belge takvimini erkenden planla. İstersen bunları lise öğrencisi için aylık plana da çevirebilirim.`;
  }

  if ((lowerMessage === "cikar" || lowerMessage === "cikart" || lowerMessage === "anlat" || lowerMessage === "devam") && recentAssistantText.includes("arti yonler")) {
    return `${career} için daha net bakalım: seni öne taşıyacak kısımlar insanlarla bağ kurma, sabırlı çalışma ve uzmanlaşma ile güven verme tarafları olur. Zorlayabilecek kısımlar ise duygusal yük, uzun eğitim süreci ve bazen belirsizlikle başa çıkma gerekliliğidir. İstersen şimdi bunu "bana uygun mu" penceresinden değerlendirelim.`;
  }

  if (lowerMessage.includes("mini test") || lowerMessage.includes("test yap")) {
    return `${career} için mini test: 1) İnsanlarla iletişim kurmak sana enerji veriyor mu? 2) Bu mesleğin zorlu günlerinde bile öğrenmeye devam eder misin? 3) ${strengths[0]} ve ${strengths[1]} tarafın sende var mı? Üçüne de evet diyorsan bu alan sana daha yakın olabilir.`;
  }

  if (lowerMessage.includes("alt kol") || lowerMessage.includes("uzmanlik") || lowerMessage.includes("hangi alan") || lowerMessage.includes("alanlari var")) {
    if (career.toLowerCase().includes("hukuk") || career.toLowerCase().includes("avukat")) {
      return `Hukukta ceza hukuku, medeni hukuk, aile hukuku, iş hukuku, ticaret hukuku, şirketler hukuku, idare hukuku, insan hakları hukuku ve bilişim hukuku gibi alt alanlar var. Daha hareketli alanlar da var, daha evrak ve analiz ağırlıklı alanlar da. İstersen bunları "hangisi daha sosyal, hangisi daha analitik" diye karşılaştırayım.`;
    }
    if (career.toLowerCase().includes("psikolog")) {
      return `${career} için klinik psikoloji, çocuk ve ergen çalışmaları, aile-çift terapisi, travma, bağımlılık, okul psikolojisi ve test-değerlendirme gibi alt alanlar vardır. Bazı alanlar daha yoğun insan iletişimi ister, bazıları daha çok analiz ve ölçüm odaklıdır. İstersen bunları senin kişiliğine göre karşılaştırayım.`;
    }
    return `${career} için de farklı alt uzmanlık alanları olabilir. Genelde uygulama odaklı, araştırma odaklı ve insanlarla birebir çalışma odaklı kollar ortaya çıkar. İstersen bu meslek için olası alt alanları sana tek tek ayırayım.`;
  }

  if (lowerMessage.includes("hadi") || lowerMessage.includes("cikaralim") || lowerMessage.includes("devam") || lowerMessage.includes("anlat")) {
    return `${career} için artı yönler: ${strengths[0]}, ${strengths[1]} ve gerçek hayatta etki yaratma fırsatı. Zor taraflar: tempo, rekabet ve bazen belirsizlik. Eğer istersen şimdi bunu "bana uygun mu", "hangi dersler önemli" ya da "5 yıllık yol haritası" olarak daha da açabiliriz.`;
  }

  if (lowerMessage.includes("uygun mu") || lowerMessage.includes("bana uygun")) {
    return `${career} sana daha uygun olabilir eğer ${strengths[0]} ve ${strengths[1]} tarafın kuvvetliyse, bu alanın günlük yapısına ilgi duyuyorsan ve uzun süre emek vermeye razıysan. Sana zor gelebilecek kısımlar ise stres, sabır isteyen süreçler ve sürekli kendini güncel tutma ihtiyacı olabilir. İstersen seni daha iyi anlamak için 3 kısa soru sorup daha net yorum da yapabilirim.`;
  }

  if (lowerMessage.includes("maas") || lowerMessage.includes("ucret") || lowerMessage.includes("kazan")) {
    return `${career} icin maas seviyesi deneyim, sehir, kurum ve uzmanlasilan alt alana gore degisir. Baslangicta temel deneyim biriktirmek, sonra portfolyo ya da proje gucu kazanmak maasi daha hizli etkiler. Istersen junior seviyeden uzmanlige kadar nasil ilerlenir onu da anlatayim.`;
  }

  if (lowerMessage.includes("yurt disi") || lowerMessage.includes("yurt") || lowerMessage.includes("dis")) {
    return `${career} alanında yurt dışı şansı vardır ama genelde İngilizce, portfolyo veya somut beceri gösterimi belirleyici olur. LinkedIn, uluslararası stajlar ve online sertifikalar iyi başlangıç noktası olur. İstersen sana yurt dışı için 6 adımlık bir hazırlık planı çıkarayım.`;
  }

  if (lowerMessage.includes("ders") || lowerMessage.includes("calis") || lowerMessage.includes("hangi ders")) {
    return `${career} için önce okul derslerinde sağlam temel kurmak önemli. Sonra bu alana yakın becerileri küçük projeler, kulüp çalışmaları ve araştırmalarla desteklemek seni önde tutar. İstersen sana lise öğrencisi için haftalık mini çalışma planı hazırlayabilirim.`;
  }

  if (lowerMessage.includes("yapay zeka") || lowerMessage.includes("ai") || lowerMessage.includes("yok eder")) {
    return `${career} tamamen yok olmayabilir ama yapılış şekli değişebilir. Rutin kısımlarda yapay zeka destek verir; buna karşın insan yargısı, iletişim, etik kararlar ve sahaya özel yorum gücü hâlâ çok önemli kalır. Bu yüzden kendini sadece bilgiyle değil ${strengths[0]} ve ${strengths[2]} taraflarında da güçlendirmen iyi olur.`;
  }

  if (lowerMessage.includes("arti") || lowerMessage.includes("eksi") || lowerMessage.includes("zor")) {
    return `${career} icin arti yonler: gelisim alani genis, kendini gosterebilecegin alanlar var ve ${careerData?.description || "uretim yapma"} tarzi bir gunluk is yapisi sunuyor. Zor yonler ise zaman baskisi, rekabet ve duzenli pratik istemesi. Istersen bunlari senin karakterine gore tek tek eslestirelim.`;
  }

  if (lowerMessage.includes("5 yil") || lowerMessage.includes("yol harita") || lowerMessage.includes("plan")) {
    return `${career} icin basit yol haritasi: 1. yil temel bilgi ve merak alani, 2. yil kucuk proje ve gozlem, 3. yil portfolyo ya da deneyim biriktirme, 4. yil uzmanlasacagin alt alani secme, 5. yil ise guclu basvurular ve network kurma. Istersen bunu lise ogrencisine uygun daha detayli hale getireyim.`;
  }

  return `${career} hakkında seninle uzun uzun sohbet edebilirim. Bu meslekte neler yapıldığını, hangi derslerin önemli olduğunu, sana uygun olup olmadığını, maaşını, zorluklarını ve geleceğini birlikte konuşabiliriz. İstersen bir yerden başlayalım: "bana uygun mu", "maaşı nasıl", "günlük hayatı nasıl" ya da "AI etkiler mi?" diye sorabilirsin.`;
}

function buildFallbackCase(job) {
  return {
    title: `${job} Mini Case`,
    scenario: `${job} rolünde ilk haftandasın. Sana küçük ama önemli bir problem geliyor ve hem sakin kalman hem de doğru önceliklendirme yapman bekleniyor.`,
    task: "Bu durumda ilk olarak ne yapacağını ve nedenini 3-5 cümleyle açıkla."
  };
}

function buildCrisisSimulations(job) {
  const careerSpecificScenarios = {
    "Yazılım Geliştirici": [
      { title: "Canlıda Hata", scenario: "Yeni sürüm yayına çıktıktan sonra ödeme ekranı hata vermeye başlıyor." },
      { title: "Kod Çakışması", scenario: "Ekipte iki farklı geliştirici aynı modülü farklı şekilde değiştirmiş." },
      { title: "Müşteri Baskısı", scenario: "Müşteri eksik test edilen özelliğin hemen yayına alınmasını istiyor." }
    ],
    "Veri Bilimcisi": [
      { title: "Kirli Veri", scenario: "Modeli eğitmek için gelen veri setinde çok sayıda eksik ve çelişkili kayıt var." },
      { title: "Yanlı Sonuç", scenario: "Hazırladığın analiz, belirli bir kullanıcı grubunu haksız biçimde etkiliyor olabilir." },
      { title: "Anlaşılmayan Rapor", scenario: "Yönetim ekibi hazırladığın teknik raporu anlamıyor ve hızlı karar bekliyor." }
    ],
    "Yapay Zeka Mühendisi": [
      { title: "Model Yanılıyor", scenario: "Geliştirdiğin model kritik örneklerde yanlış tahmin üretmeye başlıyor." },
      { title: "Etik Sorun", scenario: "AI sisteminin adil davranmadığına dair geri bildirim geliyor." },
      { title: "Maliyet Arttı", scenario: "Modeli çalıştırma maliyeti beklenenden çok daha yüksek çıktı." }
    ],
    "Siber Güvenlik Uzmanı": [
      { title: "Şüpheli Giriş", scenario: "Gece saatlerinde sistemde olağan dışı kullanıcı hareketleri görülüyor." },
      { title: "Fidye Riski", scenario: "Bir çalışanın bilgisayarında zararlı yazılım belirtisi fark ediliyor." },
      { title: "Açık Bulundu", scenario: "Müşteri verisine erişilebilecek ciddi bir güvenlik açığı tespit edildi." }
    ],
    "Psikolojik Danışman": [
      { title: "Güven Kaybı", scenario: "Danışanın sana güveni sarsılmış gibi görünüyor ve konuşmak istemiyor." },
      { title: "Aile Baskısı", scenario: "Aile, danışanın söylediklerini senden öğrenmek istiyor." },
      { title: "Acil Yönlendirme", scenario: "Danışanın desteğinin okul ortamını aşabileceğini düşündüren işaretler var." }
    ],
    "Klinik Psikolog": [
      { title: "Seans Krizi", scenario: "Seans sırasında danışan yoğun bir duygusal çöküş yaşıyor." },
      { title: "Sınır İhlali", scenario: "Danışan seans dışı saatlerde sürekli sana ulaşmaya başlıyor." },
      { title: "Yanlış Yorum Riski", scenario: "Yaptığın değerlendirme notlarının yanlış anlaşılma ihtimali ortaya çıkıyor." }
    ],
    "Endüstriyel Tasarımcı": [
      { title: "Üretilemeyen Tasarım", scenario: "Çok beğenilen tasarımın fabrikada üretilemeyecek kadar karmaşık çıktı." },
      { title: "Müşteri Fikri Değişti", scenario: "Sunuma saatler kala müşteri tasarım yönünü tamamen değiştirmek istiyor." },
      { title: "Kullanıcı Sorunu", scenario: "Ürün estetik duruyor ama kullanıcı testlerinde rahat bulunmuyor." }
    ],
    "Grafik Tasarımcı": [
      { title: "Marka Krizi", scenario: "Hazırladığın görsel, markanın kimliğiyle uyumsuz bulunuyor." },
      { title: "Son Dakika Revize", scenario: "Teslime çok az kala tüm afiş tasarımını yeniden düzenlemen isteniyor." },
      { title: "Benzer İş Tartışması", scenario: "Tasarladığın işin başka bir markaya fazla benzediği söyleniyor." }
    ],
    "Mimari Restorasyon Uzmanı": [
      { title: "Tarihi Doku Riski", scenario: "Yapının onarımında kullanılan malzeme özgün yapıya zarar verebilir." },
      { title: "Belgesiz Müdahale", scenario: "Daha önce yapıya kayıt dışı müdahale edildiği ortaya çıkıyor." },
      { title: "Bütçe Kısıtı", scenario: "Koruma standartlarını düşürmeden daha düşük maliyet isteniyor." }
    ],
    "Mimar": [
      { title: "Ruhsat Sorunu", scenario: "Hazırlanan proje yerel yönetmelikle tam uyumlu görünmüyor." },
      { title: "Müşteri Çatışması", scenario: "Müşteri estetik istiyor ama alan güvenliği risk altına giriyor." },
      { title: "Şantiye Değişikliği", scenario: "Uygulama sırasında projede zorunlu değişiklik yapılması gerekiyor." }
    ],
    "Dijital Pazarlama Uzmanı": [
      { title: "Kampanya Tutmadı", scenario: "Büyük bütçeli reklam kampanyası beklenen dönüşü getirmedi." },
      { title: "Yorum Krizi", scenario: "Markaya karşı sosyal medyada olumsuz yorumlar hızla artıyor." },
      { title: "Yanlış Hedefleme", scenario: "Reklamlar yanlış kitleye gösterildiği için bütçe boşa gidiyor." }
    ],
    "İnsan Kaynakları Uzmanı": [
      { title: "Yanlış İşe Alım", scenario: "Yeni işe alınan kişinin pozisyona uygun olmadığı kısa sürede anlaşılıyor." },
      { title: "Ekip Gerilimi", scenario: "Aynı ekipteki iki çalışan arasında ciddi iletişim problemi var." },
      { title: "Gizlilik Sorunu", scenario: "Aday değerlendirme notlarının yanlış kişilere gittiği fark ediliyor." }
    ],
    "Proje Yöneticisi": [
      { title: "Takvim Sarktı", scenario: "Projede kritik teslim tarihi yaklaşıyor ama ekip geri kaldı." },
      { title: "Kaynak Yetmiyor", scenario: "Bütçe ve insan kaynağı aynı anda yetersiz hale geliyor." },
      { title: "Paydaş Baskısı", scenario: "Farklı yöneticiler projeden birbirine zıt beklentiler istiyor." }
    ],
    "Mekatronik Mühendisi": [
      { title: "Robot Hatası", scenario: "Üretim hattındaki robot beklenmedik biçimde durmaya başladı." },
      { title: "Sensör Sorunu", scenario: "Sistem yanlış veri okuduğu için hareketler hatalı gerçekleşiyor." },
      { title: "Güvenlik Riski", scenario: "Otomasyon sistemi çalışan güvenliği açısından risk oluşturuyor olabilir." }
    ],
    "Biyomedikal Mühendisi": [
      { title: "Cihaz Arızası", scenario: "Hastanede kullanılan bir cihaz kritik anda hatalı sonuç vermeye başlıyor." },
      { title: "Kalibrasyon Sorunu", scenario: "Cihazın ölçümlerinin standarttan saptığı fark ediliyor." },
      { title: "Kullanım Eğitimi Eksik", scenario: "Sağlık personeli cihazı doğru kullanmadığı için hata oranı artıyor." }
    ],
    "Çevre Mühendisi": [
      { title: "Kirlilik Uyarısı", scenario: "Tesiste beklenmedik bir atık sızıntısı ihtimali ortaya çıktı." },
      { title: "Denetim Yaklaşıyor", scenario: "Çevre denetimi öncesi kayıtların eksik olduğu fark edildi." },
      { title: "Toplum Tepkisi", scenario: "Bölge halkı projenin çevreye zarar vereceğini düşünerek tepki gösteriyor." }
    ],
    "Doktor (Tıp)": [
      { title: "Yanlış Öncelik Riski", scenario: "Acil serviste aynı anda birden fazla kritik hasta geliyor." },
      { title: "Hasta Yakını Baskısı", scenario: "Hasta yakını senden hemen ve kesin cevap bekliyor." },
      { title: "Eksik Bilgi", scenario: "Tanı için gerekli veriler eksik ama hızlı karar vermen gerekiyor." }
    ],
    "Diş Hekimi": [
      { title: "Hasta Panikledi", scenario: "Tedavi sırasında hasta korkup işlemi yarıda bırakmak istiyor." },
      { title: "Randevu Sıkıştı", scenario: "Acil gelen hasta yüzünden tüm günlük plan bozuluyor." },
      { title: "Beklenmedik Komplikasyon", scenario: "Basit görünen işlem sırasında beklenmeyen bir sorun gelişiyor." }
    ],
    "Eczacı": [
      { title: "İlaç Etkileşimi", scenario: "Hastanın almak istediği ilaçların birlikte risk yaratabileceği fark ediliyor." },
      { title: "Stok Tükendi", scenario: "Sık sorulan kritik bir ilacın stoğu aniden bitiyor." },
      { title: "Yanlış Reçete Şüphesi", scenario: "Reçetedeki doz bilgisinin hatalı olabileceğini düşünüyorsun." }
    ],
    "Hukukçu (Avukat)": [
      { title: "Delil Geç Geldi", scenario: "Duruşmaya kısa süre kala davayı etkileyebilecek yeni bir belge geliyor." },
      { title: "Etik Baskı", scenario: "Müvekkil senden doğru olmayan bir bilgiyi öne çıkarmanı istiyor." },
      { title: "Strateji Çatışması", scenario: "Dosyadaki yeni gelişmeler savunma stratejisini tamamen değiştiriyor." }
    ],
    "Öğretmen": [
      { title: "Sınıf Dağıldı", scenario: "Ders sırasında sınıf kontrolünü kaybetmeye başladığını hissediyorsun." },
      { title: "Öğrenci Geri Çekildi", scenario: "Başarılı bir öğrenci son haftalarda belirgin şekilde içine kapanıyor." },
      { title: "Veli Şikayeti", scenario: "Bir veli notlandırma konusunda sana sert bir itirazda bulunuyor." }
    ],
    "Akademisyen": [
      { title: "Makale Reddi", scenario: "Uzun süredir hazırladığın çalışma önemli bir dergiden reddedildi." },
      { title: "Etik İnceleme", scenario: "Araştırma verilerinin toplanma biçimiyle ilgili soru işaretleri oluştu." },
      { title: "Ders-Araştırma Dengesi", scenario: "Yoğun ders yükü yüzünden araştırma takvimi ciddi biçimde aksıyor." }
    ],
    "Gazeteci": [
      { title: "Kaynak Güvenilir mi?", scenario: "Çok çarpıcı bir bilgiye ulaştın ama kaynağın tam güvenilir görünmüyor." },
      { title: "Baskı Altında Yayın", scenario: "Haberi hızlı girmen isteniyor ama doğrulama süreci tamamlanmadı." },
      { title: "Etik İkilem", scenario: "Haber kamu yararı taşıyor ama bir kişinin özel hayatını da etkileyebilir." }
    ],
    "Fotoğrafçı": [
      { title: "Ekipman Bozuldu", scenario: "Çekim günü en önemli ekipmanlardan biri çalışmamaya başladı." },
      { title: "Müşteri Memnun Değil", scenario: "Teslim ettiğin fotoğraflar müşterinin beklentisini tam karşılamadı." },
      { title: "Işık Kötüleşti", scenario: "Planlanan dış çekimde hava ve ışık bir anda bozuldu." }
    ],
    "Müzisyen": [
      { title: "Sahne Öncesi Sorun", scenario: "Performansa kısa süre kala teknik ekipmanlardan biri arızalandı." },
      { title: "Ekip Uyum Sorunu", scenario: "Grup üyeleri prova sırasında aynı yorumda buluşamıyor." },
      { title: "Beklenmedik Kitle", scenario: "Sahnedeki dinleyici kitlesi beklediğinden çok farklı tepki veriyor." }
    ]
  };

  const generic = [
    { title: "Zaman Baskısı", scenario: `${job} rolünde önemli bir işi kısa sürede tamamlaman bekleniyor.` },
    { title: "İletişim Gerilimi", scenario: `${job} rolünde birlikte çalıştığın kişiler arasında iletişim sorunu çıkıyor.` },
    { title: "Beklenmedik Problem", scenario: `${job} rolünde plan dışı bir sorun ortaya çıkıyor ve çözüm üretmen gerekiyor.` }
  ];

  return (careerSpecificScenarios[job] || generic).map((item, index) => ({
    ...item,
    id: `${normalizeText(job)}-${index + 1}`,
    prompt: `Sen benim kariyer mentorumsun. ${job} rolü için şu kriz senaryosunu benimle adım adım tartış.\n\nSenaryo: ${item.scenario}\n\nBenden önce bu durumda iyi bir yaklaşım nasıl kurulur onu sorularla düşündür. Sonra benim çözümümü değerlendir. Cevaplarını Türkçe ver ve sohbeti mentorluk gibi sürdür.`
  }));
}

function renderCrisisSimulations(job) {
  if (!ui.simulationCards || !ui.simulationText) return;
  const cards = buildCrisisSimulations(job);
  ui.simulationText.textContent = `${job} için hazırlanmış 3 kriz senaryosu aşağıda. Birine tıklayıp kendi Gemini hesabında derinleştirebilirsin.`;
  ui.simulationCards.innerHTML = cards.map(card => `
    <button type="button" class="simulation-card rounded-xl border border-black/15 bg-[#fffdf8] p-4 text-left transition hover:border-[#8c6a43] hover:bg-[#faf0e6]" data-id="${card.id}">
      <p class="text-sm font-semibold text-ink">${card.title}</p>
      <p class="mt-2 text-sm text-smoke">${card.scenario}</p>
    </button>
  `).join("");

  document.querySelectorAll(".simulation-card").forEach((button, index) => {
    button.onclick = () => selectCrisisSimulation(cards[index]);
  });
}

function selectCrisisSimulation(simulation) {
  appState.currentCase = simulation;
  document.querySelectorAll(".simulation-card").forEach(card => card.classList.remove("ring-2", "ring-[#8c6a43]"));
  document.querySelector(`[data-id="${simulation.id}"]`)?.classList.add("ring-2", "ring-[#8c6a43]");
  if (ui.simulationPromptPanel) ui.simulationPromptPanel.classList.remove("hidden");
  if (ui.simulationSelectedTitle) ui.simulationSelectedTitle.textContent = simulation.title;
  if (ui.simulationPromptOutput) ui.simulationPromptOutput.value = simulation.prompt;
  if (ui.simulationFeedback) ui.simulationFeedback.textContent = "Prompt hazır. İstersen kopyalayıp Gemini'de devam et, istersen tek tuşla yeni sekmede aç.";
}

function openGeminiForCase() {
  const prompt = ui.simulationPromptOutput?.value?.trim();
  if (!prompt) return;
  navigator.clipboard.writeText(prompt).catch(() => {});
  window.open("https://gemini.google.com/app", "_blank", "noopener,noreferrer");
  if (ui.simulationFeedback) {
    ui.simulationFeedback.textContent = "Gemini yeni sekmede açıldı. Prompt panoya kopyalandı; Gemini'ye yapıştırıp konuşmaya devam edebilirsin.";
  }
}

function buildImagePrompt(job) {
  const careerData = ALL_CAREERS.find(item => item.title === job);
  const vibeByType = {
    teknoloji: "modern workspace, laptop screens, clean desk, natural light, innovative atmosphere",
    "saglik & sosyal": "warm counseling room, soft daylight, calm atmosphere, human-centered environment",
    saglik: "clean clinical setting, professional tools, bright light, trustworthy atmosphere",
    "sanat & tasarim": "creative studio, sketches, color palette, inspiring lighting, stylish atmosphere",
    sanat: "artistic studio, expressive composition, cinematic lighting, creative mood",
    "is & yonetim": "modern office, meeting board, confident posture, organized desk, professional atmosphere",
    muhendislik: "technical lab or workshop, precise tools, structured environment, realistic details",
    egitim: "classroom or study space, books, board, warm and inspiring teaching environment",
    hukuk: "elegant office, bookshelves, formal setting, confident and serious atmosphere",
    medya: "newsroom or field reporting setup, microphone, notebook, dynamic energy",
    mimarlik: "architectural studio, plans, scale models, sunlight, refined design atmosphere"
  };
  const normalizedType = normalizeText(careerData?.type || "");
  const visualVibe = vibeByType[normalizedType] || "realistic professional setting, detailed environment, natural cinematic light";

  return `Create a realistic, inspiring portrait of a young professional working as a ${job}. Show the profession clearly through environment, tools, clothing, and body language. Style: photorealistic, warm natural lighting, high detail, cinematic but believable. Scene details: ${visualVibe}. Avoid text, watermark, logo, extra fingers, blurry face, distorted anatomy, or unrealistic proportions.`;
}

function showScreen(screenId) {
  ["greeting", "landing", "test", "loading", "results"].forEach(s => {
    document.getElementById(s + "-screen")?.classList.add("hidden");
  });
  document.getElementById(screenId + "-screen")?.classList.remove("hidden");

  const introButton = document.getElementById("intro-open-btn");
  const notesButton = document.getElementById("drawer-open-btn");
  const shouldHideFloatingButtons = screenId === "results";

  if (introButton) introButton.classList.toggle("hidden", shouldHideFloatingButtons);
  if (notesButton) notesButton.classList.toggle("hidden", shouldHideFloatingButtons);
}

function onSaveName() {
  const name = ui.nameInput.value.trim();
  if (!name) { alert("Lütfen ismini gir."); return; }
  appState.userName = name;
  localStorage.setItem(USER_NAME_KEY, name);
  alert(`✨ Hoş geldin ${name}! ✨\n\nSeni kariyer yolculuğunda AI destekli rehberimle tanıştırayım. Testi çözerek sana en uygun meslekleri keşfedelim.`);
  showScreen("landing");
}

function resetUserName() {
  localStorage.removeItem(USER_NAME_KEY);
  localStorage.removeItem(NOTES_FOLDER_MODEL_KEY);
  appState.userName = "";
  appState.chatHistory = [];
  saveChatHistory();
  if (ui.chatMessages) ui.chatMessages.innerHTML = "";
  if (ui.nameInput) ui.nameInput.value = "";
  if (ui.notesInput) ui.notesInput.value = "";
  if (ui.notesStatus) ui.notesStatus.textContent = "";
  initNotes();
  showScreen("greeting");
}

function startTest() {
  appState.currentIndex = 0;
  appState.scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  appState.selectedOptionIndex = null;
  appState.selectedCareer = null;
  appState.currentCase = null;
  appState.chatHistory = [];
  saveChatHistory();
  if (ui.chatMessages) ui.chatMessages.innerHTML = "";
  if (window.QUESTIONS_DATA?.mainQuestions) appState.questions = [...window.QUESTIONS_DATA.mainQuestions];
  showScreen("test");
  renderQuestion();
}

function renderQuestion() {
  if (!appState.questions.length || appState.currentIndex >= appState.questions.length) return;
  const q = appState.questions[appState.currentIndex];
  ui.questionText.textContent = q.text;
  ui.questionCounter.textContent = `Soru ${appState.currentIndex + 1}/${appState.questions.length}`;
  const percent = ((appState.currentIndex + 1) / appState.questions.length) * 100;
  ui.progressFill.style.width = `${percent}%`;
  document.getElementById("progress-percent").textContent = `%${Math.round(percent)}`;
  ui.optionsContainer.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "w-full rounded-xl border border-black/20 bg-white p-4 text-left transition hover:bg-[#f7f1e6]";
    btn.textContent = opt.text;
    btn.onclick = () => {
      document.querySelectorAll("#options-container button").forEach(b => {
        b.classList.remove("bg-[#1f1f1f]", "text-[#faf0e6]", "border-[#8c6a43]", "ring-2", "ring-[#8c6a43]");
        b.classList.add("bg-white", "text-ink", "border-black/20");
      });
      btn.classList.remove("bg-white", "text-ink", "border-black/20");
      btn.classList.add("bg-[#1f1f1f]", "text-[#faf0e6]", "border-[#8c6a43]", "ring-2", "ring-[#8c6a43]");
      appState.selectedOptionIndex = idx;
      ui.nextBtn.disabled = false;
      ui.nextBtn.classList.remove("bg-black/20", "text-black/60");
      ui.nextBtn.classList.add("bg-black", "text-white");
    };
    ui.optionsContainer.appendChild(btn);
  });
}

async function handleNext() {
  if (appState.selectedOptionIndex === null) return;
  const choice = appState.questions[appState.currentIndex].options[appState.selectedOptionIndex];
  RIASEC_KEYS.forEach(k => { if (choice.scores[k]) appState.scores[k] += choice.scores[k]; });
  appState.currentIndex++;
  appState.selectedOptionIndex = null;
  ui.nextBtn.disabled = true;
  ui.nextBtn.classList.remove("bg-black", "text-white");
  ui.nextBtn.classList.add("bg-black/20", "text-black/60");
  if (appState.currentIndex < appState.questions.length) renderQuestion();
  else await finishTest();
}

async function finishTest() {
  showScreen("loading");
  const recommendedCareers = getCareersByRIASEC(appState.scores);

  try {
    const data = await postJSON("/api/analyze-careers", {
      scores: appState.scores,
      recommendedCareers
    });

    renderResults((data.careers || []).map(enrichCareerData));
    renderRIASECChart();
    showScreen("results");
    setupChatAfterResults();
  } catch(error) {
    console.error("AI Hatası, Fallback devrede:", error);
    const fallback = recommendedCareers.map(c => enrichCareerData({ 
      title: c.title, reason: c.description, salaryRange: c.salary, 
      futureScore: c.futureScore, aiRisk: "Düşük", futureOutlook: "Parlak" 
    }));
    renderResults(fallback);
    renderRIASECChart();
    showScreen("results");
    setupChatAfterResults();
  }
}

function renderResults(careers) {
  ui.resultsContainer.innerHTML = "";
  careers.forEach(c => {
    const safeReason = (c.reason || c.description || "Bu alan profilinle uyumlu görünüyor.").substring(0, 100);
    const card = document.createElement("div");
    card.className = "rounded-2xl border border-black/15 bg-[#fffaf2] p-4 shadow-sm cursor-pointer transition hover:shadow-md career-card";
    card.innerHTML = `<h3 class="text-base font-bold text-ink">${c.title}</h3><p class="text-xs mt-1 text-smoke">${safeReason}...</p><div class="mt-2 flex justify-between text-xs"><span>💰 ${c.salaryRange}</span><span>📈 ${c.futureScore}/100</span></div><div class="mt-1 h-1 w-full bg-black/10 rounded-full"><div class="h-full bg-bronze rounded-full" style="width:${c.futureScore}%"></div></div><p class="mt-2 text-[11px] leading-5 text-smoke">Bu gelecek yüzdesi 10 kritere göre hesaplandı.</p><button class="select-career-btn mt-2 w-full py-1 bg-black/10 text-xs rounded-lg">✅ Bu mesleği seç</button>`;
    const selectBtn = card.querySelector('.select-career-btn');
    selectBtn.onclick = (e) => {
      e.stopPropagation();
      resetCaseArea();
      appState.selectedCareer = c;
      prepareVisionBoard(c);
      updateYoutubeVlogs(c.title);
      updateSuccessStories(c.title);
      updateFamousPeople(c.title);
      renderCrisisSimulations(c.title);
      document.querySelectorAll("#results-container .rounded-2xl").forEach(card => card.classList.remove("ring-2", "ring-bronze"));
      card.classList.add("ring-2", "ring-bronze");
      addChatMessageToUI(`✨ ${c.title} mesleğini seçtin! Bu meslek hakkında sorularını sorabilirim.`, "bot");
    };
    card.onclick = () => {
      resetCaseArea();
      appState.selectedCareer = c;
      prepareVisionBoard(c);
      updateYoutubeVlogs(c.title);
      updateSuccessStories(c.title);
      updateFamousPeople(c.title);
      renderCrisisSimulations(c.title);
      document.querySelectorAll("#results-container .rounded-2xl").forEach(card => card.classList.remove("ring-2", "ring-bronze"));
      card.classList.add("ring-2", "ring-bronze");
    };
    ui.resultsContainer.appendChild(card);
  });
  if (careers[0]) {
    resetCaseArea();
    appState.selectedCareer = careers[0];
    prepareVisionBoard(careers[0]);
    updateYoutubeVlogs(careers[0].title);
    updateSuccessStories(careers[0].title);
    updateFamousPeople(careers[0].title);
    renderCrisisSimulations(careers[0].title);
    ui.resultsContainer.firstChild?.classList.add("ring-2", "ring-bronze");
  }
}

function resetCaseArea() {
  appState.currentCase = null;
  if (ui.simulationText) ui.simulationText.textContent = "Bir meslek seçtiğinde burada üzerine tıklanabilen 3 kriz senaryosu görünecek.";
  if (ui.simulationCards) ui.simulationCards.innerHTML = "";
  if (ui.simulationPromptPanel) ui.simulationPromptPanel.classList.add("hidden");
  if (ui.simulationPromptOutput) ui.simulationPromptOutput.value = "";
  if (ui.simulationSelectedTitle) ui.simulationSelectedTitle.textContent = "";
  if (ui.simulationFeedback) ui.simulationFeedback.textContent = "Promptu kopyalayınca Gemini sekmesinde yapıştırıp konuşmaya devam edebilirsin.";
}

function updateYoutubeVlogs(careerTitle) {
  if (!ui.youtubeVlogs) return;
  ui.youtubeVlogs.innerHTML = `<div class="rounded-xl border border-black/10 bg-white p-4 text-center"><p class="text-sm font-semibold">📺 ${careerTitle} mesleğinde bir gün</p><a href="${getYouTubeSearchUrl(careerTitle)}" target="_blank" class="inline-block mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg">🎬 YouTube'da Ara →</a><p class="text-xs text-smoke mt-2">💡 İpucu: "vlog", "bir günüm", "iş hayatım" ekleyerek ara</p></div>`;
}

function updateSuccessStories(careerTitle) {
  if (!ui.successStories) return;
  ui.successStories.innerHTML = `<div class="rounded-xl border border-black/10 bg-white p-4 text-center md:col-span-3">
    <p class="text-sm font-semibold">🔗 LinkedIn'de bu alanı keşfet</p>
    <p class="mt-2 text-xs text-smoke">${careerTitle} alanında çalışan kişilerin profillerini inceleyebilir, kariyer yolculuklarını görebilirsin.</p>
    <a href="${getLinkedInSearchUrl(careerTitle)}" target="_blank" class="inline-block mt-3 rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-blue-700">LinkedIn'de Ara →</a>
  </div>`;
}

function updateFamousPeople(careerTitle) {
  const famous = FAMOUS_PEOPLE[careerTitle];
  if (famous) {
    const famousHtml = `<div class="grid gap-3 md:grid-cols-2 mt-4"><div class="rounded-xl border border-black/10 bg-white p-3"><p class="text-sm font-bold">🇹🇷 ${famous.turkish.name}</p><p class="text-xs text-bronze">${famous.turkish.era}</p><p class="text-xs mt-1">✨ ${famous.turkish.trait}</p><p class="text-xs mt-2 italic">"${famous.turkish.story}"</p></div><div class="rounded-xl border border-black/10 bg-white p-3"><p class="text-sm font-bold">🌍 ${famous.foreign.name}</p><p class="text-xs text-bronze">${famous.foreign.era}</p><p class="text-xs mt-1">✨ ${famous.foreign.trait}</p><p class="text-xs mt-2 italic">"${famous.foreign.story}"</p></div></div>`;
    const existing = document.getElementById("famous-section");
    if (existing) existing.remove();
    const section = document.createElement("div");
    section.id = "famous-section";
    section.innerHTML = `<h4 class="text-md font-semibold mt-3">🌟 Tarihten İlham Verenler</h4>${famousHtml}`;
    ui.successStories.parentNode.insertBefore(section, ui.successStories.nextSibling);
  }
}

function renderRIASECChart() {
  const ctx = document.getElementById('riasec-chart');
  if (!ctx) return;
  if (appState.riasecChart) appState.riasecChart.destroy();
  const labels = { R: "Gerçekçi", I: "Araştırmacı", A: "Sanatçı", S: "Sosyal", E: "Girişimci", C: "Geleneksel" };
  const data = RIASEC_KEYS.map(k => appState.scores[k] || 0);
  appState.riasecChart = new Chart(ctx, { type: 'radar', data: { labels: RIASEC_KEYS.map(k => labels[k]), datasets: [{ label: 'İlgi Alanı Skoru', data: data, backgroundColor: 'rgba(140,106,67,0.2)', borderColor: '#8c6a43', borderWidth: 2, pointBackgroundColor: '#8c6a43', pointRadius: 4 }] }, options: { responsive: true, scales: { r: { beginAtZero: true, max: Math.max(...data, 15) } } } });
}

function prepareVisionBoard(career) {
  if (!career) return;
  const topType = Object.entries(appState.scores).sort((a,b) => b[1] - a[1])[0];
  const typeNames = { R: "Gerçekçi", I: "Araştırmacı", A: "Sanatçı", S: "Sosyal", E: "Girişimci", C: "Geleneksel" };
  ui.visionBoardPreview.innerHTML = `<div><h4 class="text-base font-bold">${career.title}</h4><p class="text-xs italic text-bronze">"${INSPIRATION_QUOTES[Math.floor(Math.random() * INSPIRATION_QUOTES.length)]}"</p><div class="grid grid-cols-2 gap-2 text-[11px] mt-2"><div class="bg-[#faf0e6] p-1 rounded">💰 ${career.salaryRange}</div><div class="bg-[#faf0e6] p-1 rounded">📈 ${career.futureScore}/100</div><div class="bg-[#faf0e6] p-1 rounded">🤖 ${career.aiRisk?.substring(0, 40)}</div><div class="bg-[#faf0e6] p-1 rounded">🎯 ${typeNames[topType?.[0]]}</div></div><p class="mt-3 text-[11px] leading-5 text-smoke">${career.futureScoreExplanation || "Bu gelecek yüzdesi 10 kritere göre hesaplandı."}</p></div>`;
}

// AI CHAT - GELİŞTİRİLMİŞ
// Mentor Chatbot için CANLI AI DÜZELTMESİ
async function sendChatMessage() {
  const message = ui.chatInput.value.trim();
  if (!message) return;
  if (!appState.selectedCareer) {
    alert("Önce bir meslek seç.");
    return;
  }

  addChatMessageToUI(message, "user");
  ui.chatInput.value = "";

  const typingDiv = document.createElement("div");
  typingDiv.className = "flex justify-start mb-2";
  typingDiv.innerHTML = `<div class="bg-[#f7f1e6] rounded-xl px-3 py-2 text-xs italic">Mentor sorusu AI akışına gönderiliyor...</div>`;
  ui.chatMessages.appendChild(typingDiv);

  try {
    let workflowUrl = getAiMailWorkflowUrl();
    if (!workflowUrl) {
      throw new Error("Önce mentor için n8n webhook adresini kaydetmelisin.");
    }

    const response = await fetch(workflowUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "mentor",
        userName: appState.userName || "Öğrenci",
        selectedCareer: appState.selectedCareer?.title || "",
        message
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || data.message || "n8n workflow yanit vermedi.");
    typingDiv.remove();
    const successReply = normalizeAiDisplayText(data.reply || data.message || "Mentor cevabı alınamadı.");
    addChatMessageToUI(successReply, "bot");
    appState.chatHistory.push({ role: "user", content: message });
    appState.chatHistory.push({ role: "assistant", content: successReply });
    saveChatHistory();
  } catch(error) {
    typingDiv.remove();
    console.error("Mentor webhook akisi hatasi:", error);
    const unavailableReply = error.message || "Mentor sorusu gönderilemedi. Workflow adresini ve n8n akışını kontrol edip tekrar dene.";
    addChatMessageToUI(unavailableReply, "bot");
    appState.chatHistory.push({ role: "user", content: message });
    appState.chatHistory.push({ role: "assistant", content: unavailableReply });
    saveChatHistory();
  }
}

function addChatMessageToUI(text, sender) {
  if (!ui.chatMessages) return;
  const div = document.createElement("div");
  const bubble = document.createElement("div");
  div.className = `flex ${sender === "user" ? "justify-end" : "justify-start"} mb-2`;
  bubble.className = `message-bubble rounded-xl px-3 py-2 max-w-[85%] ${sender === "user" ? "bg-black text-white" : "bg-[#f7f1e6] text-ink"}`;
  bubble.textContent = text;
  div.appendChild(bubble);
  ui.chatMessages.appendChild(div);
  ui.chatMessages.scrollTop = ui.chatMessages.scrollHeight;
}

function setupChatAfterResults() {
  if (ui.chatInput) { ui.chatInput.disabled = false; ui.chatInput.placeholder = "Meslekler hakkında soru sor..."; }
  if (ui.chatSendBtn) ui.chatSendBtn.disabled = false;
  if (ui.chatMessages && ui.chatMessages.children.length === 0 && appState.chatHistory.length > 0) {
    appState.chatHistory.forEach(item => addChatMessageToUI(item.content, item.role === "assistant" ? "bot" : "user"));
  }
  if (ui.chatMessages && ui.chatMessages.children.length === 0) {
    const welcome = `🎉 Merhaba ${appState.userName || "Değerli Öğrenci"}! Sana özel meslek önerilerim var. Sorularını sorabilirsin.`;
    addChatMessageToUI(welcome, "bot");
    appState.chatHistory = [{ role: "assistant", content: welcome }];
    saveChatHistory();
  }
}

// AI GÖRSEL
async function generateAIImage() {
  if (!appState.selectedCareer) { alert("Lütfen önce bir meslek seç!"); return; }
  ui.portraitModal.classList.remove("hidden");
  ui.portraitModal.classList.add("flex");
  ui.portraitLoading.classList.remove("hidden");
  ui.portraitSubtitle.textContent = `${appState.selectedCareer.title} için hazırlanmış promptu kopyalayıp istediğin AI görsel aracına yapıştırabilirsin.`;
  ui.portraitLoading.textContent = "🎨 Prompt hazırlanıyor...";
  const prompt = buildImagePrompt(appState.selectedCareer.title);
  ui.portraitPromptOutput.value = prompt;
  ui.portraitLoading.classList.add("hidden");
}

// PDF Download
async function downloadPDF() {
  if (!appState.selectedCareer) { alert("Lütfen bir meslek seçin."); return; }
  const career = getSelectedCareerData() || appState.selectedCareer;
  const topTraits = getUserTopTraits();
  const matchedTraits = getRecommendedTraitsForCareer(career);
  const overlapTraits = matchedTraits.filter((trait) => topTraits.includes(trait));
  const typeNames = getRiasecTypeNames();
  const topType = Object.entries(appState.scores).sort((a, b) => b[1] - a[1])[0];
  const reasonText = career.reason || "Kişilik özelliklerin ve ilgi alanların bu meslekle güçlü bir uyum gösteriyor.";
  const researchGuide = [
    "LinkedIn'de bu meslekte çalışan kişilerin profillerini incele ve kariyer yolculuklarına bak.",
    "YouTube'da bu meslek için vlog, bir günüm veya day in the life videoları izle.",
    "Üniversite bölümlerini, ders planlarını ve mezunların nerelerde çalıştığını araştır.",
    "Bu alan için hangi sertifikaların, projelerin veya stajların avantaj sağladığını not al."
  ];
  const summaryText = career.description || "Bu alan, güçlü ilgi ve becerilerinle birleşebilecek bir kariyer yolu sunar.";
  const traitMatchText = overlapTraits.length
    ? `Bu mesleğin önerilmesinde özellikle şu yönlerin etkili oldu: ${overlapTraits.join(", ")}.`
    : `En güçlü kişilik yönlerin: ${topTraits.join(", ")}. Bu yönler bu alanı keşfetmen için iyi bir başlangıç sunuyor.`;
  const expectedTraitsText = matchedTraits.length
    ? `Bu meslek özellikle şu özelliklerle güçlenir: ${matchedTraits.join(", ")}.`
    : "Bu alan için iletişim, sorumluluk ve öğrenme isteği önemli destekleyici özelliklerdir.";
  const futureText = `${career.futureScoreExplanation || "Bu gelecek yüzdesi 10 kritere göre hesaplandı."} AI etkisi: ${career.aiRisk || "Bu alan değişerek devam edebilir."} Gelecek öngörüsü: ${career.futureOutlook || "Talep gören ve kendini geliştirdikçe güçlenebilecek bir alan."}`;
  const profileText = `En baskın RIASEC tipin: ${typeNames[topType?.[0]] || "Belirlenemedi"}. İlk 3 yönün: ${topTraits.join(", ") || "Belirlenemedi"}. Bu kombinasyon, senin meslek seçiminde hangi ortamlarda daha rahat ve güçlü hissedebileceğine dair ipucu verir.`;

  const wrapper = document.createElement("div");
  wrapper.style.width = "794px";
  wrapper.style.background = "#f8f3eb";
  wrapper.style.color = "#1f1f1f";
  wrapper.style.fontFamily = "Georgia, 'Times New Roman', serif";
  wrapper.style.padding = "0";

  wrapper.innerHTML = `
    <div style="background:#1c1c1c;color:#faf0e6;padding:28px 34px 20px 34px;border-bottom:8px solid #8c6a43;">
      <div style="font-size:24px;font-weight:700;letter-spacing:0.04em;">BEWARE!: JOBS</div>
      <div style="font-size:13px;margin-top:6px;opacity:0.9;">Profesyonel Kariyer Değerlendirme Dosyası</div>
      <div style="display:flex;justify-content:space-between;gap:16px;margin-top:18px;font-size:12px;opacity:0.9;">
        <span>Hazırlanan kişi: ${appState.userName || "Öğrenci"}</span>
        <span>Tarih: ${new Date().toLocaleDateString("tr-TR")}</span>
      </div>
    </div>

    <div style="padding:28px 34px 20px 34px;">
      <div style="font-size:34px;font-weight:700;color:#8c6a43;line-height:1.2;">${career.title}</div>
      <div style="font-size:14px;line-height:1.7;color:#5a534a;margin-top:12px;">
        Bu rapor, seçilen mesleğin neden öne çıktığını, gelecekteki potansiyelini ve bu alanı nasıl daha derin araştırabileceğini daha profesyonel bir düzende sunar.
      </div>

      <div style="display:flex;gap:14px;margin-top:22px;flex-wrap:wrap;">
        <div style="flex:1;min-width:150px;background:#fffaf2;border-radius:16px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:#8c6a43;text-transform:uppercase;letter-spacing:0.06em;">Maaş Aralığı</div>
          <div style="font-size:20px;font-weight:700;margin-top:8px;">${career.salaryRange || "Bilgi yok"}</div>
        </div>
        <div style="flex:1;min-width:150px;background:#fffaf2;border-radius:16px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:#8c6a43;text-transform:uppercase;letter-spacing:0.06em;">Gelecek Skoru</div>
          <div style="font-size:20px;font-weight:700;margin-top:8px;">${career.futureScore}/100</div>
        </div>
        <div style="flex:1;min-width:150px;background:#fffaf2;border-radius:16px;padding:16px;">
          <div style="font-size:11px;font-weight:700;color:#8c6a43;text-transform:uppercase;letter-spacing:0.06em;">RIASEC Baskın Tip</div>
          <div style="font-size:20px;font-weight:700;margin-top:8px;">${typeNames[topType?.[0]] || "-"}</div>
        </div>
      </div>

      <div style="background:#fffaf2;border-radius:18px;padding:20px;margin-top:18px;">
        <div style="font-size:18px;font-weight:700;">Mesleğe Kısa Bakış</div>
        <div style="margin-top:10px;font-size:14px;line-height:1.8;color:#4d463d;">${summaryText}</div>
      </div>

      <div style="margin-top:24px;">
        <div style="font-size:20px;font-weight:700;">Bu Meslek Neden Sana Önerildi?</div>
        <div style="margin-top:10px;font-size:14px;line-height:1.9;color:#4d463d;">${reasonText}</div>
      </div>

      <div style="display:flex;gap:14px;margin-top:20px;align-items:stretch;">
        <div style="flex:1;background:#fffaf2;border-radius:18px;padding:18px;">
          <div style="font-size:17px;font-weight:700;">Sende Uyuşan Yönler</div>
          <div style="margin-top:10px;font-size:13px;line-height:1.8;color:#4d463d;">${traitMatchText}</div>
        </div>
        <div style="flex:1;background:#fffaf2;border-radius:18px;padding:18px;">
          <div style="font-size:17px;font-weight:700;">Bu Alanda Güçlü Olan Yönler</div>
          <div style="margin-top:10px;font-size:13px;line-height:1.8;color:#4d463d;">${expectedTraitsText}</div>
        </div>
      </div>

      <div style="background:#fffaf2;border-radius:18px;padding:20px;margin-top:20px;">
        <div style="font-size:18px;font-weight:700;">Gelecek Analizi</div>
        <div style="margin-top:10px;font-size:14px;line-height:1.9;color:#4d463d;">${futureText}</div>
      </div>
    </div>

    <div style="page-break-before:always;padding:26px 34px 34px 34px;background:#f8f3eb;">
      <div style="height:8px;background:#8c6a43;border-radius:999px;margin-bottom:20px;"></div>
      <div style="font-size:26px;font-weight:700;">Bu Mesleği Daha Derin Araştırmak İçin</div>
      <div style="margin-top:8px;font-size:14px;line-height:1.8;color:#5a534a;">
        Aşağıdaki adımlar bu mesleği yüzeysel değil, daha bilinçli şekilde tanıman için hazırlandı.
      </div>

      <div style="margin-top:22px;display:flex;flex-direction:column;gap:12px;">
        ${researchGuide.map((item, index) => `
          <div style="background:#ffffff;border-radius:16px;padding:16px 18px;">
            <div style="font-size:15px;font-weight:700;color:#8c6a43;">${index + 1}. Adım</div>
            <div style="margin-top:8px;font-size:14px;line-height:1.8;color:#4d463d;">${item}</div>
          </div>
        `).join("")}
      </div>

      <div style="background:#fffaf2;border-radius:18px;padding:20px;margin-top:22px;">
        <div style="font-size:18px;font-weight:700;">Kişilik Profilin ve Meslek Uyumu</div>
        <div style="margin-top:10px;font-size:14px;line-height:1.9;color:#4d463d;">${profileText}</div>
      </div>

      <div style="margin-top:24px;">
        <div style="font-size:22px;font-weight:700;">Benim Düşüncelerim ve Notlarım</div>
        <div style="margin-top:8px;font-size:13px;line-height:1.7;color:#6b645a;">Bu alanla ilgili kendi fikirlerini, araştırma notlarını veya öğretmeninden aldığın önerileri buraya ekleyebilirsin.</div>
        <div style="margin-top:16px;border:2px solid #d8cec0;border-radius:18px;padding:18px 18px 8px 18px;background:#fffdf9;">
          ${Array.from({ length: 8 }).map(() => `<div style="height:28px;border-bottom:1px solid #d9d1c5;"></div>`).join("")}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  await window.html2pdf()
    .set({
      margin: 0,
      filename: `kariyer_raporu_${appState.selectedCareer.title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#f8f3eb" },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] }
    })
    .from(wrapper)
    .save();

  wrapper.remove();
}

function shareResults() {
  if (!appState.selectedCareer) return;
  const text = `🎯 BEWARE!: JOBS ile ${appState.selectedCareer.title} mesleği önerildi! Gelecek skoru: ${appState.selectedCareer.futureScore}/100.`;
  if (navigator.share) navigator.share({ title: "Kariyer Raporum", text: text });
  else { navigator.clipboard.writeText(text); alert("✅ Kopyalandı!"); }
}

function getRiasecTypeNames() {
  return { R: "Gerçekçi", I: "Araştırmacı", A: "Sanatçı", S: "Sosyal", E: "Girişimci", C: "Geleneksel" };
}

function getRecommendedTraitsForCareer(career) {
  const typeNames = getRiasecTypeNames();
  return (career?.riasecMatch || [])
    .map((key) => typeNames[key])
    .filter(Boolean);
}

function getUserTopTraits() {
  const typeNames = getRiasecTypeNames();
  return Object.entries(appState.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => typeNames[key])
    .filter(Boolean);
}

function drawPdfInfoBox(doc, { x, y, w, h, title, body, fillColor = [255, 248, 238] }) {
  doc.setFillColor(...fillColor);
  doc.roundedRect(x, y, w, h, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(31, 31, 31);
  doc.text(title, x + 4, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const lines = doc.splitTextToSize(body, w - 8);
  doc.text(lines, x + 4, y + 15);
}

function getPdfBoxHeight(doc, body, width) {
  const lines = doc.splitTextToSize(body, width - 8);
  return Math.max(24, 18 + (lines.length * 4.5));
}

function drawPdfBadge(doc, { x, y, label, value }) {
  doc.setFillColor(255, 248, 238);
  doc.roundedRect(x, y, 52, 18, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(140, 106, 67);
  doc.text(label, x + 4, y + 6.5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(31, 31, 31);
  doc.text(String(value), x + 4, y + 13);
}

// NOT SİSTEMİ
function initNotes() {
  let model = JSON.parse(localStorage.getItem(NOTES_FOLDER_MODEL_KEY));
  if (!model) model = { folders: [{ id: "f1", name: "Sınav Notları" }, { id: "f2", name: "Meslek Araştırmaları" }], notes: { f1: "", f2: "" } };
  localStorage.setItem(NOTES_FOLDER_MODEL_KEY, JSON.stringify(model));

  function syncActiveNote() {
    const active = document.getElementById("drawer-active-note");
    if (!active) return;
    active.textContent = ui.notesInput.value.trim() || "Henüz not seçilmedi";
  }

  function refresh() {
    const m = JSON.parse(localStorage.getItem(NOTES_FOLDER_MODEL_KEY));
    if (!m) return;
    const currentValue = ui.notesFolderSelect.value;
    ui.notesFolderSelect.innerHTML = m.folders.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    ui.notesFolderSelect.value = m.folders.some(f => f.id === currentValue) ? currentValue : m.folders[0]?.id;
    const selected = ui.notesFolderSelect.value;
    ui.notesInput.value = m.notes[selected] || "";
    syncActiveNote();
    const drawerList = document.getElementById("drawer-folders-list");
    if (drawerList) {
      drawerList.innerHTML = m.folders.map(f => `<li class="mb-2 border-b pb-1"><div class="flex justify-between"><strong>📁 ${f.name}</strong><button class="load-folder text-xs text-bronze" data-id="${f.id}">aç</button><button class="delete-folder text-xs text-red-500 ml-2" data-id="${f.id}">🗑️ sil</button></div><div class="text-xs text-smoke">${(m.notes[f.id] || "Boş").substring(0, 60)}</div></li>`).join('');
      document.querySelectorAll('.load-folder').forEach(btn => { btn.onclick = () => { ui.notesFolderSelect.value = btn.dataset.id; ui.notesInput.value = m.notes[btn.dataset.id] || ""; syncActiveNote(); ui.notesStatus.textContent = "📁 Açıldı"; setTimeout(() => ui.notesStatus.textContent = "", 1500); }; });
      document.querySelectorAll('.delete-folder').forEach(btn => { btn.onclick = () => { const id = btn.dataset.id; if (m.folders.length <= 1) { alert("En az bir klasör kalmalı!"); return; } m.folders = m.folders.filter(f => f.id !== id); delete m.notes[id]; localStorage.setItem(NOTES_FOLDER_MODEL_KEY, JSON.stringify(m)); refresh(); }; });
    }
  }
  refresh();
  ui.notesFolderSelect.onchange = () => { const m = JSON.parse(localStorage.getItem(NOTES_FOLDER_MODEL_KEY)); ui.notesInput.value = m.notes[ui.notesFolderSelect.value] || ""; syncActiveNote(); };
  ui.notesInput.oninput = syncActiveNote;
  document.getElementById("save-notes-btn").onclick = () => { const m = JSON.parse(localStorage.getItem(NOTES_FOLDER_MODEL_KEY)); m.notes[ui.notesFolderSelect.value] = ui.notesInput.value; localStorage.setItem(NOTES_FOLDER_MODEL_KEY, JSON.stringify(m)); ui.notesStatus.textContent = "✓ Kaydedildi"; setTimeout(() => ui.notesStatus.textContent = "", 1500); refresh(); };
  document.getElementById("create-notes-folder-btn").onclick = () => { const newName = document.getElementById("notes-folder-create-input").value.trim(); if (!newName) { alert("Ad girin!"); return; } const m = JSON.parse(localStorage.getItem(NOTES_FOLDER_MODEL_KEY)); const newId = "f" + Date.now(); m.folders.push({ id: newId, name: newName }); m.notes[newId] = ""; localStorage.setItem(NOTES_FOLDER_MODEL_KEY, JSON.stringify(m)); document.getElementById("notes-folder-create-input").value = ""; refresh(); ui.notesFolderSelect.value = newId; ui.notesInput.value = ""; syncActiveNote(); ui.notesStatus.textContent = "✓ Klasör oluşturuldu"; setTimeout(() => ui.notesStatus.textContent = "", 1500); };
}

function bindEvents() {
  ui.saveNameBtn.onclick = onSaveName;
  document.getElementById("start-btn").onclick = startTest;
  document.getElementById("reset-user-btn").onclick = resetUserName;
  if (ui.nextBtn) ui.nextBtn.onclick = handleNext;
  document.getElementById("restart-btn").onclick = () => {
    showScreen("landing");
    appState.chatHistory = [];
    saveChatHistory();
    appState.currentCase = null;
    if (ui.chatMessages) ui.chatMessages.innerHTML = "";
    resetCaseArea();
  };
  document.getElementById("download-vision-pdf-btn").onclick = downloadPDF;
  document.getElementById("generate-ai-image-btn").onclick = generateAIImage;
  document.getElementById("share-results-btn").onclick = shareResults;
  if (ui.chatSendBtn) ui.chatSendBtn.onclick = sendChatMessage;
  if (ui.chatInput) ui.chatInput.onkeypress = (e) => { if (e.key === "Enter") sendChatMessage(); };
  if (ui.saveMentorWebhookBtn) {
    ui.saveMentorWebhookBtn.onclick = () => {
      const value = ui.mentorWebhookInput?.value?.trim();
      if (!value) {
        alert("Önce geçerli bir webhook adresi gir.");
        return;
      }
      setAiMailWorkflowUrl(value);
      syncMentorWebhookUI();
      alert("Webhook kaydedildi.");
    };
  }
  if (ui.resetMentorWebhookBtn) {
    ui.resetMentorWebhookBtn.onclick = () => {
      clearAiMailWorkflowUrl();
      syncMentorWebhookUI();
      alert("Webhook sıfırlandı.");
    };
  }
  if (ui.openGeminiCaseBtn) ui.openGeminiCaseBtn.onclick = openGeminiForCase;
  if (ui.copyGeminiCaseBtn) {
    ui.copyGeminiCaseBtn.onclick = async () => {
      const prompt = ui.simulationPromptOutput?.value?.trim();
      if (!prompt) return;
      await navigator.clipboard.writeText(prompt);
      if (ui.simulationFeedback) ui.simulationFeedback.textContent = "Prompt kopyalandı. Şimdi Gemini'de yapıştırıp konuşmaya devam edebilirsin.";
    };
  }
  document.querySelectorAll(".suggestion-btn").forEach(btn => { btn.onclick = () => { ui.chatInput.value = btn.textContent; sendChatMessage(); }; });
  document.getElementById("drawer-open-btn").onclick = () => document.getElementById("notes-drawer").classList.remove("hidden");
  document.getElementById("drawer-close-btn").onclick = () => document.getElementById("notes-drawer").classList.add("hidden");
  document.getElementById("close-portrait-btn").onclick = () => ui.portraitModal.classList.add("hidden");
  document.getElementById("intro-open-btn").onclick = () => document.getElementById("intro-modal").classList.remove("hidden");
  document.getElementById("close-intro-btn").onclick = () => document.getElementById("intro-modal").classList.add("hidden");
  if (ui.copyPortraitPromptBtn) {
    ui.copyPortraitPromptBtn.onclick = async () => {
      const prompt = ui.portraitPromptOutput?.value?.trim();
      if (!prompt) return;
      await navigator.clipboard.writeText(prompt);
      ui.portraitSubtitle.textContent = "Prompt kopyalandı. Şimdi bunu istediğin AI görsel aracına yapıştırabilirsin.";
    };
  }
  document.getElementById("vision-btn").onclick = () => document.getElementById("vision-modal").classList.remove("hidden");
  document.getElementById("close-vision-btn").onclick = () => document.getElementById("vision-modal").classList.add("hidden");
}

async function init() {
  bindEvents();
  initNotes();
  appState.chatHistory = loadChatHistory();
  syncMentorWebhookUI();
  const randomQuote = INSPIRATION_QUOTES[Math.floor(Math.random() * INSPIRATION_QUOTES.length)];
  if (ui.dailyInspiration) ui.dailyInspiration.textContent = `"${randomQuote}"`;
  if (window.QUESTIONS_DATA?.mainQuestions) appState.questions = [...window.QUESTIONS_DATA.mainQuestions];
  const savedName = localStorage.getItem(USER_NAME_KEY);
  if (savedName) { appState.userName = savedName; showScreen("landing"); }
  else showScreen("greeting");
}

init();
