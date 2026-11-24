// Narx Calculator — PWA
const STORAGE_KEY = 'narx_products';
const LANG_KEY = 'narx_lang';
const VIEW_KEY = 'narx_view';
const LEGACY_PRODUCTS_KEY = 'maxsi_products';
const LEGACY_LANG_KEY = 'maxsi_lang';
const PAGE_SIZE = 20;
const LIMITS = {
  productName: 80,
  materialName: 60,
  priceMax: 999999999,
  materialsMax: 50,
  productsMax: 500
};
const MOBILE_MQ = window.matchMedia('(max-width: 719px)');

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
    createdBy: 'Created by',
    prevPage: 'Oldingi',
    nextPage: 'Keyingi',
    pageOf: '{current} / {total}',
    viewGrid: 'Katak',
    viewList: 'Ro‘yxat',
    enterApp: 'Mahsulotlarga o‘tish',
    back: '←',
    alertNameMax: 'Mahsulot nomi 80 belgidan oshmasin',
    alertMaterialName: 'Homashyo nomini kiriting',
    alertMaterialNameMax: 'Homashyo nomi 60 belgidan oshmasin',
    alertPrice: 'Narx 0 dan 999 999 999 gacha bo‘lishi kerak',
    alertMaterialsMax: 'Eng ko‘pi bilan 50 ta homashyo',
    alertProductsMax: 'Eng ko‘pi bilan 500 ta mahsulot'
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
    createdBy: 'Created by',
    prevPage: 'Prev',
    nextPage: 'Next',
    pageOf: '{current} / {total}',
    viewGrid: 'Grid',
    viewList: 'List',
    enterApp: 'Go to products',
    back: '←',
    alertNameMax: 'Product name must be at most 80 characters',
    alertMaterialName: 'Enter a material name',
    alertMaterialNameMax: 'Material name must be at most 60 characters',
    alertPrice: 'Price must be between 0 and 999,999,999',
    alertMaterialsMax: 'Maximum 50 materials allowed',
    alertProductsMax: 'Maximum 500 products allowed'
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
    createdBy: 'Created by',
    prevPage: 'Назад',
    nextPage: 'Далее',
    pageOf: '{current} / {total}',
    viewGrid: 'Сетка',
    viewList: 'Список',
    enterApp: 'Перейти к товарам',
    back: '←',
    alertNameMax: 'Название не длиннее 80 символов',
    alertMaterialName: 'Введите название материала',
    alertMaterialNameMax: 'Название материала не длиннее 60 символов',
    alertPrice: 'Цена должна быть от 0 до 999 999 999',
    alertMaterialsMax: 'Не больше 50 материалов',
    alertProductsMax: 'Не больше 500 товаров'
  }
};

let lang = localStorage.getItem(LANG_KEY) || localStorage.getItem(LEGACY_LANG_KEY) || 'uz';
let products = [];
let currentProductId = null;
let draftMaterials = [];
let draftCurrency = 'UZS';
let viewMode = localStorage.getItem(VIEW_KEY) === 'list' ? 'list' : 'grid';
let currentPage = 1;

const productListEl = document.getElementById('product-list');
const paginationEl = document.getElementById('pagination');
const viewGridBtn = document.getElementById('view-grid');
const viewListBtn = document.getElementById('view-list');
const createBtn = document.getElementById('create-btn');
const createBtnDesktop = document.getElementById('create-btn-desktop');
const enterAppBtn = document.getElementById('enter-app-btn');
const backToIntroBtn = document.getElementById('back-to-intro');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const productNameInput = document.getElementById('product-name');
const productNameError = document.getElementById('product-name-error');
const currencyPicker = document.getElementById('currency-picker');
const currencyTrigger = document.getElementById('currency-trigger');
const currencyTriggerText = document.getElementById('currency-trigger-text');
const currencyMenu = document.getElementById('currency-menu');
const currencyField = document.querySelector('.currency-field');
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

function currencyLabel(code) {
  const cur = getCurrency(code);
  return `${cur.code} · ${cur.symbol}`;
}

function closeCurrencyMenu() {
  currencyMenu.hidden = true;
  currencyTrigger.setAttribute('aria-expanded', 'false');
  currencyField.classList.remove('is-open');
}

function openCurrencyMenu() {
  currencyMenu.hidden = false;
  currencyTrigger.setAttribute('aria-expanded', 'true');
  currencyField.classList.add('is-open');
}

function toggleCurrencyMenu() {
  if (currencyMenu.hidden) openCurrencyMenu();
  else closeCurrencyMenu();
}

function setDraftCurrency(code) {
  if (!CURRENCIES.some(c => c.code === code)) return;
  draftCurrency = code;
  currencyTriggerText.textContent = currencyLabel(code);
  currencyMenu.querySelectorAll('.currency-option').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.value === code);
  });
  updateTotal(draftMaterials);
}

function populateCurrencySelect(selected) {
  const value = selected || draftCurrency || 'UZS';
  draftCurrency = value;
  currencyTriggerText.textContent = currencyLabel(value);
  currencyMenu.innerHTML = CURRENCIES.map(c => `
    <li role="presentation">
      <button
        type="button"
        class="currency-option${c.code === value ? ' is-active' : ''}"
        role="option"
        data-value="${c.code}"
        aria-selected="${c.code === value}"
      >
        <span class="currency-option-code">${c.code}</span>
        <span class="currency-option-symbol">${c.symbol}</span>
      </button>
    </li>
  `).join('');

  currencyMenu.querySelectorAll('.currency-option').forEach(btn => {
    btn.addEventListener('click', () => {
      setDraftCurrency(btn.dataset.value);
      closeCurrencyMenu();
    });
  });

  closeCurrencyMenu();
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

function showMobileApp() {
  document.body.classList.remove('mobile-landing');
  document.body.classList.add('mobile-app');
}

function showMobileLanding() {
  document.body.classList.add('mobile-landing');
  document.body.classList.remove('mobile-app');
  closeModal();
}

function syncMobileMode() {
  if (!MOBILE_MQ.matches) {
    document.body.classList.remove('mobile-landing', 'mobile-app');
    return;
  }
  if (!document.body.classList.contains('mobile-app')) {
    document.body.classList.add('mobile-landing');
  }
}

function showFieldError(message) {
  if (!productNameError) return;
  productNameError.hidden = !message;
  productNameError.textContent = message || '';
  productNameInput.closest('.field-card')?.classList.toggle('is-invalid', Boolean(message));
}

function clampPriceInput(input) {
  const raw = input.value;
  if (raw === '') return;
  let n = Number(raw);
  if (!Number.isFinite(n) || n < 0) n = 0;
  if (n > LIMITS.priceMax) n = LIMITS.priceMax;
  n = Math.floor(n);
  if (String(n) !== raw) input.value = String(n);
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

function totalPages() {
  return Math.max(1, Math.ceil(products.length / PAGE_SIZE));
}

function setViewMode(mode) {
  viewMode = mode === 'list' ? 'list' : 'grid';
  localStorage.setItem(VIEW_KEY, viewMode);
  productListEl.dataset.view = viewMode;
  productListEl.classList.toggle('is-list', viewMode === 'list');
  productListEl.classList.toggle('is-grid', viewMode === 'grid');
  viewGridBtn.classList.toggle('is-active', viewMode === 'grid');
  viewListBtn.classList.toggle('is-active', viewMode === 'list');
  viewGridBtn.setAttribute('aria-pressed', String(viewMode === 'grid'));
  viewListBtn.setAttribute('aria-pressed', String(viewMode === 'list'));
  viewGridBtn.title = t('viewGrid');
  viewListBtn.title = t('viewList');
}

function renderPagination() {
  const pages = totalPages();
  if (products.length <= PAGE_SIZE) {
    paginationEl.hidden = true;
    paginationEl.innerHTML = '';
    return;
  }

  if (currentPage > pages) currentPage = pages;

  paginationEl.hidden = false;
  paginationEl.innerHTML = `
    <button type="button" class="page-btn" id="page-prev" ${currentPage <= 1 ? 'disabled' : ''}>${t('prevPage')}</button>
    <span class="page-info">${t('pageOf', { current: currentPage, total: pages })}</span>
    <button type="button" class="page-btn" id="page-next" ${currentPage >= pages ? 'disabled' : ''}>${t('nextPage')}</button>
  `;

  paginationEl.querySelector('#page-prev')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderProducts();
    }
  });
  paginationEl.querySelector('#page-next')?.addEventListener('click', () => {
    if (currentPage < pages) {
      currentPage += 1;
      renderProducts();
    }
  });
}

function renderProducts() {
  setViewMode(viewMode);

  if (products.length === 0) {
    currentPage = 1;
    productListEl.innerHTML = `
      <div class="empty-state">
        <p>${t('emptyTitle')}</p>
        <p>${t('emptyHint')}</p>
      </div>
    `;
    paginationEl.hidden = true;
    paginationEl.innerHTML = '';
    return;
  }

  const pages = totalPages();
  if (currentPage > pages) currentPage = pages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = products.slice(start, start + PAGE_SIZE);

  productListEl.innerHTML = pageItems.map(product => {
    const total = calculateTotal(product.materials);
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-main">
          <h3>${escapeHtml(product.name)}</h3>
          <div class="product-meta">${t('materialCount', { n: product.materials.length })} · ${product.currency || 'UZS'}</div>
        </div>
        <div class="product-total">${formatMoney(total, product.currency)}</div>
      </div>
    `;
  }).join('');

  productListEl.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.id));
  });

  renderPagination();
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
  productNameInput.value = product.name.slice(0, LIMITS.productName);
  showFieldError('');
  deleteProductBtn.style.display = '';
  populateCurrencySelect(draftCurrency);
  renderMaterials(draftMaterials);
  updateTotal(draftMaterials);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function openNewProduct() {
  if (!currentProductId && products.length >= LIMITS.productsMax) {
    alert(t('alertProductsMax'));
    return;
  }

  currentProductId = null;
  draftMaterials = [];
  draftCurrency = 'UZS';
  modalTitle.textContent = t('newProductTitle');
  productNameInput.value = '';
  showFieldError('');
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
      <div class="material-item-head">
        <span class="material-item-index">${index + 1}</span>
        <button class="icon-btn delete-material" data-index="${index}" type="button" title="${t('delete')}" aria-label="${t('delete')}">✕</button>
      </div>
      <div class="field-card">
        <span class="field-label">${t('materialNamePh')}</span>
        <input type="text" class="material-name-input" value="${escapeHtml((m.name || '').slice(0, LIMITS.materialName))}" placeholder="${t('materialNamePh')}" maxlength="${LIMITS.materialName}" autocomplete="off">
      </div>
      <div class="field-card price-card">
        <span class="field-label">${t('materialPricePh')}</span>
        <input
          type="number"
          class="material-price-input"
          inputmode="numeric"
          min="0"
          max="${LIMITS.priceMax}"
          step="1"
          value="${priceDisplayValue(m.price)}"
          placeholder="—"
          autocomplete="off"
        >
      </div>
    </div>
  `).join('');

  materialsContainer.querySelectorAll('.material-name-input').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.length > LIMITS.materialName) {
        input.value = input.value.slice(0, LIMITS.materialName);
      }
      syncDraftFromInputs();
    });
  });

  materialsContainer.querySelectorAll('.material-price-input').forEach(input => {
    input.addEventListener('input', () => {
      clampPriceInput(input);
      syncDraftFromInputs();
    });
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
  if (draftMaterials.length >= LIMITS.materialsMax) {
    alert(t('alertMaterialsMax'));
    return;
  }
  draftMaterials.push({ name: '', price: '' });
  renderMaterials(draftMaterials);
  setTimeout(() => {
    const inputs = materialsContainer.querySelectorAll('.material-name-input');
    if (inputs.length) inputs[inputs.length - 1].focus();
  }, 50);
}

function validateMaterials(materials) {
  for (const m of materials) {
    if (!m.name) {
      alert(t('alertMaterialName'));
      return false;
    }
    if (m.name.length > LIMITS.materialName) {
      alert(t('alertMaterialNameMax'));
      return false;
    }
    if (!Number.isFinite(m.price) || m.price < 0 || m.price > LIMITS.priceMax) {
      alert(t('alertPrice'));
      return false;
    }
  }
  if (materials.length > LIMITS.materialsMax) {
    alert(t('alertMaterialsMax'));
    return false;
  }
  return true;
}

function saveProduct() {
  let name = productNameInput.value.trim();
  if (name.length > LIMITS.productName) {
    name = name.slice(0, LIMITS.productName);
    productNameInput.value = name;
  }

  if (!name) {
    showFieldError(t('alertName'));
    productNameInput.focus();
    return;
  }
  if (name.length > LIMITS.productName) {
    showFieldError(t('alertNameMax'));
    productNameInput.focus();
    return;
  }
  showFieldError('');

  const materials = getCurrentMaterials();
  if (materials.length === 0) {
    alert(t('alertMaterials'));
    return;
  }
  if (!validateMaterials(materials)) return;

  if (!currentProductId && products.length >= LIMITS.productsMax) {
    alert(t('alertProductsMax'));
    return;
  }

  const currency = draftCurrency || 'UZS';

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
  if (!currentProductId) currentPage = totalPages();
  renderProducts();
  closeModal();
}

function deleteProduct() {
  if (!currentProductId) return;
  if (!confirm(t('confirmDelete'))) return;

  products = products.filter(p => p.id !== currentProductId);
  saveProducts();
  if (currentPage > totalPages()) currentPage = totalPages();
  renderProducts();
  closeModal();
}

function closeModal() {
  closeCurrencyMenu();
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  currentProductId = null;
  draftMaterials = [];
  draftCurrency = 'UZS';
}

viewGridBtn.addEventListener('click', () => {
  setViewMode('grid');
  renderProducts();
});
viewListBtn.addEventListener('click', () => {
  setViewMode('list');
  renderProducts();
});

enterAppBtn.addEventListener('click', showMobileApp);
backToIntroBtn.addEventListener('click', showMobileLanding);
MOBILE_MQ.addEventListener('change', syncMobileMode);

productNameInput.addEventListener('input', () => {
  if (productNameInput.value.length > LIMITS.productName) {
    productNameInput.value = productNameInput.value.slice(0, LIMITS.productName);
  }
  if (productNameInput.value.trim()) showFieldError('');
});

createBtn.addEventListener('click', openNewProduct);
createBtnDesktop.addEventListener('click', openNewProduct);
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveProduct);
deleteProductBtn.addEventListener('click', deleteProduct);
addMaterialBtn.addEventListener('click', addMaterial);

currencyTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleCurrencyMenu();
});

document.addEventListener('click', (e) => {
  if (!currencyPicker.contains(e.target)) closeCurrencyMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCurrencyMenu();
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
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => reg.update())
      .catch(() => {});
  });
}

localStorage.setItem(LANG_KEY, lang);
syncMobileMode();
applyI18n();
loadProducts();
