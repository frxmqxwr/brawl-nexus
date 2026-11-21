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


## 5. Проверка после переноса токена (ноябрь 2026)

1. Открой Cloudflare → Workers & Pages → **brawl-nexus** → **Settings** → **Variables and Secrets** → **Add**.
2. Создай секрет с именем `BRAWL_API_TOKEN` и значением своего действующего ключа с https://developer.brawlstars.com (или скопируй из доступных секретов Netlify, если он позволяет просмотреть значение). **Не отправляй ключ в чат и не добавляй его в GitHub.**
3. Выбери **Secret / Encrypt**, сохрани и запусти **новый Production deployment**. Если ключ ранее попадал в публичный чат или репозиторий, отзови его и выпусти новый.
4. Проверь `https://brawl-nexus.pages.dev/api/status`: поле `official` станет `true`, если секрет доступен серверной функции.
5. Открой `https://brawl-nexus.pages.dev/api/status?check=supercell`: ответ содержит только `configured`, `connected`, HTTP-код и категорию ошибки — **никогда не значение токена**.
6. Если `connected:false`, `httpStatus:403` или `reason:ip-or-token-not-allowed`, причина может быть в IP allowlist Supercell или неправильном токене. Cloudflare Pages не даёт гарантированного исходящего IP, поэтому нужен доверенный шлюз с выделенным IP либо другой серверный компонент. Адрес такого доверенного шлюза задаётся через `BRAWL_API_BASE_URL` (его нельзя брать из неизвестного источника).
7. Проверь `/api/player/%239YRLQG229`, `/api/player/%239YRLQG229/log` и данные клуба на сайте. Отдельно убедись, что запросы идут через Cloudflare Function, а не напрямую из браузера к Supercell.

## 6. Киберспорт v2

Новый интерфейс получает новости через `/api/news` (при доступности публичных источников), а результаты матчей — только через `/api/esports`. Без настроенной переменной `ESPORTS_FEED_URL` карты матчей заменяются честными ссылками на официальный матч-центр и турнирную сетку. Для автоматического счёта и подтверждённого LIVE необходимо задать **разрешённый HTTPS JSON-источник матчей** в `ESPORTS_FEED_URL` с полями `matches`, `teamA`, `teamB`, `status`, `scoreA`, `scoreB`, `when`, `url` (подробности формата — в функции `matchFeed`). Не добавляй токены провайдера в публичный JavaScript.


## 7. Прокси для Supercell API на Cloudflare

Вариант A: собственный доверенный API-сервер со статическим исходящим IP. Если используешь его, настрой allowlist Supercell на IP этого сервера. Cloudflare Pages сам по себе не гарантирует постоянный исходящий IP.

Вариант B: сторонний RoyaleAPI Brawl Stars Proxy: https://docs.royaleapi.com/proxy.html. В документации указан адрес https://bsproxy.royaleapi.dev и разрешённый IP 45.79.218.79.

1. Если ты доверяешь RoyaleAPI, создай **отдельный новый ключ** на https://developer.brawlstars.com с IP в allowlist: 45.79.218.79.
2. В Cloudflare → Workers & Pages → brawl-nexus → Settings → Variables and Secrets создай зашифрованный Secret BRAWL_API_TOKEN со значением ключа (не присылай его в чат).
3. Добавь переменную BRAWL_API_BASE_URL со значением https://bsproxy.royaleapi.dev/v1.
4. Запусти новый production deployment и проверь https://brawl-nexus.pages.dev/api/status?check=supercell. Успех: configured=true, connected=true, httpStatus=200.
5. Затем проверь открытие профиля, клуба и боевого журнала.

**Конфиденциальность:** при использовании прокси заголовок Authorization с API-ключом передаётся стороннему серверу RoyaleAPI. Не используй прокси, если не доверяешь оператору; можно выбрать вариант A. Ключ не должен храниться ни в GitHub, ни в публичных JS/HTML файлах.

Если ответ HTTP 403, проблема может быть в разрешённом IP или самом токене. IP домашнего компьютера не поможет: Supercell проверяет исходящий IP сервера или прокси.
