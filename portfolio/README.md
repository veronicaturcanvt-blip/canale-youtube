# VERO+ — сайт-портфолио

Статичный сайт: `index.html`, `style.css`, `app.js`, `content.js`. Сборка не нужна.

## Как открыть локально

- Просто дважды кликните `index.html`, и сайт откроется в браузере.
- Или запустите локальный сервер из этой папки: `npx http-server -p 8080`, затем откройте http://localhost:8080

## Как добавить новую работу

1. Положите файлы, у которых имя совпадает с `id` работы:
   - `videos/<id>.mp4` (вертикальное видео 9:16, H.264; для быстрой загрузки лучше до ~10 МБ)
   - `posters/<id>.jpg` (обложка 9:16, например 720×1280)
2. В `content.js` добавьте объект в массив `works`:

```js
{
  id: 'my-new-ad',            // = имя файлов
  category: 'brands',         // brands | animation | experiments
  brand: 'Brand Name',
  title: { ru: '…', it: '…', en: '…' },
  task:  { ru: '…', it: '…', en: '…' },
  done:  { ru: '…', it: '…', en: '…' },
  tools: ['Seedance', 'Suno', 'CapCut'],
},
```

Если файла ещё нет, на сайте будет аккуратная карточка «Скоро», а не сломанное видео.

Шоурил в шапке сайта: `videos/showreel.mp4` + `posters/showreel.jpg`.
Ссылки на контакты — в `content.js` → `links`.

## Деплой на Vercel

1. Зайдите на vercel.com → **Add New… → Project** → выберите этот репозиторий на GitHub.
2. **Root Directory** → `portfolio`. Framework Preset: **Other**. Build Command и Output Directory оставьте пустыми.
3. **Deploy**. После каждого push в ветку сайт обновится сам.

Без GitHub: `npx vercel` из папки `portfolio` (или перетащите папку на app.netlify.com/drop для Netlify).

Совет: если видео тяжёлые (больше 50–100 МБ в сумме), лучше не хранить их в git, а загрузить на хостинг видео (Mux, Cloudflare Stream) и прописать ссылки.

## Дизайн-система

Палитра и шрифты подобраны скиллом `ui-ux-pro-max` (установлен в `.claude/skills/ui-ux-pro-max`):
стиль «Dark Mode (OLED)» + один тёплый акцент `#F97316`, шрифты Playfair Display (заголовки),
Inter (текст), JetBrains Mono (подписи). Все цвета — токены в начале `style.css`,
контраст текста ≥ 4.5:1.
