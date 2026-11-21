# Как обновить существующий BRAWL//NEXUS на Netlify до v1.6

Твой опубликованный сайт и ключи Netlify остаются прежними.

Самый простой способ — открыть репозиторий GitHub и заменить 3 файла в корне: `index.html`, `styles.css`, `app.js` из архива UPDATE. Можно загрузить содержимое архива через Add file → Upload files, подтвердив замену существующих файлов, либо использовать редактор GitHub для каждого файла. После Commit changes в ветке main Netlify должен выполнить автоматический deploy.

Важно: не загружай `.env`, не вставляй токен Supercell в GitHub. Полный архив нужен только если желаешь переустановить проект целиком.

Настройки Netlify: Build command `node build.js`, Publish directory `dist`, Functions directory `netlify/functions`.

Если страница старая: дождись статуса Published, открой сайт в режиме инкогнито или сделай Ctrl+F5.
