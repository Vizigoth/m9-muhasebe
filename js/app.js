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
   Satırlar Figma'daki 6 örnek satırla birebir (hepsi aynı mockup verisi,
   Figma'nın kendisinde de 6 satır birbirinin kopyası) — bu yüzden gerçek
   bir kayıt setini DEĞİL, Figma'nın kendi görsel-tamamlanmış örneğini
   yansıtıyor. "Önceki Numarası" ve "Madde Numarası" kolonlarının hücre
   değeri Figma'da hâlâ kendi başlık metnini taşıyor (doldurulmamış
   kalmış, Figma'nın kendi eksikliği) — birebir aynen yansıtıldı. */
const columns = [
  { field: 'fisNo',       headerText: 'Fiş Numarası',     headerCheckbox: true, cellLeading: 'checkbox', filter: true, width: 215 },
  { field: 'fisTipi',     headerText: 'Fiş Tipi',         filter: true, width: 146 },
  { field: 'fisTarihi',   headerText: 'Fiş Tarihi',       filter: true, width: 174 },
  { field: 'oncekiNo',    headerText: 'Önceki Numarası',  filter: true, width: 136 },
  { field: 'maddeNo',     headerText: 'Madde Numarası',   filter: true, width: 142 },
  { field: 'valorTarihi', headerText: 'Valör Tarihi',     filter: true, width: 174 },
  { field: 'islemTuru',   headerText: 'İşlem Türü',       filter: true, width: 174 },
  // Açıklama 455→453: aşağıdaki not — toplam kolon genişliği, .bt-grid-
  // actions-container'ın kendi 1px sol + 1px sağ border'ı (Figma'nın 1840px
  // DataTable ölçüsü bu border'sız bir alanı varsayıyor) için 2px geri
  // veriyor. En az göze batacak, en geniş/esnek kolondan kırpıldı.
  { field: 'aciklama',    headerText: 'Açıklama',         filter: true, width: 453 },
  { field: 'kdv',         headerText: 'KDV%',             filter: true, width: 96 },
  // Kullanıcı — Figma'da "Avatar Control" (28×28, .bt-avatar--xs .bt-avatar--brand)
  // taşıyor, Data Table'ın zaten var olan avatar leading kind'i. İsimden
  // baş harfler türetiliyor (docs'un hardcoded "EG" demo'sunun aksine gerçek
  // satır verisiyle çalışsın diye). fillWidth:true — design system'in kendi
  // kuralı: non-frozen Data Table'larda SON kolon fillWidth taşır ki diğer
  // kolonlar daraltıldığında boşalan alanı dolana kadar genişlesin (bkz.
  // design.md "Email kolonu + tablo tam genişlik fill" notu) — ayrıca son
  // kolonun kendi resize handle'ı yok (Bentas DS'te kasıtlı: handle'ın 3px
  // dışarı taşması gereksiz scrollbar tetikliyor), fillWidth onun yerine
  // otomatik boyutlanmasını sağlıyor. width Figma'daki orijinal 128 —
  // önceki turda "kolonun kendi doğal içeriği 128px'i aşıyor" teorisiyle
  // 150'ye çıkarılmıştı, ama kullanıcı HİÇ resize yapılmamış varsayılan
  // ekranda da aynı (küçük) scroll'un sürdüğünü gösterdi — o teori yanlıştı,
  // geri alındı (bkz. Açıklama'daki 453 notu — asıl fark container border'ı).
  { field: 'kullanici',   headerText: 'Kullanıcı',        filter: true, width: 128, fillWidth: true, cellLeading: 'avatar', leadingOpts: row => ({ initials: m9Initials(row.kullanici) }) },
];
function m9Initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
}
const _m9SampleRow = {
  fisNo: '000001',
  fisTipi: 'Mahsup',
  fisTarihi: '01 / 01 / 2026 09:00:00',
  oncekiNo: 'Önceki Numarası',
  maddeNo: 'Madde Numarası',
  valorTarihi: '01 / 01 / 2026 09:00:00',
  islemTuru: 'Transfer',
  aciklama: 'Tarihli 37 Numarali (CMA) CARI MAHSUP ISLEMLERI (MAH) MAHSUP TIPI HAREKET Evraki  (Belge No/Tarih: 37 23-09-2026) (Sirket/ Isyeri: 10/1)',
  kdv: '18',
  kullanici: 'Emre Göcer',
};
const rows = Array(6).fill(0).map(() => ({ ..._m9SampleRow }));

document.getElementById('m9Grid').innerHTML = renderDataTable(columns, rows, { emptyText: 'Kayıt bulunamadı' });
