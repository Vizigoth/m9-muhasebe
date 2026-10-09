/* ============================================================
   M9 MUHASEBE — router.js
   Sidebar nav item'ları → ekranlar. Her ekran js/screens/*.js içinde
   M9_SCREENS[route] = { title, render(toolbar, body) } olarak kendini
   kaydeder; kabuk (sidebar + page header) sabit kalır, sadece header
   başlığı, toolbar ve body değişir. Aktif ekran URL hash'inde tutulur
   (#/yevmiye-fis-listesi) — yenileme/geri tuşu aynı ekranı korur.
   Script sırası: components.js → router.js → screens/*.js → app.js
   ============================================================ */
const M9_SCREENS = {};
const M9_DEFAULT_ROUTE = 'yevmiye-fis-listesi';

function m9CurrentRoute() {
  return location.hash.replace(/^#\/?/, '') || M9_DEFAULT_ROUTE;
}

/* Nav item onClick'i — hash'i değiştirir, render hashchange'te olur. */
function m9Navigate(route) {
  if (m9CurrentRoute() === route && location.hash) return;
  location.hash = '#/' + route;
}

/* Henüz ekranı yazılmamış nav item'ları için — toolbar gizli, body'de not. */
function m9RenderPlaceholder(toolbar, body) {
  toolbar.hidden = true;
  body.innerHTML = `<div class="m9-screen-placeholder">Bu ekran henüz hazırlanmadı.</div>`;
}

/* Drawer seçimini aktif route'a senkronlar (geri tuşu / doğrudan URL için)
   — seçili item kapalı bir grubun içindeyse o grubu da açar. */
function m9SyncSidebarSelection(route) {
  const item = document.querySelector(`.sbx-drawer [data-nav-id="${route}"]`);
  // _sbxSelectItem seçimi sadece kendi listesi (center/bottom) içinde
  // temizliyor — route tek olduğu için tüm drawer'da temizlenir.
  document.querySelectorAll('.sbx-drawer .sbx-item-inner.is-selected').forEach(el => el.classList.remove('is-selected'));
  if (!item) return;
  item.classList.add('is-selected');
  let group = item.closest('.sbx-group');
  while (group) {
    group.classList.add('is-open');
    group = group.parentElement.closest('.sbx-group');
  }
}

/* navItems — renderSidebar'a verilen drawer listesi; başlık fallback'i
   (ekran kaydı yoksa) nav item'ın kendi label'ından alınır. */
function m9RenderRoute(navItems) {
  const route = m9CurrentRoute();
  const screen = M9_SCREENS[route];
  const toolbar = document.getElementById('m9Toolbar');
  const body = document.getElementById('m9Body');
  const findLabel = items => {
    for (const it of items) {
      if (it.id === route) return it.label;
      const sub = it.children && findLabel(it.children);
      if (sub) return sub;
    }
    return '';
  };

  toolbar.hidden = false;
  toolbar.innerHTML = '';
  body.innerHTML = '';
  document.getElementById('m9PageTitle').textContent = screen ? screen.title : findLabel(navItems);
  if (screen) screen.render(toolbar, body);
  else m9RenderPlaceholder(toolbar, body);
  m9SyncSidebarSelection(route);
}
