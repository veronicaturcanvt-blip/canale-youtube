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
| Оплата         | Stripe / App Store / Google Play billing (заглушки) |

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

## Дальнейшие шаги

1. Утвердить UI по мокапам, сверстать экраны из ТЗ.
2. Подключить провайдера видео с DRM и получить тестовые HLS/DASH ссылки.
3. Настроить Stripe + App Store/Google Play подписки (sandbox).
4. Реализовать реальную логику модулей backend (сейчас — заглушки).
5. Настроить push-уведомления (Firebase Cloud Messaging / APNs).
6. Юридическое: политика конфиденциальности, GDPR-флоу удаления данных.
