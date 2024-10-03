const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counters.json');

// Функция для загрузки счетчиков из файла
function loadCounters() {
    if (fs.existsSync(COUNTER_FILE)) {
        const data = fs.readFileSync(COUNTER_FILE);
        return JSON.parse(data);
    }
    return { '/': 0, '/about': 0 }; // начальные значения счетчиков
}

// Функция для сохранения счетчиков в файл
function saveCounters(counters) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters));
}

// Загружаем счетчики при старте сервера
let counters = loadCounters();

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
    counters['/']++;
    saveCounters(counters);
    res.send(<h1>Главная страница</h1><p>просмотров: ${counters['/']}</p>);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
    counters['/about']++;
    saveCounters(counters);
    res.send(<h1>О нас</h1><p>просмотров: ${counters['/about']}</p>);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(Сервер запущен на http://localhost:${PORT});
});