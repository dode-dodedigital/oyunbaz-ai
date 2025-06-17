// OYUNBAZ AI - Çocuk Dostu UI Tasarımı (Azure + Yaş Grubu Filtresi)

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function OyunbazApp() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("girl");
  const [country, setCountry] = useState("tr");
  const [age, setAge] = useState(5);
  const [photo, setPhoto] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [games, setGames] = useState([]);

  const exampleGames = [
    {
      title: "🏰 Yastık Kalesi",
      desc: "Yastıkları üst üste koyarak bir kale oluşturun.",
      story: "Orta Çağ’da kaleler çocukların hayal gücünü süslerdi. Evdeki yastıklar bu hayalleri gerçeğe dönüştürmek için kullanılırdı. Şimdi çocuklar kendi kalelerini inşa edebiliyor!",
      minAge: 3,
      maxAge: 8,
      objects: ["pillow", "blanket"],
      kazanımlar: ["Yaratıcılık", "Denge Kurma", "Problem Çözme"]
    },
    {
      title: "🚂 Sandalye Treni",
      desc: "Sandalyeleri sıraya dizin ve tren oyunu oynayın.",
      story: "Trenler sanayi devrimiyle hayatımıza girdi. Çocuklar, evde sandalyelerle trenler kurarak bu büyüleyici taşıma aracını taklit etmeye başladılar. Hayal gücü raylarda ilerliyor!",
      minAge: 3,
      maxAge: 7,
      objects: ["chair"],
      kazanımlar: ["Sıralama Algısı", "Hayal Gücü", "Taklit Becerisi"]
    },
    {
      title: "🎯 Bardak Hedef",
      desc: "Topla plastik bardakları devirmeye çalışın.",
      story: "Panayır eğlencelerinden doğan bu oyun, çocuklara hedef alma ve isabet becerisi kazandırır. Kolayca kurulabilir ve eğlencelidir.",
      minAge: 4,
      maxAge: 9,
      objects: ["ball", "cup"],
      kazanımlar: ["Hedef Alma", "El-Göz Koordinasyonu", "Odaklanma"]
    },
    {
      title: "🎭 Kukla Tiyatrosu",
      desc: "Oyuncaklarla küçük sahneler kurup hikâye anlatın.",
      story: "Kuklalar yüzyıllardır hikâye anlatmak için kullanılır. Bu oyun çocukların ifade gücünü geliştirir.",
      minAge: 5,
      maxAge: 10,
      objects: ["toy", "sock"],
      kazanımlar: ["Dil Gelişimi", "Sosyal Etkileşim", "Anlatı Becerisi"]
    },
    {
      title: "🧱 Lego Şehri",
      desc: "Lego parçalarıyla şehir inşa edin.",
      story: "1950’lerde hayatımıza giren lego, hayal gücünün yapı taşlarına dönüştü. Bu oyun mühendislik ile hayal dünyasını birleştirir.",
      minAge: 4,
      maxAge: 10,
      objects: ["lego"],
      kazanımlar: ["İnşa Etme", "Motor Becerileri", "Yaratıcılık"]
    },
    {
      title: "📚 Kitap Avı",
      desc: "Evdeki kitapların içinden ipuçlarını takip ederek hazineyi bulun.",
      story: "Kitaplar sadece okumak için değildir! Bu oyunla çocuklar hem kitaplarla zaman geçirir hem de keşif duygusunu yaşar.",
      minAge: 6,
      maxAge: 10,
      objects: ["book"],
      kazanımlar: ["Araştırma", "Eleştirel Düşünme", "Okuma İsteği"]
    },
    {
      title: "🧦 Çorap Topu",
      desc: "Çorapları top yaparak sepetin içine atmayı deneyin.",
      story: "Ev oyunlarının vazgeçilmezi çorap topları, sporun eğlenceli hâlini evinize getirir.",
      minAge: 4,
      maxAge: 9,
      objects: ["sock", "basket"],
      kazanımlar: ["Atış Becerisi", "Denge", "Eğlenceli Hareket"]
    },
    {
      title: "✂️ Kâğıt Sanatı",
      desc: "Kâğıt, makas ve yapıştırıcı ile hayvan figürleri oluşturun.",
      story: "El işi derslerinden ilham alınan bu etkinlik, ince motor becerileri geliştirir.",
      minAge: 5,
      maxAge: 10,
      objects: ["paper", "scissors", "glue"],
      kazanımlar: ["El Becerisi", "Sanatsal Yaratıcılık", "Dikkat"]
    },
    {
      title: "🎲 Zar Oyunu Yolu",
      desc: "Zarla ilerleyerek küçük görevler tamamlayın.",
      story: "Klasik masa oyunlarından ilham alınan bu etkinlik, karar verme ve sabır becerilerini destekler.",
      minAge: 5,
      maxAge: 10,
      objects: ["dice"],
      kazanımlar: ["Sayı Algısı", "Strateji Kurma", "Kurallara Uyma"]
    },
    {
      title: "🪞Ayna Dansı",
      desc: "Biri hareket eder, diğeri aynadaki gibi taklit eder.",
      story: "Dikkat ve koordinasyon geliştiren bu oyun, ikili eğlenceleri daha anlamlı kılar.",
      minAge: 4,
      maxAge: 9,
      objects: ["mirror"],
      kazanımlar: ["Taklit", "Dikkat", "Ritim ve Hareket"]
    }
  ];

  const detectObjectsFromImage = async (file) => {
    return [
      "pillow", "chair", "box", "ball", "basket", "blanket", "lego", "cup", "paper", "scissors",
      "glue", "toy", "sock", "dice", "remote", "brush", "book", "crayon", "shoe", "hat",
      "towel", "napkin", "bottle", "pan", "spoon", "mug", "teddy", "block", "mirror", "flashlight"
    ];
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      const detectedObjects = await detectObjectsFromImage(file);

      const filteredGames = exampleGames.filter(game => {
        const ageMatch = age >= game.minAge && age <= game.maxAge;
        const objectMatch = game.objects.length === 0 || game.objects.some(obj => detectedObjects.includes(obj));
        return ageMatch && objectMatch;
      });

      const shuffled = filteredGames.sort(() => 0.5 - Math.random()).slice(0, 5);
      setGames(shuffled);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-[url('/giraffe-bg.png')] bg-cover bg-center rounded-xl shadow-xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-pink-700">🦒 Zürafa Zıpzıp ile Oyun Dünyası</h1>

      <Card className="mb-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md">
        <CardContent className="space-y-5 p-5">
          {step === 1 && (
            <>
              <label className="block font-semibold text-lg text-purple-700">🧒 Çocuğun Cinsiyeti:</label>
              <select className="w-full rounded-xl p-2 text-lg border border-purple-300" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="girl">Kız</option>
                <option value="boy">Erkek</option>
                <option value="other">Diğer</option>
              </select>

              <label className="block font-semibold text-lg text-purple-700">🌍 Hangi Ülkede Yaşıyor?</label>
              <select className="w-full rounded-xl p-2 text-lg border border-purple-300" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="tr">Türkiye</option>
                <option value="us">ABD</option>
                <option value="de">Almanya</option>
                <option value="ca">Kanada</option>
                <option value="other">Diğer</option>
              </select>

              <Button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-2" onClick={() => setStep(2)}>Devam Et</Button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block font-semibold text-lg text-purple-700">👶 Çocuğun Kaç Yaşında?</label>
              <Input
                type="number"
                min="3"
                max="10"
                className="rounded-xl text-lg"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />

              <Button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-2" onClick={() => setStep(3)}>Devam Et</Button>
            </>
          )}

          {step === 3 && (
            <>
              <label className="block font-semibold text-lg text-purple-700">📷 Mekân Fotoğrafını Yükle:</label>
              <Input
                type="file"
                accept="image/*"
                className="rounded-xl text-lg"
                onChange={(e) => {
                  setConfirmUpload(false);
                  handleUpload(e);
                }}
              />
            </>
          )}

          {photo && !confirmUpload && (
            <>
              <img src={photo} alt="Uploaded" className="mt-4 rounded-xl border-4 border-yellow-300 shadow-md" />
              <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white text-lg py-2" onClick={() => setConfirmUpload(true)}>
                Fotoğrafı Onayla ve Oyunları Göster
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {confirmUpload && games.length > 0 && (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-center text-green-700">🌟 Oyun Önerileri Hazır!</h2>
          {games.map((game, i) => (
            <Card key={i} className="bg-white rounded-2xl shadow-lg border-l-8 border-green-300">
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3">
                      <img src={`/icons/game${i % 10 + 1}.png`} alt="icon" className="w-10 h-10" />
                      <h3 className="text-xl font-bold text-blue-700">{game.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 italic">{game.story}</p>
                    <button
                      onClick={() => alert(game.desc)}
                      className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded-full text-sm shadow"
                    >
                      Bu oyun ne yapıyor?
                    </button>
                    {game.kazanımlar && (
                      <details className="mt-3 text-sm text-purple-700">
                        <summary className="cursor-pointer font-semibold">🎯 Kazanımlar</summary>
                        <ul className="list-disc list-inside">
                          {game.kazanımlar.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
git init
git add .
git commit -m "İlk yükleme: Oyunbaz AI"
git remote add origin https://github.com/dode-dodedigital/oyunbaz-ai.git
git branch -M main
git push -u origin main
