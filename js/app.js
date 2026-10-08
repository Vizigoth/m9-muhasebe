/* ============================================================
   M9 MUHASEBE — app.js
   Main Page 1 (Figma "M9 Design") için sayfa-özel kablolama.
   Reusable engine: js/components.js (Bentas Design System'den taşındı).
   ============================================================ */

/* ── Sidebar — Hub Sidebar (Bentas Design System "Sidebar" component,
   Figma "Hub Sidebar Expanded" node 1705:182027). Rail sabit/hub-geneli
   (bkz. js/components.js renderSidebar) — burada sadece BU UYGULAMANIN
   (M9 Muhasebe) drawer nav listesi veriliyor. Etiketler Figma'daki Drawer
   Center item'larıyla birebir (Kayıt Listesi/Hesap Planı Listesi/Günlük
   Kur Bilgisi/Hesap Planı Maliyet Merkezi/Sermaye Listesi/İştirak Listesi);
   ikonlar Figma'da henüz atanmamış (hepsi aynı placeholder), bu yüzden
   burada da verilmiyor — renderSidebar varsayılan placeholder'ı kullanıyor.
   Drawer item sayfaları henüz yok — şimdilik hepsi "Kayıt Listesi" olan
   bu sayfaya (app.html) işaret ediyor, gerçek sayfalar eklenince
   onClick'ler güncellenecek. Alt (Drawer Buttom) öğesi Figma'da henüz
   "Drawer Item Label" placeholder'ı — kesinleşene kadar "Ayarlar" varsayıldı. */
document.getElementById('m9Rail').outerHTML = renderSidebar(
  [
    { label: 'Kayıt Listesi', selected: true },
    { label: 'Hesap Planı Listesi' },
    { label: 'Günlük Kur Bilgisi' },
    { label: 'Hesap Planı Maliyet Merkezi' },
    { label: 'Sermaye Listesi' },
    { label: 'İştirak Listesi' },
  ],
  [
    { label: 'Ayarlar' }, // Figma'da henüz "Drawer Item Label" placeholder'ı — varsayım
  ],
  'collapsed'
);

/* ── Toolbar — Yeni Ekle / Düzenle / Sil + SearchBox (sağa yaslı) ───── */
document.getElementById('m9Toolbar').innerHTML = `
  <button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid">
    ${icoPlus}<span>Yeni Ekle</span>
  </button>
  <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat" id="m9EditBtn" disabled>
    ${icoEdit}<span>Düzenle</span>
  </button>
  <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat" id="m9DeleteBtn" disabled>
    ${icoTrash}<span>Sil</span>
  </button>
  ${renderSearchBox({ advanced: true })}
`;

/* ── Data Table — Kayıt Listesi (fiş/muhasebe kaydı listesi) ────
   Figma "DataTable" (node 1709:188606) ile birebir: 10 sabit-genişlik
   kolon, hepsinde Filter Control (sort YOK — Figma'da hiçbir header'da
   sort ikonu yok), sadece ilk kolonda (Fiş Numarası) select-all checkbox.
   Genişlikler Figma'daki Header Row'un gerçek piksel değerleri (toplam
   1840px — viewport daha darsa .bt-grid-scroll-x yatay scroll sağlıyor).
   Satırlar boş: Figma'nın kendi mockup'ında 6 örnek satır vardı ama bu
   proje henüz bir backend'e bağlı değil — gerçek veri yerine sahte içerik
   koymamak için rows=[] bırakıldı (diğer ekranlarla tutarlı), "No Record
   Available" durumu (Kayıt bulunamadı) gösteriliyor. */
const columns = [
  { field: 'fisNo',       headerText: 'Fiş Numarası',     headerCheckbox: true, cellLeading: 'checkbox', filter: true, width: 215 },
  { field: 'fisTipi',     headerText: 'Fiş Tipi',         filter: true, width: 146 },
  { field: 'fisTarihi',   headerText: 'Fiş Tarihi',       filter: true, width: 174 },
  { field: 'oncekiNo',    headerText: 'Önceki Numarası',  filter: true, width: 136 },
  { field: 'maddeNo',     headerText: 'Madde Numarası',   filter: true, width: 142 },
  { field: 'valorTarihi', headerText: 'Valör Tarihi',     filter: true, width: 174 },
  { field: 'islemTuru',   headerText: 'İşlem Türü',       filter: true, width: 174 },
  { field: 'aciklama',    headerText: 'Açıklama',         filter: true, width: 455 },
  { field: 'kdv',         headerText: 'KDV%',             filter: true, width: 96 },
  { field: 'kullanici',   headerText: 'Kullanıcı',        filter: true, width: 128 },
];
const rows = []; // Kayıt yok → Figma'daki "No Record Available" durumu.

document.getElementById('m9Grid').innerHTML = renderDataTable(columns, rows, { emptyText: 'Kayıt bulunamadı' });
