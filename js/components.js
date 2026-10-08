/* ============================================================
   M9 MUHASEBE — components.js
   Bentas Design System'in gerçek bt-* component davranışları
   (docs/js/pages-web.js içinden taşındı). Kaynak: Bentas-Design-System
   repository (https://github.com/Vizigoth/Bentas-Design-System).

   Bu dosya sabit docs-demo verisi İÇERMEZ — her fonksiyon gerçek
   proje verisiyle (columns/rows) çağrılmak üzere genelleştirildi.
   CSS karşılıkları css/styles.css'te (canonical kaynak, birebir kopya).
   ============================================================ */

/* ── Ortak ikonlar ─────────────────────────────────────────── */
const icoSearch  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>`;
const icoClear   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
const icoSlidersHorizontal = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/></svg>`;
/* Buton/grid-menü ikonları (16×16) — Figma'daki Button/Menu Item ikon
   slotu .bt-icon'un 24×24 wrapper'ını DEĞİL, Bentas DS'in gerçek Button
   component'inin kendi deseni olan "svg'ye doğrudan width/height=16"
   yaklaşımını kullanır (bkz. pages-web.js `_btnIcon`/`_gridIconEditItem`/
   `_gridIconTrashItem`) — wrapper'sız, doğrudan buton/menü öğesinin
   içine konur. */
const icoPlus    = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const icoEdit    = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`;
const icoTrash   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
const _chkCheck  = `<svg class="bt-checkbox__check" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 5L4 7.5L8.5 2.5"/></svg>`;

const _gridIconSortUp   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>`;
const _gridIconSortDown = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>`;
const _gridIconFunnel   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>`;
const _gridIconMoreHorizontal = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>`;
const _gridIconEditItem = icoEdit;
const _gridIconTrashItem = icoTrash;

/* ============================================================
   BADGE — bt-badge (badgeHtml)
   ============================================================ */
const BADGE_TYPE_CFG = {
  solid:   { bg: 'var(--bt-surface-brand, #0d4e97)',          border: '',                                            text: 'var(--bt-text-inverted, #ffffff)', icon: '#ffffff' },
  flat:    { bg: 'var(--bt-surface-primary-subtle, #f5f5f5)', border: '',                                            text: 'var(--bt-text-default, #1a1a1a)',  icon: '#1a1a1a' },
  outline: { bg: 'var(--bt-surface-primary-subtle, #f5f5f5)', border: '1px solid var(--bt-border-default, #d4d4d4)', text: 'var(--bt-text-default, #1a1a1a)',  icon: '#1a1a1a' },
  ghost:   { bg: 'transparent',                               border: '',                                            text: 'var(--bt-text-default, #1a1a1a)',  icon: '#1a1a1a' },
};
const BADGE_COLOR_MAP = {
  blue:    { bgToken: '--bt-blue-100',    bgHex: '#e2edfc', accentToken: '--bt-blue-700',    accentHex: '#0d4e97' },
  green:   { bgToken: '--bt-green-100',   bgHex: '#daede5', accentToken: '--bt-green-700',   accentHex: '#2d584b' },
  yellow:  { bgToken: '--bt-yellow-100',  bgHex: '#f9f2ce', accentToken: '--bt-yellow-700',  accentHex: '#aa820a' },
  red:     { bgToken: '--bt-red-100',     bgHex: '#fde6e6', accentToken: '--bt-red-700',     accentHex: '#b31d38' },
  sky:     { bgToken: '--bt-sky-100',     bgHex: '#e0f2fe', accentToken: '--bt-sky-700',     accentHex: '#0369a1' },
  purple:  { bgToken: '--bt-purple-100',  bgHex: '#f3e8ff', accentToken: '--bt-purple-700',  accentHex: '#7e22ce' },
  cyan:    { bgToken: '--bt-cyan-100',    bgHex: '#cffafe', accentToken: '--bt-cyan-700',    accentHex: '#0e7490' },
  emerald: { bgToken: '--bt-emerald-100', bgHex: '#d1fae5', accentToken: '--bt-emerald-700', accentHex: '#047857' },
  orange:  { bgToken: '--bt-orange-100',  bgHex: '#ffedd5', accentToken: '--bt-orange-700',  accentHex: '#c2410c' },
};
const _bdgLoader = (clr) => `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${clr}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`;
const _bdgBase = `display:inline-flex;align-items:center;gap:var(--bt-space-2xs, 2px);padding:var(--bt-space-2xs, 2px) var(--bt-space-md, 8px);border-radius:var(--bt-radius-full, 9999px);font-size:var(--bt-text-xs-size, 12px);font-weight:400;line-height:var(--bt-text-xs-lh, 16px);white-space:nowrap;font-family:var(--font);`;

function badgeHtml(p) {
  const pr     = p || {};
  const type   = pr.type || 'solid';
  const color  = pr.color || 'blue';
  const cStyle = pr.colorStyle || 'basic';
  const showL  = pr.leftIcon !== 'off';
  const showR  = pr.rightIcon === 'on';
  const label  = pr.label || 'Badge';

  if (type === 'custom') {
    const cm      = BADGE_COLOR_MAP[color] || BADGE_COLOR_MAP.blue;
    const bg      = `var(${cm.bgToken}, ${cm.bgHex})`;
    const accent  = `var(${cm.accentToken}, ${cm.accentHex})`;
    const border  = cStyle === 'colored' ? accent : 'var(--bt-border-default, #d4d4d4)';
    const text    = cStyle === 'colored' ? accent : 'var(--bt-text-default, #1a1a1a)';
    const iconClr = cStyle === 'colored' ? cm.accentHex : '#1a1a1a';
    return `<span style="${_bdgBase}background:${bg};border:1px solid ${border};color:${text};">${showL ? _bdgLoader(iconClr) : ''}<span class="bt-badge__label">${label}</span>${showR ? _bdgLoader(iconClr) : ''}</span>`;
  }
  const cfg    = BADGE_TYPE_CFG[type] || BADGE_TYPE_CFG.solid;
  const border = cfg.border ? `border:${cfg.border};` : '';
  return `<span style="${_bdgBase}background:${cfg.bg};${border}color:${cfg.text};">${showL ? _bdgLoader(cfg.icon) : ''}<span class="bt-badge__label">${label}</span>${showR ? _bdgLoader(cfg.icon) : ''}</span>`;
}

/* ============================================================
   TEXTBOX / SEARCHBOX — Base Input (.bt-input__box) davranışı
   ============================================================ */
function tbxBaseInput(el) {
  const box = el.closest('.bt-input__box');
  if (!box) return;
  const hasValue = el.value.length > 0;
  box.classList.toggle('bt-input__box--filled', hasValue);
  let clearBtn = box.querySelector('.bt-input__clear-button');
  if (hasValue && !clearBtn) {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<div class="bt-input__clear-button" onclick="tbxBaseClear(this)"><span class="bt-icon">${icoClear}</span></div>`;
    box.appendChild(wrap.firstElementChild);
  } else if (!hasValue && clearBtn) {
    clearBtn.remove();
  }
}
function tbxBaseClear(el) {
  const box = el.closest('.bt-input__box');
  const input = box.querySelector('.bt-input__value');
  input.value = '';
  box.classList.remove('bt-input__box--filled');
  el.remove();
  input.focus();
}
window.tbxBaseInput = tbxBaseInput;
window.tbxBaseClear = tbxBaseClear;

/* ============================================================
   SEARCHBOX — Base Input üzerine kurulu, iki tip: Basic / Advanced
   Filtered (Figma "Inputs NEW" › SearchBox, node 1304:138807 / 1306:139744).
   Advanced Filtered sağda sabit bir Filter butonu (.bt-input__filter-button,
   Lucide sliders-horizontal) taşır — Clear butonu (yazınca) Filter
   butonunun ÖNÜNE eklenir (bkz. sbxSearchInput'un insertBefore'u).
   Figma'da filtre butonunun tıklama davranışı tanımlı değil (sadece
   görsel) — gerçek bir filtre paneli bağlanana kadar yalnızca bir
   açık/kapalı class'ı toggle'lıyor (Bentas DS'in kendi belgelenmiş
   davranışıyla AYNI, bkz. design system `components/searchbox` "Don't").
   ============================================================ */
function sbxSearchInput(el) {
  const box = el.closest('.bt-input__box');
  if (!box) return;
  const hasValue = el.value.length > 0;
  box.classList.toggle('bt-input__box--filled', hasValue);
  let clearBtn = box.querySelector('.bt-input__clear-button');
  if (hasValue && !clearBtn) {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<div class="bt-input__clear-button" onclick="sbxSearchClear(this)"><span class="bt-icon">${icoClear}</span></div>`;
    const filterBtn = box.querySelector('.bt-input__filter-button');
    box.insertBefore(wrap.firstElementChild, filterBtn || null);
  } else if (!hasValue && clearBtn) {
    clearBtn.remove();
  }
}
function sbxSearchClear(el) {
  const box = el.closest('.bt-input__box');
  const input = box.querySelector('.bt-input__value');
  input.value = '';
  box.classList.remove('bt-input__box--filled');
  el.remove();
  input.focus();
}
function sbxFilterToggle(el) {
  el.closest('.bt-input__box').classList.toggle('bt-input__box--filter-open');
}
window.sbxSearchInput = sbxSearchInput;
window.sbxSearchClear = sbxSearchClear;
window.sbxFilterToggle = sbxFilterToggle;

/**
 * renderSearchBox — gerçek SearchBox markup'ı.
 * opts: { size: 'sm'|'md'|'lg', advanced: boolean, placeholder }
 */
function renderSearchBox(opts) {
  const o = opts || {};
  const size = o.size || 'sm';
  const placeholder = o.placeholder || 'Ara...';
  const filterHtml = o.advanced ? `<div class="bt-input__filter-button" onclick="sbxFilterToggle(this)"><span class="bt-icon">${icoSlidersHorizontal}</span></div>` : '';
  return `<div class="bt-input__box bt-searchbox bt-input__box--${size}">
    <div class="bt-input__controls"><span class="bt-icon">${icoSearch}</span></div>
    <div class="bt-input__content"><input class="bt-input__value" type="text" placeholder="${placeholder}" oninput="sbxSearchInput(this)" /></div>
    ${filterHtml}
  </div>`;
}

/* ============================================================
   HUB SIDEBAR — .sbx-shell (Bentas Design System "Sidebar" component,
   Figma "Hub Sidebar Expanded" node 1705:182027).

   Bu bir TEK uygulamanın sidebar'ı DEĞİL — M9 ailesindeki BİRDEN FAZLA
   uygulamanın paylaştığı ortak "Hub" kabuğu:
   - Sidebar Top'taki logo (sbx-logo, 40×40) genel/hub markası — statik,
     tıklanmaz.
   - Rail'in ortasındaki İKİNCİ, küçük logo (sbx-collapse, 36×36, Figma'da
     literal adı "Logo") BU UYGULAMANIN (M9 Muhasebe) kendi simgesi —
     tıklanınca BU uygulamanın drawer'ını açar/kapatır (_sbxToggle).
     Rail'deki diğer ikonlar (dashboard/bell/calendar/star/grip/profil)
     hub-geneli kısayollar, drawer'ın İÇERİĞİYLE İLİŞKİLİ DEĞİL — ayrı
     hedeflere gider (henüz bağlanmadı, bkz. sbxHubAction).
   - Drawer HER ZAMAN bu uygulamanın kendi nav listesini gösterir (hangi
     rail ikonuna tıklandığından bağımsız) — sadece Logo açıp/kapatır.
   Kaynak: Bentas-Design-System docs/js/pages-web.js — sidebarMarkupA() /
   sbxDrawerItem() / _sbxToggle() / _sbxSelectItem() birebir taşındı; rail
   artık docs'un generic placeholder-ikon listesi değil, bu Figma node'unun
   GERÇEK ikonları (layout-dashboard/bell/calendar/star/grip) ile sabit.

   İKON BOYUTU 14×14 — Figma'nın ham Tailwind çıktısı "Icon/placeholder"ı
   size-[24px] gösteriyor (.sbx-btn/.sbx-item-icon kendi svg boyutunu CSS'le
   ZORLAMIYOR, bkz. CLAUDE.md "İkon boyutlandırma"), AMA gerçek, zaten
   kodlanmış Sidebar component'i (pages-web.js) bu slotlarda hep
   `sbxIconPlaceholder` (width="14" height="14") kullanıyor — o, Figma'nın
   tek pikselinden değil, bu projede ZATEN ÜZERİNDE ANLAŞILMIŞ gerçek
   implementasyondan gelen otorite. Önceki sürümde 24×24 kullanılmıştı
   (yanlış — ham Figma pikseline güvenip gerçek kodu kontrol etmemiştim).
   ============================================================ */
const icoLayoutDashboard = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`;
const icoBell = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>`;
const icoCalendar = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`;
const icoStar = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>`;
const icoGrip = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="5" cy="19" r="1"/></svg>`;
const icoUser = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
// Figma'da drawer item'ların ikonu henüz atanmamış — hepsi aynı "Icon/placeholder"
// (bracket/scan) ikonunu taşıyor (bkz. node 1705:181912 vb., _crdIconScan ile
// AYNI SVG). Gerçek per-item ikon atanana kadar bu kullanılır.
const icoDrawerItemPlaceholder = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>`;

window._sbxToggle = function () {
  const el = document.getElementById('sbxDrawer');
  if (el) el.classList.toggle('is-collapsed');
};
window._sbxSelectBtn = function (el) {
  const rail = el.closest('.sbx-rail');
  if (!rail) return;
  const current = rail.querySelector('.sbx-btn.is-selected');
  if (current && current !== el) current.classList.remove('is-selected');
  el.classList.add('is-selected');
};
window._sbxSelectItem = function (el) {
  const list = el.closest('.sbx-drawer-center') || el.closest('.sbx-drawer-bottom');
  if (!list) return;
  const current = list.querySelector('.sbx-item-inner.is-selected');
  if (current && current !== el) current.classList.remove('is-selected');
  el.classList.add('is-selected');
};
// Hub-geneli rail kısayolları (Dashboard/Bildirim/Takvim/Favoriler/Diğer
// Uygulamalar/Profil) henüz gerçek bir hedefe bağlı değil — backend/routing
// eklenince burası güncellenecek.
window._sbxHubAction = function (name) {
  console.log('[Hub Sidebar] henüz bağlanmadı:', name);
};
function sbxRailButtonHtml(item) {
  const i = item || {};
  return `<div class="sbx-btn${i.selected ? ' is-selected' : ''}" tabindex="0" title="${i.label || ''}" onclick="window._sbxSelectBtn(this);${i.onClick || ''}">${i.icon || ''}</div>`;
}
function sbxDrawerItemHtml(item) {
  const i = item || {};
  return `<div class="sbx-item">
            <div class="sbx-item-inner${i.selected ? ' is-selected' : ''}" tabindex="0" onclick="window._sbxSelectItem(this);${i.onClick || ''}">
              <div class="sbx-item-icon">${i.icon || icoDrawerItemPlaceholder}</div>
              <div class="sbx-item-label">${i.label || ''}</div>
            </div>
          </div>`;
}
/**
 * Hub Sidebar'ı render eder. Rail SABİTTİR (hub-geneli, tüm M9 uygulamaları
 * arasında aynı) — parametre almaz. drawerItems/drawerBottomItems BU
 * UYGULAMANIN kendi nav listesidir: [{ icon, label, selected, onClick }].
 */
function renderSidebar(drawerItems, drawerBottomItems, variant) {
  const nav = drawerItems || [];
  const bottom = drawerBottomItems || [];
  const collapsedCls = variant === 'collapsed' ? ' is-collapsed' : '';
  const railCenter = `
    <div class="sbx-btn" tabindex="0" title="Uygulamalar" onclick="window._sbxSelectBtn(this);window._sbxHubAction('dashboard')">${icoLayoutDashboard}</div>
    <div class="sbx-collapse" onclick="window._sbxToggle()" title="M9 Muhasebe — menüyü aç/kapat"></div>
    <div class="sbx-btn" tabindex="0" title="Bildirimler" onclick="window._sbxSelectBtn(this);window._sbxHubAction('notifications')">${icoBell}</div>
    <div class="sbx-btn" tabindex="0" title="Takvim" onclick="window._sbxSelectBtn(this);window._sbxHubAction('calendar')">${icoCalendar}</div>
    <div class="sbx-btn" tabindex="0" title="Favoriler" onclick="window._sbxSelectBtn(this);window._sbxHubAction('favorites')">${icoStar}</div>`;
  const railBottom = `
    <div class="sbx-btn" tabindex="0" title="Diğer Uygulamalar" onclick="window._sbxSelectBtn(this);window._sbxHubAction('apps')">${icoGrip}</div>
    <div class="sbx-btn" tabindex="0" title="Profil" onclick="window._sbxSelectBtn(this);window._sbxHubAction('profile')">${icoUser}</div>`;
  return `<div class="sbx-shell">
    <div class="sbx-rail">
      <div class="sbx-logo"></div>
      <div class="sbx-center">${railCenter}</div>
      <div class="sbx-bottom">${railBottom}</div>
    </div>
    <div class="sbx-drawer${collapsedCls}" id="sbxDrawer">
      <div class="sbx-drawer-top">${renderSearchBox({ advanced: true })}</div>
      <div class="sbx-drawer-center">${nav.map(sbxDrawerItemHtml).join('')}</div>
      <div class="sbx-drawer-bottom">${bottom.map(sbxDrawerItemHtml).join('')}</div>
    </div>
  </div>`;
}

/* ============================================================
   DATA TABLE — .bt-grid-container (gerçek sort/filter/resize/select)
   Kaynak: Bentas Design System "Data Table" component'i.
   ============================================================ */
function gridControlIcon(icon, color) {
  const style = color ? ` style="color:${color};"` : '';
  return `<span class="bt-grid__control-icon"${style}>${icon}</span>`;
}
function gridHeaderCheckboxHtml() {
  return `<span class="bt-grid__control" onclick="btGridSelectAll(this)" style="cursor:pointer;"><span class="bt-checkbox__box">${_chkCheck}</span></span>`;
}
function gridLeadingHtml(kind, opts) {
  const o = opts || {};
  switch (kind) {
    case 'checkbox':
      return `<span class="bt-grid__control" onclick="this.querySelector('.bt-checkbox__box').classList.toggle('bt-checkbox__box--checked')" style="cursor:pointer;"><span class="bt-checkbox__box">${_chkCheck}</span></span>`;
    case 'dot':
      return `<span class="bt-grid__control"><span class="bt-grid__dot"></span></span>`;
    case 'avatar':
      // Figma "Avatar Control" (28×28, .bt-avatar--xs .bt-avatar--brand) —
      // gerçek Avatar component'i, Data Table'ın zaten var olan leading
      // kind'i. initials verilmezse (Avatar component'inin kendi docs
      // demo'sundaki gibi) 'EG' varsayılanına düşer.
      return `<span class="bt-grid__control"><span class="bt-avatar bt-avatar--xs bt-avatar--brand"><span class="bt-avatar__initials">${o.initials || 'EG'}</span></span></span>`;
    default:
      return '';
  }
}
function gridTrailingHtml(kind, opts) {
  const o = opts || {};
  switch (kind) {
    case 'badge':
      return `<span class="bt-grid__control">${badgeHtml({ type: 'custom', color: o.color || 'blue', colorStyle: 'basic', leftIcon: 'off', label: o.label })}</span>`;
    case 'button':
      return `<span class="bt-grid__control-group" onclick="event.stopPropagation()">
        ${o.buttonLabel ? `<span class="bt-grid__control"><button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" onclick="${o.onButtonClick || ''}">${o.buttonLabel}</button></span>` : ''}
        <span class="bt-grid__control">
          <div class="bt-grid__menu">
            <button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon" aria-label="Diğer" aria-haspopup="true" onclick="btGridMenuToggle(event, this)">${_gridIconMoreHorizontal}</button>
            <ul class="bt-grid__menu-list" role="menu">
              <li class="bt-grid__menu-item" role="menuitem" onclick="btGridMenuClose(event, this);${o.onEdit || ''}"><span class="bt-grid__menu-item-icon">${_gridIconEditItem}</span>Düzenle</li>
              <li class="bt-grid__menu-item bt-grid__menu-item--danger" role="menuitem" onclick="btGridMenuClose(event, this);${o.onDelete || ''}"><span class="bt-grid__menu-item-icon">${_gridIconTrashItem}</span>Sil</li>
            </ul>
          </div>
        </span>
      </span>`;
    default:
      return '';
  }
}

function gridHeaderCellHtml(opts) {
  const o = opts || {};
  const position = o.position || 'left';
  const showCheckbox = o.showCheckbox === true;
  const showContent = o.showContent !== false;
  const contentText = o.contentText || '';
  const showSort = o.showSort === true;
  const showFilter = o.showFilter === true;
  const width = o.width || 180;
  const fillWidth = o.fillWidth === true;
  const forceSorted = o.forceSorted === true;
  // sticky/frozenEdge — Data Table "Frozen Column" sayfasındaki AYNI desen
  // (gerçek position:sticky, sağ kenarda yumuşak gölge) — bir kolonu sol
  // kenara sabitlemek için sticky:0 (px), frozenEdge:true geçilir.
  const sticky = o.sticky;
  const frozenEdge = o.frozenEdge === true;
  const stickyRight = o.stickyRight;
  const frozenRightEdge = o.frozenRightEdge === true;

  const cls = [
    'bt-grid__header-cell',
    `bt-grid__header-cell--${position}`,
    showSort ? 'bt-grid__header-cell--sortable' : '',
    forceSorted ? 'bt-grid__header-cell--sorted' : '',
    frozenEdge ? 'bt-grid__header-cell--frozen-edge' : '',
    frozenRightEdge ? 'bt-grid__header-cell--frozen-right-edge' : '',
  ].filter(Boolean).join(' ');
  const sortDirAttr = forceSorted ? ` data-sort-dir="${o.sortDir || 'asc'}"` : '';
  const sortClickAttrs = showSort ? ` onclick="btGridSortBy(event,this)"` : '';
  const stickyStyle = sticky != null
    ? `position:sticky;left:${sticky}px;z-index:5;`
    : stickyRight != null
      ? `position:sticky;right:${stickyRight}px;z-index:5;`
      : '';

  const checkboxHtml = showCheckbox ? gridHeaderCheckboxHtml() : '';
  const contentHtml  = showContent ? `<span class="bt-grid__content">${contentText}</span>` : '';
  const sortHtml = showSort ? `<span class="bt-grid__sort">
    <span class="bt-grid__control bt-grid__control--sort-up">${gridControlIcon(_gridIconSortUp)}</span>
    <span class="bt-grid__control bt-grid__control--sort-down">${gridControlIcon(_gridIconSortDown)}</span>
  </span>` : '';
  const filterHtml = showFilter ? `<span class="bt-grid__control"><button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon bt-grid__filter-btn" aria-label="Filtrele" onclick="event.stopPropagation();btGridFilterToggle(event,this)">${gridControlIcon(_gridIconFunnel)}</button></span>` : '';
  const resizeHandle = (showContent && position !== 'right') ? `<span class="bt-grid__resize-handle" onmousedown="btGridResizeStart(event,this)"></span>` : '';

  const widthStyleH = fillWidth ? `flex:1;min-width:${width}px;` : `width:${width}px;`;
  return `<div class="${cls}" style="${widthStyleH}box-sizing:border-box;${stickyStyle}"${sortClickAttrs}${sortDirAttr}>${checkboxHtml}${contentHtml}${sortHtml}${filterHtml}${resizeHandle}</div>`;
}

function gridCellHtml(opts) {
  const o = opts || {};
  const position = o.position || 'left';
  const leading  = o.leading || 'none';
  const showContent = o.showContent !== false;
  const contentText = o.contentText == null ? '' : o.contentText;
  const contentLink = o.contentLink === true;
  const trailing = o.trailing || 'none';
  const width = o.width || 180;
  const fillWidth = o.fillWidth === true;
  const sortValue = o.sortValue;
  const sticky = o.sticky;
  const frozenEdge = o.frozenEdge === true;
  const stickyRight = o.stickyRight;
  const frozenRightEdge = o.frozenRightEdge === true;

  const cls = [
    'bt-grid__cell',
    `bt-grid__cell--${position}`,
    frozenEdge ? 'bt-grid__cell--frozen-edge' : '',
    frozenRightEdge ? 'bt-grid__cell--frozen-right-edge' : '',
  ].filter(Boolean).join(' ');
  const sortValueAttr = sortValue != null ? ` data-sort-value="${String(sortValue).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"` : '';
  const stickyStyle = sticky != null
    ? `position:sticky;left:${sticky}px;z-index:5;`
    : stickyRight != null
      ? `position:sticky;right:${stickyRight}px;z-index:5;`
      : '';
  // onClick — ör. "Fiş Numarası" gibi link görünümlü bir hücrenin kendi
  // tıklamasıyla (satırın kendi onclick'inden, btGridRowToggle'dan BAĞIMSIZ,
  // stopPropagation ile) bir kaydı açması için. contentLink'ten ayrı —
  // contentLink sadece görsel (.bt-grid__content--link, mavi+altı çizili).
  const onClickAttr = o.onClick ? ` onclick="event.stopPropagation();${o.onClick}"` : '';

  const leadingHtml  = gridLeadingHtml(leading, o.leadingOpts);
  const contentHtml  = showContent ? `<span class="bt-grid__content${contentLink ? ' bt-grid__content--link' : ''}"${onClickAttr}>${contentText}</span>` : '';
  const trailingHtml = gridTrailingHtml(trailing, o.trailingOpts);

  const widthStyleC = fillWidth ? `flex:1;min-width:${width}px;` : `width:${width}px;`;
  return `<div class="${cls}" style="${widthStyleC}box-sizing:border-box;${stickyStyle}"${sortValueAttr}>${leadingHtml}${contentHtml}${trailingHtml}</div>`;
}

function gridNoRecordHtml(width, text) {
  return `<div class="bt-grid__no-record" style="width:${width}px;box-sizing:border-box;"><span class="bt-grid__no-record-text">${text || 'Kayıt bulunamadı'}</span></div>`;
}

/* ── Sıralama ─────────────────────────────────────────────── */
window.btGridSortBy = function (event, headerEl) {
  if (headerEl.dataset.justResized) return;
  const headerRow = headerEl.parentElement;
  const grid = headerEl.closest('.bt-grid');
  const body = grid && grid.querySelector('.bt-grid__body');
  if (!body) return;
  const nth = Array.from(headerRow.children).indexOf(headerEl) + 1;
  const currentDir = headerEl.getAttribute('data-sort-dir');
  const nextDir = currentDir === 'asc' ? 'desc' : currentDir === 'desc' ? null : 'asc';

  headerRow.querySelectorAll('.bt-grid__header-cell--sorted').forEach(h => {
    if (h !== headerEl) { h.classList.remove('bt-grid__header-cell--sorted'); h.removeAttribute('data-sort-dir'); }
  });

  const rows = Array.from(body.children).filter(r => r.classList.contains('bt-grid__row'));

  if (nextDir === null) {
    headerEl.classList.remove('bt-grid__header-cell--sorted');
    headerEl.removeAttribute('data-sort-dir');
    rows.sort((ra, rb) => parseInt(ra.dataset.rowIndex, 10) - parseInt(rb.dataset.rowIndex, 10));
    rows.forEach(r => body.appendChild(r));
    return;
  }
  headerEl.classList.add('bt-grid__header-cell--sorted');
  headerEl.setAttribute('data-sort-dir', nextDir);
  rows.sort((ra, rb) => {
    const va = (ra.children[nth - 1] && ra.children[nth - 1].getAttribute('data-sort-value')) || '';
    const vb = (rb.children[nth - 1] && rb.children[nth - 1].getAttribute('data-sort-value')) || '';
    const na = parseFloat(va), nb = parseFloat(vb);
    const bothNumeric = va.trim() !== '' && vb.trim() !== '' && String(na) === va.trim() && String(nb) === vb.trim();
    const cmp = bothNumeric ? (na - nb) : va.localeCompare(vb, 'tr');
    return nextDir === 'asc' ? cmp : -cmp;
  });
  rows.forEach(r => body.appendChild(r));
};

/* ── Satır seçimi ─────────────────────────────────────────── */
window.btGridUpdateToolbar = function (grid) {
  const panel = grid && grid.closest('.bt-grid-panel');
  if (!panel) return;
  const hasSelection = !!panel.querySelector('.bt-grid__row--active');
  panel.querySelectorAll('[data-grid-row-action]').forEach(btn => { btn.disabled = !hasSelection; });
};
window.btGridRowToggle = function (row) {
  row.classList.toggle('bt-grid__row--active');
  const active = row.classList.contains('bt-grid__row--active');
  const box = row.querySelector('.bt-checkbox__box');
  if (box) box.classList.toggle('bt-checkbox__box--checked', active);
  btGridUpdateToolbar(row.closest('.bt-grid'));
};
window.btGridSelectAll = function (el) {
  const box = el.querySelector('.bt-checkbox__box');
  box.classList.toggle('bt-checkbox__box--checked');
  const checked = box.classList.contains('bt-checkbox__box--checked');
  const table = el.closest('.bt-grid');
  if (!table) return;
  table.querySelectorAll('.bt-grid__cell .bt-checkbox__box').forEach(b => b.classList.toggle('bt-checkbox__box--checked', checked));
  table.querySelectorAll('.bt-grid__row--clickable').forEach(row => row.classList.toggle('bt-grid__row--active', checked));
  btGridUpdateToolbar(table);
};

/* ── Kolon genişliği (resize) ─────────────────────────────── */
window.btGridResizeStart = function (event, handle) {
  event.preventDefault();
  event.stopPropagation();
  const headerCell = handle.closest('.bt-grid__header-cell');
  const headerRow  = headerCell.parentElement;
  const grid       = headerCell.closest('.bt-grid');
  const nth        = Array.from(headerRow.children).indexOf(headerCell) + 1;
  const startX     = event.clientX;
  const startWidth = headerCell.getBoundingClientRect().width;
  const minWidth   = 40;
  handle.classList.add('bt-grid__resize-handle--resizing');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  let moved = false;
  function onMove(e) {
    if (Math.abs(e.clientX - startX) > 2) moved = true;
    const newWidth = Math.max(minWidth, startWidth + (e.clientX - startX));
    headerCell.style.flex = '0 0 auto';
    headerCell.style.width = newWidth + 'px';
    grid.querySelectorAll(`.bt-grid__body .bt-grid__cell:nth-child(${nth})`).forEach(cell => {
      cell.style.flex = '0 0 auto';
      cell.style.width = newWidth + 'px';
    });
  }
  function onUp() {
    handle.classList.remove('bt-grid__resize-handle--resizing');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    if (moved) {
      headerCell.dataset.justResized = '1';
      setTimeout(() => { delete headerCell.dataset.justResized; }, 0);
    }
  }
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
};

/* ── Filtre overlay (Ara / Tümünü Seç / Temizle / Uygula) ─── */
const _gridFilterEsc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function btGridFilterCloseAll() {
  document.querySelectorAll('.bt-grid__filter-panel[data-bt-grid-portal="1"]').forEach(panel => {
    if (panel._btGridFilterHeader) {
      const btn = panel._btGridFilterHeader.querySelector('.bt-grid__filter-btn');
      if (btn) btn.classList.remove('bt-grid__filter-btn--open');
    }
    panel.remove();
  });
}
window.btGridApplyFilters = function (grid) {
  if (!grid) return;
  const body = grid.querySelector('.bt-grid__body');
  if (!body) return;
  const activeHeaders = Array.from(grid.querySelectorAll('.bt-grid__header-cell[data-filter-active="true"]'));
  const rows = Array.from(body.children).filter(r => r.classList.contains('bt-grid__row'));
  if (!activeHeaders.length) { rows.forEach(r => { r.style.display = ''; }); return; }
  const filters = activeHeaders.map(h => ({
    nth: Array.from(h.parentElement.children).indexOf(h) + 1,
    values: new Set(JSON.parse(h.dataset.filterValues || '[]')),
  }));
  rows.forEach(row => {
    const visible = filters.every(f => {
      const cell = row.children[f.nth - 1];
      const val = cell ? cell.getAttribute('data-sort-value') : null;
      return val != null && f.values.has(val);
    });
    row.style.display = visible ? '' : 'none';
  });
};
function btGridFilterUpdateTriggerStyle(headerEl) {
  const btn = headerEl.querySelector('.bt-grid__filter-btn');
  if (!btn) return;
  btn.classList.toggle('bt-btn--state-selected', headerEl.getAttribute('data-filter-active') === 'true');
}
window.btGridFilterToggle = function (event, btn) {
  event.stopPropagation();
  const headerEl = btn.closest('.bt-grid__header-cell');
  const grid = headerEl.closest('.bt-grid');
  const existing = document.querySelector('.bt-grid__filter-panel[data-bt-grid-portal="1"]');
  const wasOpenForThis = !!(existing && existing._btGridFilterHeader === headerEl);
  btGridFilterCloseAll();
  if (wasOpenForThis) return;

  const headerRow = headerEl.parentElement;
  const nth = Array.from(headerRow.children).indexOf(headerEl) + 1;
  const body = grid.querySelector('.bt-grid__body');
  const bodyRows = body ? Array.from(body.children).filter(r => r.classList.contains('bt-grid__row')) : [];
  const values = Array.from(new Set(bodyRows.map(r => {
    const cell = r.children[nth - 1];
    return cell ? cell.getAttribute('data-sort-value') : null;
  }).filter(v => v != null && v !== ''))).sort((a, b) => a.localeCompare(b, 'tr'));

  const isActive = headerEl.getAttribute('data-filter-active') === 'true';
  const activeValues = isActive ? new Set(JSON.parse(headerEl.dataset.filterValues || '[]')) : new Set(values);

  const panel = document.createElement('div');
  panel.className = 'bt-grid__filter-panel';
  panel.innerHTML = `
    <div class="bt-grid__filter-search">
      <div class="bt-input__box bt-searchbox bt-input__box--md" onclick="event.stopPropagation()">
        <div class="bt-input__controls"><span class="bt-icon">${icoSearch}</span></div>
        <div class="bt-input__content"><input class="bt-input__value" type="text" placeholder="Ara..." oninput="btGridFilterSearch(event,this)"></div>
      </div>
    </div>
    <div class="bt-grid__filter-list">
      <label class="bt-grid__filter-option bt-grid__filter-option--all" onclick="btGridFilterSelectAllToggle(event,this)">
        <span class="bt-checkbox__box${activeValues.size === values.length && values.length > 0 ? ' bt-checkbox__box--checked' : ''}">${_chkCheck}</span>
        <span class="bt-grid__filter-option-text">Tümünü Seç</span>
      </label>
      ${values.map(v => `<label class="bt-grid__filter-option" data-filter-value="${_gridFilterEsc(v)}" onclick="btGridFilterOptionToggle(event,this)">
        <span class="bt-checkbox__box${activeValues.has(v) ? ' bt-checkbox__box--checked' : ''}">${_chkCheck}</span>
        <span class="bt-grid__filter-option-text">${_gridFilterEsc(v)}</span>
      </label>`).join('')}
    </div>
    <div class="bt-grid__filter-footer">
      <button type="button" class="bt-btn bt-btn--sm bt-btn--secondary-flat" onclick="btGridFilterClear(event,this)">Temizle</button>
      <button type="button" class="bt-btn bt-btn--sm bt-btn--primary-solid" onclick="btGridFilterApplyClick(event,this)">Uygula</button>
    </div>
  `;
  panel._btGridFilterHeader = headerEl;
  panel.setAttribute('data-bt-grid-portal', '1');
  panel.addEventListener('click', e => e.stopPropagation());
  document.body.appendChild(panel);
  const r = btn.getBoundingClientRect();
  const panelWidth = 220;
  panel.style.position = 'fixed';
  panel.style.top = (r.bottom + 4) + 'px';
  panel.style.left = Math.max(8, Math.min(window.innerWidth - panelWidth - 8, r.right - panelWidth)) + 'px';
  btn.classList.add('bt-grid__filter-btn--open');
};
window.btGridFilterSearch = function (event, input) {
  const box = input.closest('.bt-searchbox');
  if (box) box.classList.toggle('bt-searchbox--filled', input.value.length > 0);
  const q = input.value.trim().toLocaleLowerCase('tr');
  const panel = input.closest('.bt-grid__filter-panel');
  panel.querySelectorAll('.bt-grid__filter-option:not(.bt-grid__filter-option--all)').forEach(opt => {
    const text = opt.querySelector('.bt-grid__filter-option-text').textContent.toLocaleLowerCase('tr');
    opt.style.display = text.includes(q) ? '' : 'none';
  });
};
window.btGridFilterOptionToggle = function (event, label) {
  event.stopPropagation();
  const box = label.querySelector('.bt-checkbox__box');
  box.classList.toggle('bt-checkbox__box--checked');
  const panel = label.closest('.bt-grid__filter-panel');
  const allOpts = Array.from(panel.querySelectorAll('.bt-grid__filter-option:not(.bt-grid__filter-option--all)'));
  const allChecked = allOpts.length > 0 && allOpts.every(o => o.querySelector('.bt-checkbox__box').classList.contains('bt-checkbox__box--checked'));
  panel.querySelector('.bt-grid__filter-option--all .bt-checkbox__box').classList.toggle('bt-checkbox__box--checked', allChecked);
};
window.btGridFilterSelectAllToggle = function (event, label) {
  event.stopPropagation();
  const box = label.querySelector('.bt-checkbox__box');
  const nextChecked = !box.classList.contains('bt-checkbox__box--checked');
  box.classList.toggle('bt-checkbox__box--checked', nextChecked);
  const panel = label.closest('.bt-grid__filter-panel');
  panel.querySelectorAll('.bt-grid__filter-option:not(.bt-grid__filter-option--all)').forEach(opt => {
    if (opt.style.display === 'none') return;
    opt.querySelector('.bt-checkbox__box').classList.toggle('bt-checkbox__box--checked', nextChecked);
  });
};
window.btGridFilterClear = function (event, btn) {
  event.stopPropagation();
  const panel = btn.closest('.bt-grid__filter-panel');
  const headerEl = panel._btGridFilterHeader;
  headerEl.removeAttribute('data-filter-active');
  headerEl.removeAttribute('data-filter-values');
  btGridFilterUpdateTriggerStyle(headerEl);
  window.btGridApplyFilters(headerEl.closest('.bt-grid'));
  btGridFilterCloseAll();
};
window.btGridFilterApplyClick = function (event, btn) {
  event.stopPropagation();
  const panel = btn.closest('.bt-grid__filter-panel');
  const headerEl = panel._btGridFilterHeader;
  const allOptions = Array.from(panel.querySelectorAll('.bt-grid__filter-option:not(.bt-grid__filter-option--all)'));
  const checked = allOptions.filter(o => o.querySelector('.bt-checkbox__box').classList.contains('bt-checkbox__box--checked')).map(o => o.dataset.filterValue);
  if (checked.length === allOptions.length) {
    headerEl.removeAttribute('data-filter-active');
    headerEl.removeAttribute('data-filter-values');
  } else {
    headerEl.setAttribute('data-filter-active', 'true');
    headerEl.setAttribute('data-filter-values', JSON.stringify(checked));
  }
  btGridFilterUpdateTriggerStyle(headerEl);
  window.btGridApplyFilters(headerEl.closest('.bt-grid'));
  btGridFilterCloseAll();
};
document.addEventListener('click', function (e) {
  if (!e.target.closest('.bt-grid__filter-panel') && !e.target.closest('.bt-grid__filter-btn')) btGridFilterCloseAll();
});
document.addEventListener('scroll', function (e) {
  if (e.target && e.target.closest && e.target.closest('.bt-grid__filter-panel')) return;
  btGridFilterCloseAll();
}, true);

/* ── Satır aksiyon menüsü (⋯) ────────────────────────────── */
window.btGridMenuToggle = function (event, btn) {
  event.stopPropagation();
  const menu = btn.closest('.bt-grid__menu');
  if (!menu) return;
  const list = menu.querySelector('.bt-grid__menu-list') || document.querySelector('.bt-grid__menu-list[data-bt-grid-portal="1"]');
  const wasOpen = list && list.style.display === 'block';
  document.querySelectorAll('.bt-grid__menu-list[data-bt-grid-portal="1"]').forEach(btGridMenuHide);
  if (!wasOpen && list) {
    const r = btn.getBoundingClientRect();
    list.style.top = (r.bottom + 2) + 'px';
    list.style.right = (window.innerWidth - r.right) + 'px';
    list.style.display = 'block';
    list.setAttribute('data-bt-grid-portal', '1');
    list._btGridHome = menu;
    document.body.appendChild(list);
  }
};
function btGridMenuHide(list) {
  list.style.display = 'none';
  list.removeAttribute('data-bt-grid-portal');
  if (list._btGridHome) list._btGridHome.appendChild(list);
}
window.btGridMenuClose = function (event, item) {
  event.stopPropagation();
  const list = item.closest('.bt-grid__menu-list');
  if (list) btGridMenuHide(list);
};
document.addEventListener('click', function (e) {
  if (!e.target.closest('.bt-grid__menu')) {
    document.querySelectorAll('.bt-grid__menu-list[data-bt-grid-portal="1"]').forEach(btGridMenuHide);
  }
});

/**
 * renderDataTable — gerçek proje verisiyle çalışan genel Data Table render'ı.
 *
 * columns: [{ field, headerText, width, fillWidth, sort, filter, frozen,
 *              headerCheckbox, cellLeading: 'none'|'checkbox'|'dot'|'avatar',
 *              leadingOpts(row) => opts (avatar: { initials }),
 *              cellTrailing: 'none'|'badge'|'button',
 *              trailingOpts(row) => opts, format(row) => string,
 *              contentLink, onClick(row) => jsString }]
 * rows: [{ ...herhangi bir alan... }]
 * opts: { emptyText }
 *
 * frozen:true — sol kenara sabit (position:sticky, "Frozen Column" sayfasının
 * aynısı). Sadece sol-baştan ardışık bir ÖN EK (ilk N kolon) desteklenir —
 * offset'ler bu N kolonun genişlik toplamından, edge gölgesi son frozen
 * kolonun sağ kenarından otomatik hesaplanır.
 */
function renderDataTable(columns, rows, opts) {
  const o = opts || {};
  const cols = columns || [];
  const posFor = i => i === 0 ? 'left' : i === cols.length - 1 ? 'right' : 'middle';
  const totalWidth = cols.reduce((sum, c) => sum + (c.width || 180), 0);

  let _frozenOffset = 0;
  const frozenInfo = cols.map((c, i) => {
    if (!c.frozen) return null;
    const sticky = _frozenOffset;
    _frozenOffset += (c.width || 180);
    return { sticky, frozenEdge: !(cols[i + 1] && cols[i + 1].frozen) };
  });

  const headerRow = cols.map((c, i) => gridHeaderCellHtml({
    position: posFor(i),
    width: c.width,
    fillWidth: c.fillWidth,
    sticky: frozenInfo[i] ? frozenInfo[i].sticky : undefined,
    frozenEdge: frozenInfo[i] ? frozenInfo[i].frozenEdge : false,
    showCheckbox: !!c.headerCheckbox,
    showContent: c.headerText !== undefined,
    contentText: c.headerText || '',
    showSort: !!c.sort,
    showFilter: !!c.filter,
  })).join('');

  const bodyHtml = (!rows || rows.length === 0)
    ? gridNoRecordHtml(totalWidth, o.emptyText)
    : rows.map((row, idx) => `<div class="bt-grid__row bt-grid__row--clickable" data-row-index="${idx}" onclick="btGridRowToggle(this)">${cols.map((c, i) => gridCellHtml({
        position: posFor(i),
        width: c.width,
        fillWidth: c.fillWidth,
        sticky: frozenInfo[i] ? frozenInfo[i].sticky : undefined,
        frozenEdge: frozenInfo[i] ? frozenInfo[i].frozenEdge : false,
        leading: c.cellLeading || 'none',
        leadingOpts: c.leadingOpts ? c.leadingOpts(row) : undefined,
        trailing: c.cellTrailing || 'none',
        trailingOpts: c.trailingOpts ? c.trailingOpts(row) : undefined,
        showContent: (c.cellTrailing || 'none') === 'none',
        contentText: c.format ? c.format(row) : (c.field ? row[c.field] : ''),
        contentLink: !!c.contentLink,
        onClick: c.onClick ? c.onClick(row, idx) : undefined,
        sortValue: c.field ? row[c.field] : undefined,
      })).join('')}</div>`).join('');

  return `<div class="bt-grid-scroll-x"><div class="bt-grid">
    <div class="bt-grid__row">${headerRow}</div>
    <div class="bt-grid__body">${bodyHtml}</div>
  </div></div>`;
}

/* ============================================================
   WINDOW (.bt-window) — sağdan kayan panel, Bentas Design System'in
   gerçek "Form Panel"/"Sizes" örneğinden (foundations/design-examples,
   components/nav-drawer) birebir taşındı. Boyut `.bt-window--{sm|md|lg|xl}`
   (33vw/50vw/66vw/100%) — sm/md/lg'nin maxbtn'i dexToggleMaximize ile
   tam ekrana BÜYÜR; xl zaten tam ekran başladığı için maxbtn'i
   dexToggleMinimize ile 50vw'a KÜÇÜLÜR (ikon başlangıçta ters — bkz.
   renderWindow'daki isXl dalı). Açma/kapama: dexOpenPanel(panelId,
   overlayId) / dexClosePanel(panelId, overlayId) — hidden→reflow→
   is-open sırası (dexOpenPanel) ve transitionend sonrası hidden=true
   (dexClosePanel) kaynak koddaki AYNI desen.
   ============================================================ */
window.dexOpenPanel = function (panelId, overlayId) {
  const panel = document.getElementById(panelId);
  const overlay = overlayId ? document.getElementById(overlayId) : null;
  panel.hidden = false;
  panel.getBoundingClientRect(); // reflow — animasyon başlasın diye şart
  panel.classList.add('is-open');
  if (overlay) overlay.classList.add('is-open');
};
window.dexClosePanel = function (panelId, overlayId) {
  const panel = document.getElementById(panelId);
  const overlay = overlayId ? document.getElementById(overlayId) : null;
  panel.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-open');
  panel.addEventListener('transitionend', function hide() {
    panel.hidden = true;
    panel.removeEventListener('transitionend', hide);
  }, { once: true });
};
window.dexToggleMaximize = function (panelId) {
  const panel = document.getElementById(panelId);
  const btn = document.getElementById(panelId + '-maxbtn');
  const isMax = panel.classList.toggle('is-maximized');
  btn.querySelector('.bt-maxbtn-max').style.display = isMax ? 'none' : '';
  btn.querySelector('.bt-maxbtn-min').style.display = isMax ? '' : 'none';
};
window.dexToggleMinimize = function (panelId) {
  const panel = document.getElementById(panelId);
  const btn = document.getElementById(panelId + '-maxbtn');
  const isMin = panel.classList.toggle('is-minimized');
  btn.querySelector('.bt-maxbtn-max').style.display = isMin ? '' : 'none';
  btn.querySelector('.bt-maxbtn-min').style.display = isMin ? 'none' : '';
};

const _winIconClose = `<span class="bt-window__icon-slot">${icoClear}</span>`;
const _winIconMax = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`;
const _winIconMin = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>`;

/**
 * renderWindow — gerçek bt-window markup'ı (overlay + aside.bt-window).
 * opts: { id, overlayId, size:'sm'|'md'|'lg'|'xl', title, headerActions:html,
 *         bodyHtml }
 */
function renderWindow(opts) {
  const o = opts || {};
  const id = o.id;
  const overlayId = o.overlayId || (id + 'Ov');
  const size = o.size || 'md';
  const isXl = size === 'xl';
  // xl zaten tam ekran açılıyor — maxbtn onu KÜÇÜLTÜR (dexToggleMinimize),
  // bu yüzden başlangıç ikonu ters: max ikonu gizli, min ikonu görünür.
  const maxBtnOnClick = isXl ? `dexToggleMinimize('${id}')` : `dexToggleMaximize('${id}')`;
  const maxIconHtml = `<span class="bt-maxbtn-max"${isXl ? ' style="display:none;"' : ''}>${_winIconMax}</span>`;
  const minIconHtml = `<span class="bt-maxbtn-min"${isXl ? '' : ' style="display:none;"'}>${_winIconMin}</span>`;
  return `
    <div class="bt-win-overlay" id="${overlayId}" onclick="dexClosePanel('${id}','${overlayId}')"></div>
    <aside class="bt-window bt-window--${size}" id="${id}" role="dialog" aria-modal="true" aria-labelledby="${id}-title" hidden>
      <div class="bt-window__header">
        <div class="bt-window__header-left">
          <div class="bt-window__controls">
            <button class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon" onclick="dexClosePanel('${id}','${overlayId}')" aria-label="Kapat">${_winIconClose}</button>
            <button class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon" id="${id}-maxbtn" onclick="${maxBtnOnClick}" aria-label="Boyutu değiştir">${maxIconHtml}${minIconHtml}</button>
          </div>
          <span class="bt-window__title" id="${id}-title">${o.title || ''}</span>
        </div>
        <div class="bt-window__header-actions">${o.headerActions || ''}</div>
      </div>
      <div class="bt-window__body" id="${id}-body">${o.bodyHtml != null ? `<div class="bt-window__panel">${o.bodyHtml}</div>` : ''}</div>
    </aside>`;
}
/* ════════════════════════════════════════════════════════════════
   GERÇEK TextBox / Dropdown / DatePicker / Textarea — Base Input
   mimarisi (.bt-input/.bt-textbox/.bt-dropdown/.bt-datepicker) ve
   Textarea'nın kendi .bt-txa sistemi. pages-web.js'teki tbxBase-,
   ddBase-, dpBase-, _cal- ve txaCls fonksiyonlarından birebir taşındı.

   ÖNEMLİ (kullanıcı düzeltmesi, 2026-10-08): bt-window'un kendi Design
   Examples sayfasındaki form alanları (.bt-win-input/.bt-win-dropdown/
   .bt-win-datepicker) bu projede ÖNCE kullanılmıştı — ama bunlar sadece
   o TEK demo panelinde yaşayan, Base Input mimarisiyle PAYLAŞILMAYAN,
   basitleştirilmiş bir alternatif set; gerçek TextBox/Dropdown/DatePicker
   component'leri DEĞİL. CLAUDE.md'nin "Mevcut Component'leri Reuse Et"
   kuralı gereği buradaki her alan artık uygulamanın başka hiçbir yerinde
   (örn. Toolbar SearchBox) kullanılanla AYNI gerçek component mimarisini
   kullanıyor — sadece "default" (interaktif) state, docs'un 9-state
   önizleme sistemi değil. */

// ── TextBox — zaten var olan tbxBaseInput/tbxBaseClear'ı kullanır ──
function winFieldHtml(label, value, id) {
  const esc = String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<div class="bt-input bt-textbox bt-input--md">
    <div class="bt-input__label-value"><span class="bt-input__label">${label}</span></div>
    <div class="bt-input__box bt-input__box--md">
      <div class="bt-input__content"><input class="bt-input__value"${id ? ` id="${id}"` : ''} type="text" value="${esc}" oninput="tbxBaseInput(this)" /></div>
    </div>
  </div>`;
}
// Sistem/audit alanları (Giriş Tarihi vb.) — gerçek TextBox'ın Disabled state'i.
function winReadonlyFieldHtml(label, value, id) {
  const esc = String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<div class="bt-input bt-textbox bt-input--md">
    <div class="bt-input__label-value"><span class="bt-input__label">${label}</span></div>
    <div class="bt-input__box bt-input__box--md bt-input__box--disabled">
      <div class="bt-input__content"><input class="bt-input__value"${id ? ` id="${id}"` : ''} type="text" value="${esc}" disabled /></div>
    </div>
  </div>`;
}
// ── Textarea — gerçek .bt-txa sistemi (Base Input'a henüz taşınmamış,
// Bentas DS'teki kendi bağımsız mimarisi — bkz. pages-web.js txaPreview). ──
function winTextareaHtml(label, value, id) {
  const esc = String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<div class="bt-txa bt-txa--md">
    <div class="bt-txa__meta"><span class="bt-txa__label">${label}</span></div>
    <div class="bt-txa__input"><textarea class="bt-txa__text"${id ? ` id="${id}"` : ''}>${esc}</textarea></div>
  </div>`;
}

// ── Dropdown — gerçek .bt-dropdown (Base Input), ddBaseToggle/
// ddBaseOptionSelect pages-web.js'ten birebir (sadece dirty-state için
// bir 'change' dispatch'i eklendi). ──
const _ddIconChevronDown = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
const _ddIconChevronUp   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
window.ddBaseToggle = function (boxEl) {
  const anchor = boxEl.closest('.bt-input__anchor');
  const isOpen = boxEl.classList.toggle('bt-input__box--active');
  const opts = anchor ? anchor.querySelector('.bt-dropdown-list') : null;
  if (opts) opts.style.display = isOpen ? '' : 'none';
  const iconSpan = boxEl.querySelector('.bt-input__controls .bt-icon');
  if (iconSpan) iconSpan.innerHTML = isOpen ? _ddIconChevronUp : _ddIconChevronDown;
};
window.ddBaseOptionSelect = function (event, optEl) {
  event.stopPropagation();
  const anchor = optEl.closest('.bt-input__anchor');
  const box = anchor.querySelector('.bt-input__box');
  const label = optEl.querySelector('.bt-dropdown-list-item__text').textContent;
  const valueSpan = box.querySelector('.bt-input__value');
  if (valueSpan) { valueSpan.textContent = label; valueSpan.style.color = 'var(--bt-text-primary-default,#1a1a1a)'; }
  optEl.parentElement.querySelectorAll('.bt-dropdown-list-item').forEach(o => o.classList.remove('bt-dropdown-list-item--selected'));
  optEl.classList.add('bt-dropdown-list-item--selected');
  box.classList.remove('bt-input__box--active');
  const list = anchor.querySelector('.bt-dropdown-list');
  if (list) list.style.display = 'none';
  const iconSpan = box.querySelector('.bt-input__controls .bt-icon');
  if (iconSpan) iconSpan.innerHTML = _ddIconChevronDown;
  box.dispatchEvent(new Event('change', { bubbles: true })); // dirty-state takibi için (bkz. app.js)
};
document.addEventListener('click', function (e) {
  if (!e.target.closest('.bt-dropdown .bt-input__anchor')) {
    document.querySelectorAll('.bt-dropdown .bt-input__box--active').forEach(box => {
      box.classList.remove('bt-input__box--active');
      const list = box.closest('.bt-input__anchor').querySelector('.bt-dropdown-list');
      if (list) list.style.display = 'none';
      const iconSpan = box.querySelector('.bt-input__controls .bt-icon');
      if (iconSpan) iconSpan.innerHTML = _ddIconChevronDown;
    });
  }
});
/** opts: { id, label, value, options:[string] } — id gerçek .bt-input__box'a konur. */
function winDropdownHtml(opts) {
  const o = opts || {};
  const hasValue = !!o.value;
  const valueColor = hasValue ? 'var(--bt-text-primary-default,#1a1a1a)' : 'var(--bt-text-primary-muted,#a3a3a3)';
  return `<div class="bt-input bt-dropdown bt-input--md">
    <div class="bt-input__label-value"><span class="bt-input__label">${o.label || ''}</span></div>
    <div class="bt-input__anchor">
      <div class="bt-input__box bt-input__box--md"${o.id ? ` id="${o.id}"` : ''} onclick="ddBaseToggle(this)" style="cursor:pointer;">
        <div class="bt-input__content"><span class="bt-input__value" style="color:${valueColor};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.value || 'Seçin…'}</span></div>
        <div class="bt-input__controls"><div class="bt-input__button"><span class="bt-icon">${_ddIconChevronDown}</span></div></div>
      </div>
      <div class="bt-dropdown-list" style="display:none;">
        ${(o.options || []).map(opt => `<div class="bt-dropdown-list-item${opt === o.value ? ' bt-dropdown-list-item--selected' : ''}" onclick="ddBaseOptionSelect(event,this)"><span class="bt-dropdown-list-item__text">${opt}</span></div>`).join('')}
      </div>
    </div>
  </div>`;
}

// ── DatePicker + Calendar — gerçek .bt-datepicker (Base Input) +
// .bt-calendar motoru (Day/Month/Year/Decade navigasyonu dahil),
// pages-web.js'teki dpBase*/_cal*/calXxx'ten birebir. ──
const CAL_MONTH_NAMES = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const CAL_WEEKDAY_NAMES = ['PZT', 'SL', 'ÇR', 'PR', 'CM', 'CT', 'PZ'];
const _dpIconCalendar = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`;
const _dpIconChevronLeft  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
const _dpIconChevronRight = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
function _calIso(y, m, d) { return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`; }
function _calParseDdMmYyyy(v) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(String(v || ''));
  if (!m) return null;
  return { d: parseInt(m[1], 10), m: parseInt(m[2], 10) - 1, y: parseInt(m[3], 10) };
}
function _calStateFromEl(panel) {
  return { view: panel.dataset.calView || 'day', year: parseInt(panel.dataset.calYear, 10), month: parseInt(panel.dataset.calMonth, 10), selected: panel.dataset.calSelected || '' };
}
function _calRerender(panel, state) {
  panel.dataset.calView = state.view; panel.dataset.calYear = state.year; panel.dataset.calMonth = state.month; panel.dataset.calSelected = state.selected || '';
  panel.innerHTML = _calBodyHtml(state);
}
function _calDayViewHtml(state) {
  const { year, month } = state;
  const today = new Date();
  const todayIso = _calIso(today.getFullYear(), today.getMonth(), today.getDate());
  const firstDow = new Date(year, month, 1).getDay();
  const startOffset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const m = month === 0 ? 11 : month - 1, y = month === 0 ? year - 1 : year;
    cells.push({ day: d, iso: _calIso(y, m, d), edge: 'previous' });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, iso: _calIso(year, month, d), edge: null });
  const rem = (7 - (cells.length % 7)) % 7;
  for (let d = 1; d <= rem; d++) {
    const m = month === 11 ? 0 : month + 1, y = month === 11 ? year + 1 : year;
    cells.push({ day: d, iso: _calIso(y, m, d), edge: 'next' });
  }
  let rows = '';
  for (let i = 0; i < cells.length; i += 7) {
    const rowHtml = cells.slice(i, i + 7).map(c => {
      const cls = ['bt-calendar__cell', 'bt-calendar__cell--day'];
      if (c.edge === 'previous') cls.push('bt-calendar__cell--previous');
      if (c.edge === 'next') cls.push('bt-calendar__cell--next');
      if (c.iso === state.selected) cls.push('bt-calendar__cell--selected');
      else if (c.iso === todayIso) cls.push('bt-calendar__cell--current');
      return `<button type="button" class="${cls.join(' ')}" data-date="${c.iso}" onclick="calCellClick(this)">${c.day}</button>`;
    }).join('');
    rows += `<div class="bt-calendar__row">${rowHtml}</div>`;
  }
  const weekdaysHtml = CAL_WEEKDAY_NAMES.map(w => `<div class="bt-calendar__weekday">${w}</div>`).join('');
  return `<div class="bt-calendar__weekdays">${weekdaysHtml}</div><div class="bt-calendar__body">${rows}</div>`;
}
function _calPeriodViewHtml(state) {
  const now = new Date();
  let items;
  if (state.view === 'month') {
    items = CAL_MONTH_NAMES.map((name, i) => ({ label: name.toLocaleUpperCase('tr-TR'), attr: `data-month="${i}"`, current: i === now.getMonth() && state.year === now.getFullYear() }));
  } else if (state.view === 'year') {
    const start = Math.floor(state.year / 10) * 10 - 1;
    items = Array.from({ length: 10 }, (_, i) => { const y = start + i; return { label: String(y), attr: `data-year="${y}"`, current: y === now.getFullYear() }; });
  } else {
    const start = Math.floor(state.year / 100) * 100;
    items = Array.from({ length: 10 }, (_, i) => { const y = start + i * 10; return { label: `${y}-${y + 9}`, attr: `data-decade-start="${y}"`, current: false }; });
  }
  let rows = '';
  for (let i = 0; i < items.length; i += 4) {
    const rowHtml = items.slice(i, i + 4).map(it => {
      const cls = ['bt-calendar__cell', 'bt-calendar__cell--period'];
      if (it.current) cls.push('bt-calendar__cell--current');
      return `<button type="button" class="${cls.join(' ')}" ${it.attr} onclick="calCellClick(this)">${it.label}</button>`;
    }).join('');
    rows += `<div class="bt-calendar__row bt-calendar__row--period">${rowHtml}</div>`;
  }
  return `<div class="bt-calendar__body">${rows}</div>`;
}
function _calHeaderHtml(state) {
  let titleText;
  if (state.view === 'day') titleText = `${CAL_MONTH_NAMES[state.month]} ${state.year}`;
  else if (state.view === 'month') titleText = String(state.year);
  else if (state.view === 'year') { const s = Math.floor(state.year / 10) * 10 - 1; titleText = `${s} - ${s + 9}`; }
  else { const s = Math.floor(state.year / 100) * 100; titleText = `${s} - ${s + 90}`; }
  return `<div class="bt-calendar__header">
    <button type="button" class="bt-calendar__title" onclick="calTitleClick(this)">${titleText}</button>
    <div class="bt-calendar__nav">
      <button type="button" class="bt-calendar__nav-btn" onclick="calNav(this,-1)" aria-label="Önceki"><span class="bt-icon">${_dpIconChevronLeft}</span></button>
      <button type="button" class="bt-calendar__today-btn" onclick="calToday(this)">Bugün</button>
      <button type="button" class="bt-calendar__nav-btn" onclick="calNav(this,1)" aria-label="Sonraki"><span class="bt-icon">${_dpIconChevronRight}</span></button>
    </div>
  </div>`;
}
function _calBodyHtml(state) { return `${_calHeaderHtml(state)}${state.view === 'day' ? _calDayViewHtml(state) : _calPeriodViewHtml(state)}`; }
function _calPanelHtml(state, hidden) {
  return `<div class="bt-calendar"${hidden ? ' style="display:none;"' : ''} data-cal-view="${state.view}" data-cal-year="${state.year}" data-cal-month="${state.month}" data-cal-selected="${state.selected || ''}">${_calBodyHtml(state)}</div>`;
}
window.calCellClick = function (el) {
  const panel = el.closest('.bt-calendar');
  const state = _calStateFromEl(panel);
  if (state.view === 'decade') { state.year = parseInt(el.dataset.decadeStart, 10); state.view = 'year'; _calRerender(panel, state); }
  else if (state.view === 'year') { state.year = parseInt(el.dataset.year, 10); state.view = 'month'; _calRerender(panel, state); }
  else if (state.view === 'month') { state.month = parseInt(el.dataset.month, 10); state.view = 'day'; _calRerender(panel, state); }
  else { state.selected = el.dataset.date; calCommitSelection(panel, state); }
};
window.calTitleClick = function (el) {
  const panel = el.closest('.bt-calendar');
  const state = _calStateFromEl(panel);
  state.view = state.view === 'day' ? 'month' : state.view === 'month' ? 'year' : 'decade';
  _calRerender(panel, state);
};
window.calNav = function (el, dir) {
  const panel = el.closest('.bt-calendar');
  const state = _calStateFromEl(panel);
  if (state.view === 'day') { state.month += dir; if (state.month < 0) { state.month = 11; state.year--; } if (state.month > 11) { state.month = 0; state.year++; } }
  else if (state.view === 'month') state.year += dir;
  else if (state.view === 'year') state.year += dir * 10;
  else state.year += dir * 100;
  _calRerender(panel, state);
};
window.calToday = function (el) {
  const panel = el.closest('.bt-calendar');
  const now = new Date();
  _calRerender(panel, { view: 'day', year: now.getFullYear(), month: now.getMonth(), selected: _calStateFromEl(panel).selected });
};
function calCommitSelection(panel, state) {
  _calRerender(panel, state);
  const anchor = panel.closest('.bt-input__anchor');
  const box = anchor && anchor.querySelector('.bt-input__box');
  const input = box && box.querySelector('.bt-input__value');
  if (input) {
    const [y, m, d] = state.selected.split('-');
    input.value = `${d}/${m}/${y}`;
    window.dpBaseInput(input);
  }
  dpClosePanel(box);
}
window.dpBaseToggle = function (buttonEl) {
  const box = buttonEl.closest('.bt-input__box');
  const anchor = box.closest('.bt-input__anchor');
  const panel = anchor ? anchor.querySelector('.bt-calendar') : null;
  const isOpen = box.classList.toggle('bt-input__box--active');
  if (!panel) return;
  if (isOpen) {
    const input = box.querySelector('.bt-input__value');
    const parsed = input && _calParseDdMmYyyy(input.value);
    const now = new Date();
    _calRerender(panel, parsed
      ? { view: 'day', year: parsed.y, month: parsed.m, selected: _calIso(parsed.y, parsed.m, parsed.d) }
      : { view: 'day', year: now.getFullYear(), month: now.getMonth(), selected: '' });
    panel.style.display = '';
    _dpBindOutsideClickOnce();
  } else {
    panel.style.display = 'none';
  }
};
function dpClosePanel(box) {
  if (!box) return;
  box.classList.remove('bt-input__box--active');
  const anchor = box.closest('.bt-input__anchor');
  const panel = anchor && anchor.querySelector('.bt-calendar');
  if (panel) panel.style.display = 'none';
}
let _dpOutsideBound = false;
function _dpBindOutsideClickOnce() {
  if (_dpOutsideBound) return;
  _dpOutsideBound = true;
  document.addEventListener('click', function (e) {
    const path = e.composedPath ? e.composedPath() : [e.target];
    document.querySelectorAll('.bt-datepicker .bt-input__box--active').forEach(function (box) {
      const anchor = box.closest('.bt-input__anchor');
      if (anchor && !path.includes(anchor)) dpClosePanel(box);
    });
  });
}
function _dtiFormatDateMask(raw) {
  const digits = String(raw).replace(/\D/g, '').slice(0, 8);
  let out = digits.slice(0, 2);
  if (digits.length > 2) out += '/' + digits.slice(2, 4);
  if (digits.length > 4) out += '/' + digits.slice(4, 8);
  return out;
}
window.dpBaseInput = function (el) {
  const box = el.closest('.bt-input__box');
  const caretAtEnd = el.selectionStart === el.value.length;
  el.value = _dtiFormatDateMask(el.value);
  if (caretAtEnd) { el.selectionStart = el.selectionEnd = el.value.length; }
  box.dispatchEvent(new Event('change', { bubbles: true })); // dirty-state takibi için (bkz. app.js)
};
/** opts: { id, label, value:'dd/mm/yyyy' } — id gerçek .bt-input__value'ya konur. */
function winDateHtml(opts) {
  const o = opts || {};
  const value = o.value || '';
  const parsed = _calParseDdMmYyyy(value);
  const now = new Date();
  const initState = parsed
    ? { view: 'day', year: parsed.y, month: parsed.m, selected: _calIso(parsed.y, parsed.m, parsed.d) }
    : { view: 'day', year: now.getFullYear(), month: now.getMonth(), selected: '' };
  return `<div class="bt-input bt-datepicker bt-input--md">
    <div class="bt-input__label-value"><span class="bt-input__label">${o.label || ''}</span></div>
    <div class="bt-input__anchor">
      <div class="bt-input__box bt-input__box--md">
        <div class="bt-input__controls"><button type="button" class="bt-input__button" onclick="dpBaseToggle(this)" aria-label="Tarih seç"><span class="bt-icon">${_dpIconCalendar}</span></button></div>
        <div class="bt-input__content"><input class="bt-input__value"${o.id ? ` id="${o.id}"` : ''} type="text" inputmode="numeric" maxlength="10" placeholder="gg/aa/yyyy" value="${value}" oninput="dpBaseInput(this)" /></div>
      </div>
      ${_calPanelHtml(initState, true)}
    </div>
  </div>`;
}
/** Form kartı — .bt-window__panel + opsiyonel başlık (bu projeye özel küçük
 * bir kompozisyon yardımcısı — tek .bt-window__panel yerine birden fazla
 * mantıksal bölüm/kart göstermek için; bt-window'un kendisinde "section
 * title" diye ayrı bir alt-component yok, bu yüzden .bt-window__title ile
 * aynı font/ağırlık token'ları kullanılarak minimal bir başlık ekleniyor). */
function winSectionHtml(title, innerHtml) {
  const titleHtml = title ? `<div style="font:var(--bt-title-md-regular,400 16px/24px var(--font));color:var(--bt-text-primary-default);margin-bottom:var(--bt-space-md,8px);">${title}</div>` : '';
  return `<div class="bt-window__panel" style="flex:none;">${titleHtml}${innerHtml}</div>`;
}
/** Form kartı — .bt-window__panel + opsiyonel başlık (bu projeye özel küçük
 * bir kompozisyon yardımcısı — tek .bt-window__panel yerine birden fazla
 * mantıksal bölüm/kart göstermek için; bt-window'un kendisinde "section
 * title" diye ayrı bir alt-component yok, bu yüzden .bt-window__title ile
 * aynı font/ağırlık token'ları kullanılarak minimal bir başlık ekleniyor). */
function winSectionHtml(title, innerHtml) {
  const titleHtml = title ? `<div style="font:var(--bt-title-md-regular,400 16px/24px var(--font));color:var(--bt-text-primary-default);margin-bottom:var(--bt-space-md,8px);">${title}</div>` : '';
  return `<div class="bt-window__panel" style="flex:none;">${titleHtml}${innerHtml}</div>`;
}
