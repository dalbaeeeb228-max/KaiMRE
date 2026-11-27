# KaiMRE

**KaiMRE** is an emulator that runs MRE/VXP games on KaiOS 2.5 phones.
**KaiMRE** — эмулятор, который запускает игры MRE/VXP на телефонах KaiOS 2.5.

MRE (Mobile Runtime Environment) was the platform behind many games on old feature phones. KaiMRE brings those games to KaiOS, which runs in the Firefox engine (Gecko 48), using only the browser.

MRE (Mobile Runtime Environment) — платформа, для которой выходило много игр на старых кнопочных телефонах. KaiMRE переносит эти игры на KaiOS, которая работает на движке Firefox (Gecko 48), и использует только браузер телефона.

License: Apache License 2.0. See [LICENSE](LICENSE).
Лицензия: Apache License 2.0. См. [LICENSE](LICENSE).

---

## English

### Features

- Runs `.vxp` (MRE) games on KaiOS 2.5 devices.
- Scales the game screen to fit the phone display, keeping the proportions.
- Shows Cyrillic text correctly (UTF-8 and Windows-1251 text in games).
- Plays MIDI music with a built-in synthesizer.
- Plays WAV, MP3 and OGG sounds when the device supports the format.
- Supports the phone keypad: arrows, OK, soft keys, number keys, `*` and `#`.

### How to start a game

You need a game file in the `.vxp` format. KaiMRE can load it in two ways.

**1. Game inside the app package.**
Put the game in a file named `game.vxp` next to `index.html` and pack the app. The game starts when you open the app.

**2. Game from a link.**
Open the app with the address of the game in the `vxp` parameter:

```
index.html?vxp=https://example.com/game.vxp
```

The server that hosts the game must allow downloads from other sites. It must send the header `Access-Control-Allow-Origin`. If it does not, the game cannot be downloaded.

### Controls

| Phone key | Action in the game |
|---|---|
| Arrow keys | Directions |
| OK / Enter | OK / select |
| Soft left (F1, Call) | Left soft key |
| Soft right (F2, Backspace) | Right soft key |
| 0 to 9, `*`, `#` | Number keys, `*` and `#` |
| End call / Back (EndCall, Escape) | Close the game |

### Sound

- **MIDI** plays once by default. Add `&loop=1` to the link to loop it, for example `index.html?vxp=...&loop=1`.
- **WAV, MP3, OGG** play as ordinary sound files when the device supports the format.
- MIDI is played by a synthesizer built into KaiMRE. It approximates the instruments: each instrument has its own waveform and envelope, and drums are made from noise. It is not the General MIDI sound set.
- Sound can start only after the first key press, as browsers require.

### Installing on KaiOS

1. Zip the files so that `index.html` is at the root of the archive.
2. Install the archive with a KaiOS app installer.
3. Open KaiMRE from the app list.

### How it works

- `index.html` is the page. It draws the screen, scales it, loads the game, plays sound and reads the keys.
- `engine.js` is the engine. It runs in a Web Worker, reads the game file and runs its code step by step. It sends each new screen image to the page.
- `manifest.webapp` is the KaiOS app description. It asks for no special permissions.
- `icons/` holds the app icons.

### Files

| File | Purpose |
|---|---|
| `index.html` | The page: screen, scaling, game loading, sound, keys |
| `engine.js` | The MRE/VXP engine, runs in a Web Worker |
| `manifest.webapp` | KaiOS app manifest |
| `icons/` | App icons |
| `README.md` | This file |
| `LICENSE` | Apache License 2.0 |

### Contributing

Bug reports and pull requests are welcome. When you report a bug, please include the game name and the exact text of the error that appears at the bottom of the screen.

---

## Русский

### Возможности

- Запускает игры `.vxp` (MRE) на устройствах KaiOS 2.5.
- Растягивает экран игры на весь дисплей телефона с сохранением пропорций.
- Правильно показывает русский текст (UTF-8 и Windows-1251 в играх).
- Проигрывает MIDI-музыку встроенным синтезатором.
- Проигрывает WAV, MP3 и OGG, если устройство поддерживает формат.
- Работает с клавишами телефона: стрелки, OK, софт-клавиши, цифры, `*` и `#`.

### Как запустить игру

Нужен файл игры в формате `.vxp`. KaiMRE может загрузить его двумя способами.

**1. Игра внутри пакета приложения.**
Положите игру в файл `game.vxp` рядом с `index.html` и упакуйте приложение. Игра запустится сразу при открытии приложения.

**2. Игра по ссылке.**
Откройте приложение с адресом игры в параметре `vxp`:

```
index.html?vxp=https://example.com/game.vxp
```

Сервер, на котором лежит игра, должен разрешать загрузку с других сайтов: он должен отправлять заголовок `Access-Control-Allow-Origin`. Если этого нет, игру скачать нельзя.

### Управление

| Клавиша телефона | Действие в игре |
|---|---|
| Стрелки | Направления |
| OK / Enter | Подтверждение, выбор |
| Левая софт-клавиша (F1, Call) | Левая софт-клавиша |
| Правая софт-клавиша (F2, Backspace) | Правая софт-клавиша |
| Цифры 0–9, `*`, `#` | Цифровые клавиши, `*` и `#` |
| Завершение вызова / Назад (EndCall, Escape) | Закрыть игру |

### Звук

- **MIDI** по умолчанию играет один раз. Добавьте `&loop=1` к ссылке, чтобы зациклить, например `index.html?vxp=...&loop=1`.
- **WAV, MP3, OGG** воспроизводятся как обычные звуковые файлы, если устройство поддерживает формат.
- MIDI играет синтезатор, встроенный в KaiMRE. Он приблизительно передаёт инструменты: у каждого инструмента своя форма волны и огибающая, ударные сделаны из шума. Это не набор General MIDI.
- Звук начинает играть после первого нажатия клавиши: так требуют браузеры.

### Установка на KaiOS

1. Заархивируйте файлы так, чтобы `index.html` лежал в корне архива.
2. Установите архив через установщик приложений KaiOS.
3. Откройте KaiMRE из списка приложений.

### Как это устроено

- `index.html` — страница. Рисует экран, растягивает его, загружает игру, проигрывает звук и читает клавиши.
- `engine.js` — эмулятор. Работает в Web Worker, читает файл игры и выполняет её код шаг за шагом. Каждый новый кадр отправляет на страницу.
- `manifest.webapp` — описание приложения для KaiOS. Особых разрешений не запрашивает.
- `icons/` — иконки приложения.

### Файлы

| Файл | Назначение |
|---|---|
| `index.html` | Страница: экран, растягивание, загрузка игры, звук, клавиши |
| `engine.js` | Эмулятор MRE/VXP, работает в Web Worker |
| `manifest.webapp` | Манифест приложения KaiOS |
| `icons/` | Иконки приложения |
| `README.md` | Этот файл |
| `LICENSE` | Лицензия Apache License 2.0 |

### Участие в проекте

Сообщения об ошибках и pull request'ы приветствуются. Если сообщаете об ошибке, укажите название игры и точный текст ошибки внизу экрана.
