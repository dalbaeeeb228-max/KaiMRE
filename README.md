# KaiMRE / КаиМРЕ

[Русский](#русский) · [English](#english)

---

## Русский

KaiMRE запускает игры MRE/VXP (файлы `.vxp`) на KaiOS 2.5 (Gecko 48). Движок работает в Web Worker, а экран, звук и клавиатура обрабатываются в основной странице.

### Состав пакета

- `index.html` — страница приложения: меню, экран, звук, клавиатура.
- `engine.js` — движок MRE/VXP, запускается в Web Worker.
- `manifest.webapp` — манифест приложения KaiOS.
- `icons/` — иконки приложения (32, 64 и 128 пикселей).
- `game.vxp` — необязательно: игра, встроенная в пакет.

### Запуск игры

При открытии приложения появляется меню:

1. **Game from package (game.vxp)** — запускает `game.vxp` из корня приложения. Если файла нет, появляется сообщение.
2. **Open .vxp from phone** — открывает системный выбор файлов. Принимаются только файлы с расширением `.vxp`, остальные отклоняются.
3. **Game from link ?vxp=...** — появляется, если адрес открыт с параметром `?vxp=`. Сервер с игрой должен разрешать CORS.
4. **Exit** — подсказка, как закрыть приложение штатными средствами KaiOS.

Навигация: стрелки вверх и вниз — выбор пункта, OK — запуск. Когда игра закрыта, меню открывается снова.

### Параметры адреса

- `?vxp=<адрес .vxp>` — загрузить игру по ссылке. Адрес нужно закодировать, например `?vxp=https%3A%2F%2Fexample.com%2Fgame.vxp`.
- `?loop=1` — разрешить зацикливание музыки и звуков, если игра их запрашивает. По умолчанию звук играет один раз.
- `?charset=gbk` — декодировать текст как GBK (китайские игры). По умолчанию используется UTF-8, а если текст не в UTF-8, то Windows-1251 (русский).

### Звук

- MIDI воспроизводится встроенным синтезатором. Это приближение, а не настоящие инструменты General MIDI.
- WAV, MP3, OGG и FLAC воспроизводятся через `<audio>`, если телефон поддерживает формат.
- Звук может не начаться, пока не нажата любая клавиша: так работает политика браузера.

### Шрифт

- Встроенный шрифт 5×7 содержит латиницу, цифры, знаки и заглавные буквы русского алфавита. Строчные русские буквы выводятся как заглавные.
- Символы, которых нет в шрифте (например, иероглифы), выводятся квадратами.

### Ограничения

- 3D-графики нет: движок поддерживает только двумерный вывод.
- Папки телефона не отображаются. Доступ к SD-карте через DeviceStorage требует привилегированного приложения, поэтому выбор файла идёт через системный диалог.
- Скорость игр зависит от процессора телефона. Если эмуляция не успевает, игра замедляется, а счётчик FPS в игре показывает меньше 60.

### Установка на KaiOS

1. Соберите пакет из файлов репозитория: `index.html`, `engine.js`, `manifest.webapp` и папку `icons/`. Либо используйте готовый архив.
2. Установите приложение через KaiOS Sideload или разместите файлы на HTTPS-хостинге.
3. При необходимости положите `game.vxp` в корень пакета.

### Проверка

Движок и страница проверены линтером и запуском в Node и headless Chromium. Работа на реальном KaiOS не проверена. Если что-то не работает, сообщите текст ошибки из строки статуса.

---

## English

KaiMRE runs MRE/VXP games (`.vxp` files) on KaiOS 2.5 (Gecko 48). The engine runs in a Web Worker, while the screen, sound and keypad are handled by the main page.

### Package contents

- `index.html` — the app page: menu, screen, sound, keypad.
- `engine.js` — the MRE/VXP engine, started in a Web Worker.
- `manifest.webapp` — the KaiOS app manifest.
- `icons/` — app icons (32, 64 and 128 pixels).
- `game.vxp` — optional: a game bundled in the package.

### Starting a game

When the app opens, a menu appears:

1. **Game from package (game.vxp)** — starts `game.vxp` from the app root. If the file is missing, a message is shown.
2. **Open .vxp from phone** — opens the system file picker. Only files with the `.vxp` extension are accepted; all others are rejected.
3. **Game from link ?vxp=...** — shown when the page is opened with a `?vxp=` parameter. The game server must allow CORS.
4. **Exit** — a hint on how to close the app with the standard KaiOS controls.

Navigation: Up and Down arrows select an item, OK starts it. When a game exits, the menu opens again.

### URL parameters

- `?vxp=<.vxp URL>` — load a game from a link. Encode the address, for example `?vxp=https%3A%2F%2Fexample.com%2Fgame.vxp`.
- `?loop=1` — allow looping of music and sounds when the game asks for it. By default, sounds play once.
- `?charset=gbk` — decode text as GBK (Chinese games). By default, text is decoded as UTF-8, and as Windows-1251 (Russian) when it is not valid UTF-8.

### Sound

- MIDI is played by a built-in synthesizer. It is an approximation, not real General MIDI instruments.
- WAV, MP3, OGG and FLAC are played through `<audio>` when the phone supports the format.
- Sound may not start until a key is pressed; this is the browser's autoplay policy.

### Font

- The built-in 5×7 font contains Latin letters, digits, symbols and the capital letters of the Russian alphabet. Lowercase Russian letters are shown as capitals.
- Characters missing from the font (for example, Chinese characters) are shown as boxes.

### Limitations

- There is no 3D rendering: the engine supports 2D output only.
- Phone folders are not shown. Access to the SD card through DeviceStorage requires a privileged app, so file selection uses the system dialog.
- Game speed depends on the phone's CPU. If emulation falls behind, the game slows down and the in-game FPS counter shows less than 60.

### Installing on KaiOS

1. Build the package from the repository files: `index.html`, `engine.js`, `manifest.webapp` and the `icons/` folder. Or use a ready-made archive.
2. Install through KaiOS Sideload, or host the files on HTTPS.
3. If needed, put `game.vxp` in the app root.

### Testing

The engine and the page are checked with a linter and by running them in Node and headless Chromium. Operation on a real KaiOS device has not been verified. If something does not work, report the error text from the status line.
