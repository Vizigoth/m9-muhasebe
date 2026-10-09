/* ============================================================
   M9 MUHASEBE — Ekran: Fiş Listesi
   Nav: Bilgi Girişi › Yevmiye Fiş Listesi Ly1 / Ly2
   (route: yevmiye-fis-listesi-ly1 / -ly2 — aynı liste, farklı window layout)
   Figma "M9 Design" › Main Page 1 (1697:25814): Toolbar + Data Table +
   Kayıt Detayı paneli (bt-window XL). Kabuk (sidebar/header) ve ekran
   geçişi: js/app.js.
   ============================================================ */

/* ── Data Table — Fiş Listesi (fiş/muhasebe kaydı listesi) ────
   Figma "DataTable" (node 1709:188606) ile birebir: 10 sabit-genişlik
   kolon, hepsinde Filter Control (sort YOK — Figma'da hiçbir header'da
   sort ikonu yok), sadece ilk kolonda (Fiş Numarası) select-all checkbox.
   Genişlikler Figma'daki Header Row'un gerçek piksel değerleri (toplam
   1840px — viewport daha darsa .bt-grid-scroll-x yatay scroll sağlıyor).
   Satırlar Figma'daki 6 örnek satırla birebir (hepsi aynı mockup verisi,
   Figma'nın kendisinde de 6 satır birbirinin kopyası) — bu yüzden gerçek
   bir kayıt setini DEĞİL, Figma'nın kendi görsel-tamamlanmış örneğini
   yansıtıyor. "Önceki Numarası" ve "Madde Numarası" hücrelerinde Figma'da
   görünen kolon adı değer değil, boş hücrenin Default state'i — veri boş,
   kolon adı placeholder (muted) olarak gösteriliyor. */
const M9_FIS_COLUMNS = [
  // frozen — Data Table "Frozen Column" sayfasının aynısı (position:sticky,
  // sağ kenarda yumuşak edge gölgesi, bkz. app.html'deki #m9Grid .bt-grid__body
  // override notu). contentLink + onClick — Figma'da/Bentas DS'te ID benzeri
  // kolonların link olarak kullanıldığı desen (gridTableColumns'daki ID
  // kolonunun contentLink:true'su) — tıklanınca satırın kendi seçim onclick'i
  // TETİKLENMEDEN (stopPropagation, bkz. gridCellHtml) doğrudan kaydı açar.
  { field: 'fisNo',       headerText: 'Fiş Numarası',     headerCheckbox: true, cellLeading: 'checkbox', filter: true, width: 160, frozen: true, contentLink: true, onClick: (row, idx) => `m9OpenRecordWindow(${idx})` },
  { field: 'fisTipi',     headerText: 'Fiş Tipi',         filter: true, width: 146 },
  { field: 'fisTarihi',   headerText: 'Fiş Tarihi',       filter: true, width: 174 },
  { field: 'oncekiNo',    headerText: 'Önceki Numarası',  filter: true, width: 136, placeholder: true },
  { field: 'maddeNo',     headerText: 'Madde Numarası',   filter: true, width: 142, placeholder: true },
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
  oncekiNo: '', // Figma'da kolon adı = boş hücrenin Default state'i (placeholder)
  maddeNo: '',
  valorTarihi: '01 / 01 / 2026 09:00:00',
  islemTuru: 'Transfer',
  aciklama: 'Tarihli 37 Numarali (CMA) CARI MAHSUP ISLEMLERI (MAH) MAHSUP TIPI HAREKET Evraki  (Belge No/Tarih: 37 23-09-2026) (Sirket/ Isyeri: 10/1)',
  kdv: '18',
  kullanici: 'Emre Göcer',
};
// Ekran değişip geri dönüldüğünde kaybolmasın diye modül seviyesinde tutuluyor.
// Figma'daki örnek satırın 6 kopyası — sadece Fiş Numarası farklı (000001–000006).
const m9FisRows = Array(6).fill(0).map((_, i) => ({ ..._m9SampleRow, fisNo: String(i + 1).padStart(6, '0') }));

function m9RenderFisGrid() {
  document.getElementById('m9Grid').innerHTML = renderDataTable(M9_FIS_COLUMNS, m9FisRows, { emptyText: 'Kayıt bulunamadı' });
}

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

/* ════════════════════════════════════════════════════════════════
   FİŞ DETAYI — bt-window (XL)
   Figma "Window" (node 1738:135102) ile birebir: iki panel yan yana.
     • Sol panel (440px, beyaz, sağ border) — Segmented Tab (sm):
       "Fiş Bilgileri" (fiş başlık alanları, hepsi sm Base Input) ve
       "E-Defter Bilgileri" (Figma 1733:34399 — Ödeme/Evrak Türü,
       Açıklama, Evrak No/Tarihi).
     • Sağ panel — "Hareketler" kartı (başlık + alt başlık, Ekle/Sil
       toolbar'ı + Advanced Filtered SearchBox, InCell Editing Data Table).
   Grid kolonları/örnek hücreler Figma "DataTable" (node 1738:59493)'ten
   birebir — 42 kolon, Figma Header Row'un gerçek piksel genişlikleri.
   Kolon adını taşıyan hücreler (Maliyet Merkezi, Proje, Evrak Tipi…) boş
   hücrenin Default state'i — placeholder olarak muted renkte gösteriliyor.
   ════════════════════════════════════════════════════════════════ */
const M9_ISLEM_TURU_OPTS = ['Transfer', 'Nakit', 'Çek', 'Senet']; // gerçek liste netleşene kadar varsayım
const M9_FIS_TIPI_OPTS   = ['Mahsup', 'Tahsilat', 'Tediye', 'Diğer']; // aynı şekilde varsayım
// E-Defter seçenekleri de varsayım — gerçek listeler (GİB e-Defter kod
// listeleri / Bentaş tanımları) netleşince güncellenecek.
const M9_ED_ODEME_TURU_OPTS = ['Nakit', 'Çek', 'Senet', 'Havale / EFT', 'Kredi Kartı', 'Diğer'];
const M9_ED_EVRAK_TURU_OPTS = ['Fatura', 'Çek', 'Senet', 'Makbuz', 'Navlun', 'Diğer'];

/* Window Toolbar butonları — Figma'da ilki Primary/Solid, diğerleri Base/Flat;
   ikonlar Figma'da henüz atanmamış (hepsi "Icon/placeholder2" — drawer
   item'larındaki aynı bracket/scan placeholder'ı, Button bağlamında 16px).
   Aksiyonların iş mantığı henüz yok — m9FisToolbarAction sadece log'luyor. */
const icoToolbarPlaceholder = icoDrawerItemPlaceholder.replace('width="14" height="14"', 'width="16" height="16"');
const M9_FIS_TOOLBAR_ACTIONS = [
  { key: 'sablon-ara',        label: 'Şablon Ara' },
  { key: 'terazi',            label: 'Terazi' },
  { key: 'fis-tersi',         label: 'Fişin Tersini Oluştur' },
  { key: 'toplam',            label: 'Toplam' },
  { key: 'toplam-kur',        label: 'Toplam Kur' },
  { key: 'kdv-hesapla',       label: 'Kdv Hesapla' },
  { key: 'fis-oku',           label: 'Fiş Oku' },
  { key: 'e-belge-tipi',      label: 'E-Belge Tipi Değiştir' },
  { key: 'fis-yazdir',        label: 'Fiş Yazdır' },
  { key: 'dekont-yazdir',     label: 'Dekont Yazdır' },
];
function m9FisToolbarAction(key) {
  console.log('[Fiş Detayı] henüz bağlanmadı:', key);
}

/* Panel ekranın ilk açılışında bir kez oluşturulur (#m9WindowMount yerine
   geçer) — ekranlar arası geçişte yeniden yaratılmaz. Gövde (iki panel)
   her açılışta _m9RenderWindowBody ile yeniden doluyor. */
function m9EnsureRecordWindow() {
  if (document.getElementById('m9RecordWindow')) return;
  document.getElementById('m9WindowMount').outerHTML = renderWindow({
    id: 'm9RecordWindow',
    size: 'xl',
    title: 'Fiş Detayı',
    headerActions: `<button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" id="m9SaveBtn" disabled onclick="m9SaveRecord()">Kaydet</button>`,
  });
  // Window Toolbar (Figma 1742:138375) — header ile body arasında, renderWindow'un
  // kendi slot'u olmadığı için header'ın hemen arkasına ekleniyor.
  // Sığmayan butonlar sondan başlayarak "⋯" Overflow Menu'ye taşınır
  // (btToolbarFitOverflow, js/components.js) — menü tüm aksiyonları taşır,
  // sadece o an gizli olan butonlarınkini gösterir.
  document.querySelector('#m9RecordWindow .bt-window__header').insertAdjacentHTML('afterend',
    `<div class="bt-pl-toolbar m9-fis-toolbar" id="m9FisToolbar">${M9_FIS_TOOLBAR_ACTIONS.map((a, i) =>
      `<button type="button" class="bt-btn bt-btn--sm ${i === 0 ? 'bt-btn--primary-solid' : 'bt-btn--base-flat'}" data-ovf-key="${a.key}" onclick="m9FisToolbarAction('${a.key}')">${icoToolbarPlaceholder}<span>${a.label}</span></button>`
    ).join('')}${renderOverflowMenu(M9_FIS_TOOLBAR_ACTIONS.map(a => ({
      key: a.key, label: a.label, icon: icoToolbarPlaceholder, onClick: `m9FisToolbarAction('${a.key}')`,
    })), { label: 'Diğer işlemler' })}</div>`);
  btToolbarObserveOverflow(document.getElementById('m9FisToolbar'));
  // Panelde HERHANGİ bir değişiklik (metin, dropdown seçimi —
  // ddBaseOptionSelect kendi 'change'ini dispatch ediyor —, tarih seçimi,
  // grid'de hücre düzenleme / satır ekleme-silme) Kaydet'i aktifleştirir.
  const win = document.getElementById('m9RecordWindow');
  const markDirty = () => { document.getElementById('m9SaveBtn').disabled = false; };
  win.addEventListener('input', e => { if (!e.target.closest('.bt-searchbox')) markDirty(); });
  win.addEventListener('change', markDirty);
  win.addEventListener('btgridcelledit', function (e) {
    const { rowIndex, field, value } = e.detail;
    if (m9DetailRows[rowIndex]) m9DetailRows[rowIndex][field] = value;
    m9UpdateDetailSummary();
    markDirty();
  });
}

/* Örnek "DD / MM / YYYY HH:MM:SS" (liste verisi) → gerçek DatePicker
   component'inin beklediği "dd/mm/yyyy" (bkz. components.js _calParseDdMmYyyy). */
function m9ParseDate(str) {
  const m = String(str || '').match(/(\d{1,2})\s*[\/\-]\s*(\d{1,2})\s*[\/\-]\s*(\d{4})/);
  if (!m) return '';
  const d = m[1].padStart(2, '0'), mo = m[2].padStart(2, '0'), y = m[3];
  return `${d}/${mo}/${y}`;
}

/* ── Hareketler grid'i — InCell Editing (çift tıkla → düzenle, Enter/dışarı
   tıkla → kaydet, Esc → vazgeç). Sıra otomatik (satır sırası), düzenlenmez;
   seçim checkbox'ı da bu kolonda. R = sayısal, sağa yaslı (Figma). */
const _m9R = 'right';
/* Sayısal kolonlar — InCell edit'te sadece rakam kabul edilir
   (btGridNumericInput, js/components.js). decimal: tutar/miktar (tek ondalık
   ayırıcı), integer: adet ve numara. Evrak Numarası / E-Defter Evrak Numarası
   ("EFT-…" gibi harf içerebilir) ve Birim (Adet/Kg…) metin olarak kalır. */
/* Dropdown kolonları — Belge Türü seçenekleri kullanıcıdan (Kağıt / E-Belge);
   E-Defter Evrak Türü formdaki E-Defter alanıyla aynı liste; Kur ve Evrak Tipi
   seçenekleri VARSAYIM — gerçek listeler (döviz tanımları / evrak tipleri)
   netleşince güncellenecek. */
const M9_HAREKET_DROPDOWNS = {
  kur:              ['TL', 'USD', 'EUR', 'GBP', 'CHF'],
  evrakTipi:        ['Fatura', 'Makbuz', 'Dekont', 'Çek', 'Senet', 'Poliçe', 'Diğer'],
  eDefterEvrakTuru: ['Fatura', 'Çek', 'Senet', 'Makbuz', 'Navlun', 'Diğer'],
  belgeTuru:        ['Kağıt', 'E-Belge'],
};
// DatePicker kolonları — tarih içeren tüm kolonlar
const M9_HAREKET_DATES = ['valorTarihi', 'duzeltmeyeEsasTarih', 'baslangicTarihi', 'bitisTarihi', 'eDefterEvrakTarihi'];
const M9_HAREKET_NUMERIC = {
  borc: 'decimal', alacak: 'decimal', kurFiyati: 'decimal', miktar: 'decimal',
  birimFiyati: 'decimal', kdvTutari: 'decimal', baBsMatrah: 'decimal', baBsKdvTutari: 'decimal',
  borcluAdet: 'integer', alacakAdet: 'integer', cariNo: 'integer', indeksNo: 'integer',
};
const M9_HAREKET_COLUMNS = [
  // frozen — Fiş Listesi'ndeki Fiş Numarası ile aynı desen (position:sticky +
  // sağ kenar gölgesi); bkz. app.html'deki #m9DetailGrid .bt-grid__body notu.
  { field: 'sira',                  headerText: 'Sıra',                         width: 156, headerCheckbox: true, cellLeading: 'checkbox', frozen: true },
  { field: 'cariNo',                headerText: 'Cari Numarası',                width: 156, align: _m9R },
  // Ünvan — InCell edit'i Select LookUp: sol artı ikonu sm window'da cari
  // listesini açar (m9OpenLookup('unvan')), seçim hücreye yazılır.
  { field: 'unvan',                 headerText: 'Ünvan',                        width: 193, cellLeading: 'dot', editKind: 'lookup', editLookup: () => "m9OpenLookup('unvan', this)" },
  { field: 'tarihBazliUnvan',       headerText: 'Tarih Bazlı Ünvan',            width: 193, cellLeading: 'dot' },
  // Hesap Kodu / Ad / Maliyet Merkezi — Select LookUp (bkz. M9_LOOKUPS)
  { field: 'hesapKodu',             headerText: 'Hesap Kodu',                   width: 193, editKind: 'lookup', editLookup: () => "m9OpenLookup('hesap', this)" },
  { field: 'ad',                    headerText: 'Ad',                           width: 262, editKind: 'lookup', editLookup: () => "m9OpenLookup('hesap', this)" },
  { field: 'tarihBazliAd',          headerText: 'Tarih Bazlı Ad',               width: 262 },
  { field: 'izahat',                headerText: 'İzahat',                       width: 262 },
  { field: 'borc',                  headerText: 'Borç',                         width: 163, align: _m9R },
  { field: 'alacak',                headerText: 'Alacak',                       width: 163, align: _m9R },
  { field: 'maliyetMerkezi',        headerText: 'Maliyet Merkezi',              width: 163, editKind: 'lookup', editLookup: () => "m9OpenLookup('maliyetMerkezi', this)" },
  { field: 'maliyetMerkeziAciklama',headerText: 'Maliyet Merkezi Açıklama',     width: 217 },
  { field: 'kur',                   headerText: 'Kur',                          width: 87 },
  { field: 'kurFiyati',             headerText: 'Kur Fiyatı',                   width: 105, align: _m9R },
  { field: 'borcluAdet',            headerText: 'Borçlu Adet',                  width: 126, align: _m9R },
  { field: 'alacakAdet',            headerText: 'Alacak Adet',                  width: 126, align: _m9R },
  { field: 'valorTarihi',           headerText: 'Valör Tarihi',                 width: 126 },
  { field: 'proje',                 headerText: 'Proje',                        width: 273 },
  { field: 'evrakTipi',             headerText: 'Evrak Tipi',                   width: 273 },
  { field: 'evrakNo',               headerText: 'Evrak Numarası',               width: 169, align: _m9R },
  { field: 'indeksNo',              headerText: 'Indeks Numarası',              width: 151, align: _m9R },
  { field: 'miktar',                headerText: 'Miktar',                       width: 120, align: _m9R },
  { field: 'birim',                 headerText: 'Birim',                        width: 120, align: _m9R },
  { field: 'birimFiyati',           headerText: 'Birim Fiyatı',                 width: 120, align: _m9R },
  { field: 'enflasyonKatilmaz',     headerText: 'Enflasyon Hesabına Katılmaz',  width: 210 },
  { field: 'duzeltmeyeEsasTarih',   headerText: 'Düzeltmeye Esas Tarih',        width: 171 },
  { field: 'transferBilgisi',       headerText: 'Transfer Bilgisi',             width: 243 },
  { field: 'baslangicTarihi',       headerText: 'Başlangıç Tarihi',             width: 171 },
  { field: 'bitisTarihi',           headerText: 'Bitiş Tarihi',                 width: 171 },
  { field: 'ident',                 headerText: 'Ident',                        width: 171 },
  { field: 'formIdent',             headerText: 'Form Ident',                   width: 171 },
  { field: 'kdvTutari',             headerText: 'KDV Tutarı',                   width: 133, align: _m9R },
  { field: 'eDefterOdemeTuru',      headerText: 'E-Defter Ödeme Türü',          width: 203 },
  { field: 'eDefterEvrakTuru',      headerText: 'E-Defter Evrak Türü',          width: 236 },
  { field: 'eDefterEvrakTuruAciklama', headerText: 'E-Defter Evrak Türü Açıklama', width: 256 },
  { field: 'eDefterEvrakNo',        headerText: 'E-Defter Evrak Numarası',      width: 192, align: _m9R },
  { field: 'eDefterEvrakTarihi',    headerText: 'E-Defter Evrak Tarihi',        width: 192 },
  { field: 'baBs',                  headerText: 'Ba / Bs',                      width: 123 },
  { field: 'baBsMatrah',            headerText: 'Ba / Bs Matrah',               width: 174 },
  { field: 'baBsKdvTutari',         headerText: 'Ba / Bs KDV Tutarı',           width: 174, align: _m9R },
  { field: 'baBsAciklama',          headerText: 'Ba / Bs Açıklama',             width: 259 },
  // Son kolon fillWidth — DS kuralı (bkz. Fiş Listesi'ndeki Kullanıcı notu)
  { field: 'belgeTuru',             headerText: 'Belge Türü',                   width: 160, fillWidth: true },
].map(c => ({ ...c, filter: true, editable: c.field !== 'sira', placeholder: c.field !== 'sira', inputType: M9_HAREKET_NUMERIC[c.field],
  ...(M9_HAREKET_DROPDOWNS[c.field] ? { editKind: 'dropdown', editOptions: M9_HAREKET_DROPDOWNS[c.field] } : {}),
  ...(M9_HAREKET_DATES.includes(c.field) ? { editKind: 'date' } : {}) }));

/* Figma'daki 4 örnek satır. Ortak (her satırda aynı) hücreler _m9HareketBase'de.
   Figma'da kolon adını taşıyan hücreler (Maliyet Merkezi, Proje, Evrak Tipi…)
   değer DEĞİL, boş hücrenin Default state'i — burada boş bırakılıyor, kolon
   adı placeholder olarak muted renkte gösteriliyor (bkz. kolonlardaki
   placeholder:true). Alanlar boş olduğu için burada listelenmiyor. */
const _m9HareketBase = {
  kurFiyati: '0.00', borcluAdet: '0', alacakAdet: '0', valorTarihi: '01 / 01 / 2026',
  duzeltmeyeEsasTarih: '01 / 01 / 2026', baslangicTarihi: '01 / 01 / 2026', bitisTarihi: '01 / 01 / 2026',
  kdvTutari: '0.00', eDefterEvrakTarihi: '01 / 01 / 2026',
};
const M9_SAMPLE_HAREKETLER = [
  { cariNo: '100001535', unvan: 'Emre Göcer',     tarihBazliUnvan: 'Emre Göcer',     hesapKodu: '900-01-01-001-001', ad: 'Müşteriler Cari Hesabı',                    izahat: 'Poliçe 22621912-6',          borc: '0.00',   alacak: '308.57', ident: '2090212' },
  { cariNo: '103',       unvan: 'Ak Sigorta A.Ş', tarihBazliUnvan: 'Ak Sigorta A.Ş', hesapKodu: '900-01-01-001-001', ad: 'Sigorta Şirketleri Cari Hesabı',            izahat: 'Poliçe 22621912-6',          borc: '308.57', alacak: '0.00',   ident: '2090213' },
  { cariNo: '103',       unvan: 'Ak Sigorta A.Ş', tarihBazliUnvan: 'Ak Sigorta A.Ş', hesapKodu: '127-01-03-001-001', ad: 'Elementer Poliçe Komisyonları',             izahat: 'Poliçe 22621912-6 Komisyon', borc: '0.00',   alacak: '46.84',  ident: '2090214' },
  { cariNo: '103',       unvan: 'Ak Sigorta A.Ş', tarihBazliUnvan: 'Ak Sigorta A.Ş', hesapKodu: '120-01-03-001-001', ad: 'Sigorta Şirketi Elementer Komisyon Hesabı', izahat: 'Poliçe 22621912-6 Komisyon', borc: '46.84',  alacak: '0.00',   ident: '2090215' },
].map(r => ({ ..._m9HareketBase, ...r, tarihBazliAd: r.ad }));

let m9DetailRows = [];

/* ── Select LookUp — bt-window (sm) içinde seçim listesi ─────────────────
   Hareketler grid'inde editKind:'lookup' olan her kolon AYNI pencereyi
   (m9Lookup) kendi tanımıyla (M9_LOOKUPS[key]) açar: başlık, liste kolonları,
   kayıtlar ve seçilince satıra yazılacak alanlar (apply). Gerçek listeler
   veritabanından gelecek; backend olmadığı için şimdilik örnek veri.
   Satıra tek tıklama → apply() dönen her alan,
   ilgili hücreye btGridCellSetValue ile yazılır (normal InCell commit yolu →
   'btgridcelledit' → veri modeli + summary). */
const M9_CARI_LIST = [
  { cariNo: '100001535', unvan: 'Emre Göcer',              sehir: 'İstanbul' },
  { cariNo: '103',       unvan: 'Ak Sigorta A.Ş',          sehir: 'İstanbul' },
  { cariNo: '104',       unvan: 'Allianz Sigorta A.Ş',     sehir: 'İstanbul' },
  { cariNo: '105',       unvan: 'Anadolu Sigorta A.Ş',     sehir: 'İstanbul' },
  { cariNo: '106',       unvan: 'Axa Sigorta A.Ş',         sehir: 'İstanbul' },
  { cariNo: '107',       unvan: 'Sompo Sigorta A.Ş',       sehir: 'İstanbul' },
  { cariNo: '108',       unvan: 'HDI Sigorta A.Ş',         sehir: 'İstanbul' },
  { cariNo: '109',       unvan: 'Türkiye Sigorta A.Ş',     sehir: 'İstanbul' },
  { cariNo: '100001536', unvan: 'Ayşe Yılmaz',             sehir: 'Ankara' },
  { cariNo: '100001537', unvan: 'Mehmet Demir',            sehir: 'İzmir' },
  { cariNo: '100001538', unvan: 'Bentaş Sigorta Aracılık', sehir: 'İstanbul' },
];
// Hesap planı — örnek (Tekdüzen hesap planı ana grupları + Figma'daki kodlar)
const M9_HESAP_PLANI = [
  { hesapKodu: '100-01-01-001-001', ad: 'Merkez Kasa' },
  { hesapKodu: '102-01-01-001-001', ad: 'Bankalar - Vadesiz TL' },
  { hesapKodu: '103-01-01-001-001', ad: 'Verilen Çekler' },
  { hesapKodu: '120-01-01-001-001', ad: 'Yurtiçi Alıcılar' },
  { hesapKodu: '120-01-03-001-001', ad: 'Sigorta Şirketi Elementer Komisyon Hesabı' },
  { hesapKodu: '127-01-03-001-001', ad: 'Elementer Poliçe Komisyonları' },
  { hesapKodu: '320-01-01-001-001', ad: 'Yurtiçi Satıcılar' },
  { hesapKodu: '391-01-01-001-018', ad: 'Hesaplanan KDV %18' },
  { hesapKodu: '600-01-01-001-001', ad: 'Komisyon Gelirleri' },
  { hesapKodu: '770-01-01-001-001', ad: 'Genel Yönetim Giderleri' },
  { hesapKodu: '900-01-01-001-001', ad: 'Müşteriler Cari Hesabı' },
  { hesapKodu: '900-01-01-001-002', ad: 'Sigorta Şirketleri Cari Hesabı' },
];
const M9_MALIYET_MERKEZLERI = [
  { kod: 'MM-001', aciklama: 'Genel Müdürlük' },
  { kod: 'MM-002', aciklama: 'Muhasebe ve Finans' },
  { kod: 'MM-003', aciklama: 'Satış ve Pazarlama' },
  { kod: 'MM-004', aciklama: 'Hasar Yönetimi' },
  { kod: 'MM-005', aciklama: 'Bilgi Teknolojileri' },
  { kod: 'MM-006', aciklama: 'İnsan Kaynakları' },
  { kod: 'MM-010', aciklama: 'İstanbul Şube' },
  { kod: 'MM-011', aciklama: 'Ankara Şube' },
  { kod: 'MM-012', aciklama: 'İzmir Şube' },
];
/* apply(kayıt) → { alan: değer } — açan hücre dahil satırda yazılacak alanlar.
   Hesap Kodu ve Ad AYNI hesap planı listesini kullanır; hangisinden seçilirse
   seçilsin ikisi birlikte dolar (tutarsız kod/ad çifti oluşmasın). */
const M9_LOOKUPS = {
  unvan: {
    title: 'Ünvan Seç',
    rows: M9_CARI_LIST,
    columns: [
      { field: 'cariNo', headerText: 'Cari Numarası', width: 140, align: 'right', filter: true },
      { field: 'unvan',  headerText: 'Ünvan',         width: 220, filter: true },
      { field: 'sehir',  headerText: 'Şehir',         width: 120, filter: true, fillWidth: true },
    ],
    apply: r => ({ unvan: r.unvan }),
  },
  hesap: {
    title: 'Hesap Seç',
    rows: M9_HESAP_PLANI,
    columns: [
      { field: 'hesapKodu', headerText: 'Hesap Kodu', width: 170, filter: true },
      { field: 'ad',        headerText: 'Ad',         width: 260, filter: true, fillWidth: true },
    ],
    apply: r => ({ hesapKodu: r.hesapKodu, ad: r.ad }),
  },
  maliyetMerkezi: {
    title: 'Maliyet Merkezi Seç',
    rows: M9_MALIYET_MERKEZLERI,
    columns: [
      { field: 'kod',      headerText: 'Kod',      width: 120, filter: true },
      { field: 'aciklama', headerText: 'Açıklama', width: 260, filter: true, fillWidth: true },
    ],
    apply: r => ({ maliyetMerkezi: r.kod, maliyetMerkeziAciklama: r.aciklama }),
  },
};
let m9LookupKey = null;      // aktif M9_LOOKUPS anahtarı
let m9LookupTarget = null;   // { rowIndex, field } — lookup'ı açan hücre
let m9LookupRows = [];

function m9EnsureLookupWindow() {
  if (document.getElementById('m9Lookup')) return;
  document.body.insertAdjacentHTML('beforeend', renderWindow({
    id: 'm9Lookup',
    size: 'sm',
    title: '',
    bodyHtml: `${renderSearchBox({ advanced: false })}<div class="bt-grid-actions-container m9-lookup-grid" id="m9LookupGrid"></div>`,
  }));
  const win = document.getElementById('m9Lookup');
  // Arama — aktif listenin tüm kolonlarında (büyük-küçük harf duyarsız, Türkçe)
  win.querySelector('.bt-searchbox input').addEventListener('input', function () {
    const cfg = M9_LOOKUPS[m9LookupKey];
    const q = this.value.trim().toLocaleLowerCase('tr');
    m9LookupRows = !q ? cfg.rows : cfg.rows.filter(r =>
      cfg.columns.some(c => String(r[c.field] == null ? '' : r[c.field]).toLocaleLowerCase('tr').includes(q)));
    m9RenderLookupGrid();
  });
  // Satıra TEK tıklama = seçim: kayıt hücreye yazılır, pencere kapanır
  // ("Seç" butonu yok — kullanıcı isteği). Filtre/header tıklamaları
  // .bt-grid__body dışında kaldığı için etkilenmez.
  document.getElementById('m9LookupGrid').addEventListener('click', function (e) {
    const row = e.target.closest('.bt-grid__body .bt-grid__row');
    if (row) m9ApplyLookup(Number(row.dataset.rowIndex));
  });
}
function m9RenderLookupGrid() {
  document.getElementById('m9LookupGrid').innerHTML = renderDataTable(M9_LOOKUPS[m9LookupKey].columns, m9LookupRows, { emptyText: 'Kayıt bulunamadı' });
}
/* key — M9_LOOKUPS anahtarı; el — tıklanan Select LookUp ikonu (hücrenin içinde). */
function m9OpenLookup(key, el) {
  const cell = el.closest('.bt-grid__cell');
  const row = cell && cell.closest('.bt-grid__row');
  if (!row || !M9_LOOKUPS[key]) return;
  m9LookupKey = key;
  m9LookupTarget = { rowIndex: Number(row.dataset.rowIndex), field: cell.dataset.field };
  m9EnsureLookupWindow();
  document.getElementById('m9Lookup-title').textContent = M9_LOOKUPS[key].title;
  const search = document.querySelector('#m9Lookup .bt-searchbox input');
  search.value = '';
  m9LookupRows = M9_LOOKUPS[key].rows;
  m9RenderLookupGrid();
  dexOpenPanel('m9Lookup', 'm9LookupOv');
  search.focus();
}
function m9ApplyLookup(idx) {
  const rec = m9LookupRows[idx];
  const t = m9LookupTarget;
  if (rec && t) {
    const rowEl = document.querySelector(`#m9DetailGrid .bt-grid__body .bt-grid__row[data-row-index="${t.rowIndex}"]`);
    const values = M9_LOOKUPS[m9LookupKey].apply(rec);
    Object.keys(values).forEach(f => {
      btGridCellSetValue(rowEl && rowEl.querySelector(`.bt-grid__cell[data-field="${f}"]`), values[f]);
    });
  }
  dexClosePanel('m9Lookup', 'm9LookupOv');
}

/* ── DataTable Summary (Figma 1748:158681) — grid'in altında, hareketlerden
   canlı hesaplanan toplamlar. Grid render'ı, hücre düzenleme ve satır seçimi
   değişince yeniden hesaplanır (m9UpdateDetailSummary).
   FORMÜLLER VARSAYIM — kesinleşene kadar:
     Hesap Bakiyesi — SEÇİLİ satırın Hesap Kodu'na ait hareketlerin
                      Σ Borç − Σ Alacak'ı (bu fiş içinde; gerçek hesap bakiyesi
                      veritabanından gelecek). Seçim yoksa 0.00.
     Toplam Kur     — Σ Kur Fiyatı
     Toplam Tutar   — Σ Borç
     Toplam Bakiye  — Σ Borç − Σ Alacak (dengeli fişte 0.00) */
const M9_HAREKET_SUMMARY = [
  { key: 'hesapBakiyesi', label: 'Hesap Bakiyesi' },
  { key: 'toplamKur',     label: 'Toplam Kur' },
  { key: 'toplamTutar',   label: 'Toplam Tutar' },
  { key: 'toplamBakiye',  label: 'Toplam Bakiye' },
];
const _m9Num = v => parseFloat(String(v == null ? '' : v).replace(',', '.')) || 0;
const _m9Sum = (rows, f) => rows.reduce((s, r) => s + _m9Num(r[f]), 0);
function m9UpdateDetailSummary() {
  const box = document.getElementById('m9DetailSummary');
  if (!box) return;
  const sel = m9SelectedDetailIndexes();
  const hesapKodu = sel.length ? (m9DetailRows[sel[0]] || {}).hesapKodu : null;
  const hesapRows = hesapKodu ? m9DetailRows.filter(r => r.hesapKodu === hesapKodu) : [];
  const values = {
    hesapBakiyesi: _m9Sum(hesapRows, 'borc') - _m9Sum(hesapRows, 'alacak'),
    toplamKur:     _m9Sum(m9DetailRows, 'kurFiyati'),
    toplamTutar:   _m9Sum(m9DetailRows, 'borc'),
    toplamBakiye:  _m9Sum(m9DetailRows, 'borc') - _m9Sum(m9DetailRows, 'alacak'),
  };
  box.querySelectorAll('[data-summary]').forEach(el => {
    const v = values[el.dataset.summary] || 0;
    el.textContent = v.toFixed(2);
    // 0.00 = boş/Default state → Figma'daki muted renk; değer varsa okunur renk
    el.classList.toggle('m9-grid-summary__value--empty', Math.abs(v) < 0.005);
    // Fiş dengede değil (Σ Borç ≠ Σ Alacak) — sadece Ly2'de renkleniyor (app.html .m9-ly2)
    el.classList.toggle('m9-grid-summary__value--error', el.dataset.summary === 'toplamBakiye' && Math.abs(v) >= 0.005);
  });
}

// Sıra her render'da satır sırasından yeniden üretilir (001, 002, …).
function m9RenderDetailGrid() {
  m9DetailRows.forEach((r, i) => { r.sira = String(i + 1).padStart(3, '0'); });
  document.getElementById('m9DetailGrid').innerHTML = renderDataTable(M9_HAREKET_COLUMNS, m9DetailRows, { emptyText: 'Kayıt bulunamadı' });
  m9SyncDetailToolbar();
}
// Seçili satır: satıra tıklanarak (Sıra hücresi — editable hücreler tek
// tıklamayı satıra iletmez) veya checkbox'ı işaretlenerek seçilmiş satırlar.
function m9SelectedDetailIndexes() {
  return [...document.querySelectorAll('#m9DetailGrid .bt-grid__body .bt-grid__row')]
    .filter(r => r.classList.contains('bt-grid__row--active') || r.querySelector('.bt-checkbox__box--checked'))
    .map(r => Number(r.dataset.rowIndex));
}
function m9SyncDetailToolbar() {
  document.getElementById('m9DetailDeleteBtn').disabled = m9SelectedDetailIndexes().length === 0;
  m9UpdateDetailSummary(); // seçim Hesap Bakiyesi'ni değiştirir
}
function m9AddDetailRow() {
  const empty = {};
  M9_HAREKET_COLUMNS.forEach(c => { empty[c.field] = ''; });
  m9DetailRows.push(empty);
  m9RenderDetailGrid();
  document.getElementById('m9SaveBtn').disabled = false;
  // Yeni satırın ilk düzenlenebilir hücresini (Cari Numarası) direkt aç.
  const rows = document.querySelectorAll('#m9DetailGrid .bt-grid__body .bt-grid__row');
  const cell = rows[rows.length - 1].querySelector('.bt-grid__cell--editable');
  if (cell) {
    cell.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    btGridCellEditStart(new Event('dblclick'), cell);
  }
}
function m9DeleteDetailRows() {
  const selected = new Set(m9SelectedDetailIndexes());
  if (!selected.size) return;
  m9DetailRows = m9DetailRows.filter((_, i) => !selected.has(i));
  m9RenderDetailGrid();
  document.getElementById('m9SaveBtn').disabled = false;
}

let m9EditingIndex = null; // null → Yeni Ekle; sayı → m9FisRows[] içindeki mevcut kayıt
/* ── Ortak parçalar (Ly1 + Ly2) ─────────────────────────────────────────
   Hareketler kartı (başlık, Ekle/Sil + arama, InCell grid, summary) iki
   layout'ta da AYNI — id'ler (m9DetailGrid, m9DetailDeleteBtn,
   m9DetailSummary) ortak fonksiyonlar tarafından kullanılıyor. */
function _m9HareketlerCardHtml() {
  return `
      <div class="m9-fis-moves__card">
        <div class="m9-fis-moves__header">
          <div class="m9-fis-moves__title">Hareketler</div>
          <div class="m9-fis-moves__subtitle">Borç ve alacak hareketleri</div>
        </div>
        <div class="m9-fis-moves__toolbar">
          <button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" onclick="m9AddDetailRow()">${icoPlus}<span>Ekle</span></button>
          <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat" id="m9DetailDeleteBtn" disabled onclick="m9DeleteDetailRows()">${icoTrash}<span>Sil</span></button>
          ${renderSearchBox({ advanced: true })}
        </div>
        <div class="m9-fis-moves__content">
          <div class="bt-grid-actions-container" id="m9DetailGrid"></div>
          <div class="m9-grid-summary" id="m9DetailSummary">${M9_HAREKET_SUMMARY.map((s, i) =>
            `${i ? '<span class="m9-grid-summary__sep" aria-hidden="true"></span>' : ''}<div class="m9-grid-summary__item"><span class="m9-grid-summary__label">${s.label}</span><span class="m9-grid-summary__value" data-summary="${s.key}">0.00</span></div>`
          ).join('')}</div>
        </div>
      </div>`;
}
function _m9AfterBodyRender(detailRows) {
  // Layout'a özel gövde stilleri (app.html'de .m9-ly2 altında)
  document.getElementById('m9RecordWindow-body').classList.toggle('m9-ly2', m9FisLayout === 'ly2');
  m9DetailRows = detailRows;
  m9RenderDetailGrid();
  // Satır seçimi / checkbox değişince Sil'i güncelle (satırın kendi onclick'i
  // önce çalışır, bu delege listener bubble'da sonra).
  document.getElementById('m9DetailGrid').addEventListener('click', m9SyncDetailToolbar);
  document.getElementById('m9SaveBtn').disabled = true; // her açılışta sıfırlanır
}

function _m9RenderWindowBody(row, detailRows) {
  const body = document.getElementById('m9RecordWindow-body');
  const sm = { size: 'sm' };

  const fisBilgileri = `
    ${winFieldHtml('Fiş Numarası', row.fisNo, 'm9f_fisNo', { ...sm, placeholder: 'Fiş Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_fisTarihi', label: 'Fiş Tarihi', value: m9ParseDate(row.fisTarihi) })}
    ${winDropdownHtml({ ...sm, id: 'm9f_fisTipi', label: 'Fiş Tipi', value: row.fisTipi, placeholder: 'Fiş Tipi', options: M9_FIS_TIPI_OPTS })}
    ${winFieldHtml('Önceki Numarası', row.oncekiNo, 'm9f_oncekiNo', { ...sm, placeholder: 'Önceki Numarası' })}
    ${winFieldHtml('Madde Numarası', row.maddeNo, 'm9f_maddeNo', { ...sm, placeholder: 'Madde Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_valorTarihi', label: 'Valör Tarihi', value: m9ParseDate(row.valorTarihi) })}
    ${winFieldHtml('Kdv', row.kdv ? '%' + String(row.kdv).replace(/^%/, '') : '', 'm9f_kdv', { ...sm, readonly: true })}
    ${winDropdownHtml({ ...sm, id: 'm9f_islemTuru', label: 'İşlem Türü', value: row.islemTuru, placeholder: 'İşlem Türü', options: M9_ISLEM_TURU_OPTS })}
    ${winTextareaHtml('Açıklama', row.aciklama, 'm9f_aciklama', { ...sm, readonly: true })}
    <div class="m9-fis-form__row">
      ${winDateHtml({ ...sm, id: 'm9f_girisTarihi', label: 'Giriş Tarihi', value: m9ParseDate(row.girisTarihi) })}
      ${winDateHtml({ ...sm, id: 'm9f_sonGuncelleme', label: 'Son Güncelleme Tarihi', value: m9ParseDate(row.sonGuncelleme) })}
    </div>
    ${winFieldHtml('Kullanıcı', row.kullanici, 'm9f_kullanici', { ...sm, readonly: true })}`;

  // E-Defter Bilgileri tab'ı — Figma "Container" (node 1733:34399) ile birebir.
  const eDefterBilgileri = `
    ${winDropdownHtml({ ...sm, id: 'm9f_edOdemeTuru', label: 'Ödeme Türü', value: row.eDefterOdemeTuru, placeholder: 'Ödeme Türü', options: M9_ED_ODEME_TURU_OPTS })}
    ${winDropdownHtml({ ...sm, id: 'm9f_edEvrakTuru', label: 'Evrak Türü', value: row.eDefterEvrakTuru, placeholder: 'Evrak Türü', options: M9_ED_EVRAK_TURU_OPTS })}
    ${winTextareaHtml('Açıklama', row.eDefterAciklama, 'm9f_edAciklama', { ...sm, placeholder: 'Açıklama', readonly: true })}
    ${winFieldHtml('Evrak Numarası', row.eDefterEvrakNo, 'm9f_edEvrakNo', { ...sm, placeholder: 'Evrak Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_edEvrakTarihi', label: 'Evrak Tarihi', value: m9ParseDate(row.eDefterEvrakTarihi) })}`;

  body.innerHTML = `
    <section class="m9-fis-form">
      ${renderTabList([
        { label: 'Fiş Bilgileri', panel: 'm9FisTabGenel', selected: true },
        { label: 'E-Defter Bilgileri', panel: 'm9FisTabEDefter' },
      ], { fill: 'segmented', size: 'sm' })}
      <div class="m9-fis-form__tab" id="m9FisTabGenel">${fisBilgileri}</div>
      <div class="m9-fis-form__tab" id="m9FisTabEDefter" hidden>${eDefterBilgileri}</div>
    </section>
    <section class="m9-fis-moves">${_m9HareketlerCardHtml()}</section>`;

  _m9AfterBodyRender(detailRows);
}
/* ── Window layout varyantları — aynı Fiş Listesi iki nav item'dan (Ly1/Ly2)
   açılır, kayıt açılınca hangi window gövdesinin render edileceği aktif
   ekranın layout'una (m9FisLayout) göre seçilir. Veri (m9FisRows) ortak.
     ly1 — mevcut layout (Figma 1738:135102: sol form + sağ Hareketler)
     ly2 — yeni layout denemesi; tasarımı gelene kadar ly1'in birebir kopyası */
let m9FisLayout = 'ly1';
/* ── Ly2 — Figma "Window" (node 1752:165085): üstte daraltılabilir kartlar
   (Fiş Bilgileri, altında E-Defter Bilgileri), altta tam genişlik Hareketler.
   Form alanlarının id'leri Ly1 ile AYNI (m9f_*) → m9SaveRecord ortak.
   Ly1'e göre ek UX iyileştirmeleri (Figma'da yok, değerlendirme sonrası):
     • Kart başlığının TAMAMI tıklanabilir (sadece chevron değil).
     • Kapalı kartın alt başlığı girilmiş değerlerin özetini gösterir
       (ör. "000001 · 01/01/2026 · Mahsup · Transfer") — kapalıyken de bağlam kaybolmaz.
     • Açık/kapalı durumu tarayıcıda hatırlanır (localStorage, kişisel tercih).
     • Summary'de Toplam Bakiye ≠ 0 (fiş dengede değil) kırmızı gösterilir. */
const _m9Ly2Chevron = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
const M9_LY2_CARD_DEFAULTS = { fis: false, edefter: false }; // true = kapalı — Figma'da ikisi de açık
function _m9Ly2LoadCollapsed() {
  try { return { ...M9_LY2_CARD_DEFAULTS, ...JSON.parse(localStorage.getItem('m9.ly2.collapsed') || '{}') }; }
  catch (e) { return { ...M9_LY2_CARD_DEFAULTS }; }
}
function _m9Ly2SaveCollapsed(key, collapsed) {
  try { const s = _m9Ly2LoadCollapsed(); s[key] = collapsed; localStorage.setItem('m9.ly2.collapsed', JSON.stringify(s)); } catch (e) {}
}
// Kapalı kartın alt başlığında gösterilen özet — o an formda girili değerlerden.
const M9_LY2_CARD_SUMMARY = {
  fis:     () => [_m9Ly2Val('m9f_fisNo'), _m9Ly2Val('m9f_fisTarihi'), _m9Ly2Dd('m9f_fisTipi', M9_FIS_TIPI_OPTS), _m9Ly2Dd('m9f_islemTuru', M9_ISLEM_TURU_OPTS)],
  edefter: () => [_m9Ly2Dd('m9f_edOdemeTuru', M9_ED_ODEME_TURU_OPTS), _m9Ly2Dd('m9f_edEvrakTuru', M9_ED_EVRAK_TURU_OPTS), _m9Ly2Val('m9f_edEvrakNo'), _m9Ly2Val('m9f_edEvrakTarihi')],
};
function _m9Ly2Val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function _m9Ly2Dd(id, opts) { const el = document.getElementById(id); const t = el ? el.querySelector('.bt-input__value').textContent : ''; return opts.includes(t) ? t : ''; }
function _m9Ly2UpdateSubtitle(card) {
  const sub = card.querySelector('.m9-ly2-card__subtitle');
  if (!card.classList.contains('is-collapsed')) { sub.textContent = sub.dataset.default; return; }
  const parts = M9_LY2_CARD_SUMMARY[card.dataset.card]().filter(Boolean);
  sub.textContent = parts.length ? parts.join(' · ') : 'Bilgi girilmedi';
}
function m9Ly2ToggleCard(header) {
  const card = header.closest('.m9-ly2-card');
  const collapsed = card.classList.toggle('is-collapsed');
  header.querySelector('button').setAttribute('aria-expanded', String(!collapsed));
  _m9Ly2UpdateSubtitle(card);
  _m9Ly2SaveCollapsed(card.dataset.card, collapsed);
}
function _m9Ly2CardHtml(key, title, subtitle, contentHtml, collapsed) {
  return `
    <section class="m9-ly2-panel">
      <div class="m9-ly2-card${collapsed ? ' is-collapsed' : ''}" data-card="${key}">
        <div class="m9-ly2-card__header" onclick="m9Ly2ToggleCard(this)">
          <div>
            <div class="m9-fis-moves__title">${title}</div>
            <div class="m9-fis-moves__subtitle m9-ly2-card__subtitle" data-default="${subtitle}">${subtitle}</div>
          </div>
          <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon m9-ly2-card__toggle" aria-label="${title} panelini aç/kapat" aria-expanded="${!collapsed}">${_m9Ly2Chevron}</button>
        </div>
        <div class="m9-ly2-card__collapse"><div class="m9-ly2-card__inner">
          <div class="m9-ly2-card__content">${contentHtml}</div>
        </div></div>
      </div>
    </section>`;
}
function _m9RenderWindowBodyLy2(row, detailRows) {
  const body = document.getElementById('m9RecordWindow-body');
  const sm = { size: 'sm' };
  const collapsed = _m9Ly2LoadCollapsed();

  // Figma sırası: 4 kolonluk ızgara, Açıklama tam genişlik en altta.
  const fisBilgileri = `<div class="m9-ly2-grid">
    ${winFieldHtml('Fiş Numarası', row.fisNo, 'm9f_fisNo', { ...sm, placeholder: 'Fiş Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_fisTarihi', label: 'Fiş Tarihi', value: m9ParseDate(row.fisTarihi) })}
    ${winDropdownHtml({ ...sm, id: 'm9f_fisTipi', label: 'Fiş Tipi', value: row.fisTipi, placeholder: 'Fiş Tipi', options: M9_FIS_TIPI_OPTS })}
    ${winFieldHtml('Önceki Numarası', row.oncekiNo, 'm9f_oncekiNo', { ...sm, placeholder: 'Önceki Numarası' })}
    ${winFieldHtml('Madde Numarası', row.maddeNo, 'm9f_maddeNo', { ...sm, placeholder: 'Madde Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_valorTarihi', label: 'Valör Tarihi', value: m9ParseDate(row.valorTarihi) })}
    ${winFieldHtml('Kdv', row.kdv ? '%' + String(row.kdv).replace(/^%/, '') : '', 'm9f_kdv', { ...sm, readonly: true })}
    ${winDropdownHtml({ ...sm, id: 'm9f_islemTuru', label: 'İşlem Türü', value: row.islemTuru, placeholder: 'İşlem Türü', options: M9_ISLEM_TURU_OPTS })}
    ${winDateHtml({ ...sm, id: 'm9f_girisTarihi', label: 'Giriş Tarihi', value: m9ParseDate(row.girisTarihi) })}
    ${winDateHtml({ ...sm, id: 'm9f_sonGuncelleme', label: 'Son Güncelleme Tarihi', value: m9ParseDate(row.sonGuncelleme) })}
    ${winFieldHtml('Kullanıcı', row.kullanici, 'm9f_kullanici', { ...sm, readonly: true })}
    <div class="m9-ly2-grid__full">${winTextareaHtml('Açıklama', row.aciklama, 'm9f_aciklama', { ...sm, readonly: true })}</div>
  </div>`;

  // E-Defter — Ly1'deki tab'ın alanları, aynı 4 kolon desenine yerleştirildi.
  const eDefterBilgileri = `<div class="m9-ly2-grid">
    ${winDropdownHtml({ ...sm, id: 'm9f_edOdemeTuru', label: 'Ödeme Türü', value: row.eDefterOdemeTuru, placeholder: 'Ödeme Türü', options: M9_ED_ODEME_TURU_OPTS })}
    ${winDropdownHtml({ ...sm, id: 'm9f_edEvrakTuru', label: 'Evrak Türü', value: row.eDefterEvrakTuru, placeholder: 'Evrak Türü', options: M9_ED_EVRAK_TURU_OPTS })}
    ${winFieldHtml('Evrak Numarası', row.eDefterEvrakNo, 'm9f_edEvrakNo', { ...sm, placeholder: 'Evrak Numarası' })}
    ${winDateHtml({ ...sm, id: 'm9f_edEvrakTarihi', label: 'Evrak Tarihi', value: m9ParseDate(row.eDefterEvrakTarihi) })}
    <div class="m9-ly2-grid__full">${winTextareaHtml('Açıklama', row.eDefterAciklama, 'm9f_edAciklama', { ...sm, placeholder: 'Açıklama', readonly: true })}</div>
  </div>`;

  body.innerHTML =
    _m9Ly2CardHtml('fis', 'Fiş Bilgileri', 'Fişin türü, tarihleri ve açıklaması', fisBilgileri, collapsed.fis) +
    _m9Ly2CardHtml('edefter', 'E-Defter Bilgileri', 'E-Defter evrak bilgileri', eDefterBilgileri, collapsed.edefter) +
    `<section class="m9-ly2-panel m9-ly2-panel--fill">${_m9HareketlerCardHtml()}</section>`;
  body.querySelectorAll('.m9-ly2-card.is-collapsed').forEach(_m9Ly2UpdateSubtitle);

  _m9AfterBodyRender(detailRows);
}
const M9_FIS_WINDOW_LAYOUTS = { ly1: _m9RenderWindowBody, ly2: _m9RenderWindowBodyLy2 };

function m9OpenRecordWindow(idx) {
  m9EditingIndex = idx;
  document.getElementById('m9RecordWindow-title').textContent = 'Fiş Detayı';
  const row = m9FisRows[idx];
  M9_FIS_WINDOW_LAYOUTS[m9FisLayout](row, (row.hareketler || M9_SAMPLE_HAREKETLER).map(r => ({ ...r })));
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
function m9OpenNewRecordWindow() {
  m9EditingIndex = null;
  document.getElementById('m9RecordWindow-title').textContent = 'Yeni Fiş';
  const emptyRow = {};
  M9_FIS_COLUMNS.forEach(c => { if (c.field) emptyRow[c.field] = ''; });
  M9_FIS_WINDOW_LAYOUTS[m9FisLayout](emptyRow, []);
  dexOpenPanel('m9RecordWindow', 'm9RecordWindowOv');
}
function m9SaveRecord() {
  // dd(id) — gerçek .bt-dropdown'ın seçili değerini okur (id .bt-input__box'ın
  // üzerinde; seçim yapılmamışsa placeholder metni durur → boş sayılır).
  // val(id) — gerçek TextBox/DatePicker'ın .bt-input__value'su.
  const dd = (id, opts) => { const t = document.getElementById(id).querySelector('.bt-input__value').textContent; return opts.includes(t) ? t : ''; };
  const val = id => document.getElementById(id).value;
  const prev = m9EditingIndex == null ? {} : m9FisRows[m9EditingIndex];
  const updatedRow = {
    ...prev,
    fisNo: val('m9f_fisNo'),
    oncekiNo: val('m9f_oncekiNo'),
    fisTipi: dd('m9f_fisTipi', M9_FIS_TIPI_OPTS),
    islemTuru: dd('m9f_islemTuru', M9_ISLEM_TURU_OPTS),
    fisTarihi: val('m9f_fisTarihi'),
    valorTarihi: val('m9f_valorTarihi'),
    maddeNo: val('m9f_maddeNo'),
    girisTarihi: val('m9f_girisTarihi'),
    sonGuncelleme: val('m9f_sonGuncelleme'),
    eDefterOdemeTuru: dd('m9f_edOdemeTuru', M9_ED_ODEME_TURU_OPTS),
    eDefterEvrakTuru: dd('m9f_edEvrakTuru', M9_ED_EVRAK_TURU_OPTS),
    eDefterEvrakNo: val('m9f_edEvrakNo'),
    eDefterEvrakTarihi: val('m9f_edEvrakTarihi'),
    hareketler: m9DetailRows.map(r => ({ ...r })),
    // Kdv / Açıklama / Kullanıcı — Figma'da Read Only, mevcut değer korunur.
  };
  if (m9EditingIndex == null) m9FisRows.push(updatedRow);
  else m9FisRows[m9EditingIndex] = updatedRow;
  m9RenderFisGrid();
  m9SyncToolbarButtons(); // yeniden render sonrası seçim sıfırlandı → Düzenle/Sil tekrar disabled
  dexClosePanel('m9RecordWindow', 'm9RecordWindowOv');
}

/* ── Ekran kaydı — js/app.js router'ı bu ekranı açınca render() çağırır.
   toolbar/body her ekran geçişinde sıfırdan doluyor, bu yüzden grid ve
   buton listener'ları da burada (her render'da) bağlanıyor. */
function m9FisListesiScreen(layout) { return {
  title: 'Fiş Listesi',
  render(toolbar, body) {
    m9FisLayout = layout;
    m9EnsureRecordWindow();

    toolbar.innerHTML = `
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
    body.innerHTML = `<div class="bt-grid-actions-container" id="m9Grid"></div>`;
    m9RenderFisGrid();

    const grid = document.getElementById('m9Grid');
    grid.addEventListener('click', m9SyncToolbarButtons);
    // Satıra çift tıklamak da direkt açar (checkbox/seçim davranışına ek, yaygın grid kısayolu).
    grid.addEventListener('dblclick', function (e) {
      const rowEl = e.target.closest('.bt-grid__row');
      if (!rowEl) return;
      m9OpenRecordWindow(Number(rowEl.dataset.rowIndex));
    });
    document.getElementById('m9AddBtn').addEventListener('click', m9OpenNewRecordWindow);
    document.getElementById('m9EditBtn').addEventListener('click', function () {
      const activeRow = document.querySelector('#m9Grid .bt-grid__row--active');
      if (!activeRow) return;
      m9OpenRecordWindow(Number(activeRow.dataset.rowIndex));
    });
  },
}; }
M9_SCREENS['yevmiye-fis-listesi-ly1'] = m9FisListesiScreen('ly1');
M9_SCREENS['yevmiye-fis-listesi-ly2'] = m9FisListesiScreen('ly2');
