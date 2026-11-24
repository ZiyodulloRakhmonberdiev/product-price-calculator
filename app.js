// Narx Calculator — PWA
const STORAGE_KEY = 'narx_products';
const LANG_KEY = 'narx_lang';
const LEGACY_PRODUCTS_KEY = 'maxsi_products';
const LEGACY_LANG_KEY = 'maxsi_lang';

const CURRENCIES = [
  { code: 'UZS', symbol: "so'm" },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'RUB', symbol: '₽' },
  { code: 'GBP', symbol: '£' },
  { code: 'TRY', symbol: '₺' },
  { code: 'CNY', symbol: '¥' },
  { code: 'KZT', symbol: '₸' },
  { code: 'AED', symbol: 'AED' },
  { code: 'KRW', symbol: '₩' }
];

const PREFIX_CODES = new Set(['USD', 'EUR', 'GBP', 'TRY', 'CNY', 'KRW', 'RUB', 'KZT']);

const I18N = {
  uz: {
    introTitle: 'Nima sarflayotganingizni biling.',
    introSub: 'Narx Kalkulyatori',
    feature1: 'Tezkor tannarx hisobi',
    feature2: 'Offline ishlaydi',
    feature3: 'Homashyo bo‘yicha hisob',
    feature4: 'Qurilmangizda xavfsiz saqlanadi',
    yourProducts: 'Mahsulotlaringiz',
    newProduct: '+ Yangi',
    tipBanner: 'Maslahat: har bir mahsulot uchun homashyo narxlarini saqlang — tannarx avtomatik hisoblanadi.',
    newProductTitle: 'Yangi mahsulot',
    totalCost: 'Umumiy tannarx',
    productName: 'Mahsulot nomi',
    productNamePh: 'Masalan: Qora mahsulot',
    materials: 'Homashyolar',
    addMaterial: '+ Qo‘shish',
    save: 'Saqlash',
    delete: 'O‘chirish',
    emptyTitle: 'Hali mahsulot qo‘shilmagan',
    emptyHint: 'Yangi mahsulot yaratish uchun «+ Yangi» tugmasini bosing',
    materialsEmpty: 'Homashyo qo‘shilmagan',
    materialNamePh: 'Homashyo nomi',
    materialPricePh: 'Narx',
    materialCount: '{n} ta homashyo',
    currencyLabel: 'Valyuta',
    alertName: 'Mahsulot nomini kiriting!',
    alertMaterials: 'Kamida bitta homashyo qo‘shing!',
    confirmDelete: 'Bu mahsulotni o‘chirishni xohlaysizmi?',
    online: 'ONLINE',
    offline: 'OFFLINE',
    pageTitle: 'Narx Kalkulyatori',
    createdBy: 'Created by'
  },
  en: {
    introTitle: 'Know what you spend.',
    introSub: 'Price Calculator',
    feature1: 'Instant cost breakdown',
    feature2: 'Works offline',
    feature3: 'Material-based costing',
    feature4: 'Safely stored on your device',
    yourProducts: 'Your products',
    newProduct: '+ New',
    tipBanner: 'Tip: save material prices for each product — total cost updates automatically.',
    newProductTitle: 'New product',
    totalCost: 'Total cost',
    productName: 'Product name',
    productNamePh: 'e.g. Black product',
    materials: 'Materials',
    addMaterial: '+ Add',
    save: 'Save',
    delete: 'Delete',
    emptyTitle: 'No products yet',
    emptyHint: 'Tap «+ New» to create your first product',
    materialsEmpty: 'No materials added',
    materialNamePh: 'Material name',
    materialPricePh: 'Price',
    materialCount: '{n} materials',
    currencyLabel: 'Currency',
    alertName: 'Enter a product name!',
    alertMaterials: 'Add at least one material!',
    confirmDelete: 'Delete this product?',
    online: 'ONLINE',
    offline: 'OFFLINE',
    pageTitle: 'Price Calculator',
    createdBy: 'Created by'
  },
  ru: {
    introTitle: 'Знайте, сколько тратите.',
    introSub: 'Калькулятор цены',
    feature1: 'Быстрый расчёт себестоимости',
    feature2: 'Работает офлайн',
    feature3: 'Расчёт по материалам',
    feature4: 'Безопасно хранится на вашем устройстве',
    yourProducts: 'Ваши товары',
    newProduct: '+ Новый',
    tipBanner: 'Совет: сохраняйте цены материалов для каждого товара — себестоимость считается сама.',
    newProductTitle: 'Новый товар',
    totalCost: 'Общая себестоимость',
    productName: 'Название товара',
    productNamePh: 'Например: Чёрный товар',
    materials: 'Материалы',
    addMaterial: '+ Добавить',
    save: 'Сохранить',
    delete: 'Удалить',
    emptyTitle: 'Пока нет товаров',
    emptyHint: 'Нажмите «+ Новый», чтобы создать товар',
    materialsEmpty: 'Материалы не добавлены',
    materialNamePh: 'Название материала',
    materialPricePh: 'Цена',
    materialCount: '{n} материалов',
    currencyLabel: 'Валюта',
    alertName: 'Введите название товара!',
    alertMaterials: 'Добавьте хотя бы один материал!',
    confirmDelete: 'Удалить этот товар?',
    online: 'ONLINE',
    offline: 'OFFLINE',
    pageTitle: 'Калькулятор цены',
    createdBy: 'Created by'
  }
};

let lang = localStorage.getItem(LANG_KEY) || localStorage.getItem(LEGACY_LANG_KEY) || 'uz';
let products = [];
let currentProductId = null;
let draftMaterials = [];
let draftCurrency = 'UZS';

const productListEl = document.getElementById('product-list');
const createBtn = document.getElementById('create-btn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const productNameInput = document.getElementById('product-name');
const productCurrencySelect = document.getElementById('product-currency');
const materialsContainer = document.getElementById('materials-container');
const totalDisplay = document.getElementById('total-display');
const saveBtn = document.getElementById('save-btn');
const deleteProductBtn = document.getElementById('delete-product-btn');
const closeModalBtn = document.getElementById('close-modal');
const addMaterialBtn = document.getElementById('add-material-btn');
const onlineStatus = document.getElementById('online-status');

function t(key, vars = {}) {
  let text = (I18N[lang] && I18N[lang][key]) || I18N.uz[key] || key;
  Object.keys(vars).forEach(k => {
    text = text.replace(`{${k}}`, vars[k]);
  });
  return text;
}

function getCurrency(code) {
  return CURRENCIES.find(c => c.code === code) || CURRENCIES[0];
}

function formatMoney(amount, code) {
  const cur = getCurrency(code || 'UZS');
  const num = formatNumber(amount);
  return PREFIX_CODES.has(cur.code) ? `${cur.symbol}${num}` : `${num} ${cur.symbol}`;
}

function populateCurrencySelect(selected) {
  const value = selected || draftCurrency || 'UZS';
  productCurrencySelect.innerHTML = CURRENCIES.map(c =>
    `<option value="${c.code}"${c.code === value ? ' selected' : ''}>${c.code} · ${c.symbol}</option>`
  ).join('');
  draftCurrency = value;
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.title = t('pageTitle');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  updateOnlineStatus();
  renderProducts();

  if (modal.classList.contains('active')) {
    modalTitle.textContent = currentProductId
      ? (products.find(p => p.id === currentProductId)?.name || t('newProductTitle'))
      : t('newProductTitle');
    populateCurrencySelect(draftCurrency);
    renderMaterials(draftMaterials);
    updateTotal(draftMaterials);
  }
}

function setLang(next) {
  if (!I18N[next]) return;
  lang = next;
  localStorage.setItem(LANG_KEY, lang);
  applyI18n();
}

function updateOnlineStatus() {
  const online = navigator.onLine;
  onlineStatus.textContent = online ? t('online') : t('offline');
  onlineStatus.classList.toggle('online', online);
}

function loadProducts() {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    data = localStorage.getItem(LEGACY_PRODUCTS_KEY);
    if (data) {
      localStorage.setItem(STORAGE_KEY, data);
    }
  }
  products = data ? JSON.parse(data) : [];
  products = products.map(p => ({
    ...p,
    currency: p.currency || 'UZS'
  }));
  renderProducts();
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function calculateTotal(materials) {
  return materials.reduce((sum, m) => sum + (Number(m.price) || 0), 0);
}

function formatNumber(num) {
  return Math.round(Number(num) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function priceDisplayValue(price) {
  if (price === '' || price === null || price === undefined) return '';
  const n = Number(price);
  if (!Number.isFinite(n) || n === 0) return '';
  return String(price);
}

function renderProducts() {
  if (products.length === 0) {
    productListEl.innerHTML = `
      <div class="empty-state">
        <p>${t('emptyTitle')}</p>
        <p>${t('emptyHint')}</p>
      </div>
    `;
    return;
  }

  productListEl.innerHTML = products.map(product => {
    const total = calculateTotal(product.materials);
    return `
      <div class="product-card" data-id="${product.id}">
        <h3>${escapeHtml(product.name)}</h3>
        <div class="product-total">${formatMoney(total, product.currency)}</div>
        <div class="product-meta">${t('materialCount', { n: product.materials.length })} · ${product.currency || 'UZS'}</div>
      </div>
    `;
  }).join('');

  productListEl.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.id));
  });
}

function openProduct(id) {
  currentProductId = id;
  const product = products.find(p => p.id === id);
  if (!product) return;

  draftMaterials = product.materials.map(m => ({
    name: m.name,
    price: m.price === 0 || m.price === '0' ? '' : m.price
  }));
  draftCurrency = product.currency || 'UZS';

  modalTitle.textContent = product.name;
  productNameInput.value = product.name;
  deleteProductBtn.style.display = '';
  populateCurrencySelect(draftCurrency);
  renderMaterials(draftMaterials);
  updateTotal(draftMaterials);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function openNewProduct() {
  currentProductId = null;
  draftMaterials = [];
  draftCurrency = 'UZS';
  modalTitle.textContent = t('newProductTitle');
  productNameInput.value = '';
  deleteProductBtn.style.display = 'none';
  populateCurrencySelect(draftCurrency);
  renderMaterials(draftMaterials);
  updateTotal(draftMaterials);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function renderMaterials(materials) {
  draftMaterials = materials;

  if (materials.length === 0) {
    materialsContainer.innerHTML = `<p class="materials-empty">${t('materialsEmpty')}</p>`;
    return;
  }

  materialsContainer.innerHTML = materials.map((m, index) => `
    <div class="material-item" data-index="${index}">
      <div class="field-card">
        <span class="field-label">${t('materialNamePh')}</span>
        <input type="text" class="material-name-input" value="${escapeHtml(m.name || '')}" placeholder="${t('materialNamePh')}" autocomplete="off">
      </div>
      <div class="field-card price-card">
        <span class="field-label">${t('materialPricePh')}</span>
        <input
          type="number"
          class="material-price-input"
          inputmode="numeric"
          min="0"
          step="1"
          value="${priceDisplayValue(m.price)}"
          placeholder="—"
          autocomplete="off"
        >
      </div>
      <button class="icon-btn delete-material" data-index="${index}" type="button" title="${t('delete')}" aria-label="${t('delete')}">✕</button>
    </div>
  `).join('');

  materialsContainer.querySelectorAll('.material-name-input, .material-price-input').forEach(input => {
    input.addEventListener('input', syncDraftFromInputs);
  });

  materialsContainer.querySelectorAll('.delete-material').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteMaterial(parseInt(btn.dataset.index, 10));
    });
  });
}

function syncDraftFromInputs() {
  const items = materialsContainer.querySelectorAll('.material-item');
  draftMaterials = Array.from(items).map(item => {
    const priceRaw = item.querySelector('.material-price-input').value;
    return {
      name: item.querySelector('.material-name-input').value,
      price: priceRaw === '' ? '' : priceRaw
    };
  });
  updateTotal(draftMaterials);
}

function getCurrentMaterials() {
  syncDraftFromInputs();
  return draftMaterials
    .map(m => ({
      name: (m.name || '').trim(),
      price: m.price === '' || m.price === null || m.price === undefined ? 0 : Number(m.price) || 0
    }))
    .filter(m => m.name);
}

function updateTotal(materials) {
  const total = calculateTotal(
    materials.map(m => ({
      price: m.price === '' || m.price === null || m.price === undefined ? 0 : Number(m.price) || 0
    }))
  );
  totalDisplay.textContent = total > 0 ? formatMoney(total, draftCurrency) : '—';
}

function deleteMaterial(index) {
  syncDraftFromInputs();
  draftMaterials.splice(index, 1);
  renderMaterials(draftMaterials);
  updateTotal(draftMaterials);
}

function addMaterial() {
  syncDraftFromInputs();
  draftMaterials.push({ name: '', price: '' });
  renderMaterials(draftMaterials);
  setTimeout(() => {
    const inputs = materialsContainer.querySelectorAll('.material-name-input');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }, 50);
}

function saveProduct() {
  const name = productNameInput.value.trim();
  if (!name) {
    alert(t('alertName'));
    productNameInput.focus();
    return;
  }

  const materials = getCurrentMaterials();
  if (materials.length === 0) {
    alert(t('alertMaterials'));
    return;
  }

  const currency = productCurrencySelect.value || draftCurrency || 'UZS';

  if (currentProductId) {
    const product = products.find(p => p.id === currentProductId);
    if (product) {
      product.name = name;
      product.materials = materials;
      product.currency = currency;
    }
  } else {
    products.push({
      id: Date.now().toString(),
      name,
      materials,
      currency,
      createdAt: new Date().toISOString()
    });
  }

  saveProducts();
  renderProducts();
  closeModal();
}

function deleteProduct() {
  if (!currentProductId) return;
  if (!confirm(t('confirmDelete'))) return;

  products = products.filter(p => p.id !== currentProductId);
  saveProducts();
  renderProducts();
  closeModal();
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  currentProductId = null;
  draftMaterials = [];
  draftCurrency = 'UZS';
}

createBtn.addEventListener('click', openNewProduct);
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveProduct);
deleteProductBtn.addEventListener('click', deleteProduct);
addMaterialBtn.addEventListener('click', addMaterial);

productCurrencySelect.addEventListener('change', () => {
  draftCurrency = productCurrencySelect.value;
  updateTotal(draftMaterials);
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}

localStorage.setItem(LANG_KEY, lang);
applyI18n();
loadProducts();
