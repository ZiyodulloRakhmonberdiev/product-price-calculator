# Tannarx Kalkulyatori / Cost Calculator / Калькулятор себестоимости

Offline PWA for product cost calculation · Offline PWA для расчёта себестоимости · Mahsulot tannarxi uchun offline PWA

---

## O‘zbekcha

### Loyiha haqida

**Tannarx Kalkulyatori** — mahsulot tannarxini homashyo narxlari bo‘yicha hisoblaydigan offline PWA. Ma’lumotlar faqat qurilmada saqlanadi.

### Imkoniyatlar

- Mahsulotlar va homashyolar bo‘yicha tannarx hisobi
- Har bir mahsulot uchun alohida valyuta (10 ta mashhur valyuta)
- Offline ishlash (Service Worker + localStorage)
- 3 til: o‘zbek, ingliz, rus
- Grid / list ko‘rinish, pagination (20 ta / sahifa)
- Custom dialog (alert/confirm o‘rniga)
- Mobil landing va to‘liq ekran mahsulotlar oynasi

### Ishga tushirish

```bash
python -m http.server 8080
# yoki
npx serve .
```

Brauzerda: `http://localhost:8080`

> `file://` orqali ochganda Service Worker ishlamasligi mumkin. Offline rejim uchun HTTP server ishlating.

### Saqlash

| Ma’lumot | Kalit |
|----------|--------|
| Til | `localStorage` → `narx_lang` |
| Mahsulotlar (valyuta bilan) | `localStorage` → `narx_products` |
| Ko‘rinish (grid/list) | `localStorage` → `narx_view` |

### Muallif

Created by [Ziyodullo](https://ziyodullo.uz)

---

## English

### About

**Cost Calculator (Tannarx)** is an offline PWA that calculates product cost based on material prices. All data stays on your device.

### Features

- Cost calculation by products and materials
- Separate currency per product (10 popular currencies)
- Works offline (Service Worker + localStorage)
- 3 languages: Uzbek, English, Russian
- Grid / list views with pagination (20 items per page)
- Custom UI dialogs instead of native alert/confirm
- Mobile landing screen and full-screen products view

### Getting started

```bash
python -m http.server 8080
# or
npx serve .
```

Open in browser: `http://localhost:8080`

> Opening via `file://` may prevent Service Worker from working. Use an HTTP server for offline mode.

### Storage

| Data | Key |
|------|-----|
| Language | `localStorage` → `narx_lang` |
| Products (with currency) | `localStorage` → `narx_products` |
| View mode (grid/list) | `localStorage` → `narx_view` |

### Author

Created by [Ziyodullo](https://ziyodullo.uz)

---

## Русский

### О проекте

**Калькулятор себестоимости (Tannarx)** — offline PWA для расчёта себестоимости товара по ценам материалов. Данные хранятся только на устройстве.

### Возможности

- Расчёт себестоимости по товарам и материалам
- Отдельная валюта для каждого товара (10 популярных валют)
- Работа офлайн (Service Worker + localStorage)
- 3 языка: узбекский, английский, русский
- Виды сетка / список, пагинация (20 шт. на страницу)
- Собственные диалоги вместо native alert/confirm
- Мобильный лендинг и полноэкранный экран товаров

### Запуск

```bash
python -m http.server 8080
# или
npx serve .
```

В браузере: `http://localhost:8080`

> При открытии через `file://` Service Worker может не работать. Для offline-режима используйте HTTP-сервер.

### Хранение

| Данные | Ключ |
|--------|------|
| Язык | `localStorage` → `narx_lang` |
| Товары (с валютой) | `localStorage` → `narx_products` |
| Вид (grid/list) | `localStorage` → `narx_view` |

### Автор

Created by [Ziyodullo](https://ziyodullo.uz)
