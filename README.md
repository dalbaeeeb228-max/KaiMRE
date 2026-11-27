# KaiMRE

Запуск игр MRE/VXP на KaiOS 2.5 (браузер Gecko 48).
An MRE/VXP game runtime for KaiOS 2.5 (Gecko 48).

Весь исходный код открыт и не минифицирован: `index.html`, `engine.js`, `manifest.webapp`.
All source is open and not minified or obfuscated: `index.html`, `engine.js`, `manifest.webapp`.

## Содержимое / Contents

- `index.html` — страница: экран, масштабирование, загрузка игры, MIDI и звук, клавиши.
  Page: screen, scaling, game loading, MIDI and sound, keys.
- `engine.js` — движок (VXP/ARM-интерпретатор) в Web Worker.
  Engine (VXP/ARM interpreter) running in a Web Worker.
- `manifest.webapp` — манифест KaiOS-приложения (без специальных прав).
  KaiOS app manifest (no special permissions).
- `icons/` — иконки приложения.
  App icons.

## Запуск игры / Starting a game

1. Положите игру в файл `game.vxp` рядом с `index.html` в пакете приложения.
   Put the game in a file named `game.vxp` next to `index.html` in the app package.
2. Либо откройте приложение со ссылкой на игру: `index.html?vxp=<адрес .vxp>`.
   Сервер должен разрешать загрузку с другого домена (заголовок `Access-Control-Allow-Origin`), иначе игра не загрузится.
   Or open the app with a link to a game: `index.html?vxp=<URL of .vxp>`.
   The server must allow cross-origin downloads (`Access-Control-Allow-Origin`), otherwise the game will not load.
3. Кнопка «Назад» (Back) закрывает игру.
   The Back key closes the game.

## Звук / Sound

- MIDI проигрывается один раз. Добавьте `&loop=1` к ссылке, чтобы зациклить.
  MIDI plays once. Add `&loop=1` to the link to loop it.
- WAV, MP3, OGG воспроизводятся как обычный звук, если устройство умеет этот формат.
  WAV, MP3 and OGG are played as sampled audio when the device supports the format.
- MIDI синтезируется приближённо (формы волн и огибающие по инструментам, ударные из шума), это не настоящий набор GM.
  MIDI is a synthesized approximation (waveforms and envelopes per instrument, drums from noise), not the real GM sound set.

## Ограничения / Limitations

- Нет 3D.
  No 3D.
- Нет выбора файлов на телефоне и сканера SD-карты: игра берётся из пакета или по ссылке.
  No file picker and no SD card scanner: the game comes from the package or from a link.
- Совместимость с KaiOS 2.5 проверена только на уровне синтаксиса и в браузере Chromium; на реальном устройстве проверяйте сами.
  KaiOS 2.5 compatibility is checked for syntax and in Chromium only; test on a real device yourself.

## Установка / Installing

Упакуйте файлы в zip (с `index.html` в корне) и установите через KaiOS-установщик.
Zip the files (with `index.html` at the root) and install them with a KaiOS installer.
