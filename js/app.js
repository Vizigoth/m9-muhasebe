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
  <button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" id="m9AddBtn">
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
  // frozen — Data Table "Frozen Column" sayfasının aynısı (position:sticky,
  // sağ kenarda yumuşak edge gölgesi, bkz. app.html'deki #m9Grid .bt-grid__body
  // override notu). contentLink + onClick — Figma'da/Bentas DS'te ID benzeri
  // kolonların link olarak kullanıldığı desen (gridTableColumns'daki ID
  // kolonunun contentLink:true'su) — tıklanınca satırın kendi seçim onclick'i
  // TETİKLENMEDEN (stopPropagation, bkz. gridCellHtml) doğrudan kaydı açar.
  { field: 'fisNo',       headerText: 'Fiş Numarası',     headerCheckbox: true, cellLeading: 'checkbox', filter: true, width: 215, frozen: true, contentLink: true, onClick: (row, idx) => `m9OpenRecordWindow(${idx})` },
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

/* ── Toolbar: satır seçimine göre Düzenle/Sil aktif/pasif ───────────
   Data Table engine'inin kendi window.btGridUpdateToolbar'ı (bkz.
   components.js) toolbar'ı bulmak için grid'in bir .bt-grid-panel
   atasını arıyor — bu sayfa onun yerine .bt-pl-* Page Layout deseni
   kullandığı için (toolbar ve grid KARDEŞ, ortak .bt-grid-panel sarıcısı
   yok) o fonksiyon burada hiçbir şey yapmıyordu (sessiz no-op → Düzenle/
   Sil hep disabled kalıyordu). Burada sayfaya özel, basit bir senkron:
   satır click'i önce btGridRowToggle'ı (satırın kendi onclick'i) çalıştırır,
   SONRA bu delege edilmiş listener aynı click event'inin bubble'ında çalışıp
   seçili satır olup olmadığına göre butonları günceller. */
function m9SyncToolbarButtons() {
  const hasSelection = !!document.querySelector('#m9Grid .bt-grid__row--active');
  document.getElementById('m9EditBtn').disabled = !hasSelection;
  document.getElementById('m9DeleteBtn').disabled = !hasSelection;
}
document.getElementById('m9Grid').addEventListener('click', m9SyncToolbarButtons);

/* ── Kayıt detay paneli — bt-window (XL) ─────────────────────────────
   Üç açılış yolu: "Yeni Ekle" (boş kayıt), "Düzenle" veya Fiş Numarası
   linkine/satıra çift tıklama (mevcut kaydı doldurur). Bentas DS'in
   gerçek bt-window bileşeni (XL boyut, 100vw) — renderWindow/winFieldHtml
   js/components.js'te. Alanlar artık düzenlenebilir (readonly kaldırıldı).

   Kaydet butonu — kullanıcı kararı: panel açıldığında (hem mevcut kayıt
   hem yeni kayıt için) HER ZAMAN disabled başlar, panelde herhangi bir
   alan değiştirilene kadar öyle kalır — "işlem yapılmadıysa" kaydedecek
   bir şey yok. İlk input event'inde enable olur (m9SaveBtn.disabled=false).
   Kaydet'e basınca gerçekten `rows`'a yazılır (yeni kayıtta push, mevcut
   kayıtta index'e), grid yeniden render edilir (henüz kalıcı bir backend
   yok — sayfa yenilenince kaybolur). */
document.getElementById('m9WindowMount').outerHTML = renderWindow({
  id: 'm9RecordWindow',
  size: 'xl',
  title: 'Kayıt Detayı',
  headerActions: `<button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" id="m9SaveBtn" disabled onclick="m9SaveRecord()">Kaydet</button>`,
});
let m9EditingIndex = null; // null → Yeni Ekle; sayı → rows[] içindeki mevcut kayıt
function _m9RenderWindowFields(row) {
  const panel = document.querySelector('#m9RecordWindow .bt-window__panel');
  // XL tam genişlik olduğu için alanlar .bt-win-row ile 3'erli gruplanıyor
  // (design system'in kendi .bt-win-row + .bt-win-field deseni) — tek
  // sütunda 10 alan yerine daha gerçekçi/kompakt bir detay formu.
  const fields = columns.map(c => winFieldHtml(c.headerText, c.field ? row[c.field] : ''));
  const rowsHtml = [];
  for (let i = 0; i < fields.length; i += 3) rowsHtml.push(`<div class="bt-win-row">${fields.slice(i, i + 3).join('')}</div>`);
  panel.innerHTML = rowsHtml.join('');
  document.getElementById('m9SaveBtn').disabled = true; // her açılışta sıfırlanır
}
function m9OpenRecordWindow(idx) {
  m9EditingIndex = idx;
  document.getElementById('m9RecordWindow-title').textContent = 'Kayıt Detayı';
  _m9RenderWindowFields(rows[idx]);
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
function m9OpenNewRecordWindow() {
  m9EditingIndex = null;
  document.getElementById('m9RecordWindow-title').textContent = 'Yeni Kayıt';
  const emptyRow = {};
  columns.forEach(c => { if (c.field) emptyRow[c.field] = ''; });
  _m9RenderWindowFields(emptyRow);
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
// Panelde HERHANGİ bir alan değiştirilince Kaydet aktifleşir (delege —
// panel her açılışta yeniden oluşturuluyor, tek tek input'lara değil
// #m9RecordWindow'un kendisine bağlanıyor).
document.getElementById('m9RecordWindow').addEventListener('input', function () {
  document.getElementById('m9SaveBtn').disabled = false;
});
function m9SaveRecord() {
  const panel = document.querySelector('#m9RecordWindow .bt-window__panel');
  const values = Array.from(panel.querySelectorAll('.bt-win-input')).map(inp => inp.value);
  const updatedRow = {};
  columns.forEach((c, i) => { if (c.field) updatedRow[c.field] = values[i]; });
  if (m9EditingIndex == null) rows.push(updatedRow);
  else rows[m9EditingIndex] = updatedRow;
  document.getElementById('m9Grid').innerHTML = renderDataTable(columns, rows, { emptyText: 'Kayıt bulunamadı' });
  m9SyncToolbarButtons(); // yeniden render sonrası seçim sıfırlandı → Düzenle/Sil tekrar disabled
  dexClosePanel('m9RecordWindow', 'm9RecordWindowOv');
}
document.getElementById('m9AddBtn').addEventListener('click', m9OpenNewRecordWindow);
document.getElementById('m9EditBtn').addEventListener('click', function () {
  const activeRow = document.querySelector('#m9Grid .bt-grid__row--active');
  if (!activeRow) return;
  m9OpenRecordWindow(Number(activeRow.dataset.rowIndex));
});
// Satıra çift tıklamak da direkt açar (checkbox/seçim davranışına ek, yaygın grid kısayolu).
document.getElementById('m9Grid').addEventListener('dblclick', function (e) {
  const rowEl = e.target.closest('.bt-grid__row');
  if (!rowEl) return;
  m9OpenRecordWindow(Number(rowEl.dataset.rowIndex));
});
