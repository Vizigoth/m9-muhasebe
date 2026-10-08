# M9 Muhasebe — Proje Kuralları

Bentas Design System (`C:\Users\necip\Desktop\Bentas-Design-System`) bileşenleriyle kurulan
B2B muhasebe uygulaması. Bu dosya, o projeyle paylaşılmayan — bu projeye özgü veya önceki
oturumlarda gerçekten hata yapılmış — kuralları taşır. Genel `--bt-*` token/component kuralları
için Bentas Design System'in kendi `CLAUDE.md`'sine bakılır (orası kaynak, burası onu tekrar etmez).

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
| Hub Sidebar Controls (`.sbx-btn`) / Drawer Item (`.sbx-item-icon`) | Wrapper var ama CSS svg boyutunu **zorlamıyor** (flex-center + sabit konteyner boyutu) — svg'nin kendi width/height'ı şart | 24×24 (konteyner 32×32, 4px padding) |

**Kural**: Yeni bir ikon eklerken önce o component'in CSS'inde wrapper class'ının
(`.bt-icon`, `.bt-grid__menu-item-icon`, `.sbx-item-icon`, `.sbx-btn` vb.) svg boyutunu
GERÇEKTEN zorlayıp zorlamadığını kontrol et (`<wrapper> svg { width: …; height: … }` kuralı
styles.css'te var mı — yoksa güvenme). Varsa svg'ye width/height **yazma**, wrapper'a güven.
Yoksa svg'nin **kendisine** explicit `width`/`height` yaz — wrapper'ın kendi boyutu (24×24,
32×32 vb.) seni yanıltmasın, içindeki svg'nin gerçek intrinsic boyutu ayrı bir şeydir.

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
- Drawer'daki gerçek nav item'ları (Kayıt Listesi/Hesap Planı Listesi/Günlük Kur Bilgisi/
  Hesap Planı Maliyet Merkezi/Sermaye Listesi/İştirak Listesi — Figma'dan birebir) şu an
  hepsi aynı `app.html`'e işaret ediyor; her biri kendi sayfasına kavuşunca `onClick`'ler
  güncellenecek.
- Drawer'ın alt (Drawer Buttom) öğesi Figma'da henüz "Drawer Item Label" placeholder'ı —
  "Ayarlar" varsayıldı, kesinleşmedi.
- Drawer item ikonları Figma'da henüz atanmamış (hepsi aynı bracket/scan placeholder) —
  gerçek ikon atanana kadar `icoDrawerItemPlaceholder` kullanılıyor.
- Data table engine (`js/components.js`'teki grid fonksiyonları) Bentas DS'in gerçek,
  çalışan sort/filter/resize/satır-seçim mantığını taşıyor — docs-demo'nun sahte verisi yok,
  `renderDataTable(columns, rows, opts)` gerçek veriyle çağrılmak üzere genelleştirildi.
  Inline/InCell Editing ve Avatar/Switch/Dropdown trailing-leading kind'ları bilinçli olarak
  v1 kapsamı dışı (gerektiğinde aynı yöntemle `pages-web.js`'ten taşınabilir).
