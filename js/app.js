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
  { field: 'fisNo',       headerText: 'Fiş Numarası',     headerCheckbox: true, cellLeading: 'checkbox', filter: true, width: 160, frozen: true, contentLink: true, onClick: (row, idx) => `m9OpenRecordWindow(${idx})` },
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

/* ════════════════════════════════════════════════════════════════
   KAYIT DETAY PANELİ — bt-window (XL)

   Kullanıcının gerçek Delphi "Fiş" ekranının (ekran görüntüsü, 2026-10-08)
   Bentas Design System diliyle yeniden tasarımı. Orijinal ekran tek bir
   kalabalık label+input ızgarasıydı (20+ alan art arda) + altında geniş
   bir "kalemler" grid'i + en altta bir özet şeridi — burada aynı BİLGİ
   kümesi üç mantıksal karta ayrıldı (winSectionHtml, js/components.js):
     1. "Fiş Bilgileri" — düzenlenebilir ana alanlar (gerçek Dropdown/
        DatePicker/Textarea component'leri — bkz. winDropdownHtml/
        winDateHtml/winTextareaHtml), sistem/audit alanları (Giriş Tarihi,
        Son Değiştirme Tarihi, Kullanıcı) ayrı ve salt-okunur.
     2. "Kalemler" — fişin muhasebe satırları, GERÇEK Data Table engine'i
        (renderDataTable) ile, Kayıt Listesi'nin kendisinden bağımsız
        küçük bir kolon seti.
     3. "Özet" — kalemlerden hesaplanan toplamlar, salt-okunur.
   Bentaş'ın orijinal ekranındaki "Detaylı/Standart" tab'ı ve e-Defter
   şeridi (Ödeme Türü/Evrak Türü/Evrak No) bilinçli olarak bu ilk turda
   kapsam dışı bırakıldı — gerçek iş kuralları netleşince eklenebilir.
   ════════════════════════════════════════════════════════════════ */
document.getElementById('m9WindowMount').outerHTML = renderWindow({
  id: 'm9RecordWindow',
  size: 'xl',
  title: 'Kayıt Detayı',
  headerActions: `<button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" id="m9SaveBtn" disabled onclick="m9SaveRecord()">Kaydet</button>`,
});

const M9_ISLEM_TURU_OPTS = ['Transfer', 'Nakit', 'Çek', 'Senet']; // gerçek liste netleşene kadar varsayım
const M9_FIS_TIPI_OPTS   = ['Mahsup', 'Tahsilat', 'Tediye', 'Diğer']; // aynı şekilde varsayım

/* Örnek "DD / MM / YYYY HH:MM:SS" (mevcut rows verisi) → gerçek DatePicker
   component'inin beklediği "dd/mm/yyyy" (bkz. components.js _calParseDdMmYyyy). */
function m9ParseDate(str) {
  const m = String(str || '').match(/(\d{1,2})\s*[\/\-]\s*(\d{1,2})\s*[\/\-]\s*(\d{4})/);
  if (!m) return '';
  const d = m[1].padStart(2, '0'), mo = m[2].padStart(2, '0'), y = m[3];
  return `${d}/${mo}/${y}`;
}

/* Kalemler — gerçek per-fiş muhasebe satırları henüz bir backend'e bağlı
   değil; mevcut bir kayıt açıldığında kullanıcının ekran görüntüsündeki
   ÖRNEK 2 satır gösteriliyor (hangi kayıt olursa olsun aynı — açıkça bir
   yer tutucu), yeni kayıtta boş başlıyor ("Kalem yok"). */
const M9_DETAIL_COLUMNS = [
  { field: 'hesapKodu',    headerText: 'Hesap Kodu',   width: 160 },
  { field: 'ad',           headerText: 'Ünvan / Ad',   width: 220 },
  { field: 'izahat',       headerText: 'İzahat',       width: 300, fillWidth: true },
  { field: 'borc',         headerText: 'Borç',         width: 100 },
  { field: 'alacak',       headerText: 'Alacak',       width: 100 },
  { field: 'valorTarihi',  headerText: 'Valör Tarihi', width: 130 },
  { field: 'kdvTutari',    headerText: 'KDV Tutarı',   width: 110 },
];
const M9_SAMPLE_DETAIL_ROWS = [
  { hesapKodu: '120-01-01-001-001', ad: 'YURTİÇİ ALICILAR NAKİT', izahat: 'MAH [No : 37] testSELDA 3 AKDENİZ', borc: '0',   alacak: '100', valorTarihi: '23-09-2026', kdvTutari: '0' },
  { hesapKodu: '120-01-22-237-1',   ad: 'XXXX HESABI',            izahat: 'MAH [No : 37] testSELDA 3 AKDENİZ', borc: '100', alacak: '0',   valorTarihi: '23-09-2030', kdvTutari: '0' },
];
let m9DetailRows = [];

function m9RenderDetailGrid() {
  document.getElementById('m9DetailGrid').innerHTML = renderDataTable(M9_DETAIL_COLUMNS, m9DetailRows, { emptyText: 'Kalem yok' });
  const toplamBorc = m9DetailRows.reduce((s, r) => s + (parseFloat(r.borc) || 0), 0);
  const toplamAlacak = m9DetailRows.reduce((s, r) => s + (parseFloat(r.alacak) || 0), 0);
  document.getElementById('m9SumBorc').value = toplamBorc.toFixed(2);
  document.getElementById('m9SumAlacak').value = toplamAlacak.toFixed(2);
  document.getElementById('m9SumBakiye').value = (toplamBorc - toplamAlacak).toFixed(2);
}

let m9EditingIndex = null; // null → Yeni Ekle; sayı → rows[] içindeki mevcut kayıt
function _m9RenderWindowBody(row, detailRows) {
  const body = document.getElementById('m9RecordWindow-body');

  const fisBilgileri = winSectionHtml('Fiş Bilgileri', `
    <div class="bt-win-row">
      ${winFieldHtml('Fiş No', row.fisNo, 'm9f_fisNo')}
      ${winFieldHtml('Önceki No', row.oncekiNo, 'm9f_oncekiNo')}
      ${winDropdownHtml({ id: 'm9f_fisTipi', label: 'Fiş Tipi', value: row.fisTipi, options: M9_FIS_TIPI_OPTS })}
      ${winDropdownHtml({ id: 'm9f_islemTuru', label: 'İşlem Türü', value: row.islemTuru, options: M9_ISLEM_TURU_OPTS })}
    </div>
    <div class="bt-win-row">
      ${winDateHtml({ id: 'm9f_fisTarihi', label: 'Fiş Tarihi', value: m9ParseDate(row.fisTarihi) })}
      ${winDateHtml({ id: 'm9f_valorTarihi', label: 'Valör Tarihi', value: m9ParseDate(row.valorTarihi) })}
      ${winFieldHtml('Madde No', row.maddeNo, 'm9f_maddeNo')}
      ${winFieldHtml('KDV %', row.kdv, 'm9f_kdv')}
    </div>
    ${winTextareaHtml('Açıklama', row.aciklama, 'm9f_aciklama')}
    <div class="bt-win-row">
      ${winReadonlyFieldHtml('Kullanıcı', row.kullanici)}
      ${winReadonlyFieldHtml('Giriş Tarihi', '—')}
      ${winReadonlyFieldHtml('Son Değiştirme Tarihi', '—')}
    </div>
  `);

  // flex:none + sabit height — .bt-grid-actions-container'ın kendi flex:1'i
  // (bir .bt-pl-body gibi TAM YÜKSEKLİK bir flex ebeveyne göre tasarlanmış)
  // burada (bir kartın İÇİNDE, içerik-boyutlu bir context'te) anlamsız/
  // öngörülemez olurdu — sabit bir kalem-listesi yüksekliği için override.
  const kalemler = winSectionHtml('Kalemler', `<div id="m9DetailGrid" class="bt-grid-actions-container" style="flex:none;height:220px;"></div>`);

  const ozet = winSectionHtml('Özet', `
    <div class="bt-win-row">
      ${winReadonlyFieldHtml('Toplam Borç', '0.00', 'm9SumBorc')}
      ${winReadonlyFieldHtml('Toplam Alacak', '0.00', 'm9SumAlacak')}
      ${winReadonlyFieldHtml('Bakiye', '0.00', 'm9SumBakiye')}
      ${winReadonlyFieldHtml('Kontrol No', '0')}
    </div>
  `);

  body.innerHTML = fisBilgileri + kalemler + ozet;
  m9DetailRows = detailRows;
  m9RenderDetailGrid();
  document.getElementById('m9SaveBtn').disabled = true; // her açılışta sıfırlanır
}
function m9OpenRecordWindow(idx) {
  m9EditingIndex = idx;
  document.getElementById('m9RecordWindow-title').textContent = 'Kayıt Detayı';
  _m9RenderWindowBody(rows[idx], M9_SAMPLE_DETAIL_ROWS.map(r => ({ ...r })));
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
function m9OpenNewRecordWindow() {
  m9EditingIndex = null;
  document.getElementById('m9RecordWindow-title').textContent = 'Yeni Kayıt';
  const emptyRow = {};
  columns.forEach(c => { if (c.field) emptyRow[c.field] = ''; });
  _m9RenderWindowBody(emptyRow, []);
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
// Panelde HERHANGİ bir alan değiştirilince (metin, dropdown seçimi —
// ddBaseOptionSelect kendi 'change'ini dispatch ediyor —, tarih seçimi —
// dpBaseInput de aynı şekilde) Kaydet aktifleşir. Delege: panel her
// açılışta yeniden oluşturuluyor.
document.getElementById('m9RecordWindow').addEventListener('input', function () { document.getElementById('m9SaveBtn').disabled = false; });
document.getElementById('m9RecordWindow').addEventListener('change', function () { document.getElementById('m9SaveBtn').disabled = false; });
function m9SaveRecord() {
  // dd(id) — gerçek .bt-dropdown'ın seçili değerini okur (id .bt-input__box'ın
  // üzerinde). val(id) — gerçek TextBox/DatePicker'ın .bt-input__value'su.
  const dd = id => document.getElementById(id).querySelector('.bt-input__value').textContent;
  const val = id => document.getElementById(id).value;
  const updatedRow = {
    fisNo: val('m9f_fisNo'),
    oncekiNo: val('m9f_oncekiNo'),
    fisTipi: dd('m9f_fisTipi'),
    islemTuru: dd('m9f_islemTuru'),
    fisTarihi: val('m9f_fisTarihi'),
    valorTarihi: val('m9f_valorTarihi'),
    maddeNo: val('m9f_maddeNo'),
    kdv: val('m9f_kdv'),
    aciklama: val('m9f_aciklama'),
    kullanici: m9EditingIndex == null ? '' : rows[m9EditingIndex].kullanici, // salt-okunur, sistem alanı
  };
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
