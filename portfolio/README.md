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

## Публикация

Сайт опубликован на GitHub Pages: https://veronicaturcanvt-blip.github.io/canale-youtube/

Обновляется сам: при каждом изменении в папке `portfolio/` (в ветке `claude/gifted-darwin-ui1rxp`
или в основной ветке) GitHub Actions копирует файлы в ветку `gh-pages`, и через 1–2 минуты сайт
показывает новую версию. Настройка — `.github/workflows/publish-portfolio.yml`.
Ход публикации виден на GitHub во вкладке **Actions** → «Publish portfolio».
Ветку `gh-pages` вручную править не нужно — её перезаписывает автоматика.

Совет: если видео тяжёлые (больше 50–100 МБ в сумме), лучше не хранить их в git, а загрузить на хостинг видео (Mux, Cloudflare Stream) и прописать ссылки.

## Дизайн-система

Палитра и шрифты подобраны скиллом `ui-ux-pro-max` (установлен в `.claude/skills/ui-ux-pro-max`):
стиль «Dark Mode (OLED)» + один тёплый акцент `#F97316`, шрифты Playfair Display (заголовки),
Inter (текст), JetBrains Mono (подписи). Все цвета — токены в начале `style.css`,
контраст текста ≥ 4.5:1.
