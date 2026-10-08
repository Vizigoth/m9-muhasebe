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

/* ── Data Table ───────────────────────────────────────────────
   Bu ekranın gerçek veri modeli (Cari Hesaplar / Faturalar / vb.)
   henüz tanımlanmadı — kolonlar Figma'nın genel 4-kolon şablonunu
   birebir yansıtıyor. Gerçek entity belirlenince `columns`/`rows`
   burada değiştirilecek, renderDataTable'ın kendisi dokunulmadan
   kalabilir. */
const columns = [
  { field: 'col1', headerText: 'Sütun 1', headerCheckbox: true, cellLeading: 'checkbox', sort: true, filter: true, fillWidth: true, width: 200 },
  { field: 'col2', headerText: 'Sütun 2', sort: true, filter: true, fillWidth: true, width: 200 },
  { field: 'col3', headerText: 'Sütun 3', sort: true, filter: true, fillWidth: true, width: 200 },
  { field: 'col4', headerText: 'Sütun 4', fillWidth: true, width: 200, cellTrailing: 'button', trailingOpts: () => ({}) },
];
const rows = []; // Kayıt yok → Figma'daki "No Record Available" durumu.

document.getElementById('m9Grid').innerHTML = renderDataTable(columns, rows, { emptyText: 'Kayıt bulunamadı' });
