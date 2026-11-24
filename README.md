# Narx Calculator

Mahsulot tannarxini homashyo narxlari bo‘yicha hisoblaydigan offline PWA.

## Imkoniyatlar

- Mahsulotlar va homashyolar bo‘yicha tannarx hisobi
- Har bir mahsulot uchun alohida valyuta
- Offline ishlash (Service Worker + localStorage)
- 3 til: o‘zbek, ingliz, rus
- Ma’lumotlar faqat qurilmada saqlanadi

## Ishga tushirish

```bash
python -m http.server 8080
# yoki
npx serve .
```

Brauzerda: `http://localhost:8080`

## Saqlash

- Til → `localStorage` (`narx_lang`)
- Mahsulotlar (valyuta bilan) → `localStorage` (`narx_products`)

## Created by

[ziyodullo](https://ziyodullo.uz)
