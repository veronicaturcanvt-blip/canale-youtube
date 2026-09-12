# Yoga / Pilates App — каркас проекта

Мобильное приложение для практик йоги и пилатеса с AI-аватаром персонального
тренера. Полное ТЗ: [docs/TZ.md](docs/TZ.md).

Это **каркас** (scaffold) — структура папок, экранов и модулей сервера с
заглушками. Реальные видео, дизайн-система и интеграции (Stripe, CDN с DRM,
push) подключаются на следующих этапах.

## Структура репозитория

```
├── docs/TZ.md          # исходное техническое задание
├── mobile/              # "боевое" приложение (bare React Native + TypeScript)
├── mobile-expo/          # тот же UI, но через Expo — открывается в Expo Go на телефоне
└── backend/             # сервер (NestJS-style + Prisma)
```

`mobile/` и `mobile-expo/` показывают один и тот же набор экранов
(`src/screens`, `src/navigation`, ...) — файлы физически продублированы
между двумя папками, а не шарятся автоматически. `mobile-expo/` дальше
использует Expo-совместимые модули (`expo-video`, `expo-localization`)
вместо нативных (`react-native-video`, `react-native-localize`), которые
Expo Go не поддерживает. Когда экраны стабилизируются, стоит выбрать один
путь: либо `mobile/` (полный контроль, DRM-видео, но нужны Xcode/Android
Studio), либо перейти на Expo целиком (проще пересобирать, но DRM
потребует `expo-video`'s DRM API или EAS Build с кастомным dev client) —
и удалить вторую папку, чтобы не поддерживать дубликаты вручную.

## Стек

| Часть          | Технология                                   |
|----------------|-----------------------------------------------|
| Мобильное приложение (`mobile/`) | React Native + TypeScript, React Navigation |
| Мобильное приложение (`mobile-expo/`) | Expo (managed) + TypeScript, React Navigation |
| Локализация    | i18next (IT/EN/RU/ES/ZH/JA)                   |
| Видео          | react-native-video в `mobile/` / expo-video в `mobile-expo/` (заглушка под HLS/DASH + DRM) |
| Сервер         | Node.js + NestJS-style модули                 |
| База данных    | PostgreSQL + Prisma ORM                       |
| Оплата         | Stripe Checkout + webhooks (реализовано); App Store/Google Play billing (заглушка) |

## С чем эти папки НЕ помогают (нужно подключить отдельно)

- **CDN с DRM-видео** (Widevine/FairPlay) — сторонний сервис (например Mux,
  Cloudflare Stream, AWS MediaPackage). Видео заливаются туда, приложение
  получает только защищённую ссылку на плеер.
- **App Store Connect / Google Play Console** — настройка подписок,
  тестирование покупок.
- **Реальные дизайн-макеты** — есть только цветовая палитра
  (`mobile/src/theme/colors.ts`), сами экраны — заглушки без вёрстки.

## Быстрый старт (после установки Node.js и зависимостей)

```bash
npm install

# мобильное приложение "мobile/" (нужен настроенный React Native окружение —
# Xcode/Android Studio для запуска на симуляторе)
npm run mobile

# сервер
npm run backend
```

### Быстрый просмотр экранов через Expo Go (без Xcode/Android Studio)

```bash
cd mobile-expo
npm install
npx expo start
```

В терминале появится QR-код. Установите приложение **Expo Go** на телефон
(App Store / Google Play), отсканируйте код камерой (iOS) или из самого
Expo Go (Android) — приложение откроется прямо на телефоне, живой хот-релоад
при правке кода. Если телефон в другой сети, чем компьютер, добавьте флаг
`--tunnel` (`npx expo start --tunnel`).

## Настройка Stripe (для `backend/`)

Реализовано: `POST /subscriptions/me/checkout` (Stripe Checkout Session, годовой
план, 3-дневный trial), `POST /subscriptions/me/pause` (Stripe
`pause_collection`, без списаний 30 дней), `POST /subscriptions/me/restore`
(пересинхронизация подписки по `stripeCustomerId`, на случай если вебхук
потерялся), `POST /subscriptions/webhooks/stripe` (подпись проверяется по
`STRIPE_WEBHOOK_SECRET`, сырое тело запроса — см. `main.ts`).

Чтобы это реально заработало (не только скомпилировалось), в `backend/.env`
нужны настоящие значения из Stripe Dashboard (тестовый режим):
- `STRIPE_SECRET_KEY` — секретный ключ API
- `STRIPE_WEBHOOK_SECRET` — секрет для проверки подписи вебхука (из
  `stripe listen` при локальной разработке, или из настроек вебхука в
  Dashboard)
- `STRIPE_PRICE_ANNUAL_ID` — ID цены годового плана (Stripe Dashboard →
  Product catalog)
- `STRIPE_CHECKOUT_SUCCESS_URL` / `STRIPE_CHECKOUT_CANCEL_URL` — куда Stripe
  вернёт пользователя после оплаты/отмены (deep link в приложение)

Без настоящих ключей чекаут/пауза/restore будут возвращать `502 Bad Gateway`
с понятным сообщением (а не падать 500) — так и было проверено в этой
песочнице, где вообще нет доступа к api.stripe.com. Локальную проверку
подписи вебхука (без сети) можно прогнать через
`stripe.webhooks.generateTestHeaderString` — именно так это было
верифицировано при разработке.

Логика лояльной скидки на продление (−30% со второго года) из ТЗ **не**
реализована — это отдельная, более сложная фича (нужен Stripe
coupon/subscription schedule), не входила в этот запрос.

## Практики: тестовые данные вместо реальных видео (для `backend/`)

Реализована реальная логика `GET /practices` (фильтры: type, durationMinutes,
equipment, difficulty, bodyFocus, intensity), `GET /practices/:id` и
`POST /practices/:id/complete` — с честным подсчётом "пройдено/не пройдено"
по текущему пользователю (`CompletedSession` в Prisma), а не заглушкой.

Пока нет отснятых видео, `prisma/seed.ts` наполняет базу 12 практиками
(йога/пилатес, все длительности и инвентарь, разный уровень/интенсивность/
зона тела) со ссылками на **публичные тестовые HLS-потоки**:
- Официальные примеры Apple для тестирования HLS-плееров
  (`devstreaming-cdn.apple.com/videos/streaming/examples/...`)
- Публичный демо-поток Mux (`stream.mux.com/...`)
- Превью-картинки через `placehold.co` в цветах палитры приложения

Запустить: `npm run db:seed` (или `npx prisma db seed`) в `backend/` — можно
гонять сколько угодно раз, `upsert` по фиксированным id не создаёт дублей.

Эти видео полностью реальны и должны открываться в плеере — но из этой
песочницы я не смогла проверить их доступность (тот же прокси блокирует
внешние домены, что раньше блочил Docker Hub). Когда появятся настоящие
видео с CDN, достаточно заменить `videoUrl` в `prisma/seed.ts` (или прямо в
БД) — код фильтров/поиска/"пройдено" трогать не придётся.

## Дальнейшие шаги

1. Утвердить UI по мокапам, сверстать экраны из ТЗ.
2. Подключить провайдера видео с DRM и заменить тестовые ссылки на
   реальные HLS/DASH.
3. Подставить реальные Stripe-ключи (см. выше) и настроить App
   Store/Google Play billing.
4. Реализовать оставшиеся заглушки backend (referrals, achievements,
   push).
5. Настроить push-уведомления (Firebase Cloud Messaging / APNs).
6. Юридическое: политика конфиденциальности, GDPR-флоу удаления данных.
