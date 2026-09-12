// Kept as a plain inline string rather than a separate static file — the
// admin panel is a single small page and this way it ships with the
// controller, no static-assets setup needed.
export const ADMIN_PAGE_HTML = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Обращения — админка</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #FBF8F2;
    color: #1F2A1F;
    padding: 24px;
  }
  h1 { font-size: 22px; margin: 0 0 4px; }
  .subtitle { color: #6B7280; margin: 0 0 20px; font-size: 14px; }
  .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; flex-wrap: wrap; }
  button {
    background: #4F9D5C;
    color: #fff;
    border: none;
    border-radius: 999px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  button:hover { opacity: 0.9; }
  .card {
    background: #fff;
    border-radius: 16px;
    padding: 16px 18px;
    margin-bottom: 12px;
    box-shadow: 0 6px 14px rgba(31,42,31,0.08);
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }
  .email { font-weight: 700; }
  .date { color: #6B7280; font-size: 13px; white-space: nowrap; }
  .message { white-space: pre-wrap; line-height: 1.4; }
  .empty, .error, .loading { color: #6B7280; padding: 40px 0; text-align: center; }
  .error { color: #E5484D; }
</style>
</head>
<body>
  <h1>Обращения в поддержку</h1>
  <p class="subtitle">Все сообщения сохраняются здесь навсегда, даже если письмо-уведомление не дошло.</p>
  <div class="toolbar">
    <span id="count"></span>
    <button onclick="load()">Обновить</button>
  </div>
  <div id="list" class="loading">Загрузка…</div>

<script>
async function load() {
  var list = document.getElementById('list');
  var count = document.getElementById('count');
  list.textContent = 'Загрузка…';
  list.className = 'loading';
  try {
    var res = await fetch('/admin/support-messages', { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var messages = await res.json();
    count.textContent = messages.length + (messages.length === 1 ? ' сообщение' : ' сообщений');
    if (messages.length === 0) {
      list.className = 'empty';
      list.textContent = 'Обращений пока нет.';
      return;
    }
    list.className = '';
    list.innerHTML = messages.map(function (m) {
      var date = new Date(m.createdAt).toLocaleString('ru-RU');
      var name = m.userName ? ' (' + escapeHtml(m.userName) + ')' : '';
      return '<div class="card">' +
        '<div class="card-top">' +
          '<span class="email">' + escapeHtml(m.userEmail) + name + '</span>' +
          '<span class="date">' + date + '</span>' +
        '</div>' +
        '<div class="message">' + escapeHtml(m.message) + '</div>' +
      '</div>';
    }).join('');
  } catch (err) {
    list.className = 'error';
    list.textContent = 'Не удалось загрузить: ' + err.message;
  }
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

load();
</script>
</body>
</html>`;
