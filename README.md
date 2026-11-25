# KaiMRE / КаиМРЕ

[Русский](#русский) · [English](#english)

---

## Русский

KaiMRE запускает игры MRE/VXP (`.vxp`) на KaiOS 2.5. Движок работает в Web Worker, экран, звук и клавиатура обрабатываются на странице.

### Состав

- `index.html` — страница приложения.
- `engine.js` — движок MRE/VXP.
- `manifest.webapp` — манифест KaiOS.
- `icons/` — иконки.
- `game.vxp` — необязательно: игра, встроенная в пакет.

### Запуск игры

1. **Игра внутри приложения.** Положите `game.vxp` рядом с `index.html` и упакуйте приложение. Работает без сети.
2. **Игра по ссылке.** Откройте приложение с параметром `?vxp=` и адресом игры, например:
   `https://kaimre.iblogger.org/?vxp=https%3A%2F%2Fcfcgh.com%2Fspiderman.vxp`
   Сервер с игрой должен разрешать CORS (заголовок `Access-Control-Allow-Origin`). Иначе появится ошибка загрузки. В этом случае положите файл в приложение как `game.vxp`.

### Звук

- MIDI по умолчанию воспроизводится один раз. Добавьте `&loop=1` к ссылке, чтобы зациклить.
- WAV, MP3 и OGG воспроизводятся через `<audio>`, если телефон поддерживает формат.
- MIDI играет встроенный синтезатор. Это приближение, а не настоящие инструменты General MIDI.

### Ограничения

- 3D-графики нет.
- Выбора файлов с телефона и сканирования карты в этой версии нет.

### Установка

1. Соберите пакет из `index.html`, `engine.js`, `manifest.webapp`, `icons/` и, при необходимости, `game.vxp`.
2. Установите через KaiOS Sideload или разместите на HTTPS-хостинге.

---

## English

KaiMRE runs MRE/VXP games (`.vxp`) on KaiOS 2.5. The engine runs in a Web Worker; the screen, sound and keypad are handled by the page.

### Contents

- `index.html` — the app page.
- `engine.js` — the MRE/VXP engine.
- `manifest.webapp` — the KaiOS manifest.
- `icons/` — app icons.
- `game.vxp` — optional: a game bundled in the package.

### Starting a game

1. **Game inside the app.** Put `game.vxp` next to `index.html` and package the app. Works offline.
2. **Game from a link.** Open the app with the `?vxp=` parameter and the game address, for example:
   `https://kaimre.iblogger.org/?vxp=https%3A%2F%2Fcfcgh.com%2Fspiderman.vxp`
   The game server must allow CORS (the `Access-Control-Allow-Origin` header). Otherwise a loading error is shown. In that case, put the file into the app as `game.vxp`.

### Sound

- MIDI plays once by default. Add `&loop=1` to the link to loop it.
- WAV, MP3 and OGG are played through `<audio>` when the phone supports the format.
- MIDI is played by a built-in synthesizer. It is an approximation, not real General MIDI instruments.

### Limitations

- There is no 3D rendering.
- This version has no phone file picker and no SD card scanner.

### Installing

1. Package `index.html`, `engine.js`, `manifest.webapp`, `icons/` and, if needed, `game.vxp`.
2. Install through KaiOS Sideload, or host the files on HTTPS.
