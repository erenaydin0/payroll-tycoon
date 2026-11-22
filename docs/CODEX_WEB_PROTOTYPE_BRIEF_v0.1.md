# PAYROLL TYCOON
## Codex Cloud — Web-First Teknik Prototip Brief'i v0.1

**Tarih:** 22 Kasım 2026  
**Durum:** Deney / teknoloji doğrulama; ana GDD v1.1'in yerine geçmez.  
**Hedef:** Codex Cloud'un Phaser + React tabanlı, oynanabilir, izometrik bir bordro oyunu prototipini oluşturup test edebildiğini görmek.

> **Başarı tanımı:** Tek kuruculu bir Seviye 1 ofis, ilk müşterinin kabul edilmesi, basit kağıt bordronun tamamlanması, para kazanılması ve ilerlemenin kaydedilip yeniden yüklenmesi. Oyun masaüstü tarayıcıda ve yatay mobil ekran boyutunda kullanılabilir olmalıdır.

## 1. Bu denemede neyi öğreniyoruz?

1. Codex Cloud tek başına projeyi kurabiliyor, test edebiliyor ve çalışan web önizlemesi sağlayabiliyor mu?
2. 2D izometrik sprite'larla ofis, karakter ve masa katmanları tutarlı çizilebiliyor mu?
3. Phaser sahnesi ile React yönetim paneli, aynı oyun durumunu hatasız güncelleyebiliyor mu?
4. Otomatik testler ve ekran görüntüsü incelemesiyle hatalar tespit edilebiliyor mu?
5. Bu teknoloji yığını daha sonra Electron (Steam) ve Capacitor (mobil) paketlemeye uygun temelde mi?

**İlk sprintin amacı satışa çıkacak oyun değil, teknik riskleri azaltan küçük fakat çalışan bir deneydir.**

## 2. Sabit ürün ve sanat kararları

| Başlık | Karar |
|---|---|
| Oyun | Payroll Tycoon — şirket yönetimi |
| Sahne | Seviye 1: yalnız kurucu; küçük bir ofis; manuel/kağıt bordro |
| Perspektif | 2D izometrik; 2:1 elmas grid; düşük poligon hissi veren önceden hazırlanmış sprite |
| Ekran | Önce 16:9 yatay; 1280×720 tasarım tuvali; dar yatay mobil testleri |
| Görsel ton | Payroll Blue / Warm Office: lacivert #24364B, turkuaz #5E9FA8, açık mavi #DAE8E7, krem #F3EEE5, mercan #E59B74, adaçayı #B7C77B |
| Kurucu | Tek karakter; basit idle veya tek kare görsel yeterli |
| Tekin Abi | Seviye 2'de gelir; **bu prototipte bulunmayacak** |
| Para birimi | Şimdilik oyun parası (₺ gösterimi kullanılabilir; mevzuat simülasyonu değildir) |
| Oynanış | Tek oyunculu; offline-first; tarayıcıda |
| Referans | GDD v1.1 ve Art Direction Guide v1.0; oyun mekaniği için üst düzey kaynak |

**Sanat sınırı:** İlk sprintte gerçek 3D, Blender, dış varlık satın alma ve AI tarafından tek tek profesyonel asset üretme şart değil. Telif riski taşımayan basit geçici sprite'lar veya özgün geometrik çizimler kullanılabilir. Görsel kaliteyi değil düzeni ve perspektifi test ediyoruz.

## 3. Teknoloji ve mimari

| Katman | Seçim | Not |
|---|---|---|
| Render ve sahne | Phaser 4 | Kurulumda resmî kararlı sürüm ve API doğrulansın |
| UI | React + TypeScript | Menü, sayaçlar, müşteri ve bordro paneli |
| Geliştirme | Vite | Resmî Phaser React+TypeScript şablonunu tercih et |
| Durum | Minimal event/store adapter | Prototipte Zustand zorunlu değil; tek kaynaklı oyun durumu |
| Simülasyon | Phaser'dan bağımsız TypeScript | Saf fonksiyonlarla test edilebilir |
| Kayıt | localStorage (v0.1) | Versiyonlu kayıt, bozuk veri fallback; ileride IndexedDB |
| Testler | Vitest + Playwright | Birim + baştan sona akış + screenshot |
| Paketleme | Bu sprintte yok | Electron/Capacitor sadece mimari notu |
| Backend | Yok | Hesap, sunucu, online kayıt yok |

**Ayrım:** `/src/simulation` Phaser veya React'i import etmeyecek. Phaser oyun durumunu okuyacak ve görselleştirecek; React komutları state katmanından geçecek. UI ve oyun sahnesi ayrı kopya state tutmayacak.

### Önerilen depo yapısı

```text
payroll-tycoon/
├── AGENTS.md
├── README.md
├── package.json
├── src/
│   ├── app/               # React UI, giriş
│   ├── game/              # Phaser sahneleri, sprite ve depth
│   ├── simulation/        # Saf TS: müşteri, bordro, ekonomi
│   ├── state/             # Tek oyun durumu ve eylemler
│   ├── persistence/       # Save/load ve sürüm
│   ├── assets/            # Geçici, lisanslı veya özgün görseller
│   └── styles/
├── tests/
│   ├── unit/
│   └── e2e/
└── docs/
    ├── PROTOTYPE_SCOPE.md
    ├── ASSET_LICENSES.md
    └── VERIFICATION_REPORT.md
```

## 4. Gösterilecek ekran — Seviye 1

**Ana sahne:** Küçük bir izometrik oda; zemin, iki görünür duvar, tek çalışma masası, sandalye, kağıt/hesap makinesi ve bir kurucu sprite'ı. Çok sayıda çalışan veya modern SaaS ofisi olmayacak.

**Üst çubuk:** Şirket parası, aktif müşteri sayısı, içinde bulunulan oyun ayı.  
**Alt eylemler:** `Müşteriler`, `Bordro Hazırla`, `Kaydet`, `Yükle/Sıfırla`.  
**Sağ panel:** Seçili müşterinin iş durumu, ücret, çalışan sayısı ve bordro eylemi.

Sahnedeki nesneler seçilebilir görünebilir; ilk sprintte mobilya taşıma, kamera döndürme, yol bulma veya karakter yürüyüşü şart değil. Karakterin masanın önünde/arkasında doğru katmanda çizilmesi örnekle gösterilsin.

## 5. Oynanabilir minimal döngü

1. Yeni oyunda para = **5.000**, müşteri = 0, ay = 1; bu rakamlar deneme varsayımıdır.
2. `Müşteriler` panelinde tek hazır potansiyel müşteri görünür: **Atlas Kırtasiye**; 8 çalışan, ilk ay hizmet bedeli 600 oyun parası.
3. Oyuncu `Sözleşmeyi kabul et` der; aktif müşteri sayısı 1 olur.
4. `Bordro Hazırla` panelinde 3 basit adım yer alır: evrakları kontrol et, örnek net tutarı hesapla, bordroyu onayla. İşlem gerçek Türk bordro mevzuatını taklit etmez.
5. Aynı ay için ikinci kez ödeme alınamaz. İş tamamlandığında **600** oyun parası eklenir; bordro durumu `Tamamlandı` olur.
6. `Sonraki aya geç` ile ay artar; müşterinin durumu `Bekliyor` olur; tekrar bordro yapılabilir.
7. Oyun `Kaydet` ve `Yükle` ile sayfa yenilense bile son durumdan devam eder. `Yeni oyun` seçimi açık onay ister.

**Beklenen demo:** Müşteri sözleşmesi → bordro görevi → tahsilat → sonraki ay → sayfayı yenile → kaldığı yerden devam.

## 6. Kesin kapsam dışı

Seviye 2 ve Tekin Abi, işe alım, satış departmanı, IT/SaaS, masraf/avans/izin modülleri, fuar, Happy Hour, sistem ekibi, arıza, güvenlik ve rakipler, maaş/sözleşme pazarlığı, gerçek vergi hesaplaması, bulut kayıt, çok oyunculu, satın alma, Steam API, uygulama mağazası gönderimi, 3D asset üretimi, karmaşık karakter animasyonları ve detaylı dekorasyon.

**Neden?** Bunlar GDD v1.1'de kalıyor; bu sprintte bunları eklemek teknik tercih testini bulanıklaştırır.

## 7. Codex görev sırası ve teslim kriterleri

### Görev A — Bootstrap
- Depoyu incele; resmî Phaser + React + TypeScript/Vite şablonunu kur.
- `npm install`, `npm run build`, `npm run test` komutlarını doğrula.
- `AGENTS.md`, `.gitignore`, `README.md` hazırla.
- Kullanılan kütüphanelerin sürümlerini kilit dosyasıyla sabitle.

**Kabul:** Temiz ortamda bağımlılıklar kuruluyor; boş uygulama derleniyor; tarayıcıda konsol hatası yok.

### Görev B — İzometrik oda ve UI
- 1280×720 yatay başlangıç sahnesi; 2:1 izometrik yerleşim.
- Geçici, özgün, sprite tabanlı mobilya ve kurucu karakteri çiz.
- Phaser ile React HUD beraber çalışsın; tarayıcı yeniden boyutlandırmayı desteklesin.

**Kabul:** 1280×720 ve 844×390 test ekranında arayüz taşmıyor; oda ve karakter görünür; screenshot kaydediliyor.

### Görev C — Ekonomi ve bordro
- Saf TypeScript oyun durumu, komutlar ve validasyonlar.
- Sözleşme kabul, tek sefer ödeme, sonraki ay, kayıt/yükleme.
- Kullanıcı hataları için açıklayıcı mesajlar.

**Kabul:** Aynı ay iki kez ödeme yapılamıyor; para negatif veya `NaN` olmuyor; yükleme aynı veriyi getiriyor.

### Görev D — Otomatik doğrulama ve rapor
- Vitest ile birim testleri: ilk durum, sözleşme, tamamlanma, duplicate engeli, ay ilerletme, bozuk kayıt.
- Playwright ile kullanıcı akışı; masaüstü ve mobil yatay viewport ekran görüntüsü.
- `docs/VERIFICATION_REPORT.md`: gerçekten çalıştırılan komutlar, sonuçlar, ekran görüntüleri, eksikler.
- Bir PR oluştur; çalıştırılmamış testleri 'başarılı' diye raporlama.

**Kabul:** Build ve birim testleri geçiyor; E2E testinde tam bordro akışı başarıyla tamamlanıyor; iki viewport screenshot'ı mevcut.

## 8. Bitirme koşulları — Go/No-Go

| Ölçüt | Geçme koşulu |
|---|---|
| Kurulum | Codex Cloud'da çalışır geliştirme ortamı |
| Derleme | `npm run build` başarılı |
| Oyun | Sözleşme → işlem → ödeme → yeni ay akışı tamam |
| Kayıt | Sayfa yenilenince ilerleme korunuyor |
| Görsel | İzometrik oda ve kurucu, tutarlı derinlik |
| UI | 1280×720 ve 844×390 taşma yok |
| Test | Birim ve E2E testleri başarılı; rapor var |
| Lisans | Dış asset varsa kaynak ve kullanım izni belgeli |

Üç veya daha fazla temel kriter karşılanmıyorsa yeni özellik eklemek yerine önce teknik altyapı düzeltilir. Mobil gerçek cihaz testi, sonraki ayrı kapıdır; viewport testi cihaz performansını kanıtlamaz.

## 9. Prototip başarılı olursa

- **Sprint 2:** Gerçek 2D asset boru hattı: CC0 3D mobilya → Blender ile ortografik render → şeffaf PNG; tek tip pivot ve atlas.
- **Sprint 3:** Kurucu karakterin basit animasyonu, daha iyi zemin/duvar katmanları, dokunmatik kontrol ve gerçek telefonda test.
- **Sprint 4:** Seviye 2, Tekin Abi ve ilk operasyon çalışanı; masa paylaşımı.
- **Sonra:** GDD v1.1'in seviye ve ekonomi sistemleri; paketleme fizibilitesi için Electron/Capacitor spike.

## 10. Codex Cloud'a doğrudan gönderilecek görev

> Aşağıdaki metni tek parça olarak Codex Cloud görev alanına yapıştır. Bu dokümanı da depoya `docs/CODEX_WEB_PROTOTYPE_BRIEF_v0.1.md` olarak ekle.

```text
You are the lead engineer building a small browser-playable technical prototype for Payroll Tycoon.

Read docs/CODEX_WEB_PROTOTYPE_BRIEF_v0.1.md carefully and implement only its specified prototype scope.

Use Phaser 4, React, TypeScript and Vite. Verify the installed stable versions and use an official template where practical. Keep game simulation independent from rendering and UI. Implement the playable Level 1 loop: one founder in a small 2D isometric office, accept Atlas Kırtasiye as customer, complete simplified paper payroll steps, collect payment exactly once per month, advance month, and persist progress across reloads.

Implement desktop and landscape-mobile responsive layouts, with Playwright screenshots for 1280x720 and 844x390. Write Vitest unit tests for the simulation and Playwright E2E coverage for the complete loop. Use only original placeholder sprites or correctly licensed assets; do not add real 3D or backend. The visual direction is stylized 2D isometric low-poly appearance using the Payroll Blue / Warm Office palette.

Create/update AGENTS.md and README.md. Execute npm install, build, unit tests and E2E tests in the actual environment. Fix failures rather than merely documenting them where feasible. Create docs/VERIFICATION_REPORT.md with exact tested commands/results, screenshot paths, blockers, and unverified platform claims. Do not claim mobile native or Steam builds work: they are out of scope.

Commit changes to a feature branch and open a PR if the GitHub connection allows it. Keep the result small, maintainable and playable.
```

## 11. Kullanıcı için pratik başlangıç

1. GitHub'da boş ve özel `payroll-tycoon` deposu aç.
2. Bu Markdown belgesini `docs/CODEX_WEB_PROTOTYPE_BRIEF_v0.1.md` adıyla depoya koy (ya da Codex görevine dosya olarak ver).
3. Codex Cloud'da repository ve environment seç.
4. Bölüm 10'daki görevi çalıştır.
5. Çıktıda PR, çalışan demo/preview, iki ekran görüntüsü ve doğrulama raporunu incele.

**Karar notu:** Web-first yaklaşımı, ancak bu prototipin gerçek çalışması ve yatay mobilde kullanılabilirliği doğrulandıktan sonra ana üretim mimarisi olarak sabitlenecek.

## Kaynaklar

- Phaser, resmî kurulum ve şablonlar: https://www.phaser.io/oss/docs/phaser/getting-started/installation
- Phaser React/Vite proje şablonları: https://phaser.io/oss/docs/phaser/getting-started/project-templates
- Phaser + Capacitor mobil paketleme yaklaşımı: https://phaser.io/tutorials/bring-your-phaser-game-to-ios-and-android-with-capacitor
- Playwright screenshot testi: https://playwright.dev/docs/screenshots
