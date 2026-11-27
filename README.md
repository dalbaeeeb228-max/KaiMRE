# KaiMRE

KaiMRE runs MRE/VXP games in the browser of KaiOS 2.5 phones.
KaiMRE запускает игры MRE/VXP в браузере телефонов на KaiOS 2.5.

License: Apache License 2.0 (see [LICENSE](LICENSE)).
Лицензия: Apache License 2.0 (см. [LICENSE](LICENSE)).

---

## English

### What it is

KaiMRE is a small runtime that plays MRE/VXP games (the Mobile Runtime Environment format used by old feature phones) on KaiOS 2.5 devices. It is a web app: an ARM/VXP interpreter runs in a Web Worker, and the page draws the screen and handles keys and sound.

All source code is open and readable. Nothing is minified or obfuscated.

### Files

| File | Purpose |
|---|---|
| `index.html` | The page: screen, scaling, loading the game, MIDI and sound, keys |
| `engine.js` | The engine (VXP/ARM interpreter), runs in a Web Worker |
| `manifest.webapp` | KaiOS app manifest (no special permissions) |
| `icons/` | App icons |
| `LICENSE` | Apache License 2.0 |

### Running a game

You need a game file in the `.vxp` format. KaiMRE can load it in two ways:

1. **From the app package.** Put the game in a file named `game.vxp` next to `index.html`, then pack the app.
2. **From a link.** Open the app with the game address in the `vxp` parameter:
   `index.html?vxp=https://example.com/game.vxp`
   The server that hosts the game must allow cross-origin downloads (send the header `Access-Control-Allow-Origin`). Without it the game does not load.

Press the **Back** key to close the game.

### Sound

- **MIDI** plays once by default. Add `&loop=1` to the link to loop it.
- **WAV, MP3, OGG** play as sampled audio when the device supports the format.
- MIDI is a synthesized approximation (waveforms and envelopes per instrument, drums made from noise). It is not the General MIDI sound set.

### Limitations

- No 3D.
- No file picker and no SD card scanner. The game comes from the app package or from a link.
- Checked for KaiOS 2.5 syntax and in desktop Chromium. Please test on a real device.
- Some games may stop with an error. The error text is shown at the bottom of the screen.

### Installing on KaiOS

Zip the files with `index.html` at the root of the archive, then install the archive with a KaiOS app installer.

### Contributing

Issues and pull requests are welcome. Keep the code readable: no minification and no obfuscation, and ES2015 syntax at most in `engine.js` (KaiOS 2.5 uses Gecko 48).

---

## Русский

### Что это

KaiMRE — небольшой движок, который запускает игры MRE/VXP (формат Mobile Runtime Environment, которым пользовались старые кнопочные телефоны) на устройствах KaiOS 2.5. Это веб-приложение: интерпретатор VXP/ARM работает в Web Worker, а страница рисует экран и обрабатывает клавиши и звук.

Весь исходный код открыт и читаем. Ничего не минифицировано и не обфусцировано.

### Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Страница: экран, масштабирование, загрузка игры, MIDI и звук, клавиши |
| `engine.js` | Движок (интерпретатор VXP/ARM), работает в Web Worker |
| `manifest.webapp` | Манифест приложения KaiOS (без специальных прав) |
| `icons/` | Иконки приложения |
| `LICENSE` | Лицензия Apache License 2.0 |

### Запуск игры

Нужен файл игры в формате `.vxp`. KaiMRE может загрузить его двумя способами:

1. **Из пакета приложения.** Положите игру в файл `game.vxp` рядом с `index.html`, затем упакуйте приложение.
2. **По ссылке.** Откройте приложение с адресом игры в параметре `vxp`:
   `index.html?vxp=https://example.com/game.vxp`
   Сервер, на котором лежит игра, должен разрешать загрузку с другого домена (отправлять заголовок `Access-Control-Allow-Origin`). Без этого игра не загрузится.

Чтобы закрыть игру, нажмите клавишу **Назад (Back)**.

### Звук

- **MIDI** по умолчанию играет один раз. Добавьте `&loop=1` к ссылке, чтобы зациклить.
- **WAV, MP3, OGG** воспроизводятся как обычный звук, если устройство поддерживает формат.
- MIDI синтезируется приближённо (формы волн и огибающие для каждого инструмента, ударные из шума). Это не набор General MIDI.

### Ограничения

- Нет 3D.
- Нет выбора файлов на телефоне и сканера SD-карты. Игра берётся из пакета приложения или по ссылке.
- Проверено на синтаксис KaiOS 2.5 и в настольном Chromium. Пожалуйста, проверьте на настоящем устройстве.
- Некоторые игры могут остановиться с ошибкой. Текст ошибки показывается внизу экрана.

### Установка на KaiOS

Заархивируйте файлы так, чтобы `index.html` лежал в корне архива, и установите архив через установщик приложений KaiOS.

### Участие в проекте

Сообщения об ошибках и pull request'ы приветствуются. Держите код читаемым: без минификации и обфускации, а в `engine.js` не выходите за синтаксис ES2015 (KaiOS 2.5 использует Gecko 48).
