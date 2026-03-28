const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";
const GEMINI_IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image-preview";

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(__dirname));

function requireApiKey(res) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
    res.status(500).json({
      error: "GEMINI_API_KEY eksik. .env dosyasina gercek Gemini anahtarini yazmalisin."
    });
    return false;
  }

  return true;
}

function cleanJson(text) {
  return text.replace(/```json|```/gi, "").trim();
}

function extractGeminiText(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts
    .filter((part) => typeof part.text === "string")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function extractGeminiImage(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((part) => part.inlineData?.data);
  if (!imagePart) return null;
  const mimeType = imagePart.inlineData.mimeType || "image/png";
  return `data:${mimeType};base64,${imagePart.inlineData.data}`;
}

async function callGemini(model, body) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const data = await response.json();
  if (!response.ok) {
    const message = data.error?.message || "Gemini istegi basarisiz oldu.";
    throw new Error(message);
  }

  return data;
}

async function createTextResponse({ systemInstruction, prompt, contents }) {
  const data = await callGemini(GEMINI_TEXT_MODEL, {
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    contents: contents || [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  const text = extractGeminiText(data);
  if (!text) {
    throw new Error("Gemini bos yanit dondu.");
  }

  return text;
}

async function createCareerAnalysis(scores, recommendedCareers) {
  const scoreSummary = Object.entries(scores).map(([key, value]) => `${key}:${value}`).join(", ");
  const careersSummary = recommendedCareers.map((career) => ({
    title: career.title,
    type: career.type,
    description: career.description,
    salary: career.salary,
    futureScore: career.futureScore
  }));

  const text = await createTextResponse({
    systemInstruction: "Sen lise ogrencileri icin konusan sicak, motive edici ama net bir kariyer danismanisin. Yalnizca gecerli JSON dondur.",
    prompt: `RIASEC skorlarim: ${scoreSummary}

Onerilen meslekler:
${JSON.stringify(careersSummary, null, 2)}

Sadece gecerli JSON don:
{
  "careers": [
    {
      "title": "Meslek adi",
      "reason": "2 cumlelik neden uygun aciklamasi",
      "salaryRange": "Maas araligi",
      "futureScore": 85,
      "aiRisk": "AI bu meslegi nasil etkiler",
      "futureOutlook": "Gelecek vizyonu"
    }
  ]
}`
  });

  const parsed = JSON.parse(cleanJson(text));
  return parsed.careers;
}

app.post("/api/analyze-careers", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { scores, recommendedCareers } = req.body;
  if (!scores || !Array.isArray(recommendedCareers) || recommendedCareers.length === 0) {
    return res.status(400).json({ error: "Eksik analiz verisi gonderildi." });
  }

  try {
    const careers = await createCareerAnalysis(scores, recommendedCareers);
    res.json({ careers });
  } catch (error) {
    console.error("Career analysis error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/chat", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { message, selectedCareer, userName, history = [] } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Mesaj bos olamaz." });
  }

  try {
    const reply = await createTextResponse({
      systemInstruction: `Sen BEWARE JOBS icin calisan akici, ilgili ve dogrudan bir kariyer mentorusun. Her zaman Turkce cevap ver. Secili meslege odaklan. Kullanici bir takip sorusu sorarsa onceki mesaja baglan. Genel ve tekrar eden cumleler kurma. Kullanici isim, alt alan, beceri, maas, yurt disi, egitim yolu veya gunluk hayat sorarsa dogrudan onu cevapla. Gereksiz ozur veya red kullanma. En fazla 7 cumle yaz.`,
      contents: [
        {
          role: "user",
          parts: [{ text: `Kullanici adi: ${userName || "Ogrenci"}\nSecili meslek: ${selectedCareer || "Henuz secilmedi"}` }]
        },
        ...history
          .filter((item) => item && item.role && item.content)
          .slice(-12)
          .map((item) => ({
            role: item.role === "assistant" ? "model" : "user",
            parts: [{ text: item.content }]
          })),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ]
    });

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/case", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { job } = req.body;
  if (!job) {
    return res.status(400).json({ error: "Meslek bilgisi gerekli." });
  }

  try {
    const text = await createTextResponse({
      systemInstruction: "Sen ogrenci dostu bir kariyer kocusun. Basit, gercekci, kisa ve motive edici mini vakalar yaz. Yalnizca gecerli JSON dondur.",
      prompt: `Meslek: ${job}

Sadece gecerli JSON don:
{
  "title": "Case basligi",
  "scenario": "2-3 cumlelik kisa senaryo",
  "task": "Ogrenciden istenen sey tek cumle"
}`
    });

    res.json({ case: JSON.parse(cleanJson(text)) });
  } catch (error) {
    console.error("Case error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/evaluate", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { answer, job, caseText } = req.body;
  if (!answer || !job || !caseText) {
    return res.status(400).json({ error: "Degerlendirme icin eksik veri var." });
  }

  try {
    const feedback = await createTextResponse({
      systemInstruction: "Sen destekleyici bir mentorsun. Her zaman Turkce yaz. Once guclu yani soyle, sonra tek bir gelistirme onerisi ver. Kisa ve somut ol. En fazla 4 cumle yaz.",
      prompt: `Meslek: ${job}
Case:
${JSON.stringify(caseText, null, 2)}

Ogrencinin cozumu:
${answer}`
    });

    res.json({ feedback });
  } catch (error) {
    console.error("Evaluate error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/report-questions", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { questions = [], selectedCareer, userName, scores } = req.body;
  if (!selectedCareer || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Rapor için eksik veri var." });
  }

  try {
    const answers = [];

    for (const question of questions) {
      const answer = await createTextResponse({
        systemInstruction: "Sen lise ogrencileri icin konusan dikkatli bir kariyer mentorsun. Her zaman Turkce cevap ver. Her soruyu tek tek ve dogrudan cevapla. Kullanici isim isterse isim listesi ver. Kullanici alt alan sorarsa listele. Kullanici uygunluk veya gelisim sorarsa daha kisisellestirilmis cevap ver. Soruyla ilgisiz genel motivasyon cumlesi kurma. En fazla 6 cumle yaz.",
        prompt: `Kullanici: ${userName || "Ogrenci"}
Secilen meslek: ${selectedCareer}
RIASEC skorleri: ${JSON.stringify(scores || {})}

Soru: ${question}

Bu tek soruya dogrudan, ilgili ve somut bir cevap ver. Sadece bu soruya odaklan.`
      });

      answers.push({
        question,
        answer
      });
    }

    const summary = await createTextResponse({
      systemInstruction: "Sen kisa ve net yazan bir kariyer mentorsun. Her zaman Turkce cevap ver. En fazla 2 cumle yaz.",
      prompt: `Secilen meslek: ${selectedCareer}
Sorular: ${JSON.stringify(questions)}
Cevaplar: ${JSON.stringify(answers)}

Bu soru-cevaplar icin 2 cumleyi asmayan kisa bir genel sonuc yaz.`
    });

    res.json({ answers, summary });
  } catch (error) {
    console.error("Report questions error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/image", async (req, res) => {
  if (!requireApiKey(res)) return;

  const { job, userName } = req.body;
  if (!job) {
    return res.status(400).json({ error: "Meslek bilgisi gerekli." });
  }

  try {
    const data = await callGemini(GEMINI_IMAGE_MODEL, {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${job} rolunde calisan genc bir profesyonelin ilham verici ve gercekci bir sahnesini uret. Modern ortam, meslege ait araclar, temiz kompozisyon. Kullanici adi: ${userName || "ogrenci"}. Yuz ozelliklerini birebir kopyalama, genel bir temsil uret.`
            }
          ]
        }
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"]
      }
    });

    const image = extractGeminiImage(data);
    if (!image) {
      throw new Error("Gemini image modeli gorsel dondurmedi.");
    }

    res.json({ image });
  } catch (error) {
    console.error("Image error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`BEWARE!: JOBS server calisiyor: http://127.0.0.1:${PORT}`);
});
