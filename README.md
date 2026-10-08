# M9 Muhasebe

Pure HTML/CSS/JS B2B muhasebe uygulaması — [Bentas Design System](https://github.com/Vizigoth/Bentas-Design-System)
bileşenleri üzerine kurulu. Build adımı yok, doğrudan tarayıcıda açılır.

## Yapı

```
index.html        → Giriş (login) sayfası
app.html           → Uygulama kabuğu (Hub Sidebar + Page Header + Toolbar + Data Table)
css/styles.css     → Design system token + component CSS (Bentas Design System'den birebir kopya — kaynak: docs/css/styles.css)
js/components.js   → Reusable component davranışları (Badge, TextBox/SearchBox, Hub Sidebar, Data Table — sort/filter/resize/satır seçimi)
js/app.js          → app.html'e özel kablolama (sidebar menüsü, toolbar, tablo kolonları)
```

## Design System bağlantısı

- **Token prefix:** `--bt-*` (primitif + semantik + alias) — `css/styles.css` tek doğruluk kaynağıdır (snapshot, Bentas Design System'deki `docs/css/styles.css` ile birebir).
- **Fontlar:** Geist (Google Fonts, `index.html`/`app.html` içinde yüklü).
- **İkonlar:** Lucide (inline SVG, `.bt-icon` wrapper — bkz. Bentas Design System `CLAUDE.md`).
- `js/components.js` içindeki Data Table/Badge/TextBox davranışları Bentas Design System'in `docs/js/pages-web.js` dosyasından taşındı; docs-sitesine özel sahte demo verisi (hardcoded isim/tablo listesi) İÇERMEZ — `renderDataTable(columns, rows)` gerçek proje verisiyle çağrılacak şekilde genelleştirildi.

### Güncelleme akışı

Bentas Design System'de yeni bir component eklendiğinde / mevcut bir component değiştiğinde:

1. `css/styles.css`'i Bentas Design System'deki `docs/css/styles.css` ile senkronize et (şu an için manuel kopya — otomatik bir sync script'i yok).
2. `js/components.js`'e yeni component'in davranışını (varsa) aynı "gerçek veriyle çalışır, docs-demo'suz" prensibiyle taşı.

## Sayfa Şablonu — Page Layouts pattern

`app.html`, Bentas Design System'in `patterns/page-layouts` sayfasındaki **List Layout**
pattern'ini kullanır (`.bt-pl-frame` / `.bt-pl-main` / `.bt-pl-header` / `.bt-pl-toolbar` /
`.bt-pl-body` — CSS zaten `css/styles.css` içinde hazır). Yeni bir liste ekranı eklerken bu
dosyayı kopyalayıp `js/app.js`'teki `columns`/`rows` tanımını değiştirmek yeterli.

## Durum

İskelet aşaması — ilk ekran Figma "M9 Design" sayfasındaki genel 4-kolon şablonunu birebir
yansıtıyor (gerçek bir muhasebe varlığına henüz bağlanmadı: Cari Hesaplar / Faturalar / Kasa-Banka
gibi gerçek sayfalar sırada). Giriş sayfası henüz gerçek bir kimlik doğrulama servisine bağlı değil.
