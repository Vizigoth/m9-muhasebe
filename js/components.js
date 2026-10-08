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
const icoPlus    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const icoEdit    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`;
const icoTrash   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`;
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
   HUB SIDEBAR — .sbx-shell (Bentas Design System "Sidebar" component,
   Variant A: persistent icon rail + toggleable drawer).
   Kaynak: Bentas-Design-System docs/js/pages-web.js — sidebarMarkupA() /
   sbxRailButton() / sbxDrawerItem() / _sbxToggle() / _sbxSelectBtn() /
   _sbxSelectItem() birebir taşındı. TEK fark: orijinalde her ikon sabit
   sbxIconPlaceholder'dı (docs demo'su gerçek nav taşımıyordu) — burada
   item başına gerçek ikon/label parametre, DOM/class yapısı AYNI.
   ============================================================ */
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
// item: { icon, label, selected, onClick }
function sbxRailButtonHtml(item) {
  const i = item || {};
  return `<div class="sbx-btn${i.selected ? ' is-selected' : ''}" tabindex="0" title="${i.label || ''}" onclick="window._sbxSelectBtn(this);${i.onClick || ''}">${i.icon || ''}</div>`;
}
function sbxDrawerItemHtml(item) {
  const i = item || {};
  return `<div class="sbx-item">
            <div class="sbx-item-inner${i.selected ? ' is-selected' : ''}" tabindex="0" onclick="window._sbxSelectItem(this);${i.onClick || ''}">
              <div class="sbx-item-icon">${i.icon || ''}</div>
              <div class="sbx-item-label">${i.label || ''}</div>
            </div>
          </div>`;
}
/**
 * Hub Sidebar'ı render eder (rail + toggleable drawer).
 * navItems/bottomItems: [{ icon, label, selected, onClick }] — rail ve
 * drawer AYNI listeden üretilir (rail = ikon-only kısayol, drawer = gerçek
 * etiketli nav listesi), orijinal sidebarMarkupA'daki collapse toggle'ın
 * rail içindeki konumu (ilk butondan sonra) korunur.
 */
function renderSidebar(navItems, bottomItems, variant) {
  const nav = navItems || [];
  const bottom = bottomItems || [];
  const collapsedCls = variant === 'collapsed' ? ' is-collapsed' : '';
  const railCenter = nav.length
    ? `${sbxRailButtonHtml(nav[0])}<div class="sbx-collapse" onclick="window._sbxToggle()" title="Daralt/Genişlet"></div>${nav.slice(1).map(sbxRailButtonHtml).join('')}`
    : `<div class="sbx-collapse" onclick="window._sbxToggle()" title="Daralt/Genişlet"></div>`;
  return `<div class="sbx-shell">
    <div class="sbx-rail">
      <div class="sbx-logo"></div>
      <div class="sbx-center">${railCenter}</div>
      <div class="sbx-bottom">${bottom.map(sbxRailButtonHtml).join('')}</div>
    </div>
    <div class="sbx-drawer${collapsedCls}" id="sbxDrawer">
      <div class="sbx-drawer-top">
        <div class="bt-input__box bt-searchbox bt-input__box--sm">
          <div class="bt-input__controls"><span class="bt-icon">${icoSearch}</span></div>
          <div class="bt-input__content"><input class="bt-input__value" type="text" placeholder="Ara..." oninput="tbxBaseInput(this)" /></div>
          <div class="sbx-searchbox-kbd">Tab</div>
        </div>
      </div>
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
function gridLeadingHtml(kind) {
  switch (kind) {
    case 'checkbox':
      return `<span class="bt-grid__control" onclick="this.querySelector('.bt-checkbox__box').classList.toggle('bt-checkbox__box--checked')" style="cursor:pointer;"><span class="bt-checkbox__box">${_chkCheck}</span></span>`;
    case 'dot':
      return `<span class="bt-grid__control"><span class="bt-grid__dot"></span></span>`;
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

  const cls = [
    'bt-grid__header-cell',
    `bt-grid__header-cell--${position}`,
    showSort ? 'bt-grid__header-cell--sortable' : '',
    forceSorted ? 'bt-grid__header-cell--sorted' : '',
  ].filter(Boolean).join(' ');
  const sortDirAttr = forceSorted ? ` data-sort-dir="${o.sortDir || 'asc'}"` : '';
  const sortClickAttrs = showSort ? ` onclick="btGridSortBy(event,this)"` : '';

  const checkboxHtml = showCheckbox ? gridHeaderCheckboxHtml() : '';
  const contentHtml  = showContent ? `<span class="bt-grid__content">${contentText}</span>` : '';
  const sortHtml = showSort ? `<span class="bt-grid__sort">
    <span class="bt-grid__control bt-grid__control--sort-up">${gridControlIcon(_gridIconSortUp)}</span>
    <span class="bt-grid__control bt-grid__control--sort-down">${gridControlIcon(_gridIconSortDown)}</span>
  </span>` : '';
  const filterHtml = showFilter ? `<span class="bt-grid__control"><button type="button" class="bt-btn bt-btn--sm bt-btn--base-flat bt-btn--icon bt-grid__filter-btn" aria-label="Filtrele" onclick="event.stopPropagation();btGridFilterToggle(event,this)">${gridControlIcon(_gridIconFunnel)}</button></span>` : '';
  const resizeHandle = (showContent && position !== 'right') ? `<span class="bt-grid__resize-handle" onmousedown="btGridResizeStart(event,this)"></span>` : '';

  const widthStyleH = fillWidth ? `flex:1;min-width:${width}px;` : `width:${width}px;`;
  return `<div class="${cls}" style="${widthStyleH}box-sizing:border-box;"${sortClickAttrs}${sortDirAttr}>${checkboxHtml}${contentHtml}${sortHtml}${filterHtml}${resizeHandle}</div>`;
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

  const cls = ['bt-grid__cell', `bt-grid__cell--${position}`].filter(Boolean).join(' ');
  const sortValueAttr = sortValue != null ? ` data-sort-value="${String(sortValue).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"` : '';

  const leadingHtml  = gridLeadingHtml(leading);
  const contentHtml  = showContent ? `<span class="bt-grid__content${contentLink ? ' bt-grid__content--link' : ''}">${contentText}</span>` : '';
  const trailingHtml = gridTrailingHtml(trailing, o.trailingOpts);

  const widthStyleC = fillWidth ? `flex:1;min-width:${width}px;` : `width:${width}px;`;
  return `<div class="${cls}" style="${widthStyleC}box-sizing:border-box;"${sortValueAttr}>${leadingHtml}${contentHtml}${trailingHtml}</div>`;
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
 * columns: [{ field, headerText, width, fillWidth, sort, filter,
 *              headerCheckbox, cellLeading: 'none'|'checkbox'|'dot',
 *              cellTrailing: 'none'|'badge'|'button',
 *              trailingOpts(row) => opts, format(row) => string }]
 * rows: [{ ...herhangi bir alan... }]
 * opts: { emptyText }
 */
function renderDataTable(columns, rows, opts) {
  const o = opts || {};
  const cols = columns || [];
  const posFor = i => i === 0 ? 'left' : i === cols.length - 1 ? 'right' : 'middle';
  const totalWidth = cols.reduce((sum, c) => sum + (c.width || 180), 0);

  const headerRow = cols.map((c, i) => gridHeaderCellHtml({
    position: posFor(i),
    width: c.width,
    fillWidth: c.fillWidth,
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
        leading: c.cellLeading || 'none',
        trailing: c.cellTrailing || 'none',
        trailingOpts: c.trailingOpts ? c.trailingOpts(row) : undefined,
        showContent: (c.cellTrailing || 'none') === 'none',
        contentText: c.format ? c.format(row) : (c.field ? row[c.field] : ''),
        sortValue: c.field ? row[c.field] : undefined,
      })).join('')}</div>`).join('');

  return `<div class="bt-grid-scroll-x"><div class="bt-grid">
    <div class="bt-grid__row">${headerRow}</div>
    <div class="bt-grid__body">${bodyHtml}</div>
  </div></div>`;
}
