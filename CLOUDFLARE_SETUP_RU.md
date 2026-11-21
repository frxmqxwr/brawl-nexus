# BRAWL // NEXUS — перенос с Netlify на Cloudflare Pages

Репозиторий: https://github.com/frxmqxwr/brawl-nexus  
Ветка публикации: `main`

## 1. Подключение GitHub

1. Открой https://dash.cloudflare.com/ и войди или создай бесплатную учётную запись.
2. Перейди в **Workers & Pages → Create application → Pages → Connect to Git**.
   Если интерфейс предлагает только Workers, найди ссылку **Looking for Pages?**.
3. Выбери GitHub и разреши Cloudflare Workers & Pages доступ **только** к репозиторию `frxmqxwr/brawl-nexus`.
4. Выбери этот репозиторий, затем production branch `main`.
5. Укажи:
   - **Project name:** `brawl-nexus` (если доступно; иначе `brawl-nexus-app` или другое имя)
   - **Framework preset:** None
   - **Build command:** `node build.js`
   - **Build output directory:** `dist`
   - **Root directory:** пустое значение (корень репозитория)
6. Нажми **Save and Deploy**. Cloudflare выдаст публичный адрес на `.pages.dev`.

> НЕ выбирай Direct Upload / Drag & Drop: для Pages Functions требуется сборка с Git или Wrangler.

## 2. Настройки API и секретов

После первого развёртывания открой проект Cloudflare → **Settings → Variables and Secrets**.
Создавай секреты именно там, НЕ в GitHub и НЕ в публичном JavaScript.

| Переменная | Назначение | Обязательность |
| --- | --- | --- |
| `BRAWL_API_TOKEN` | ключ из https://developer.brawlstars.com | Нужен для профиля, журнала, клуба и некоторых событий |
| `BRAWL_API_BASE_URL` | по умолчанию `https://api.brawlstars.com/v1`; если используется доверенный шлюз со статическим IP, укажи его API-базу | Только при использовании шлюза |
| `OPENAI_API_KEY` | серверный ключ AI-помощника | Необязателен: без него локальные советы |
| `NEXUS_AI_ACCESS_CODE` | код ограничения доступа к платному AI, если включён | Рекомендуется при использовании AI |
| `OPENAI_MODEL` | модель помощника | Необязателен |
| `ESPORTS_FEED_URL` | HTTPS JSON-лента турниров | Необязателен |
| `MAP_STATS_FEED_URL` | HTTPS API статистики карт | Необязателен |

После добавления секретов выполни повторное развёртывание проекта (новый Deploy).

**Важно:** ключи Supercell привязаны к разрешённому IP-адресу. Cloudflare Pages Functions не гарантирует постоянный исходящий IP. Поэтому прямые запросы к официальному API могут возвращать 403 даже при правильном ключе. Для полноценного профиля, клуба и боевого журнала потребуется согласованный доверенный прокси со статическим IP (или отдельный API-сервер с фиксированным IP). Не отправляй токены сторонним сервисам, пока не проверена их безопасность. Наш код поддерживает `BRAWL_API_BASE_URL`, но не включает прокси автоматически.

## 3. Проверка нового сайта

1. Открой адрес `https://<проект>.pages.dev/`: проверь баннер со Спайком, стили и кнопку Meta Lab.
2. Проверь `https://<проект>.pages.dev/api/status` (JSON): должен быть `"cloudflare":true`.
3. Проверь `/api/catalog`, `/api/maps`, `/api/news`: должны возвращать JSON.
4. После настройки токена/исходящего IP проверь `/api/player/%239YRLQG229`, `/api/player/%239YRLQG229/log` и `/api/club/...`.
5. Проверь сайт с телефона и ПК.

Если `/api/status` возвращает HTML или 404 — убедись, что выбран именно **Pages (Git integration)**, корень репозитория верный и функция `functions/api/[[path]].js` входит в сборку.

## 4. Следующие обновления

Cloudflare автоматически собирает `main` при новых коммитах; вместо публикации Netlify будет использоваться Cloudflare. **Netlify отключать и удалять не нужно**, пока всё не проверено. Репозиторий и функциональность приложения остаются прежними.

Код Cloudflare API адаптирован из `netlify/functions/api.mjs`. При изменениях серверных маршрутов синхронизируй обе версии API.
