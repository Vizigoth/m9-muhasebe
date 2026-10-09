/* ============================================================
   M9 MUHASEBE — app.js
   Uygulama kabuğu: Hub Sidebar + ekran yönlendirme (js/router.js).
   Ekranların kendisi: js/screens/*.js.
   Reusable engine: js/components.js (Bentas Design System'den taşındı).
   ============================================================ */

/* ── Sidebar — Hub Sidebar (Bentas Design System "Sidebar" component,
   Figma "Hub Sidebar Expanded" node 1705:182027). Rail sabit/hub-geneli
   (bkz. js/components.js renderSidebar) — burada sadece BU UYGULAMANIN
   (M9 Muhasebe) drawer nav listesi veriliyor. Her yaprak item'ın `id`'si
   bir route — M9_SCREENS'te kaydı olan ekranı açar, olmayan için
   "henüz hazırlanmadı" placeholder'ı gösterilir. İkonlar Figma'da henüz
   atanmamış (hepsi aynı placeholder), renderSidebar varsayılanı kullanıyor.
   Alt (Drawer Buttom) öğesi Figma'da henüz "Drawer Item Label"
   placeholder'ı — kesinleşene kadar "Ayarlar" varsayıldı. */
const M9_NAV_ITEMS = [
  {
    label: 'Bilgi Girişi',
    children: [
      { id: 'yevmiye-fis-listesi',          label: 'Yevmiye Fiş Listesi' },
      { id: 'hesap-plani-listesi',          label: 'Hesap Planı Listesi' },
      { id: 'gunluk-kur-bilgisi',           label: 'Günlük Kur Bilgisi' },
      { id: 'hesap-plani-maliyet-merkezi',  label: 'Hesap Planı Maliyet Merkezi' },
      { id: 'sermaye-listesi',              label: 'Sermaye Listesi' },
      { id: 'istirak-listesi',              label: 'İştirak Listesi' },
    ],
  },
  {
    label: 'Tanımlamalar',
    children: [
      { id: 'sirket-bilgileri',             label: 'Şirket Bilgileri' },
      { id: 'tarih-ve-defter-kontrol',      label: 'Tarih ve Defter Kontrol' },
      { id: 'maliyet-merkezi',              label: 'Maliyet Merkezi' },
    ],
  },
];
const M9_NAV_BOTTOM_ITEMS = [
  { id: 'ayarlar', label: 'Ayarlar' }, // Figma'da henüz "Drawer Item Label" placeholder'ı — varsayım
];

// Yaprak item'lara onClick bağla (gruplar kendi aç/kapa davranışını taşıyor).
(function withNavHandlers(items) {
  items.forEach(it => {
    if (it.children) withNavHandlers(it.children);
    else if (it.id) it.onClick = `m9Navigate('${it.id}')`;
  });
})(M9_NAV_ITEMS.concat(M9_NAV_BOTTOM_ITEMS));

document.getElementById('m9Rail').outerHTML = renderSidebar(M9_NAV_ITEMS, M9_NAV_BOTTOM_ITEMS, 'collapsed');

/* ── Ekran yönlendirme ─────────────────────────────────────────── */
const _m9AllNavItems = M9_NAV_ITEMS.concat(M9_NAV_BOTTOM_ITEMS);
window.addEventListener('hashchange', () => m9RenderRoute(_m9AllNavItems));
m9RenderRoute(_m9AllNavItems);
