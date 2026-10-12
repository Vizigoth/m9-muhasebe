# M9 Muhasebe — Proje Kuralları

Bentas Design System (`C:\Users\necip\Desktop\Bentas-Design-System`) bileşenleriyle kurulan
B2B muhasebe uygulaması. Bu dosya, o projeyle paylaşılmayan — bu projeye özgü veya önceki
oturumlarda gerçekten hata yapılmış — kuralları taşır. Genel `--bt-*` token/component kuralları
için Bentas Design System'in kendi `CLAUDE.md`'sine bakılır (orası kaynak, burası onu tekrar etmez).

## bt-window içine input koyarken: Design Examples'ın kendi demo alanlarına GÜVENME

`foundations/design-examples` sayfasındaki "Form Panel" örneği, kendi `.bt-win-input`/
`.bt-win-dropdown`/`.bt-win-datepicker` sistemini kullanıyor — bu, Base Input mimarisiyle
(`.bt-input`/`.bt-textbox`/`.bt-dropdown`/`.bt-datepicker`, uygulamanın HER YERİNDE kullanılan
gerçek component'ler) **PAYLAŞILMAYAN**, SADECE o tek demo panelinde yaşayan, basitleştirilmiş
bir alternatif set — gerçek TextBox/Dropdown/DatePicker/Textarea component'leri DEĞİL. Bir
kere bu projede bt-window içine bu sahte alanlar kondu, kullanıcı düzeltti.

**Kural**: bt-window İÇİNE bir input koyarken önce o input TÜRÜNÜN KENDİ component sayfasına
(`components/textbox`, `components/dropdown`, `components/date-picker`, `components/textarea`)
bak, Design Examples'ın kendi örneğine güvenme — gerçek mimariyi `js/components.js`'teki
`winFieldHtml`/`winReadonlyFieldHtml`/`winDropdownHtml`/`winDateHtml`/`winTextareaHtml`
(hepsi gerçek component'lere taşındı, 2026-10-08) zaten taşıyor, yeni bir form alanı
eklerken bunları kullan/genişlet — `.bt-win-*` class'larını YENİDEN icat etme.

## İkon boyutlandırma — TEK bir kural yok, component'e göre değişir

Bentas Design System'in "her zaman `.bt-icon` wrapper kullan" kuralı **sadece bazı bağlamlar
için geçerli**. Bu projede birkaç kez (toolbar butonları, Hub Sidebar) bu kural körü körüne
her yere uygulanıp hatalı boyutlara yol açtı. Gerçek kaynak kodda (`pages-web.js`) component'e
göre iki FARKLI desen var:

| Bağlam | Desen | Gerçek boyut |
|---|---|---|
| Input/SearchBox controls (`.bt-input__controls`, clear/filter button) | `<span class="bt-icon">{svg}</span>` — svg'ye width/height **yazılmaz**, `.bt-icon svg{width:16px;height:16px}` CSS'i zorluyor | wrapper 24×24, svg görsel 16×16 |
| Button (`.bt-btn`) ikonu | Wrapper **yok** — svg doğrudan buton içine, boyut svg'nin **kendi** `width`/`height` attribute'unda | 16×16 (gerçek sayfa instance'ları — docs'un kendi demo'su farklı/keyfi 14×14 kullanıyor, ona güvenme) |
| Grid satır menüsü (`.bt-grid__menu-item-icon`) | Wrapper var ama CSS svg boyutunu **zorlamıyor** — svg'nin kendi width/height'ı şart | 16×16 |
| Hub Sidebar Controls (`.sbx-btn`) / Drawer Item (`.sbx-item-icon`) | Wrapper var ama CSS svg boyutunu **zorlamıyor** — svg'nin kendi width/height'ı şart | **14×14** (bkz. aşağıdaki uyarı — 24 DEĞİL) |

**Kural**: Yeni bir ikon eklerken önce o component'in CSS'inde wrapper class'ının
(`.bt-icon`, `.bt-grid__menu-item-icon`, `.sbx-item-icon`, `.sbx-btn` vb.) svg boyutunu
GERÇEKTEN zorlayıp zorlamadığını kontrol et (`<wrapper> svg { width: …; height: … }` kuralı
styles.css'te var mı — yoksa güvenme). Varsa svg'ye width/height **yazma**, wrapper'a güven.
Yoksa svg'nin **kendisine** explicit `width`/`height` yaz — wrapper'ın kendi boyutu (24×24,
32×32 vb.) seni yanıltmasın, içindeki svg'nin gerçek intrinsic boyutu ayrı bir şeydir.

**ÖNEMLİ UYARI (Hub Sidebar'da gerçekten yaşandı, iki kez yanlış yapıldı):** Wrapper CSS'i
svg boyutunu zorlamıyorsa, boyutu Figma'nın ham Tailwind pikselinden de türetme — Figma'nın
"Icon/placeholder" gibi genel/geçici bir component'i design dosyasında büyük (örn. 24×24)
görünebilir ama GERÇEK, zaten kodlanmış implementasyon bambaşka bir boyut seçmiş olabilir
(Hub Sidebar'da `pages-web.js`'teki gerçek `sbxIconPlaceholder` sabiti `width="14" height="14"`
— Figma'nın 24px'i değil). **Önce o component'in `pages-web.js`'teki GERÇEK ikon sabitine
bak** (örn. `sbxIconPlaceholder`, `_btnIcon`, `_gridIconEditItem`) — o, bu projede zaten
üzerinde anlaşılmış/doğrulanmış otorite; Figma'nın ham pikseli sadece o sabit yoksa/yeni bir
component içinse başvurulacak ikinci kaynak.

## Data Table — `.bt-grid-container` DEĞİL, `.bt-grid-actions-container` kullan

Grid'i çok satır/geniş kolon içeren GERÇEK bir uygulama ekranında (bizim app.html gibi,
docs'un dar playground önizlemesi değil) kullanırken `.bt-grid-container` class'ı **kullanma**
— temel container'ın `.bt-grid__body`'si `overflow:auto` (hem x hem y) taşıyor, bu geniş
kolonlarla (toplam container genişliğini aşan) çift/senkronsuz yatay scrollbar'a VE kolon
resize sonrası son kolonun body hücrelerinin kaybolmasına yol açıyor — temel container bu
senaryoda hiç test edilmemiş gibi duruyor. Bunun yerine **`.bt-grid-actions-container`**
kullan (Bentas DS'te "Data Table Actions" sayfası için 2026-08-14'te 3 iterasyonda
kanıtlanmış/Playwright ile doğrulanmış çözüm — `design.md`'deki "Data Table Actions'ta çift
scrollbar..." notuna bak): `.bt-grid__body`'de sadece `overflow-y:auto` + `.bt-grid-scroll-x`'e
`display:flex`. Tek eksik: `.bt-pl-body .bt-grid-container{border-radius}` kuralı o class'a
özel, `.bt-grid-actions-container`'a uygulanmaz — kendi sayfanda `#senin-id{border-radius:
var(--bt-radius-sm,4px)}` ile ayrıca ver.

**Kendi CSS akıl yürütmenle (overflow-x:hidden gibi) yama yapma** — teorik olarak makul
görünse de (bir kere burada denendi, YENİ bir bug'a yol açtı: son kolon body'de tamamen
kayboldu) önce `design.md`/`HISTORY.md`'de aynı sınıf sorunun zaten çözülüp çözülmediğine bak.

## Figma'yı asla hafızadan/önceki fetch'ten yorumlama

Bu projede birden fazla kez aynı node "tekrar incele" dendiğinde önceden gözden kaçırdığım
veya yanlış varsaydığım detaylar çıktı: header font (16px/400 — ben pattern'in jenerik
18px/600'ünü kullanmıştım), toolbar SearchBox tipi (Advanced Filtered — ben Basic kullanmıştım),
buton/ikon boyutları, Hub Sidebar'ın rail/drawer ilişkisi. **Kural**: bir ekran/bileşen
hakkında konuşulduğunda FRESH bir `get_design_context`/`get_metadata`/`get_variable_defs`
çağrısı yap — önceki konuşmadaki varsayımı veya genel docs sayfasındaki (farklı bir node'un)
örneğini o spesifik instance için doğru sanma. Generic pattern sayfaları (`patterns/page-layouts`,
`components/sidebar` docs demo'su) gerçek uygulama ekranlarıyla BİREBİR aynı olmayabilir —
her zaman spesifik Figma node'una (bu projenin ekranına ait olana) bak.

## Hub Sidebar — birden fazla uygulamanın ortak kabuğu (Bentas DS dokümanında açıkça yazmaz)

Bu, kullanıcının sözlü anlattığı, Figma node yapısından/metadata'sından tek başına
çıkarılamayan bir kavram:

- **Sidebar Top'taki logo** (40×40) = hub-geneli marka — statik, tıklanmaz.
- **Rail ortasındaki İKİNCİ, küçük logo** (36×36, Figma'da literal katman adı **"Logo"**) =
  BU uygulamanın (M9 Muhasebe) kendi simgesi — tıklanınca SADECE bu uygulamanın drawer'ını
  açar/kapatır (`window._sbxToggle()`).
- **Rail'in diğer ikonları** (Uygulamalar/dashboard, Bildirimler/bell, Takvim/calendar,
  Favoriler/star, Diğer Uygulamalar/grip, Profil/user) hub-geneli kısayollar — drawer
  içeriğiyle İLİŞKİLİ DEĞİL, ayrı hedeflere gider (henüz backend/routing yok,
  `window._sbxHubAction(name)` sadece console.log yapan bir stub).
- **Drawer HER ZAMAN bu uygulamanın sabit nav listesini gösterir** — hangi rail ikonuna
  tıklandığından bağımsız.
- `js/components.js`'teki `renderSidebar(drawerItems, drawerBottomItems, variant)` rail'i
  parametre ALMAZ (hub-geneli, fonksiyon içinde sabit) — sadece bu uygulamanın kendi drawer
  nav listesini alır. Rail'e yeni bir hub-geneli ikon eklemek gerekirse `renderSidebar`'ın
  içini değiştir, `app.js`'ten değil.

## Proje durumu / henüz yapılmayanlar

- Login (`index.html`) backend'e bağlı değil — submit doğrudan `app.html`'e yönlendiriyor.
- Ekranlar hash route'larıyla açılıyor (`js/router.js`): her drawer yaprak item'ının `id`'si
  bir route, ekranlar `js/screens/*.js` içinde `M9_SCREENS[route] = { title, render(toolbar, body) }`
  olarak kaydoluyor ve `app.html`'e script olarak ekleniyor. Şu an sadece
  Fiş Listesi yazıldı — üç route'tan açılıyor: `yevmiye-fis-listesi-ly1` / `-ly2` / `-ly3` (aynı
  liste ve veri, kayıt window'unun üç layout denemesi; `M9_FIS_WINDOW_LAYOUTS` ile seçiliyor —
  her layout `{ render, footer?, summary? }`). Diğerleri "henüz hazırlanmadı" placeholder'ı.
  (2026-10-12'de yeniden numaralandı: eski Ly1 → Ly2, eski Ly2 → Ly3, yeni Ly1 eklendi.)
  - **Ly1**: Ly2 ile aynı gövde ama summary şeridi YOK — toplamlar grid footer'ında.
    Hareketler toolbar'ında "Toplamlar" butonu (Σ ikonu; eski adı "Görünüm", UX değerlendirmesiyle değişti) → Overflow Menu, içinde "Toplam Satırı" switch'i
    (footer'ı gizler/gösterir, localStorage `m9.ly1.footer`), altında "Hesaplanan Alanlar" bölümünde
    her footer aggregate'i için ayrı switch — DS "Overflow Menu Switches Icons" varyantı BİREBİR
    (sol ikon = aggregate türü Σ/÷/#/↓/↑, label = kolon adı, ek CSS YOK;
    `btGridFooterSetAgg`, gizlenenler localStorage `m9.ly1.footerHidden`). Ana switch kapalıyken
    alan switch'leri Off · Disabled görünür (kullanıcı kararı — footer kapalıyken hiçbir alan açık
    görünmesin); her alanın tercihi localStorage'da saklı kalır, ana switch açılınca geri gelir. Liste genişliği DS formülüyle
    (`OVF_LIST_BASE_WIDTH` 160 + slot başına 32 → 224px). DS component'ini ek CSS ile EZME —
    bir kere label/açıklama sağa-sola yaslanıp DS dışına çıkıldı, kullanıcı düzeltti.
    Grid footer DS'te YOK, bu projede tasarlandı — Telerik Grid'in GridAggregates/FooterTemplate
    modelinden uyarlandı (kullanıcı referans olarak paylaştı, birebir değil): kolon tanımında
    `footer: { aggregate: 'sum'|'avg'|'min'|'max'|'count', label?, decimals? }` (dizi = alt alta
    satırlar), hesaplamayı grid yapar (`btGridFooterUpdate` — GÖRÜNEN/filtrelenmiş satırların
    hücre değerleri; render, InCell commit ve filtre sonrası çağrılır). Hücrede etiket,
    yanında değer (yan yana, etiket solda / değer sağda; text stilleri summary ile aynı, değer 0/yoksa muted). Hareketler'de `M9_HAREKET_FOOTER`: Sıra=count, tutarlar=sum, Kur/Birim Fiyatı=avg.
    CSS app.html `.bt-grid__footer*`. Kullanıcı
    onayından sonra DS'e taşınmaya aday.
  - **Ly2** (Figma 1738:135102): solda Segmented Tab'lı form (Fiş / E-Defter), sağda Hareketler,
    altta summary şeridi. Hareketler toolbar'ında Ly1 ile AYNI Toplamlar menüsü: ana switch
    "Toplam Alanı" (şeridin tamamı), "Hesaplanan Alanlar"da summary'nin 4 alanı (Σ toplamlar,
    terazi bakiyeler). **Summary kolon özeti DEĞİL** — yalnızca belirli fiş hesaplamaları:
    Hesap Bakiyesi / Toplam Kur / Toplam Tutar / Toplam Bakiye (`M9_HAREKET_SUMMARY`, Ly2 ve Ly3
    ortak). Bir kere tüm kolon toplamları summary'ye taşındı, kullanıcı düzeltti: kolon özeti
    Ly1'deki grid footer'ının işi. Gizlenen item'ın ayracı da kalkar, hiç item kalmazsa şerit
    gizlenir. Ortak yapı: `M9_TOTALS` (footer / summary hedefi, layout'un `totals` alanı),
    tercihler layout başına ayrı localStorage (`m9.ly1.footer*` / `m9.ly2.summary*` /
    `m9.ly3.summary*`). Ly3'te de aynı Toplamlar menüsü summary'yi yönetir (Ly2'yle aynı
    davranış, ayrı tercih). Kayıt (count) aggregate'inin etiketi her yerde
    "Kayıt Sayısı" (`_GRID_AGG_LABELS.count`).
  - **Ly3** (Figma 1782:281034, 2026-10-12 revizyonu): üstte Fiş Bilgileri (5 kolon × 2 satır +
    tam genişlik Açıklama; Kullanıcı alanı yok, Giriş/Son Güncelleme DatePicker Read Only) ile
    E-Defter (2 kolon, Açıklama düzenlenebilir) kartları yan yana (`.m9-ly3-row`, 1167fr/647fr,
    eşit yükseklik; gövde <1360px'te alt alta), altta Hareketler + summary. Kartlar sabit (aç/kapa
    yok). Eski daraltılabilir kart kodu (Figma 1752:165085 — başlık tıklanır, kapalıyken özet,
    localStorage) duruyor: `_m9Ly3CardHtml`'e `collapsed` verilince geri gelir; kullanıcı
    daraltılabilir versiyonu ayrıca deneyecek. Ly3'e özel: Toplam Bakiye ≠ 0 kırmızı.
  - Ortak: window toolbar (sığmayan butonlar Overflow Menu'ye), Hareketler kartı
    (`_m9HareketlerCardHtml`), summary şeridi (formüller VARSAYIM, bkz. `M9_HAREKET_SUMMARY`).
  - Hareketler araması (3 layout ortak): SearchBox metni tüm alanlarda "içerir" (hızlı arama);
    Filter butonu → "Detaylı Arama" bt-window (sm, `m9OpenDetailSearch`) — grid'in 41 alanı
    input (metin/sayı içerir, tarih dd/mm/yyyy içerir, dropdown birebir, "Tümü" = yok), yazdıkça
    canlı filtreler; 2 kolon, mantıksal sıra (`M9_DETAIL_SEARCH_LAYOUT`: çiftler yan yana, uzun
    alanlar tam genişlik); header'da Uygula + sağında more (⋯) Overflow Menu'de Temizle. Tutarlar virgülle de aranır.
    Grid motoruna `host._btRowFilter` kancası eklendi (btGridApplyFilters kolon filtreleriyle
    VE'ler). Aramadayken Ekle'yle gelen satır görünür kalır; Fiş Detayı her açılışta arama
    sıfırlanır. Ly1 footer'ı arama sonucunu toplar (summary hep tüm satırlar). Açık nokta:
    aktif detaylı arama SearchBox'ta görsel olarak belirtilmiyor (DS'te filter butonu aktif
    state'i yok — kullanıcıya soruldu).
  - Overflow Menu (`renderOverflowMenu`) artık switch/checkbox toggle item'ı (`toggle`, `on`,
    `desc`, `disabled`; `{ group: 'Başlık' }` ile yeni section + Group Label;
    DS `btOvfToggle`, menü açık kalır) ve metinli tetikleyici (`triggerLabel`/`triggerIcon`) destekliyor.
    Dikkat: `btToolbarFitOverflow` (window toolbar ResizeObserver) AÇIK TÜM overflow menüleri
    kapatır — headless screenshot'ta menü bu yüzden görünmez, testte `_btOvfCloseAll`'ı etkisizleştir.
  - Kart başlıkları kullanıcı isteğiyle Title/sm/Medium (Figma'da md/Medium).
- **Hareketler grid'i InCell editKind'ları** (`js/components.js` gridCellHtml, kolona `editable`
  + `editKind`): TextBox (varsayılan; `inputType: 'decimal'|'amount'|'integer'` ile sadece rakam —
  `amount` = para tutarı: Borç/Alacak/Kur Fiyatı/Birim Fiyatı/KDV/Ba-Bs tutarları, en fazla
  2 ondalık yazılır, commit'te her zaman 2 ondalığa tamamlanır: 500 → 500.00; Miktar `decimal`),
  `lookup` (Select LookUp → sm window, `M9_LOOKUPS`: Cari (Cari Numarası+Ünvan — iki kolon aynı pencereyi açar, seçim ikisine birden yazılır) / Hesap Kodu+Ad / Maliyet Merkezi;
  satıra TEK tıklama = seçim, Seç butonu yok), `dropdown` ve `date` (liste/takvim body'ye
  portal'lı `.bt-grid-popover`'da; dropdown açıkken DS'teki `bt-input--active` + 12×7 chevron).
  İç içe window z-index: lookup overlay 1001 / window 1002, popover + overflow menü 1010.
- **Açık noktalar / varsayımlar (kullanıcı onayı bekliyor):** Kur ve Evrak Tipi dropdown
  seçenekleri, E-Defter Ödeme/Evrak Türü listeleri, lookup örnek listeleri (veritabanı yok),
  summary formülleri, window toolbar butonlarının işlevi (stub), Açıklama alanlarının salt-okunur
  olması. Önerilmiş ama yapılmamış: kaydetmeden kapatma koruması, grid'de klavye gezinmesi,
  binlik ayırıcı / Türkçe sayı biçimi (1.234,56), DatePicker hücresine de Active state.
- **Frozen kolonlu grid'lerde scroll** (`#m9Grid`, `#m9DetailGrid`, app.html): sticky hücreler
  için `.bt-grid__body` overflow visible olmak ZORUNDA — bu, DS'in "body kendi içinde dikey kayar"
  düzeltmesini (c6669e5) devre dışı bırakıp header'ı satırlarla birlikte kaydırıyordu (2026-10-09'da
  fark edildi). Çözüm: iki eksende TEK scroll container `.bt-grid-scroll-x` (overflow:auto), header
  satırı `position:sticky; top:0; z-index:6`, `.bt-grid` `flex:1 0 auto` (içeriği kadar uzar —
  sticky ebeveyninden çıkamadığı için, yoksa en alta kaydırınca header kaybolur). Yeni bir frozen
  grid eklerken bu üç kuralı ona da ver.
- Drawer'ın alt (Drawer Buttom) öğesi Figma'da henüz "Drawer Item Label" placeholder'ı —
  "Ayarlar" varsayıldı, kesinleşmedi.
- Drawer item ikonları Figma'da henüz atanmamış (hepsi aynı bracket/scan placeholder) —
  gerçek ikon atanana kadar `icoDrawerItemPlaceholder` kullanılıyor.
- Data table engine (`js/components.js`'teki grid fonksiyonları) Bentas DS'in gerçek,
  çalışan sort/filter/resize/satır-seçim mantığını taşıyor — docs-demo'nun sahte verisi yok,
  `renderDataTable(columns, rows, opts)` gerçek veriyle çağrılmak üzere genelleştirildi.
  InCell Editing taşındı (editKind'lar yukarıda) — commit sonrası hücreden `btgridcelledit`
  event'i ({ rowIndex, field, value }) bubble eder, sayfa kendi `rows[]`'unu oradan günceller.
  Inline (satır) Editing ve Switch/Dropdown trailing-leading kind'ları hâlâ kapsam dışı
  (gerektiğinde aynı yöntemle `pages-web.js`'ten taşınabilir).
