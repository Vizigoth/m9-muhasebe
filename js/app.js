/* ============================================================
   M9 MUHASEBE — app.js
   Main Page 1 (Figma "M9 Design") için sayfa-özel kablolama.
   Reusable engine: js/components.js (Bentas Design System'den taşındı).
   ============================================================ */

/* ── Sidebar ikonları (Lucide) ───────────────────────────────── */
const _icoHome = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>`;
const _icoUsers = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
const _icoFileText = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`;
const _icoWallet = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`;
const _icoSettings = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`;
const _icoLogOut = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`;

/* ── Sidebar — Hub Sidebar (Bentas Design System "Sidebar" component,
   Variant A: rail + drawer), collapsed açılış (Figma "Hub Sidebar
   Collapsed" ile aynı görünüm) — rail'deki daralt/genişlet ikonuna
   tıklanınca drawer gerçekten açılır/kapanır. ── */
document.getElementById('m9Rail').outerHTML = renderSidebar(
  [
    { icon: _icoHome, label: 'Ana Sayfa', selected: true },
    { icon: _icoUsers, label: 'Cari Hesaplar' },
    { icon: _icoFileText, label: 'Faturalar' },
    { icon: _icoWallet, label: 'Kasa / Banka' },
  ],
  [
    { icon: _icoSettings, label: 'Ayarlar' },
    { icon: _icoLogOut, label: 'Çıkış Yap', onClick: "window.location.href='index.html'" },
  ],
  'collapsed'
);

/* ── Toolbar — Yeni Ekle / Düzenle / Sil + SearchBox (sağa yaslı) ───── */
document.getElementById('m9Toolbar').innerHTML = `
  <button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid">
    <span class="bt-icon">${icoPlus}</span>Yeni Ekle
  </button>
  <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat" id="m9EditBtn" disabled>
    <span class="bt-icon">${icoEdit}</span>Düzenle
  </button>
  <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat" id="m9DeleteBtn" disabled>
    <span class="bt-icon">${icoTrash}</span>Sil
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
