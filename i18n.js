/* BRAWL // NEXUS — client-side RU/EN localization.
   User content, player names, chat messages and source news headlines stay original.
   Translate visible app copy (including JS-generated cards) without touching API data.
   Non-destructive: RU restores each node's original text, EN is persisted. */
(() => {
  'use strict';
  const STORAGE_KEY = 'bn_locale';
  const RULES = String.raw`
Обзор = Overview
МОЙ ПРОФИЛЬ = MY PROFILE
Мой профиль = My profile
Профиль = Profile
ПОИСК ИГРОКОВ = PLAYER SEARCH
Поиск игроков = Find players
Игроки = Players
МОЙ КЛУБ = MY CLUB
Мой клуб = My club
КИБЕРСПОРТ = ESPORTS
Киберспорт = Esports
Драфт = Draft
ДРАФТ = DRAFT
Гостевой режим = Guest mode
ГОСТЕВОЙ РЕЖИМ = GUEST MODE
Гостевой игрок = Guest player
Не подключён = Not connected
Инициализация данных = Initializing data
Загрузка данных = Loading data
Данные загружаются = Loading data
ПРОВЕРЯЕМ = CHECKING
В СЕТИ = ONLINE
ЗАГРУЗКА = LOADING
Подключено = Connected
Подключение = Connection
Не подключено = Not connected
Открыть меню = Open menu
Открыть профиль = Open profile
Открыть помощника = Open assistant
Открыть Meta Lab = Open Meta Lab
Перезагрузить игровые данные = Refresh game data
Обновить данные = Refresh data
Обновляем данные... = Refreshing data...
ОБНОВИТЬ ДАННЫЕ = REFRESH DATA
ОБНОВИТЬ = REFRESH
ОБНОВЛЕНИЕ... = REFRESHING...
Обновить = Refresh
ЗАКРЫТЬ = CLOSE
Закрыть = Close
Отправить = Send
Сохранить = Save
СОХРАНИТЬ = SAVE
Задай вопрос о Brawl Stars... = Ask about Brawl Stars...
Аналитический помощник = Tactical assistant
Привет! Я NEXUS. Могу разобрать твой драфт, подобрать контрпик, объяснить матчап и подсказать, что тренировать. Что разберём? = Hey! I'm NEXUS. I can review your draft, suggest counterpicks, explain matchups and help you improve. What shall we look at?
Контрпик = Counterpick
Контрпики = Counterpicks
Тренировка = Training
Тренироваться = Practice
Доступ к NEXUS AI = NEXUS AI access
Твой код доступа = Your access code
Код доступа к ИИ = AI access code
Код хранится только до закрытия вкладки. = The code is kept only until this tab is closed.
ИИ использует серверное подключение. Без него доступны локальные советы. = AI uses a server connection. Local tips are available without it.
ОТКРЫТЬ META LAB = OPEN META LAB
ОТКРЫТЬ = OPEN
Мой аккаунт = My account
МОЙ АККАУНТ = MY ACCOUNT
Твой аккаунт = Your account
ТВОЙ АККАУНТ = YOUR ACCOUNT
КОМАНДНЫЙ ЦЕНТР = COMMAND CENTER
ТАКТИЧЕСКИЙ ШТАБ = TACTICAL HQ
ТЕКУЩАЯ РОТАЦИЯ = CURRENT ROTATION
ТВОЯ РОТАЦИЯ = YOUR ROTATION
Твоя ротация, драфты, профиль и киберспорт в одном месте. Игровые PNG — оригинальные, цифры — из подключённых источников. = Your rotation, drafts, profile and esports in one place. Authentic game artwork, real data from connected sources.
Кубки аккаунта = Account trophies
Текущий ранг = Current rank
Рейтинговые очки = Ranked points
КУБКИ = TROPHIES
Кубки = Trophies
кубков = trophies
кубка = trophies
кубки = trophies
Кубки сейчас = Current trophies
Максимум кубков = Highest trophies
Рекорд = Record
РЕКОРД = RECORD
ЛУЧШИЙ РЕЗУЛЬТАТ = BEST RESULT
Всего престижей = Total prestige
Бойцов = Brawlers
бойцов = brawlers
бойца = brawler
боец = brawler
Боец = Brawler
БОЕЦ = BRAWLER
БОЙЦЫ = BRAWLERS
БОЙЦОВ = BRAWLERS
ВСЕ БОЙЦЫ = ALL BRAWLERS
ОСТАЛЬНЫЕ БОЙЦЫ = OTHER BRAWLERS
ЛУЧШИЕ БОЙЦЫ = TOP BRAWLERS
ПО КУБКАМ = BY TROPHIES
Топ = Top
ТОП = TOP
ТОП 3 = TOP 3
ЛИСТАЙ КАРТОЧКИ = SCROLL CARDS
Предыдущие бойцы = Previous brawlers
Следующие бойцы = Next brawlers
Лента бойцов с горизонтальной прокруткой = Horizontally scrolling brawler list
Сила = Power
СИЛА = POWER
Сила 11 = Power 11
Престиж = Prestige
ПРЕСТИЖ = PRESTIGE
ПРЕСТИЖИ = PRESTIGE
ПРЕСТИЖИ И ПРОГРЕСС = PRESTIGE & PROGRESS
ПРЕСТИЖИ И ПРОГРЕССИЯ = PRESTIGE & PROGRESS
СУММАРНЫЙ ПРЕСТИЖ = TOTAL PRESTIGE
Бойцы с престижем = Brawlers with prestige
БОЙЦОВ С ПРЕСТИЖЕМ = BRAWLERS WITH PRESTIGE
Всего престижей = Total prestige
Сумма престижей всех бойцов = Sum of all brawlers' prestige levels
С престижем 1 и выше = With Prestige 1 or above
Игровая прогрессия = Game progression
ИГРОВАЯ ПРОГРЕССИЯ = GAME PROGRESSION
Дерево = Wood
Бронза = Bronze
Серебро = Silver
Золото = Gold
Прайм 1 = Prime 1
Прайм 2 = Prime 2
Прайм 3+ = Prime 3+
Прайм = Prime
ПРАЙМ = PRIME
Фильтр бойцов по престижам = Filter brawlers by prestige
Бойцов с престижем пока нет. = No brawlers with prestige yet.
На этом уровне престижей бойцов пока нет. = No brawlers at this prestige level yet.
ПРИМЕР ИГРОВОГО ОФОРМЛЕНИЯ = SAMPLE UI
ПРИМЕР ОФОРМЛЕНИЯ = UI PREVIEW
ПОДТВЕРЖДЁННЫЙ ПРОФИЛЬ = VERIFIED PROFILE
ЗНАЧОК РАНГА = RANK ICON
НЕТ ДАННЫХ = NO DATA
Нет данных = No data
Нет данных о бойцах. = No brawler data.
Нет данных о режимах = No mode data
СТАТУС НЕДОСТУПЕН = STATUS UNAVAILABLE
ЗАГРУЖАЕМ ДАННЫЕ = LOADING DATA
АККАУНТА. = ACCOUNT.
Кубки, ранги и история игр. = Trophies, ranks and match history.
СИМВОЛ # НЕОБЯЗАТЕЛЕН = # SYMBOL IS OPTIONAL
Тег игрока = Player tag
ТЕГ ИГРОКА = PLAYER TAG
НАЙТИ ИГРОКА = FIND PLAYER
Найти игрока = Find player
НАЙТИ = FIND
НАЙТИ = FIND
Поиск по тегу = Search by tag
Найти профиль по тегу = Find profile by tag
Свой аккаунт = My account
МОЙ ПРОФИЛЬ = MY PROFILE
ПОДКЛЮЧИ АККАУНТ ПО ТЕГУ = CONNECT ACCOUNT BY TAG
НЕ ПОДКЛЮЧЕНО = NOT CONNECTED
АККАУНТ ЗАГРУЖЕН = ACCOUNT LOADED
Мой аккаунт = My account
Найди аккаунт для просмотра клуба = Find an account to view its club
Клуб игрока = Player's club
КЛУБ ИГРОКА = PLAYER'S CLUB
КЛУБ = CLUB
Клуб = Club
Без клуба = No club
Игрок не состоит в клубе = Player is not in a club
Максимум кубков = Highest trophies
ТЕКУЩИЙ И РЕКОРД = CURRENT & BEST
ТЕКУЩИЙ РАНГ = CURRENT RANK
ЛУЧШИЙ РАНГ ЗА ВСЁ ВРЕМЯ = ALL-TIME BEST RANK
РЕЙТИНГОВЫХ ОЧКОВ = RANKED POINTS
МАКС. РЕЙТИНГОВЫХ ОЧКОВ = MAX RANKED POINTS
НОВОСТИ = NEWS
Новости = News
НОВОСТНАЯ ЛЕНТА = NEWS FEED
НОВОСТИ СЦЕНЫ = ESPORTS NEWS
НОВОСТИ И ОБНОВЛЕНИЯ = NEWS & UPDATES
Все новости = All news
ВСЕ НОВОСТИ = ALL NEWS
КИБЕРСПОРТ = ESPORTS
КИБЕРСПОРТИВНАЯ СЦЕНА = ESPORTS SCENE
МАТЧИ = MATCHES
Матчи = Matches
МАТЧ-ЦЕНТР = MATCH CENTER
КОМАНДЫ = TEAMS
КОМАНДЫ СЦЕНЫ = ESPORTS TEAMS
КОМАНДА = TEAM
Команда = Team
КОМАНДА A = TEAM A
КОМАНДА B = TEAM B
КОМАНДА А = TEAM A
КОМАНДА Б = TEAM B
ЧЕМПИОНАТ В ФОКУСЕ = CHAMPIONSHIP SPOTLIGHT
Официальная информация о World Finals 2026. = Official World Finals 2026 information.
БЫСТРЫЕ ПЕРЕХОДЫ = QUICK LINKS
Официальные площадки и архив эфиров. = Official channels and broadcast archive.
В СЕТИ = ONLINE
ДНИ ФИНАЛА = FINALS IN PROGRESS
СКОРО СТАРТ = STARTING SOON
ТУРНИР ЗАВЕРШЁН = TOURNAMENT FINISHED
КОМАНД = TEAMS
ПРИЗОВОЙ ФОНД = PRIZE POOL
ТОКИО = TOKYO
ЯПОНИЯ = JAPAN
ноября = November
Награды зрителям и прогнозы доступны на официальном сайте турнира. = Viewer rewards and predictions are available on the official tournament website.
12 команд, мировой титул, призовой фонд $1 000 000. = 12 teams, one world title and a $1,000,000 prize pool.
РЕГЛАМЕНТ И УЧАСТНИКИ = FORMAT & PARTICIPANTS
ПРОГНОЗЫ И НАГРАДЫ = PREDICTIONS & REWARDS
ТУРНИРНЫЙ ПОРТАЛ = TOURNAMENT HUB
СЕТКА МАТЧЕЙ = TOURNAMENT BRACKET
ЗАПИСИ ТРАНСЛЯЦИЙ = VODS & REPLAYS
ТУРНИРНАЯ СЕТКА = BRACKET
СМОТРЕТЬ / РАСПИСАНИЕ = WATCH / SCHEDULE
СМОТРЕТЬ ТРАНСЛЯЦИЮ = WATCH STREAM
ОФИЦИАЛЬНАЯ ТРАНСЛЯЦИЯ = OFFICIAL STREAM
В ПРЯМОМ ЭФИРЕ = LIVE NOW
ПРЕДСТОЯЩИЕ = UPCOMING
ЗАВЕРШЁННЫЕ = FINISHED
ЗАПЛАНИРОВАНО = SCHEDULED
ЗАВЕРШЁН = FINISHED
Подтверждённые счёты пока недоступны = Verified scores are not available yet
Для автоматического отображения матчей нужен источник турнирных результатов. Не подменяем его выдуманными победами или статусами LIVE. = Live scores require a verified tournament feed. We never invent wins, results or LIVE statuses.
Результаты только из подключённой турнирной ленты, не из догадок. = Only verified tournament-feed results, never guesses.
Подтверждённые счёты = Verified scores
Не подменяем его выдуманными победами или статусами = We never fabricate wins or LIVE status
ОФИЦИАЛЬНОЕ РАСПИСАНИЕ = OFFICIAL SCHEDULE
СЕТКА И РЕЗУЛЬТАТЫ = BRACKET & RESULTS
ОФИЦИАЛЬНЫЕ ССЫЛКИ = OFFICIAL LINKS
ИСТОЧНИК = SOURCE
Источник = Source
Победитель: = Winner:
ПОБЕДИТЕЛЬ = WINNER
ПОБЕДА = VICTORY
ПОРАЖЕНИЕ = DEFEAT
НИЧЬЯ = DRAW
Завершён = Finished
ЗАВЕРШЕНО = FINISHED
Время уточняется = Time TBA
Дата уточняется = Date TBA
РАСПИСАНИЕ = SCHEDULE
ДАТА = DATE
ВРЕМЯ = TIME
КАЛЕНДАРЬ = CALENDAR
СБРОСИТЬ ФИЛЬТР = CLEAR FILTER
ВСЕ = ALL
Все = All
Подтверждённые = Verified
ОБЗОР = OVERVIEW
ПРЕДСТОЯЩИЕ = UPCOMING
Команды мировой сцены = Teams from the world scene
Эмблемы мировой сцены. Выбери команду, чтобы посмотреть её матчи в подключённом источнике. = Authentic team logos. Select a team to see its matches from the connected feed.
Список включает команды мировой сцены, не только участников финалов 2026. Полный состав турнира — в официальном руководстве. = The list shows world-scene teams, not only 2026 finalists. Check the official guide for the full roster.
ВСЕ КОМАНДЫ = ALL TEAMS
УЧАСТНИКИ 2026 = 2026 PARTICIPANTS
Автоматическое обновление = Auto refresh
Публикации с открытыми ссылками на источники; обновление при открытии и далее автоматически. = Articles link directly to their sources and refresh automatically.
ОБНОВЛЕНИЯ = UPDATES
ОБНОВЛЕНИЕ = UPDATE
КИБЕРСПОРТ = ESPORTS
Официальные новости = Official news
Официальные материалы = Official articles
Официальные новости киберспорта = Official esports news
Результаты матчей = Match results
Трансляции = Streams
Всё важное о чемпионате в одном месте = All key championship information in one place
Все важное о чемпионате в одном месте: турнир, команды, новости и подтверждённые результаты. У эфиров и матчей — прямые ссылки на источники. = Everything about the championship in one place: teams, matches, news and verified results. Direct links to every source.
ПУБЛИКАЦИИ = ARTICLES
Новости и обновления = News & updates
Последние новости = Latest news
Читать = Read
ЧИТАТЬ = READ
Открыть = Open
ПОДРОБНЕЕ = DETAILS
Показать ещё = Show more
Нет новых публикаций = No new articles
Новые публикации не найдены. Открой официальный блог для актуальных объявлений. = No new articles found. Visit the official blog for updates.
БЛОГ SUPERCELL = SUPERCELL BLOG
ОФИЦИАЛЬНО = OFFICIAL
Официальный = Official
ЛИЧНЫЕ МАТЧИ = MY MATCHES
ЛИЧНЫЙ ПРОФИЛЬ = MY PROFILE
БОЕВОЙ ЖУРНАЛ = BATTLE LOG
Боевой журнал = Battle log
ИСТОРИЯ БОЁВ = BATTLE HISTORY
ИСТОРИЯ МАТЧЕЙ = MATCH HISTORY
ПОСЛЕДНИЕ МАТЧИ = RECENT MATCHES
МАТЧЕЙ = MATCHES
матчей = matches
матча = matches
матч = match
Матч = Match
МАТЧ = MATCH
БИТВА = BATTLE
БОИ = BATTLES
Бои = Battles
Игра = Game
ИГРА = GAME
Игровой режим = Game mode
РЕЖИМ ИГРЫ = GAME MODE
РЕЖИМ = MODE
Режим = Mode
Карта = Map
КАРТА = MAP
КАРТЫ = MAPS
Карта неизвестна = Unknown map
КАРТА НЕ ВЫБРАНА = NO MAP SELECTED
Карта не выбрана = No map selected
Выбери карту = Choose a map
Выбери карту для схемы линий, советов и доступной статистики. = Pick a map to see lane plans, tips and available stats.
КАРТЫ И СТРАТЕГИИ = MAPS & STRATEGY
ПРОВЕРЯЕМ КАРТЫ = CHECKING MAPS
КАТАЛОГ = CATALOG
КАТАЛОГ / ПРЕВЬЮ = CATALOG / PREVIEW
КАТАЛОГ КАРТ = MAP CATALOG
КАТАЛОГ БОЙЦОВ = BRAWLER CATALOG
ПРЕВЬЮ КАРТ = MAP PREVIEW
ПРЕВЬЮ КАРТЫ = MAP PREVIEW
Изображение карты недоступно = Map artwork unavailable
Изображение этой карты пока отсутствует в игровом каталоге. = This map image is not in the game catalog yet.
Нет доступных карт для разбора. Подключи каталог игровых данных. = No maps available for analysis. Connect the game catalog.
Карта из каталога = Catalog map
Текущая ротация = Current rotation
Актуальная ротация = Current rotation
ТЕКУЩАЯ РОТАЦИЯ = CURRENT ROTATION
ОБНОВИТЬ РОТАЦИЮ = REFRESH ROTATION
Актуально = Current
АКТУАЛЬНО = CURRENT
СЕЙЧАС = NOW
ТЕКУЩИЙ = CURRENT
Текущий = Current
ЗАВТРА = TOMORROW
НЕ СЕЙЧАС = NOT NOW
Соло = Solo
СОЛО ПИК = SOLO PICK
Один самостоятельный боец. Оценивай выживаемость и контроль зоны. = One independent brawler. Prioritize survivability and area control.
Подбирай пару с взаимодополняющими ролями. = Pick a pair with complementary roles.
Выбор по карте и составу, без привязки к трём линиям. = Choose for the map and composition, without fixed lanes.
ПОДБОР ПИКОВ = PICK SUGGESTIONS
ПОДОБРАТЬ = SUGGEST
ПИКИ = PICKS
ПИК = PICK
ПИКОВ = PICKS
Выбор = Pick
ВЫБОР = PICK
Контрпики = Counterpicks
КОНТРПИКИ = COUNTERPICKS
ДРАФТ НА ЭТОЙ КАРТЕ = DRAFT FOR THIS MAP
РАЗОБРАТЬ ДРАФТ = REVIEW DRAFT
ТАКТИЧЕСКИЕ СОВЕТЫ = TACTICAL TIPS
ТАКТИЧЕСКИЙ РАЗБОР = TACTICAL BREAKDOWN
ХАРАКТЕР КАРТЫ = MAP STYLE
Открытая = Open
Много стен = Wall-heavy
Закрытая = Closed
Смешанная = Mixed
Смешанная (предварительно) = Mixed (estimated)
Не определено = Unknown
Геометрия этой карты ещё не оценена = Map geometry has not been evaluated yet
оценка по изображению = image-based estimate
Детальная геометрия не подтверждена = Detailed geometry not verified
Алгоритмическая оценка миниатюры; проверь укрытия = Thumbnail-based estimate; verify cover positions
ОБЩАЯ ВЫБОРКА = OVERALL SAMPLE
объём выборки неизвестен = sample size unknown
подключённый провайдер = connected provider
Это статистика выборки, а не гарантия победы. = Sample statistics, not a guaranteed win.
ТВОИ РЕЗУЛЬТАТЫ НА ЭТОЙ КАРТЕ = YOUR RESULTS ON THIS MAP
Только твой боевой журнал = Only your battle log
не глобальный винрейт = not a global win rate
В последних боях нет результатов на этой карте = No recent match results on this map
ПОБЕДЫ = WINS
ПОРАЖЕНИЯ = LOSSES
ПОБЕД = WINS
ВЫБОРКЕ = SAMPLE
В ВЫБОРКЕ = IN SAMPLE
ПОЛУЧЕНО МАТЧЕЙ = MATCHES LOADED
ЧАСТЫЕ РЕЖИМЫ = MOST-PLAYED MODES
Процент считается только по матчам с явно определённым результатом; ничьи и неизвестные результаты исключены. Это небольшая доступная выборка, не сезонный винрейт. = Win rate is based only on matches with a known outcome. Draws and unknown results are excluded; this is a small sample, not a season-wide win rate.
Подключи профиль, чтобы загрузить настоящую историю боёв. = Connect a profile to load real match history.
Боевой журнал временно недоступен. Попробуй обновить страницу. = Battle log is temporarily unavailable. Try refreshing.
Состав участников не передан = Player lineup unavailable
ТВОЯ КОМАНДА = YOUR TEAM
НАША КОМАНДА = OUR TEAM
НАШИ = ALLIES
СОЮЗНИКИ = ALLIES
Союзники = Allies
СОПЕРНИКИ = OPPONENTS
Соперники = Opponents
ПРОТИВНИКИ = OPPONENTS
НАША = OURS
ВРАГИ = ENEMIES
УЧАСТНИКИ = PLAYERS
Участник = Player
Игрок = Player
ИГРОК = PLAYER
ИГРОКИ = PLAYERS
игроков = players
Место = Position
Тиммейты = Teammates
Тег = Tag
ДЛИТЕЛЬНОСТЬ = DURATION
сек. = sec.
мин. = min.
Изменение кубков: нет данных = Trophy change: unavailable
Сколько кубков = Trophy change
Получено кубков = Trophies earned
Награда = Reward
НАГРАДА = REWARD
Иконка = Icon
Статистика = Stats
СТАТИСТИКА = STATS
Личное = Personal
СВОЙ ПРОФИЛЬ = OWN PROFILE
НЕОБХОДИМО ПОДКЛЮЧИТЬ = CONNECTION REQUIRED
Броулбол = Brawl Ball
Нокаут = Knockout
Захват кристаллов = Gem Grab
Ограбление = Heist
Горячая зона = Hot Zone
Награда за поимку = Bounty
Одиночное столкновение = Solo Showdown
Парное столкновение = Duo Showdown
Тройное столкновение = Trio Showdown
Зачистка = Wipeout
Баскетбой = Basket Brawl
Волейбой = Volley Brawl
Дуэли = Duels
Осада = Siege
Большая игра = Big Game
Бой с боссом = Boss Fight
Роборубка = Robo Rumble
Бравл-арена = Brawl Arena
Бравл-хоккей = Brawl Hockey
Команда тегов = Team Tags
Командный бой 5 на 5 = 5v5 Team Battle
Охотники = Hunters
Бравл-краски = Paint Brawl
Похищение подарков = Present Plunder
Последний рубеж = Last Stand
Неизвестный режим = Unknown mode
Стрелок = Marksman
Танк = Tank
Урон = Damage
Ассасин = Assassin
Контроль = Control
Метатель = Thrower
Поддержка = Support
МАГ = MAGE
ЛЕВАЯ ЛИНИЯ = LEFT LANE
ЦЕНТР = MID
ПРАВАЯ ЛИНИЯ = RIGHT LANE
Держи фланг, не отдавай укрытия и не заходи в двойной фокус. = Hold your lane, keep cover and avoid crossfire.
Контролируй цель режима, помогай союзникам и отслеживай перезарядку соперников. = Control the objective, support allies and track enemy ammo.
Проверяй обходы и сохраняй возможность быстро вернуться в центр. = Watch flanks and stay ready to rotate mid.
Контролируй центр = Control mid
Не отдавай сопернику простые углы и проходы. = Deny easy angles and choke points.
Не забудь баны = Don't forget bans
Не забудь = Remember
РЕКОМЕНДАЦИИ = RECOMMENDATIONS
РЕКОМЕНДУЕМ = RECOMMENDED
НАШ ВЫБОР = OUR PICK
ЛУЧШИЙ ВЫБОР = BEST PICK
ВАРИАНТ = OPTION
ИГРОКОВ = PLAYERS
БОЙЦА / ВАРИАНТОВ = BRAWLERS / OPTIONS
ТОЛЬКО ИЗБРАННЫЕ = FAVORITES ONLY
ИЗБРАННОЕ = FAVORITES
Избранное = Favorites
В избранное = Add to favorites
Убрать из избранного = Remove from favorites
Сортировка = Sorting
Выбери = Choose
ВЫБЕРИ = CHOOSE
ВЫБЕРИ КАРТУ = CHOOSE A MAP
ВЫБЕРИ РЕЖИМ = CHOOSE A MODE
ВЫБРАТЬ = SELECT
Выбрать = Select
ОТМЕНИТЬ = CANCEL
Отменить = Cancel
НАЗАД = BACK
Назад = Back
ОЧИСТИТЬ = CLEAR
ОЧИСТКА = CLEAR
УДАЛИТЬ = REMOVE
СБРОС = RESET
СБРОСИТЬ = RESET
НОВЫЙ ДРАФТ = NEW DRAFT
ДРАФТ ЗАВЕРШЁН = DRAFT COMPLETE
ДРАФТ ГОТОВ = DRAFT READY
ИГРА НА ТРОФЕИ = TROPHY MATCHES
ИГРА НА КУБКИ = TROPHY MATCHES
СИЛОВАЯ ЛИГА = RANKED
РЕЙТИНГ = RANKED
РЕЙТИНГОВЫЙ = RANKED
ТИР-ЛИСТ = TIER LIST
НАЙТИ КОНТРПИК = FIND COUNTERPICK
КОНТРПИК = COUNTERPICK
ПОДГОТОВКА СОСТАВА = PREPARE YOUR TEAM
ПРОПУСТИТЬ ПИК = SKIP PICK
ПРОПУСТИТЬ БАНЫ = SKIP BANS
ОТМЕТЬ БАНЫ = SELECT BANS
БАНЫ ГОТОВЫ = BANS COMPLETE
НАШ ХОД = OUR TURN
ХОД СОПЕРНИКА = OPPONENT'S TURN
КОГО БЕРЁМ? = WHO DO WE PICK?
КОГО ВЗЯЛИ? = WHO DID THEY PICK?
ЖЕТОН ПЕРВОГО ВЫБОРА = FIRST PICK COIN
У НАС = OUR TEAM
У ВРАГОВ = OPPONENTS
Первым пикнет = First pick goes to
Баны = Bans
Банов = Bans
банов = bans
Бан = Ban
Забаненные = Banned
Баны: = Bans:
Пики: = Picks:
Пики = Picks
Составы готовы = Team comps ready
Порядок = Order
Выбор по карте = Map-based pick
Только доступные = Available only
НЕДОСТУПНО = UNAVAILABLE
Ничего не найдено. Измени поиск или фильтры. = No results. Try another search or filter.
Сила бойца = Brawler power
Роль = Role
РОЛЬ = ROLE
Режим игры = Game mode
Моя команда = My team
Вражеская команда = Enemy team
Эвристика = Heuristic
Не статистика = Not statistics
Это не статистический тир-лист. = This is not a statistical tier list.
Варианты на = Options for
выбранной карте = the selected map
основаны на режиме и характере карты. Это не статистический тир-лист. = are based on the mode and map layout, not statistical tier rankings.
Результаты = Results
РЕЗУЛЬТАТЫ = RESULTS
УСПЕХ = SUCCESS
ОШИБКА = ERROR
Ошибка = Error
ЗАГРУЗКА... = LOADING...
ЗАГРУЖАЕМ... = LOADING...
ПОИСК... = SEARCHING...
ПОИСК = SEARCH
ПОИСК ИГРОКА = PLAYER SEARCH
ПОИСК КЛУБА = CLUB SEARCH
Найди свой аккаунт, чтобы увидеть эмблему клуба, участников и общий счёт кубков. = Connect your account to see the club badge, members and total trophies.
Загружаем данные твоего клуба = Loading your club data
ПОПРОБУЙ СНОВА = TRY AGAIN
Попробуй снова = Try again
Попробуй обновить = Try refreshing
Ещё нет данных = No data yet
Твой профиль = Your profile
Друзья = Friends
ДОБАВИТЬ = ADD
Добавить = Add
Добавить игрока = Add player
Игрок 1 = Player 1
Игрок 2 = Player 2
Игрок 3 = Player 3
СОСТАВ = TEAM COMP
СОСТАВ КОМАНДЫ = TEAM COMP
СРАВНИТЬ = COMPARE
СРАВНЕНИЕ = COMPARISON
УРОВЕНЬ = LEVEL
Уровень = Level
УРОВЕНЬ СИЛЫ = POWER LEVEL
СЫГРАННОСТЬ = SYNERGY
Готово = Done
ГОТОВО = DONE
Подключи = Connect
Подключить = Connect
НАЙТИ = FIND
НАСТРОЙКИ = SETTINGS
Состояние = Status
Обновлено = Updated
Обновляется = Refreshing
Подтверждено = Verified
Настоящие данные = Real data
Настоящие = Real
История = History
Профиль загружен = Profile loaded
Официальный API = Official API
официальный API = official API
сервер = server
сервера = server
данных = data
источников = sources
игрового = game
игровой = game
текущей = current
временно = temporarily
недоступен = unavailable
недоступна = unavailable
неизвестен = unknown
без данных = no data
не найден = not found
НЕ НАЙДЕНО = NOT FOUND
не подключено = not connected
не подключён = not connected
сейчас = now
всего = total
Всё = All
всех = all
все = all
из = from
на = on
для = for
и = and
с = with
по = by
за = for
при = when
нет = no
Нет = No
не = not
Новый рейтинговый режим, карты и интерфейс = New ranked mode, maps and interface
Расписание, прогнозы и трансляции — на официальном сайте = Schedule, predictions and streams on the official site
Изображение недоступно на = Image unavailable on
Игровая аватарка = In-game avatar
Оригинальный значок клуба = Official club badge
Значок ранга = Rank emblem
Оригинальный портрет = Original character art
Игровая шкала прогрессии от дерева до третьего престижа = Prestige progression from Wood to Prime 3
не передал данные по престижам. = did not provide prestige data.
согласно данным = according to data
Не задана карта = No map selected
Тактический справочник: = Tactical guide:
не разрешил автоматический анализ изображения = does not allow automated image analysis
ХАРАКТЕР КАРТЫ / АВТО: = MAP STYLE / AUTO:
КОНКРЕТНАЯ КАРТА = SPECIFIC MAP
недавних матчей с победой или поражением = recent matches with a win or loss
ПОДКЛЮЧАЕМ КАРТЫ = CONNECTING MAPS
Для просмотра нужны данные каталога = Catalog data required to display
Чтобы видеть именно текущую ротацию, настрой = To see the actual current rotation, configure
на сервере. = on the server.
Сейчас показаны карты из настоящего игрового каталога, = These are maps from the official game catalog,
не текущая ротация = not the live rotation
и разрешённый = and an allowlisted
Твоя ротация, драфты, профиль и киберспорт в одном месте. Игровые = Your rotation, drafts, profile and esports in one place. Game
оригинальные, цифры — из подключённых источников. = art is authentic; figures come from connected sources.
МЕТА / ПОДБОР ПИКОВ = META / PICK SUGGESTIONS
Изучи три линии и подбери пики по местности. = Study the three lanes and choose picks for the map.
Кликни по карте текущей ротации. = Click a current-rotation map.
порядок пиков контролируется жетоном первого выбора. = pick order is determined by the first-pick coin.
Есть обновления подключённого турнирного источника. = Tournament-feed updates are available.
Логотипы настоящих команд. Результаты и = Authentic team logos. Scores and
счёт без подключённого источника не подменяем примерами. = live scores require a connected source; no fake data.
Сравнить состав и друзей = Compare team and friends
Контрпики и вопросы по игре = Counterpicks and game questions
Подключи официальный = Connect the official
и открой последние матчи. Только после этого появится настоящая статистика — без вымышленных процентов. = and open recent matches. Real stats appear only after that, never invented percentages.
Подсчитано по подтверждённым уровням каждого бойца из = Calculated from confirmed prestige levels for every brawler in
Часть уровней не получена: значения с символом = Some levels are unavailable: values marked with
нижняя граница. = minimum confirmed value.
Недостающие показатели не заменяются вычислениями по кубкам. = Missing statistics are never guessed from trophies.
Дерево (0–249), бронза (250–499), серебро (500–749), золото (750–999 кубков): по текущим кубкам бойцов до престижа. = Wood (0–249), Bronze (250–499), Silver (500–749), Gold (750–999 trophies): based on current trophies before Prestige.
означает неполную выборку. Щиты — игровые = indicates incomplete data. Shields are official game
сумма престижей и число бойцов с престижем — разные показатели. = total prestige and the count of prestiged brawlers are different metrics.
Нажми на бой для просмотра составов и кубков. = Select a battle to see teams and trophies.
ПРОГРЕСС БОЙЦОВ = BRAWLER PROGRESS
Найти бойца по имени... = Search brawler by name...
Поиск по бойцам = Search brawlers
Пока без престижа = No prestige yet
Нет данных о престиже = No prestige data
Загрузи профиль, чтобы увидеть своих бойцов и их достижения. = Load your profile to see your brawlers and achievements.
Сортировка: престиж = Sort: prestige
кубки. Поля экипировки и престижа показываются только из ответа = trophies. Gear and prestige are shown only when provided by the
без попыток угадать по внешнему виду бойца. = without guessing from a brawler's appearance.
ОБЩИЕ ДОСТИЖЕНИЯ = OVERALL ACHIEVEMENTS
Победы 3 на 3 = 3v3 wins
Соло-победы = Solo wins
Дуо-победы = Duo wins
Максимальная серия = Longest streak
Бойцы 11 силы = Power 11 brawlers
Звёздные силы = Star Powers
не возвращает значение показателя, показывается = does not provide this metric, the page shows
Выдуманные показатели ресурсов, скинов и матчей не добавляются. = Currency, skin and match statistics are never fabricated.
РЕЗУЛЬТАТЫ ПОСЛЕДНИХ БОЁВ = RECENT BATTLE RESULTS
ИГРОВОЙ АНАЛИЗ = GAME ANALYSIS
В доступном журнале = In the available battle log
матчей. Можно разобрать их результаты и часто используемые составы. = matches. Review results and common team compositions.
Чтобы оценивать винрейт и ошибки, нужен доступный журнал боёв. Официальный = A battle log is needed to assess win rate and mistakes. The official
не содержит видеозаписи и положения игрока на карте. = does not include video or player locations on the map.
ОБСУДИТЬ С = DISCUSS WITH
Материал официального блога = Official blog article
Не удалось загрузить раздел киберспорта. Обнови страницу и проверь соединение. = Esports could not load. Refresh and check your connection.
подходит под задачи режима = suits the objectives of this mode
На открытых линиях стрелок может держать дистанцию = On open lanes, marksmen can keep their distance
Укрытия и стены благоприятны для этой роли = Cover and walls favor this role
Танк рискует на открытой карте без прикрытия = Tanks are vulnerable on open maps without cover
Добавляет другую роль в состав = Adds a different role to the team
Контрпик против: = Counters:
В команде уже много бойцов этой роли = The team already has too many of this role
Риск против врага с высоким уроном по танкам = Risky against tank-busting opponents
Мобильные враги могут быстро сближаться = Mobile enemies can close the gap quickly
Универсальный вариант; проверь карту и состав команды = Versatile option; check the map and team composition
Этот боец уже выбран или забанен = This brawler is already picked or banned
Все шесть банов уже выбраны = All six bans have been selected
Баны готовы! Начинается фаза пиков = Bans complete! Pick phase begins
Все шесть пиков уже заполнены = All six picks are filled
Драфт завершён — проверь итоговый состав = Draft complete — review your team
Отменять нечего = Nothing to undo
Неизвестен = Unknown
Откатить до выбора = Rewind to pick
наша команда = our team
До шести забаненных бойцов — одной сеткой. Первым пикнет = Up to six banned brawlers in one grid. First pick goes to
Выбери своего бойца: подсказки справа уже учитывают предыдущие пики. = Choose your brawler; suggestions on the right account for earlier picks.
Отметь выбранного соперником бойца — следующий ход определится автоматически. = Select the brawler picked by your opponent; the next turn is automatic.
СОСТАВЫ ГОТОВЫ = TEAMS READY
Все шесть выборов внесены. Можно изучить контрпики или отменить последний ход. = All six picks are in. Review counterpicks or undo the last turn.
Выбери, кому выпал первый пик. Дальше команды переключаются сами. = Choose who picks first. Teams alternate automatically afterward.
Очередность шести пиков = Six-pick order
ЗАКОНЧИТЬ БАНЫ = FINISH BANS
Если не успел увидеть выбор, оставь неизвестного бойца в этом слоте = If you missed the pick, leave this slot unknown
Без ручного выбора стороны на каждом ходе = No manual team choice on each turn
Оригинальная миниатюра карты = Original map thumbnail
Выбери карту из игрового каталога = Choose a map from the game catalog
ПЛАН НА НАШ СЛЕДУЮЩИЙ ХОД = PLAN FOR OUR NEXT PICK
СОПЕРНИК ВЫБРАЛ = OPPONENT PICKED
КОНТРПИКИ ПЕРЕСЧИТАНЫ = COUNTERPICKS RECALCULATED
Выбрать для своей команды = Pick for your team
Доступно в свой ход пика = Available on your pick turn
Выбери тип матча = Choose match type
соло, дуо и командные режимы = solo, duo and team modes
жетон, баны, пики и контрпики = coin, bans, picks and counters
Держи дистанцию и проходы, отталкивай нападающих; не трать супер без угрозы. = Hold lanes and push attackers away; save your Super for real threats.
Проверяй кусты атаками, перекрывай проходы; супер оставляй для побега или добивания. = Check bushes with attacks, block chokepoints; save Super for escape or a finish.
Получай супер с безопасного попадания, меняй угол рывком; не влетай в толпу. = Charge Super safely, reposition with a dash; do not dive into a crowd.
Поставь турель за укрытием на проходе; перемещайся, пока враг отвлечён. = Place a turret behind cover near a chokepoint; rotate while enemies are distracted.
Ищи одиночных врагов у края зоны; отступай, если к драке подходит третий. = Look for isolated enemies at the edge; disengage when a third party arrives.
Бегай по краю опасной зоны, забирай свободные ящики; ускорение береги для выхода. = Circle the danger zone, grab safe boxes; save speed for escaping.
Играй от укрытий, выманивай соперника на открытое место; избегай боя сразу с двумя. = Play around cover, lure enemies into the open; avoid fighting two at once.
Занимай безопасные углы для урона, проверяй кусты и уходи после плохого размена. = Hold safe firing angles, check bushes, and back off after a bad trade.
Проверяй ближние кусты, подпускай врага на свою дистанцию; не беги через открытое поле. = Check nearby bushes, let enemies enter your range; never sprint across open ground.
Ищи изолированную цель, принимай короткую дуэль и не входи в драку нескольких игроков. = Seek isolated targets, take short duels and avoid multi-player fights.
Прячь своё направление, заходи с фланга на одиночную цель; уходи после атаки. = Hide your approach, flank an isolated enemy, and retreat after striking.
Играй осторожно до усилений, не разменивай жизнь ради ящика в центре. = Play safe until powered up; do not trade your life for a center box.
Подкрадывайся к одиночной цели из укрытия; не нападай, когда рядом её союзник. = Sneak up on isolated targets from cover; avoid attacks near their allies.
Держи врагов под давлением с дистанции, не прыгай без безопасного пути отхода. = Apply pressure from range; do not jump without a safe escape route.
Сохраняй дальнюю дистанцию и прострел; не стой рядом с кустом, откуда могут выпрыгнуть. = Keep a long sightline; avoid bushes that might hide an ambush.
Сначала найди одиночную цель, начинай сближение только с путём для отступления. = Find a lone target first; engage only if you have an escape route.
Продвигайся от стены к стене, выталкивай врага из укрытия; избегай дальних дуэлей. = Advance cover to cover, force enemies out, and avoid long-range duels.
Играй от стен и отскоков, меняй угол стрельбы; не стой на открытой линии. = Use wall bounces, vary your firing angle; avoid exposed lanes.
Держи длинные прострелы, помечай опасную цель и не отдавай близкую дистанцию. = Hold long sightlines, tag dangerous targets and keep enemies at range.
Выбирай дальние углы, бей по прямым подходам; не подпускай бойцов ближнего боя. = Hold distant angles, cover straight approaches and keep melee brawlers away.
Заряжай атаку из безопасной позиции, контролируй проход и не застревай у стены. = Charge your attack safely, control the chokepoint and avoid getting cornered.
Укрывай подходы дальними атаками и отходи, если противник сокращает дистанцию. = Cover approaches from range and retreat if enemies close in.
Занимай проходы под укрытием и используй супер для безопасного перехода. = Hold covered chokepoints and use your Super to rotate safely.
Удерживай выгодную точку и прострел, но заранее планируй путь отхода. = Hold a strong angle and sightline, but plan your retreat in advance.
Выбирай плотные цели и держи расстояние; не открывайся под чужой фокус. = Target grouped enemies and keep your distance; avoid crossfire.
Покалывай с безопасной дистанции и притягивай только врага без поддержки. = Poke safely from range and pull only isolated enemies.
Продвигайся за стенами, атакуй на близкой дистанции; не пересекай пустое поле. = Advance behind walls and attack up close; avoid open ground.
Сохраняй дистанцию, лечись вовремя и выбирай бой, в котором можно отступить. = Keep distance, heal early and choose fights you can retreat from.
Держи открытую сторону центра, отталкивай тех, кто выходит из кустов; не заходи первым. = Hold the open side of mid, repel bush pushes and avoid entering first.
Простреливай центральные кусты и узкие проходы; супер оставь на преследователя. = Pressure middle bushes and tight lanes; save Super for pursuers.
Начинай у внешних ящиков, меняй фланг рывками; в центральную толпу не влетай. = Start at outer boxes, rotate with dashes and stay out of the center scrum.
Забери безопасные ящики, закрепи турель у прохода; в центр без разведки не входи. = Take safe boxes, place a turret at a chokepoint and scout before entering mid.
Обходи центральную драку по краю, выбирай одиночную цель и вовремя отходи. = Circle around the central fight, pick isolated targets and disengage early.
Собирай свободные ящики по внешнему кругу; ускоряйся для выхода из засады. = Collect unclaimed boxes around the perimeter; save your speed for ambush escapes.
Держись рядом с укрытиями, встречай выходящих из кустов; не бери бой против двоих. = Stay close to cover, punish bush pushes and avoid 1v2 fights.
Простреливай подходы к кустам, не сдавай безопасный угол ради рискованного ящика. = Cover bush approaches, do not give up a safe angle for a risky box.
Выиграй дальнюю линию и прикрой выход к воротам; с мячом не беги под фокус. = Win your long lane and cover the goal approach; do not carry the ball into crossfire.
Пробивай проход после размена союзников и закрывай врагу путь к мячу. = Open a path after your allies trade and block the enemy's route to the ball.
Закрой ключевой проход, освободи партнёру путь к воротам; не преследуй за линией. = Block the key lane, open a path to goal for your teammate and do not overchase.
Заходи сбоку на защитника, когда тот отвлечён мячом; не врывайся один. = Flank a defender while they watch the ball; never dive alone.
Поддерживай игрока с мячом, прикрывай отход и помогай после первого голевого размена. = Support the ball carrier, cover retreats and follow up the first goal trade.
Держи дальний фланг и перекрывай вход в центр; не забирай кристаллы под фокусом. = Hold the far flank and block mid access; never pick up gems under focused fire.
Держи центр и подходы к шахте; при отсчёте прикрывай отступление. = Hold mid and mine approaches; cover your team's retreat during countdown.
Сбивай фланговых врагов и отходи; не рискуй кристаллами перед отсчётом. = Push back flanking enemies and retreat; do not risk gems before countdown.
Прикрывай носителя кристаллов и его отход, а не гоняйся за одиночной целью. = Protect the gem carrier's escape instead of chasing isolated targets.
Сначала выиграй линию, затем наноси урон сейфу с безопасного угла. = Win your lane first, then damage the safe from a protected angle.
Открой проход и атакуй сейф после оттеснения защитников; следи за своим сейфом. = Open a lane and hit the safe after pushing defenders back; watch your own safe.
Останавливай заход врага на сейф, затем помогай союзникам давить его защиту. = Stop enemy pushes at your safe, then help allies break their defense.
Войди в зону под поддержкой, удерживай укрытие и не стой под огнём втроём. = Enter the zone with support, hold cover and avoid stacking all three under fire.
Зачищай входы в зону и возвращайся к ней после каждого размена. = Clear zone entrances and return after every trade.
Простреливай входы с края зоны; не стой в ней, если тебя легко выбить. = Control entrances from the zone's edge; avoid standing in it when easily displaced.
Займи дальнюю позицию, дождись ошибки врага; после первого выбивания играй от преимущества. = Take a distant position and punish mistakes; play the advantage after the first elimination.
Ищи изолированного соперника, не инициируй бой 1 против 3. = Look for an isolated enemy; never start a 1v3.
Сохраняй жизнь и позицию союзников, не отдавай первый нокаут в раунде. = Stay alive and protect ally positions; do not concede the first knockout.
Держись в дистанции помощи напарнику и берегись раздельных боёв. = Stay within support range of your teammate and avoid split fights.
Входи на цель только вместе с напарником; один против пары не разменивайся. = Engage the target together with your teammate; avoid 1v2 trades.
Перекрой проход и помоги напарнику выйти из зажатой позиции. = Block the chokepoint and help your teammate escape a pinch.
Стреляй из-за стен на подходах; не пускай врага в упор. = Fire from behind walls to control approaches; keep enemies out of melee range.
Держи дальний край зоны, проверяй кусты и отступай до сближения. = Hold the far edge of the zone, check bushes and retreat before enemies close.
Собирай безопасные ящики за укрытиями; вступай в бой только на своей дистанции. = Collect safe boxes behind cover; fight only within your effective range.
Обходи массовые драки, находи одиночные цели и уходи после атаки. = Avoid large fights, find isolated targets and retreat after attacking.
Проверяй кусты и перекрывай проходы; отступай, когда тебя обходят с двух сторон. = Check bushes and cover chokepoints; fall back if flanked from two sides.
Используй стены для безопасного урона; избегай открытого места и ближнего боя. = Use walls to deal safe damage; avoid open space and close-range fights.
Не начинай бой первым; удерживай безопасную позицию и добивай ослабленных. = Do not engage first; hold a safe spot and finish weakened enemies.
Наноси урон с удобного угла, не гонись за врагом в незнакомые кусты. = Deal damage from a good angle; never chase an enemy into unfamiliar bushes.
ТОЧКА ЗАХВАТА = CAPTURE POINT
НАДЕЖНЫЕ ПИКИ = RELIABLE PICKS
ОПАСНОСТЬ = DANGER
Игра на трофеи = Trophy matches
Игра на кубки = Trophy matches
ЗАХВАТ = CAPTURE
СОСТАВ НА 5 ИГРОКОВ = 5-PLAYER TEAM COMP
Клубный = Club
СОЮЗНИК = ALLY
СОПЕРНИК = OPPONENT
Отсчёт = Countdown
Управление = Controls
Предыдущая = Previous
Следующая = Next
Подробности = Details
ВЕРНУТЬСЯ = GO BACK
Токио = Tokyo
Япония = Japan
токио = Tokyo
`; // Locale dictionary is intentionally editorially reviewed; add further copy here.

  const pairs = RULES.split('\n').map(x => x.trim()).filter(x => x && x.includes(' = '))
    .map(x => { const at = x.indexOf(' = '); return [x.slice(0, at), x.slice(at + 3)]; });
  const dictionary = new Map(pairs);
  const patterns = [...dictionary.entries()]
    .sort((a,b) => b[0].length - a[0].length)
    .map(([ru,en]) => [new RegExp('(?<![А-Яа-яЁё])'+ru.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![А-Яа-яЁё])', 'g'), en]);
  // Map titles from bilingual Brawlify map listings (November 2026).
  // Display-only: never modify IDs, input values, source API objects or search queries.
  const MAP_PAIRS = String.raw`
Healthy Middle Ground|Разумный компромисс
New Perspective|Свежий взгляд
Beach Ball|Пляжный волейбол
Backyard Bowl|Дворовый чемпионат
Makeshift Scaffolding|Строительные леса
Flying Fantasies|Полёт фантазии
Dueling Beetles|Муравьиные бега
Open Business|Открыто!
Below Zero|Ниже нуля
Bouncy Bowl|Бесконечный отскок
Journey of a Thousand Steps|Путь в тысячу шагов
Crescendo|Крещендо
Spiraling Out|Спираль наружу
Sneaky Fields|Зловредные поля
Triple Dribble|Трипл-дриблинг
Deadlock|Тупик
Super Beach|Суперпляж
Sunny Soccer|Солнечный футбол
Match 1123581321|Матч 1123581321
Grass Knot|Травяной узел
Nutmeg|Гол между ногами
Bustling Business|Бурный бизнес
Pinhole Punt|Игольное ушко
Acid Lakes|Тысяча озёр
Molten to the Core|Оплавленная сердцевина
Rice Field|Рисовое поле
Skull Creek|Озеро мертвецов
Rockwall Brawl|Потасовка в Рокуолле
Doom Shroom|Роковой гриб
Crossing the Coast|Через побережье
Lilypond Grove|Лесные лилии
Feast or Famine|Всё или ничего
Truth|Истина
Starfruit Supernova|Сверхновая-карамбола
Local Restaurants|Местные забегаловки
On a Roll|В ударе
Whisper Vale|Долина шёпота
Undermine|Подрыв
Let Me Dance|Танцы до упаду
Open Space|Открытая местность
Picturesque|Живописный вид
Bottom Two|Двойное дно
Ancestral Roots|Родовые корни
Hard Rock Mine|Роковая шахта
Gem Fort|Кристальный форт
Snake Pit|Яма со змеями
Goldarm Gulch|Ущелье Золотой руки
Konnakol|Коннакол
Double Decker|Двухэтажка
Please Remain Standing|Оставайтесь на местах
Streets with No Name|Безымянные улицы
Chivalry|Рыцарство
Crab Claws|Клешни краба
Leaping Dogs|Скачки от проблем
Out in the Open|В чистом поле
Opening Move|Первый ход
Jungle Top|Стычка в джунглях
Arabesque|Арабеска
Slippery Showdown|Скользкая схватка
Super Center|Гипермаркет
Cabin Fever|Изоляция
Raging Ocean|Бушующий океан
Nullscapes|Пустые ландшафты
Arena of Glory|Арена славы
The Smackdome|Купол боли
Knockout Grounds|Спорная территория
Silver Highlands|Серебряное плато
Crimson Divide|Багровый разлом
Kaiju Lake|Озеро Кайдзю
Mirage Arena|Арена миражей
Hot Tubs|Ванны
Golden Bay|Золотая бухта
Photic Doom|Фотический ужас
Parallel Plays|Параллельная игра
Eating Good!|Здоровое питание
Under Pressure|Высокое давление
Quintillion|Квинтиллион
Reach for the Stars|К звёздам
Hot Potato|Горячая кукуруза
In the Liminal|На грани
Jedna|Номер один
Abracadabra|Абракадабра
Shrouding Serpent|Змеиные кольца
Supercut|Суперкат
The Great Mighty Lou|Всемогущий Лу
Tasty Berry|Вкусная ягодка
No Surrender|Никогда не сдавайся
Shooting Star|Падающая звезда
Search and Destroy|Найти и уничтожить
Choral Chambers|Хоральный храм
Paralysis Pen|Творческий паралич
Layer Cake|Кремовый торт
Warrior's Way|Путь воина
Watermelons|Арбузы
Palette Hangout|Палитра
Ball Hog|Жадина
Solitary Deep Sea Fish|Рыба-одиночка из глубин
Turnover|Потеря мяча
Attrition|Истощение
Pocket Pass|Короткий пас
WALKING ON HOT SAND|РАСКАЛЁННЫЙ ПЕСОК
Triple-Double|Трипл-дабл
Frosty tracks|Тающий след
Stockpile Stadium|Стадион боеприпасов
Icy ice park|Ледяной парк
Siberian Stand Off|Сибирский тупик
Slippery road|Скользкая дорога
Insane Streamer|Безумный стример
Rastermind|Растровый разум
Deathcap Trap|Поганковая западня
Double Swoosh|Вжух-вжух
Crystal Arcade|Кристальная аркада
Rustic Arcade|Сельский клуб
Kaboom Canyon|Пороховой каньон
Safe Zone|Надёжное укрытие
Bridge Too Far|Взятие моста
Pit Stop|Пит-стоп
GG 2.0|Хорошая игра 2.0
Plain Text|Простой текст
Subway Turfers|Битва в подземке
Dry Season|Засуха
Hideout|Укрытие
No Excuses|Без отговорок
Don't turn around|Не смотри назад
Side by Side|Бок о бок
Brace for Impact|Подготовка к удару
Pinball Dreams|Пинбол
Center Stage|В центре внимания
Priceless Cactus|Бесценный кактус
Rooftop Runners|Забег по крышам
Sidetrack|Отвлекающий манёвр
Ring of Fire|Огненное кольцо
Open Zone|Открытая зона
Fishing Bed|Место для рыбалки
Just Another Race To Anywhere|Гонка в никуда
Back Shuffle|Обратная перетасовка
Zone Splitting|Разделение зон
Think Ahead|Думай наперёд
New Horizons|Новые горизонты
Deep End|Омут
Flowing Springs|Бурные ключи
Gated Community|Закрытое сообщество
Final Four|Последняя четвёрка
Double Trouble|Двойная проблема
Cavern Churn|Штольня
Ring 'o Brawlin|Подводный ринг
Divine Descent|Небесное воинство
Hellish Harvest|Мрачная жатва
Final Frontier|Последний рубеж
Infernal Invasion|Инфернальное нашествие
Celestial Crusade|Праведный поход
Abyssal Assault|Вторжение тьмы
Radiant Rampage|Сияющая кавалькада
Underworld Uprising|Потусторонний мятеж
Wild Greens|Зелёные оттенки
Reverse Crossing|В другом направлении
Skipyard|Отдых не по своей воле
Insert Victory|Счастливая карта
Invaded Space|Нарушение границ
1-2-3 Play|3, 2, 1, старт!
Prize Pushing|Драка за приз
Crazy for Credits|Кредитомания
Hidden in Plain Sight|На виду
Middle Management|Ловкость рук
Treasure Marks the Spot|Карта сокровищ
Ancient Treasure|Древнее сокровище
Excellent Excavations|Место раскопок
Can You Dig It|Закопанный клад
Brawl Starrgate|Звёздные врата
Train Erasure|Исчезнувший поезд
Lotus|Лотос
Safety Center|Убежище
Twentyfive to Two|Двадцать пять на два
Time Flies|Время летит
Catacombs|Катакомбы
Deathmatch|Смертельный бой
Pound of Mass|Масса
Wonderland|Страна чудес
Too Gimmicky 2|Перенасыщение — 2
Hello Always Ends With a Goodbye|Нет привета без прощания
Keeper's Corner|Угол вратаря
Backnet Bonanza|Старая сетка
Goalmouth Scramble|Суета у ворот
Fox in the Box|Обходной манёвр
Penalty Park|Парк пенальти
Kickoff Coliseum|Кубок колизея
Midfield Madness|Центровая лихорадка
Impossible Arena|Невозможная арена
Tiger Leap|Прыжок тигра
Block Party|Уличная вечеринка
Power Alley|Дорога силы
Strong Side|Сильная сторона
Pancake|Блинчик
Jungle Ball|Бал в джунглях
Floater|На плаву
Moonbark Meadow|Лунная полянка
Rebound Ring|Отскоки в кольце
Hug or Hurl|Хватай и швыряй
Side Hustle|Суета по краям
Squish Court|В лепёшку!
Wispwillow Ward|Лес загадочных огней
Dodge or Die|Тест на ловкость
Toot Town|Кукуево
Metro Mayhem|Хаос в метро
Backtrack Attack|Обратная атака
Loopy Line|Безумный маршрут
Trainbow Road|Радужный экспресс
Choo Choo Showdown|Разборки на рельсах
T-Rail Rush|Гонки на путях
Jumpscare Lair|Пещера страшных сюрпризов
Flaring Phoenix|Пылающий феникс
Monkey Maze|Обезьяний лабиринт
Coin Flip|Подбрось монету
Paperback Pond|Картонный пруд
Foursquare Fortress|Прямоугольная крепость
Broiler Room|Бройлерная
Hoop Boot Hill|Холм испытаний
Kooky Gates|Чудные ворота
Afterpiece Arena|Театр комедии
Slippery Slap|Скользкий склон
Cool Box|Сумка-холодильник
Starr Garden|Сад Старр
H is for Holiday|«П» значит «праздник»
Hyperspace|Гиперпространство
Tip Toe|На цыпочках
Unhappy Arena|Грустная арена
Survival of the Meanest|Выживает вреднейший
Brawlerverse|Боевая вселенная
The Emptiness Machine|Машина пустоты
Serpentshrine Island|Храм Змея
Hot Maze|Знойный лабиринт
Case of the Mondays|Тяжёлый понедельник
Jump to Conclusions|Поспешные выводы
Thin Walls|Тонкие стены
Paper Jam|Проблемы с бумагой
Million Dollars|Миллион долларов
`.trim().split('\n').map(line => line.split('|'));
  const normalizeMapKey = s => String(s||'').normalize('NFKC').replace(/[’‘]/g,"'").trim().toLowerCase();
  const mapLookup = new Map();
  for (const [en,ru] of MAP_PAIRS) {
    mapLookup.set(normalizeMapKey(en),{en,ru});
    mapLookup.set(normalizeMapKey(ru),{en,ru});
  }
  const escapeMapPattern = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\  const originals = new WeakMap();');
  const mapAlternates = [...new Set(MAP_PAIRS.flat())].sort((a,b)=>b.length-a.length).map(escapeMapPattern);
  const mapPattern = new RegExp('(?<![\\p{L}\\p{N}])(?:'+mapAlternates.join('|')+')(?![\\p{L}\\p{N}])','giu');
  function mapText(src,language){
    if (!src || !/[\\p{L}]/u.test(src)) return src;
    return src.replace(mapPattern,name=>{
      const found=mapLookup.get(normalizeMapKey(name));
      return found ? found[language] : name;
    });
  }
  const originals = new WeakMap();
  const attrOriginals = new WeakMap();
  let locale = 'ru';
  let scheduled = false;
  let processing = false;

  function translate(src) {
    if (!src || !/[А-Яа-яЁё]/.test(src)) return src;
    const key = src.trim();
    const direct = dictionary.get(key);
    if (direct) return src.replace(key, direct);
    let out = src;
    for (const [pattern,en] of patterns) out = out.replace(pattern,en);
    return out;
  }
  function skipNode(node) {
    const p = node.parentElement;
    if (!p) return true;
    return Boolean(p.closest('script,style,textarea,code,pre,[translate="no"],[data-no-translate],.chat-msg.user,.es26-article h3,.es26-article p,.es26-article-bottom'));
  }
  function setText(node) {
    if (skipNode(node)) return;
    const current = node.nodeValue;
    let entry = originals.get(node);
    const raw = entry && current === entry.last ? entry.original : current;
    const target = locale === 'en' ? translate(mapText(raw,'en')) : mapText(raw,'ru');
    if (target !== current) node.nodeValue = target;
    originals.set(node,{original:raw,last:target});
  }
  function setAttrs(el) {
    if (el.matches('script,style,[data-no-translate]') || el.closest('.chat-msg.user,.es26-article')) return;
    let attrs = attrOriginals.get(el);
    if (!attrs) attrs = {};
    for (const name of ['placeholder','title','aria-label','alt','data-chatprompt']) {
      if (!el.hasAttribute(name)) continue;
      const current = el.getAttribute(name);
      const prev = attrs[name];
      const original = prev && current === prev.last ? prev.original : current;
      const target = locale === 'en' ? translate(mapText(original,'en')) : mapText(original,'ru');
      if (current !== target) el.setAttribute(name,target);
      attrs[name]={original,last:target};
    }
    attrOriginals.set(el,attrs);
  }
  function walk(root) {
    if (!root) return;
    const start = root.nodeType===1 ? root : document.body;
    if (!start) return;
    const walker = document.createTreeWalker(start, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    if (start.nodeType===1) setAttrs(start);
    let n;
    while ((n=walker.nextNode())) {
      if (n.nodeType===3) setText(n);
      else if (n.nodeType===1) setAttrs(n);
    }
  }
  function updateControls() {
    document.documentElement.lang = locale;
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === locale;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed', String(active));
    });
    const en = locale === 'en';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = en
      ? 'BRAWL // NEXUS: Brawl Stars player stats, live rotations, drafts and esports in one place.'
      : 'BRAWL//NEXUS — фан-платформа с ротацией карт Brawl Stars, тактическими советами, профилями и Live Draft.';
  }
  function schedule() {
    if (scheduled || processing) return;
    scheduled=true;
    Promise.resolve().then(()=>{
      scheduled=false;
      if (!document.body || processing) return;
      processing=true;
      try { walk(document.body); updateControls(); } finally { processing=false; }
    });
  }
  function setLanguage(lang) {
    if (lang!=='ru' && lang!=='en') return;
    locale=lang;
    try { localStorage.setItem(STORAGE_KEY,lang); } catch (_) {}
    schedule();
    document.dispatchEvent(new CustomEvent('nexus:languagechange',{detail:{lang}}));
  }
  function init() {
    try { locale = localStorage.getItem(STORAGE_KEY)==='en' ? 'en' : 'ru'; } catch (_) {}
    document.documentElement.lang=locale;
    document.addEventListener('click',event => {
      const button = event.target.closest('[data-language]');
      if (button) { event.preventDefault(); setLanguage(button.dataset.language); }
    });
    const observer=new MutationObserver(()=>{if (!processing) schedule();});
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    schedule();
  }
  window.NexusLocale={set:setLanguage,get:()=>locale,translate,mapName:(name,lang=locale)=>mapText(name,lang)};
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();