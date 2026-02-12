# Comment Statistics + TODO Extractor

Автор: **Акопян Мариам Карапетовна**  
Группа: **M3107**

---

## Описание

**Comment Statistics + TODO Extractor** — это расширение для Visual Studio Code, предназначенное для анализа текущего открытого файла.

Расширение позволяет получить статистику по комментариям и автоматически находить задачи, оставленные в коде.

---

## Возможности

Расширение предоставляет следующие функции:

- Подсчёт общего количества строк в файле
- Подсчёт строк-комментариев  
  (поддерживаются маркеры: `//`, `#`, `--`, `/*`, `*`, `<!--`)
- Поиск меток:
  - TODO
  - FIXME
  - NOTE
  - HACK
- Отображение списка найденных задач
- Быстрый переход к выбранной строке с задачей
- Запуск через горячую клавишу **Ctrl + Alt + T**
- Запуск через Command Palette (**Analyze Comments and TODOs**)

---

## Используемые технологии

- Visual Studio Code API
- TypeScript
- Node.js
- Yeoman + generator-code

---

## Установка

1. Клонировать репозиторий:
   git clone https://github.com/erickhrr/comment-statistics-vscode-extension.git

2. Перейти в папку проекта:
   cd comment-statistics-vscode-extension

3. Установить зависимости:
   npm install

4. Выполнить компиляцию:
   npm run compile

5. Запустить расширение:
   Нажать F5 в VS Code

6. В открывшемся окне **Extension Development Host**:
   - открыть любой файл
   - нажать **Ctrl + Alt + T**
