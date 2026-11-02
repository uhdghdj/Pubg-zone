/* PUBG ZONE — full storefront logic */
const hasSupabaseConfig = Boolean(
  window.supabase &&
  typeof window.supabase.createClient === 'function' &&
  String(window.__SUPABASE_URL__ || '').trim() &&
  String(window.__SUPABASE_ANON_KEY__ || '').trim()
)
const db = hasSupabaseConfig
  ? window.supabase.createClient(window.__SUPABASE_URL__, window.__SUPABASE_ANON_KEY__)
  : null

/* صور المنتج محلية حتى تظهر الواجهة بسرعة ومن دون اعتماد على روابط خارجية. */
const heroGallery = ['watergun-main.webp', 'watergun-angle.webp']
const localImage = heroGallery[0]
const localCategories = [
  { id: 'water-toys', name: 'ألعاب المياه', description: 'استعد لجولات الصيف', image_url: localImage },
]
const localProducts = [
  { id: 'pz-001', slug: 'revolving-led-water-gun', name: 'مدفع المياه الدوّار بإضاءة LED', description: 'تصميم كهربائي بسبطانتين دوّارتين ومؤثر إضاءة، قابل لإعادة الشحن عبر USB.', price: 4100, sale_price: 0, stock_quantity: 12, category_id: 'water-toys', image_url: localImage, gallery_images: [heroGallery[1]], badge: 'LED / USB', is_active: true },
]

/* ===== TRANSLATIONS ===== */
const translations = {
  ar: {
    dir: 'rtl', navHome: 'الرئيسية', navProducts: 'المنتجات', search: 'ابحث عن منتج...', language: 'EN',
    heroEyebrow: 'إصدار الصيف / تجربة دوّارة', heroTitle: 'الجل بلاستر', heroAccent: '',
    heroText: 'ألعاب مائية واقعية تعمل بكرات الجيل المائية.',
    shopNow: 'اكتشف المنتج', explore: 'شاهد المواصفات', offer: 'مدى إطلاق يصل إلى', offerValue: '15M', heroMeta: 'توصيل لجميع المحافظات',
    categories: 'ألعاب المياه', categoriesSub: 'تفاصيل مصممة لجولات صيفية مليئة بالحماس',
    featured: 'القطعة الرئيسية', featuredSub: 'مدفع مياه دوّار بإضاءة LED وشحن USB', add: 'أضف للسلة', added: 'تمت الإضافة', details: 'التفاصيل',
    why: 'مصمم للحماس', whySub: 'تفاصيل عملية تجمع الحركة والإضاءة وتجربة لعب صيفية مختلفة.',
    shipping: 'شحن سريع', shippingText: 'نوصل لبابك خلال 1–3 أيام عمل', quality: 'جودة مضمونة', qualityText: 'منتجات مختارة بعناية',
    support: 'دعم حقيقي', supportText: 'نحن هنا لمساعدتك طوال الوقت',
    reviews: 'آراء اللاعبين', reviewText: 'الخدمة سريعة والمنتج أحلى من الصور. أكيد هرجع أطلب تاني.',
    newsletter: 'لا تفوّت أي Drop', newsletterText: 'اشترك لتصلك العروض والمنتجات الجديدة أولاً.',
    email: 'بريدك الإلكتروني', subscribe: 'اشترك',
    cart: 'السلة', emptyCart: 'السلة فارغة حالياً', total: 'الإجمالي', checkout: 'إتمام الطلب', close: 'إغلاق',
    quantity: 'الكمية', remove: 'حذف', checkoutTitle: 'أكمل مهمتك', checkoutSub: 'أدخل بيانات التوصيل وسنتولى الباقي.',
    name: 'الاسم بالكامل', phone: 'رقم الهاتف', whatsapp: 'رقم واتساب', governorate: 'المحافظة', city: 'المنطقة أو المدينة',
    address: 'العنوان بالتفصيل', landmark: 'علامة مميزة للوصول', notes: 'ملاحظات إضافية',
    confirm: 'تأكيد الطلب', shippingCost: 'الشحن', discount: 'الخصم',
    success: 'تم استلام طلبك', successText: 'طلبك قيد المراجعة وسيتم التواصل معك لتأكيده.', continue: 'متابعة التسوق',
    required: 'يرجى إكمال البيانات المطلوبة', noProducts: 'لا توجد منتجات متاحة حالياً', loading: 'جار التحميل...',
    egp: 'ج.م', searchResults: 'نتائج البحث', noSearch: 'لم نجد منتجات مطابقة', all: 'الكل',
    freeShipping: 'شحن مجاني', couponCode: 'كود الخصم', applyCoupon: 'تطبيق', couponApplied: 'تم تطبيق الكوبون', couponInvalid: 'كوبون غير صالح',
    buyNow: 'شراء الآن', outOfStock: 'غير متوفر', lowStock: 'متبقي', inStock: 'متوفر',
    paymentMethod: 'طريقة الدفع', cod: 'الدفع عند الاستلام', online: 'الدفع الإلكتروني', payNow: 'ادفع الآن',
    orderSummary: 'ملخص الطلب', subtotal: 'المجموع الفرعي', product: 'المنتج', price: 'السعر', selectVariant: 'اختر الخيار',
    step: 'خطوة', stepInfo: 'بيانات التوصيل', stepPayment: 'طريقة الدفع', stepConfirm: 'مراجعة وتأكيد', back: 'رجوع', next: 'التالي',
    orderStatus: 'حالة الطلب', paymentStatus: 'حالة الدفع',
    pending: 'قيد المراجعة', confirmed: 'تم التأكيد', preparing: 'قيد التجهيز', shipped: 'تم الشحن', delivered: 'تم التسليم', cancelled: 'ملغي',
    paid: 'مدفوع', unpaid: 'غير مدفوع', failed: 'فشل', refunded: 'مسترد',
    deliveryAddress: 'عنوان التوصيل', orderDate: 'تاريخ الطلب', placedItems: 'المنتجات المطلوبة',
    backToStore: 'العودة للمتجر', backToHome: 'العودة للرئيسية', orderId: 'رقم الطلب',
    paymentNotConfigured: 'بعد تسجيل الطلب، انتقل إلى واتساب لإتمام الدفع والتأكيد. لا يتم خصم مبلغ هنا.',
    onlinePendingTitle: 'الطلب مسجّل — الدفع لم يكتمل بعد',
    onlinePendingText: 'انسخ تفاصيل الطلب وانتقل إلى واتساب للتواصل معنا وإتمام الدفع وتأكيد الطلب. لن يتم إرسال الرسالة قبل موافقتك.',
    contactWhatsApp: 'نسخ تفاصيل الطلب والانتقال إلى واتساب',
    orderCopied: 'تم نسخ تفاصيل الطلب',
  },
  en: {
    dir: 'ltr', navHome: 'Home', navProducts: 'Products', search: 'Search products...', language: 'AR',
    heroEyebrow: 'SUMMER DROP / GEL BLASTER', heroTitle: 'GEL BLASTER', heroAccent: '',
    heroText: 'Realistic water-play toys powered by water gel balls.',
    shopNow: 'Explore the blaster', explore: 'View the specs', offer: 'Shooting range up to', offerValue: '15M', heroMeta: 'Delivery across Egypt',
    categories: 'Water toys', categoriesSub: 'Made for high-energy summer moments',
    featured: 'The headliner', featuredSub: 'Rotating water blaster with LED and USB charging', add: 'Add to cart', added: 'Added', details: 'View details',
    why: 'Built for the action', whySub: 'Practical details meet movement, light, and a different kind of summer play.',
    shipping: 'Fast delivery', shippingText: 'At your door in 1–3 business days', quality: 'Verified quality', qualityText: 'Selected with care',
    support: 'Real support', supportText: 'We are here when you need us',
    reviews: 'Player reviews', reviewText: 'Fast service and the product is even better in person. I will order again.',
    newsletter: 'Never miss a drop', newsletterText: 'Get new arrivals and limited deals before everyone else.',
    email: 'Your email address', subscribe: 'Subscribe',
    cart: 'Cart', emptyCart: 'Your cart is empty', total: 'Total', checkout: 'Checkout', close: 'Close',
    quantity: 'Qty', remove: 'Remove', checkoutTitle: 'Complete your mission', checkoutSub: 'Add delivery details and we will handle the rest.',
    name: 'Full name', phone: 'Phone number', whatsapp: 'WhatsApp number', governorate: 'Governorate', city: 'City / area',
    address: 'Detailed address', landmark: 'Landmark', notes: 'Order notes',
    confirm: 'Confirm order', shippingCost: 'Shipping', discount: 'Discount',
    success: 'Order received', successText: 'Your order is pending review and will be confirmed with you.', continue: 'Continue shopping',
    required: 'Please complete the required fields', noProducts: 'No products are available right now', loading: 'Loading...',
    egp: 'EGP', searchResults: 'Search results', noSearch: 'No matching products found', all: 'All',
    freeShipping: 'Free shipping', couponCode: 'Coupon code', applyCoupon: 'Apply', couponApplied: 'Coupon applied', couponInvalid: 'Invalid coupon',
    buyNow: 'Buy now', outOfStock: 'Out of stock', lowStock: 'Only', inStock: 'In stock',
    paymentMethod: 'Payment method', cod: 'Cash on delivery', online: 'Online payment', payNow: 'Pay now',
    orderSummary: 'Order summary', subtotal: 'Subtotal', product: 'Product', price: 'Price', selectVariant: 'Select option',
    step: 'Step', stepInfo: 'Delivery details', stepPayment: 'Payment method', stepConfirm: 'Review & confirm', back: 'Back', next: 'Next',
    orderStatus: 'Order status', paymentStatus: 'Payment status',
    pending: 'Pending', confirmed: 'Confirmed', preparing: 'Preparing', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled',
    paid: 'Paid', unpaid: 'Unpaid', failed: 'Failed', refunded: 'Refunded',
    deliveryAddress: 'Delivery address', orderDate: 'Order date', placedItems: 'Items ordered',
    backToStore: 'Back to store', backToHome: 'Back to home', orderId: 'Order ID',
    paymentNotConfigured: 'After placing the order, continue to WhatsApp to complete payment and confirm. No charge is made here.',
    onlinePendingTitle: 'Order placed — payment is not completed yet',
    onlinePendingText: 'Copy your order details and continue to WhatsApp to arrange payment and confirmation. The message will not be sent without your approval.',
    contactWhatsApp: 'Copy order details and continue to WhatsApp',
    orderCopied: 'Order details copied',
  }
}

/* ===== STATE ===== */
const state = {
  lang: localStorage.getItem('ab-lang') || 'ar',
  products: [],
  categories: [],
  settings: { currency: 'EGP', shipping_cost: 60, free_shipping_threshold: 1000, whatsapp_number: '201070333533', payment_enabled: false },
  images: {},
  variants: {},
  cart: JSON.parse(localStorage.getItem('ab-cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('ab-wishlist') || '[]'),
  query: '',
  filter: 'all',
  page: 'home',
  productSlug: null,
  modal: null,
  loading: true,
  checkoutStep: 1,
  paymentMethod: 'cod',
  discount: 0,
  couponCode: '',
  couponApplied: false,
  lastOrder: null,
  selectedVariant: null,
  qty: 1,
  activeImage: 0,
}

/* ===== HELPERS ===== */
const t = (k) => translations[state.lang][k] || k
const money = (v) => `${Number(v || 0).toLocaleString(state.lang === 'ar' ? 'ar-EG' : 'en-US')} ${state.settings.currency === 'EGP' ? t('egp') : state.settings.currency}`
const whatsappHref = () => {
  const raw = String(state.settings.whatsapp_number || '201070333533').replace(/\D/g, '')
  const number = raw.startsWith('20') ? raw : raw.startsWith('0') ? `20${raw.slice(1)}` : `20${raw}`
  return `https://wa.me/${number}?text=${encodeURIComponent(state.lang === 'ar' ? 'مرحبًا، أريد الاستفسار عن المنتج.' : 'Hello, I would like to ask about the product.')}`
}
function orderWhatsAppMessage(order) {
  const lines = [
    state.lang === 'ar' ? 'مرحبًا، أريد إتمام الدفع الإلكتروني وتأكيد طلبي:' : 'Hello, I would like to complete payment and confirm my order:',
    `${t('orderId')}: ${order.order_number || order.id || '—'}`,
    `${t('name')}: ${order.customer_name || ''}`,
    `${t('phone')}: ${order.customer_phone || order.whatsapp_number || ''}`,
    '',
    `${t('placedItems')}:`,
    ...(order.items || []).map(item => `• ${item.product_name || item.name || ''}${item.variant_label || item.variant ? ` (${item.variant_label || item.variant})` : ''} × ${item.quantity} — ${money(Number(item.price || item.unit_price || 0) * Number(item.quantity || 1))}`),
    `${t('total')}: ${money(order.total)}`,
    `${t('governorate')}: ${order.governorate || ''}${order.city ? ` - ${order.city}` : ''}`,
    `${t('address')}: ${order.address || ''}${order.landmark ? ` (${order.landmark})` : ''}`,
    ...(order.notes ? [`${t('notes')}: ${order.notes}`] : []),
    state.lang === 'ar' ? 'أرجو التواصل معي لتأكيد الطلب وإتمام الدفع. لم أقم بالدفع بعد.' : 'Please contact me to confirm the order and arrange payment. I have not paid yet.'
  ]
  return lines.join('\n')
}
function orderWhatsAppHref(order) {
  const raw = String(state.settings.whatsapp_number || '201070333533').replace(/\D/g, '')
  const number = raw.startsWith('20') ? raw : raw.startsWith('0') ? `20${raw.slice(1)}` : `20${raw}`
  return `https://wa.me/${number}?text=${encodeURIComponent(orderWhatsAppMessage(order))}`
}
function openOrderWhatsApp(order, popup = null, allowPopupFallback = true) {
  const url = orderWhatsAppHref(order)
  if (popup && !popup.closed) {
    popup.opener = null
    popup.location.href = url
  } else if (!popup && allowPopupFallback) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  const writePromise = navigator.clipboard?.writeText(orderWhatsAppMessage(order))
  if (writePromise) writePromise.then(() => toast(t('orderCopied'), 'success')).catch(() => {})
}
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c])
const pName = (p) => p.name || ''
const pDesc = (p) => p.description || ''
const cName = (c) => c.name || ''
const cDesc = (c) => c.description || ''
const basePriceOf = (p) => Math.max(0, Number(p.price) || 0)
const discountPercentOf = (p) => {
  const base = basePriceOf(p)
  const explicit = Number(p.discount_percentage ?? p.discount_percent ?? p.discount_rate)
  if (Number.isFinite(explicit) && explicit > 0 && explicit <= 100) return explicit
  const entered = Number(p.sale_price)
  // This catalog stores 1–100 in sale_price as a percent discount (not a final price).
  if (base > 100 && entered > 0 && entered <= 100) return entered
  return 0
}
const priceOf = (p) => {
  const base = basePriceOf(p)
  const percent = discountPercentOf(p)
  if (percent > 0) return Math.round(base * (1 - percent / 100) * 100) / 100
  const sale = Number(p.sale_price)
  return sale > 0 && sale < base ? sale : base
}
const discountPct = (p) => {
  const percent = discountPercentOf(p)
  if (percent > 0) return Math.round(percent)
  const base = basePriceOf(p), effective = priceOf(p)
  return base > 0 && effective < base ? Math.round((1 - effective / base) * 100) : 0
}
const sameId = (a, b) => String(a ?? '') === String(b ?? '')
const stockOf = (p) => {
  if (!p) return 1
  const raw = p.stock_quantity ?? p.stock ?? p.qty ?? p.inventory
  if (raw == null || raw === '') return 1 /* منتج من غير قيمة مخزون => متوفر افتراضياً */
  const s = Number(raw)
  return Number.isFinite(s) ? s : 1
}
const variantLabelOf = (v) => [v?.size, v?.color].filter(Boolean).join(' / ')
/* DB stores status/payment_status with its own values; map them to UI keys */
const STATUS_KEY = { new: 'pending', pending: 'pending', processing: 'preparing', confirmed: 'confirmed', shipped: 'shipped', delivered: 'delivered', cancelled: 'cancelled' }
const PAY_KEY = { pending: 'unpaid', unpaid: 'unpaid', paid: 'paid', failed: 'failed', refunded: 'refunded' }
function normalizeOrder(o, items = []) {
  const its = (items.length ? items : (o.items || [])).map(it => ({
    ...it,
    price: Number(it.unit_price ?? it.price ?? 0),
    variant: it.variant_label || '',
    product_image: it.product_image || (state.products.find(p => sameId(p.id, it.product_id)) || {}).image_url || ''
  }))
  return { ...o, items: its,
    total: Number(o.total_amount ?? o.total ?? 0),
    discount: Number(o.discount_amount ?? o.discount ?? 0),
    shipping_cost: Number(o.shipping_cost ?? 0),
    subtotal: Number(o.subtotal ?? 0),
    address: o.address_line ?? o.address ?? '',
    status: STATUS_KEY[o.status] || o.status,
    payment_status: PAY_KEY[o.payment_status] || o.payment_status }
}

// Best-effort client guard only; the Edge Function must also enforce server-side idempotency.
const orderEmailAttempts = new Set()
async function notifyOrderEmail(order, items, cartSnapshot) {
  const orderId = String(order?.order_number ?? order?.id ?? '').trim()
  if (!db || !orderId) {
    console.warn('[order-email] failed: missing Supabase client or persisted order ID')
    return
  }

  const statusKey = `pz-order-email:${orderId}`
  if (orderEmailAttempts.has(orderId)) {
    console.info('[order-email] duplicate attempt suppressed for order', orderId)
    return
  }
  try {
    if (localStorage.getItem(statusKey)) {
      console.info('[order-email] duplicate attempt suppressed for order', orderId)
      return
    }
  } catch (_) {}
  orderEmailAttempts.add(orderId)
  try { localStorage.setItem(statusKey, JSON.stringify({ status: 'sending', updated_at: new Date().toISOString() })) } catch (_) {}

  const persistedItems = Array.isArray(items) && items.length ? items : (Array.isArray(order.items) ? order.items : [])
  const sourceItems = persistedItems.length ? persistedItems : cartSnapshot
  const body = {
    order: {
      id: orderId,
      customer_name: String(order.customer_name ?? ''),
      phone: String(order.whatsapp_number ?? order.customer_phone ?? order.phone ?? ''),
      address: String(order.address_line ?? order.address ?? ''),
      governorate: String(order.governorate ?? ''),
      total: String(order.total_amount ?? order.total ?? normalizeOrder(order).total ?? 0),
    },
    items: sourceItems.map((item, index) => ({
      name: String(item.product_name ?? item.name ?? item.title ?? cartSnapshot[index]?.name ?? ''),
      quantity: Number(item.quantity ?? cartSnapshot[index]?.quantity ?? 0),
      price: Number(item.unit_price ?? item.price ?? cartSnapshot[index]?.price ?? 0),
    })),
  }

  try {
    const { data, error } = await db.functions.invoke('send-order-email', { body })
    if (error || data?.success === false || data?.error) {
      const reason = error?.message || data?.error || 'Edge Function reported failure'
      try { localStorage.setItem(statusKey, JSON.stringify({ status: 'failed', updated_at: new Date().toISOString(), reason: String(reason) })) } catch (_) {}
      console.error('[order-email] failed for order', orderId, String(reason))
      return
    }
    try { localStorage.setItem(statusKey, JSON.stringify({ status: 'sent', updated_at: new Date().toISOString() })) } catch (_) {}
    console.info('[order-email] sent for order', orderId)
  } catch (err) {
    const reason = String(err?.message || err || 'Unknown invocation error')
    try { localStorage.setItem(statusKey, JSON.stringify({ status: 'failed', updated_at: new Date().toISOString(), reason })) } catch (_) {}
    console.error('[order-email] failed for order', orderId, reason)
  }
}

const cartCount = () => state.cart.reduce((s, i) => s + i.quantity, 0)
const cartSubtotal = () => state.cart.reduce((s, i) => s + i.quantity * i.price, 0)

function saveCart() { localStorage.setItem('ab-cart', JSON.stringify(state.cart)) }
function setLang(l) { state.lang = l; localStorage.setItem('ab-lang', l); document.documentElement.lang = l; document.documentElement.dir = translations[l].dir; render() }

function toast(msg, type = 'success') {
  const el = document.createElement('div')
  el.className = `toast ${type}`
  el.textContent = msg
  document.body.appendChild(el)
  requestAnimationFrame(() => el.classList.add('show'))
  setTimeout(() => el.remove(), 2800)
}

function addToCart(product, opts = {}) {
  if (stockOf(product) <= 0) { toast(t('outOfStock'), 'error'); return }
  const qty = opts.quantity || 1
  const variant = opts.variant || null
  const variantId = variant ? variant.id : null
  const variantLabel = variant ? variantLabelOf(variant) : ''
  const basePrice = priceOf(product)
  const price = basePrice + (variant ? Number(variant.price_adjustment || 0) : 0)
  const existing = state.cart.find(i => sameId(i.id, product.id) && sameId(i.variant_id, variantId))
  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, stockOf(product))
  } else {
    state.cart.push({ id: product.id, name: pName(product), price, image_url: product.image_url, quantity: Math.min(qty, stockOf(product)), variant_id: variantId, variant_label: variantLabel, stock: stockOf(product) })
  }
  saveCart()
  toast(t('added'), 'success')
}

function updateQty(id, variantId, delta) {
  const item = state.cart.find(i => sameId(i.id, id) && sameId(i.variant_id, variantId))
  if (!item) return
  item.quantity = Math.max(1, Math.min(item.quantity + delta, item.stock))
  saveCart()
  render()
}

function removeFromCart(id, variantId) {
  state.cart = state.cart.filter(i => !(sameId(i.id, id) && sameId(i.variant_id, variantId)))
  saveCart()
  render()
}

/* ===== DATA LOADING ===== */
async function loadStore() {
  if (!db) {
    state.products = localProducts
    state.categories = localCategories
    state.loading = false
    return
  }
  const [prodRes, catRes, setRes] = await Promise.all([
    db.from('products').select('*').order('sort_order').order('created_at', { ascending: false }),
    db.from('categories').select('*').order('sort_order'),
    db.from('settings').select('*').eq('id', 1).maybeSingle()
  ])
  if (prodRes.error || catRes.error) throw new Error('catalog')
  state.products = prodRes.data || []
  state.categories = catRes.data || []
  if (setRes.data) state.settings = { ...state.settings,
    currency: setRes.data.currency || state.settings.currency,
    shipping_cost: Number(setRes.data.shipping_cost ?? state.settings.shipping_cost),
    free_shipping_threshold: Number(setRes.data.free_shipping_threshold ?? state.settings.free_shipping_threshold),
    free_shipping: !!setRes.data.free_shipping,
    whatsapp_number: state.settings.whatsapp_number || setRes.data.whatsapp || '',
    payment_enabled: false
  }

  if (state.products.length > 0) {
    const ids = state.products.map(p => p.id)
    const [imgRes, varRes] = await Promise.all([
      db.from('product_images').select('*').in('product_id', ids).order('sort_order'),
      db.from('product_variants').select('*').in('product_id', ids)
    ])
    state.images = {}
    ;(imgRes.data || []).forEach(img => { (state.images[img.product_id] = state.images[img.product_id] || []).push(img) })
    state.variants = {}
    ;(varRes.data || []).forEach(v => { (state.variants[v.product_id] = state.variants[v.product_id] || []).push(v) })
  }
}

async function loadProductDetail(slug) {
  if (!db) {
    const data = state.products.find(p => p.slug === slug)
    if (!data) { state.productSlug = null; state.page = 'products'; render(); return }
    state.selectedVariant = null
    state.qty = 1
    state.activeImage = 0
    state._detailProduct = { ...data, images: [], variants: [] }
    render()
    return
  }
  const { data } = await db.from('products').select('*').eq('slug', slug).maybeSingle()
  if (!data) { state.productSlug = null; state.page = 'products'; render(); return }
  state.selectedVariant = null
  state.qty = 1
  state.activeImage = 0
  const [imgRes, varRes] = await Promise.all([
    db.from('product_images').select('*').eq('product_id', data.id).order('sort_order'),
    db.from('product_variants').select('*').eq('product_id', data.id)
  ])
  data.images = imgRes.data || []
  data.variants = varRes.data || []
  state._detailProduct = data
  render()
}

/* ===== REALTIME ===== */
function setupRealtime() {
  if (!db) return
  db.channel('store-rt')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => loadStore().then(() => render()))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => loadStore().then(() => render()))
    .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => loadStore().then(() => render()))
    .subscribe()
}

/* ===== RENDER ===== */
function render() {
  document.documentElement.lang = state.lang
  document.documentElement.dir = translations[state.lang].dir
  const app = document.getElementById('app')
  if (state.page === 'home') app.innerHTML = homePage()
  else if (state.page === 'products') app.innerHTML = productsPage()
  else if (state.page === 'product-detail') app.innerHTML = productDetailPage()
  else if (state.page === 'success') app.innerHTML = successPage()
  bindEvents()
  setupHeroCarousel()
}

function activeProducts() {
  return state.products.filter(p =>
    p.is_active !== false &&
    (!state.query || pName(p).toLowerCase().includes(state.query.toLowerCase()) || pDesc(p).toLowerCase().includes(state.query.toLowerCase())) &&
    (state.filter === 'all' || sameId(p.category_id, state.filter))
  )
}

/* ===== PAGES ===== */
function homePage() {
  const products = activeProducts()
  const cats = state.categories
  return shell(`
    <div class="announcement"><span class="pulse-dot"></span><span>${t('heroMeta')}</span><span class="announcement-separator">///</span><span>24/7 ${t('support')}</span></div>
    ${header()}
    <main id="top">
      ${hero()}
      ${trustStrip()}
      ${categoriesSection(cats)}
      ${productsSection(products)}
      ${manifesto()}
      ${review()}
      ${newsletter()}
    </main>
    ${footer()}
    ${state.modal === 'cart' ? cartModal() : ''}
    ${state.modal === 'checkout' ? checkoutModal() : ''}
  `)
}

function productsPage() {
  const products = activeProducts()
  return shell(`
    <div class="announcement"><span class="pulse-dot"></span><span>${t('heroMeta')}</span></div>
    ${header()}
    <main id="top" style="padding-top: 40px;">
      <section class="section products-section">
        <div class="section-heading">
          <div><span class="section-kicker">02 / CURATED LOADOUT</span><h2>${state.query ? t('searchResults') : t('featured')}</h2><p>${state.query ? esc(state.query) : t('featuredSub')}</p></div>
          <div class="filter-tabs">
            <button class="filter-tab ${state.filter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>
            ${state.categories.slice(0, 5).map(c => `<button class="filter-tab ${sameId(state.filter, c.id) ? 'active' : ''}" data-filter="${c.id}">${esc(cName(c))}</button>`).join('')}
          </div>
        </div>
        <div class="product-grid">${products.length ? products.map(productCard).join('') : `<div class="empty-state">${state.query ? t('noSearch') : t('noProducts')}</div>`}</div>
      </section>
    </main>
    ${footer()}
    ${state.modal === 'cart' ? cartModal() : ''}
    ${state.modal === 'checkout' ? checkoutModal() : ''}
  `)
}

function productDetailPage() {
  const p = state._detailProduct
  if (!p) return shell(`<div class="announcement"><span class="pulse-dot"></span><span>${t('heroMeta')}</span></div>${header()}<main id="top" style="padding-top:60px"><div class="section"><div class="empty-state">${t('noProducts')}</div></div></main>${footer()}`)
  const name = pName(p), desc = pDesc(p)
  const eff = priceOf(p), disc = discountPct(p)
  const out = stockOf(p) <= 0
  const st = stockOf(p)
  const imgs = [p.image_url, ...(Array.isArray(p.gallery_images) ? p.gallery_images : []), ...((state.images[p.id] || []).map(i => i.image_url))].filter(Boolean)
  const variants = state.variants[p.id] || p.variants || []
  return shell(`
    <div class="announcement"><span class="pulse-dot"></span><span>${t('heroMeta')}</span></div>
    ${header()}
    <main id="top" style="padding-top: 40px;">
      <div class="product-detail">
        <div>
          <div class="gallery-main"><img src="${esc(imgs[state.activeImage] || p.image_url)}" alt="${esc(name)}"></div>
          ${imgs.length > 1 ? `<div class="gallery-thumbs">${imgs.map((img, i) => `<button class="gallery-thumb ${i === state.activeImage ? 'active' : ''}" data-img="${i}"><img src="${esc(img)}" alt=""></button>`).join('')}</div>` : ''}
        </div>
        <div class="detail-info">
          <button class="text-button" data-action="back-products" style="margin-bottom:16px">← ${t('back')}</button>
          <span class="detail-code">AB / ${String(p.id).slice(0, 4).toUpperCase()}</span>
          <h1>${esc(name)}</h1>
          <div class="detail-price">
            <span class="now">${money(eff)}</span>
            ${disc > 0 ? `<span class="was">${money(p.price)}</span><span class="save">-${disc}%</span>` : ''}
          </div>
          <p class="detail-desc">${esc(desc)}</p>
          ${variants.length ? `<div class="variant-block"><span class="variant-label">${t('selectVariant')}</span><div class="variant-options">${variants.map(v => `<button class="variant-chip ${state.selectedVariant?.id === v.id ? 'selected' : ''}" data-variant="${v.id}" ${(v.stock ?? 1) <= 0 ? 'disabled' : ''}>${esc(variantLabelOf(v))}</button>`).join('')}</div></div>` : ''}
          <div class="stock-indicator ${out ? 'out' : st <= 5 ? 'low' : 'in'}">${out ? t('outOfStock') : st <= 5 ? `${t('lowStock')} ${st}` : t('inStock')}</div>
          <div class="qty-row"><span style="font-size:12px;color:#c8d0db">${t('quantity')}</span><div class="qty-control"><button data-qty="-1">−</button><b>${state.qty}</b><button data-qty="1">+</button></div></div>
          <div class="detail-actions">
            <button class="primary-button" data-action="add-detail" ${out ? 'disabled' : ''}>${t('add')}</button>
            <button class="ghost-button" data-action="buynow" ${out ? 'disabled' : ''}>${t('buyNow')}</button>
          </div>
        </div>
      </div>
    </main>
    ${footer()}
    ${state.modal === 'cart' ? cartModal() : ''}
    ${state.modal === 'checkout' ? checkoutModal() : ''}
  `)
}

function successPage() {
  const o = state.lastOrder
  if (!o) { state.page = 'home'; return homePage() }
  return shell(`
    <div class="announcement"><span class="pulse-dot"></span><span>${t('heroMeta')}</span></div>
    ${header()}
    <main id="top">
      <section class="success-page">
        <div class="success-icon-wrap">✓</div>
        <span class="section-kicker">MISSION COMPLETE</span>
        <h2>${t('success')}</h2>
        <p class="success-desc">${t('successText')}</p>
        ${o.payment_method === 'online' ? `<div class="payment-handoff"><strong>${t('onlinePendingTitle')}</strong><p>${t('onlinePendingText')}</p><button class="primary-button full" data-action="order-whatsapp">${t('contactWhatsApp')} ↗</button></div>` : ''}
        <div class="order-info-card">
          <div class="info-row"><span>${t('orderId')}</span><strong>${esc(o.order_number)}</strong></div>
          <div class="info-row"><span>${t('name')}</span><strong>${esc(o.customer_name || '')}</strong></div>
          <div class="info-row"><span>${t('paymentMethod')}</span><strong>${o.payment_method === 'cod' ? t('cod') : t('online')}</strong></div>
          <div class="info-row"><span>${t('orderStatus')}</span><strong class="status-badge ${o.status}">${t(o.status)}</strong></div>
          <div class="info-row"><span>${t('paymentStatus')}</span><strong class="status-badge ${o.payment_status}">${t(o.payment_status)}</strong></div>
          <div class="info-row total"><span>${t('total')}</span><strong>${money(o.total)}</strong></div>
        </div>
        <button class="primary-button" data-action="continue-shopping">${t('continue')}</button>
      </section>
    </main>
    ${footer()}
  `)
}

/* ===== PARTIALS ===== */
function shell(content) { return `<div class="site-shell">${content}<a class="whatsapp-float" href="${whatsappHref()}" target="_blank" rel="noopener noreferrer" aria-label="تواصل معنا على واتساب"><span class="wa-mark">WA</span><span>واتساب</span></a></div>` }

function header() {
  return `<header class="site-header">
    <a class="brand" data-nav="home"><span class="brand-mark">PZ</span><span><strong>PUBG ZONE</strong><small>STORE / 2026</small></span></a>
    <nav class="desktop-nav">
      <a data-nav="home">${t('navHome')}</a>
      <a data-nav="products">${t('navProducts')}</a>
      <a data-scroll="categories">${t('categories')}</a>
    </nav>
    <div class="header-actions">
      <label class="search-box"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 5 5"></path></svg><input id="searchInput" value="${esc(state.query)}" placeholder="${t('search')}"></label>
      <button class="language-switch" data-action="lang">${t('language')}</button>
      <button class="icon-button" data-action="cart" aria-label="${t('cart')}"><svg viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8Z"></path><path d="M9 8a3 3 0 0 1 6 0"></path></svg>${cartCount() > 0 ? `<span class="cart-badge">${cartCount()}</span>` : ''}</button>
    </div>
  </header>`
}

function hero() {
  return `<section class="hero-section">
    <div class="hero-copy">
      <div class="eyebrow"><span></span>${t('heroEyebrow')}</div>
      <h1>${t('heroTitle')}<em>${t('heroAccent')}</em></h1>
      <p>${t('heroText')}</p>
      <div class="hero-actions">
        <button class="primary-button" data-nav="products">${t('shopNow')} →</button>
        <button class="ghost-button" data-scroll="categories">${t('explore')}</button>
      </div>
      <div class="hero-offer"><strong>${t('offerValue')}</strong><span>${t('offer')}<br>${t('featuredSub')}</span></div>
    </div>
    <div class="hero-visual">
      <div class="hero-grid"></div><div class="hero-ring ring-one"></div><div class="hero-ring ring-two"></div>
      <div class="hero-image-stage"><img id="heroProductImage" class="hero-product-image" src="${heroGallery[0]}" alt="مدفع مياه كهربائي دوّار بإضاءة LED"></div>
      <div class="hero-chip chip-top">DUAL ROTATING <span>///</span> LED</div>
      <div class="hero-chip chip-bottom">USB <span>—</span> RECHARGEABLE</div>
      <div class="hero-gallery-controls" aria-label="صور المنتج">${heroGallery.map((_, i) => `<button type="button" class="hero-gallery-dot ${i === 0 ? 'active' : ''}" data-hero-slide="${i}" aria-label="صورة المنتج ${i + 1}"></button>`).join('')}</div>
    </div>
  </section>`
}

let heroCarouselTimer = null
function showHeroSlide(index) {
  const image = document.getElementById('heroProductImage')
  if (!image) return
  const activeIndex = index % heroGallery.length
  image.classList.add('is-changing')
  window.setTimeout(() => {
    image.src = heroGallery[activeIndex]
    image.classList.remove('is-changing')
  }, 160)
  document.querySelectorAll('[data-hero-slide]').forEach(dot => dot.classList.toggle('active', Number(dot.dataset.heroSlide) === activeIndex))
}

function setupHeroCarousel() {
  if (heroCarouselTimer) window.clearInterval(heroCarouselTimer)
  const image = document.getElementById('heroProductImage')
  if (!image) return
  let activeIndex = 0
  document.querySelectorAll('[data-hero-slide]').forEach(dot => dot.addEventListener('click', () => {
    activeIndex = Number(dot.dataset.heroSlide)
    showHeroSlide(activeIndex)
  }))
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  heroCarouselTimer = window.setInterval(() => {
    activeIndex = (activeIndex + 1) % heroGallery.length
    showHeroSlide(activeIndex)
  }, 4800)
}

function trustStrip() {
  return `<section class="trust-strip">
    <div><b>01</b><span><strong>${t('shipping')}</strong>${t('shippingText')}</span></div>
    <div><b>02</b><span><strong>${t('quality')}</strong>${t('qualityText')}</span></div>
    <div><b>03</b><span><strong>${t('support')}</strong>${t('supportText')}</span></div>
    <div><b>04</b><span><strong>SECURE</strong>Checkout built for speed</span></div>
  </section>`
}

function categoriesSection(cats) {
  return `<section class="section categories-section" id="categories">
    <div class="section-heading"><div><span class="section-kicker">01 / SELECT YOUR MODE</span><h2>${t('categories')}</h2><p>${t('categoriesSub')}</p></div><button class="text-button" data-filter="all">${t('all')} →</button></div>
    <div class="category-grid">${cats.map((c, i) => categoryCard(c, i)).join('')}</div>
  </section>`
}

function categoryCard(c, i) {
  return `<button class="category-card" data-filter="${c.id}">
    <img loading="lazy" src="${esc(c.image_url)}" alt="${esc(cName(c))}">
    <span class="category-overlay"></span>
    <span class="category-index">0${i + 1}</span>
    <span class="category-info"><strong>${esc(cName(c))}</strong><small>${esc(cDesc(c))}</small></span>
    <span class="category-arrow">→</span>
  </button>`
}

function productsSection(products) {
  return `<section class="section products-section" id="products">
    <div class="section-heading"><div><span class="section-kicker">02 / CURATED LOADOUT</span><h2>${t('featured')}</h2><p>${t('featuredSub')}</p></div>
    <div class="filter-tabs">
      <button class="filter-tab ${state.filter === 'all' ? 'active' : ''}" data-filter="all">${t('all')}</button>
      ${state.categories.slice(0, 4).map(c => `<button class="filter-tab ${sameId(state.filter, c.id) ? 'active' : ''}" data-filter="${c.id}">${esc(cName(c))}</button>`).join('')}
    </div></div>
    <div class="product-grid">${state.loading ? `<div class="empty-state">${t('loading')}</div>` : products.length ? products.map(productCard).join('') : `<div class="empty-state">${t('noProducts')}</div>`}</div>
  </section>`
}

function productCard(p) {
  const eff = priceOf(p), disc = discountPct(p), out = stockOf(p) <= 0
  return `<article class="product-card" data-product="${esc(p.slug)}">
    <div class="product-image-wrap">
      <img loading="lazy" src="${esc(p.image_url)}" alt="${esc(pName(p))}">
      <button class="heart-button ${state.wishlist.includes(String(p.id)) ? 'active' : ''}" data-wish="${esc(p.id)}"><svg viewBox="0 0 24 24"><path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"></path></svg></button>
      ${out ? `<span class="product-badge out">${t('outOfStock')}</span>` : p.badge ? `<span class="product-badge ${p.badge === 'NEW' ? 'blue' : ''}">${esc(p.badge)}</span>` : disc ? `<span class="product-badge">-${disc}%</span>` : ''}
      <button class="quick-add" data-add="${p.id}" ${out ? 'disabled' : ''}>${out ? t('outOfStock') : `${t('add')} +`}</button>
    </div>
    <div class="product-meta">
      <span class="product-code">AB / ${String(p.id).slice(0, 4).toUpperCase()}</span>
      <h3>${esc(pName(p))}</h3>
      <p>${esc(pDesc(p))}</p>
      <div class="product-bottom">
        <span class="product-price">${money(eff)}${disc ? `<del>${money(p.price)}</del>` : ''}</span>
        ${p.rating != null && Number(p.rating) > 0 ? `<span class="rating">${Number(p.rating).toFixed(1)} <b>★</b> <small>(${p.review_count || 0})</small></span>` : ''}
      </div>
    </div>
  </article>`
}

function manifesto() {
  return `<section class="manifesto" id="best">
    <div><span class="section-kicker">03 / BUILT DIFFERENT</span><h2>${t('why')}</h2><p>${t('whySub')}</p></div>
    <div class="manifesto-points">
      <article><b>01</b><strong>${t('shipping')}</strong><span>${t('shippingText')}</span></article>
      <article><b>02</b><strong>${t('quality')}</strong><span>${t('qualityText')}</span></article>
      <article><b>03</b><strong>${t('support')}</strong><span>${t('supportText')}</span></article>
    </div>
    <div class="manifesto-art"><span>AB</span><i></i><i></i></div>
  </section>`
}

function review() {
  return `<section class="spec-spotlight"><div class="spec-spotlight-heading"><span class="section-kicker">04 / PRODUCT FEATURES</span><h2>${state.lang === 'ar' ? 'تفاصيل اللعبة' : 'The details that hit different'}</h2></div><div class="spec-spotlight-grid"><article><b>01</b><strong>${state.lang === 'ar' ? 'سبطانتان دوّارتان' : 'Dual rotating barrels'}</strong><span>${state.lang === 'ar' ? 'حركة كهربائية بتصميم Gatling' : 'Electric motion in a Gatling-inspired design'}</span></article><article><b>02</b><strong>${state.lang === 'ar' ? 'مؤثر إضاءة LED' : 'Glowing LED effect'}</strong><span>${state.lang === 'ar' ? 'لمسة مضيئة أثناء اللعب' : 'A light-up effect while you play'}</span></article><article><b>03</b><strong>${state.lang === 'ar' ? 'شحن USB' : 'USB rechargeable'}</strong><span>${state.lang === 'ar' ? 'اشحنه واستعد للجولة التالية' : 'Recharge and get ready for another round'}</span></article><article><b>04</b><strong>${state.lang === 'ar' ? 'مدى يصل إلى 15 مترًا' : 'Up to 15 m range'}</strong><span>${state.lang === 'ar' ? 'مدى الإطلاق المذكور للمنتج' : 'Product shooting range as listed'}</span></article></div></section>`
}

function newsletter() {
  return `<section class="newsletter" id="deals"><div><span class="section-kicker">DROP ALERTS</span><h2>${t('newsletter')}</h2><p>${t('newsletterText')}</p></div><form id="newsletterForm"><input type="email" placeholder="${t('email')}" required><button class="primary-button" type="submit">${t('subscribe')} →</button></form></section>`
}

function footer() {
  return `<footer class="footer"><a class="brand" data-nav="home"><span class="brand-mark">PZ</span><span><strong>PUBG ZONE</strong><small>STORE / 2026</small></span></a><span>© 2026 PUBG ZONE. ${t('support')}.</span><a class="whatsapp-button" data-action="whatsapp" href="${whatsappHref()}" target="_blank" rel="noopener noreferrer">WHATSAPP <span>↗</span></a></footer>`
}

/* ===== CART MODAL ===== */
function cartModal() {
  const sub = cartSubtotal()
  const threshold = Number(state.settings.free_shipping_threshold || 1000)
  const shipCost = Number(state.settings.shipping_cost || 60)
  const shipping = state.settings.free_shipping ? 0 : (sub >= threshold ? 0 : (state.cart.length > 0 ? shipCost : 0))
  const total = sub + shipping
  return `<div class="modal-backdrop" id="modalBackdrop">
    <aside class="side-modal">
      <div class="modal-header"><div><span class="section-kicker">YOUR LOADOUT</span><h2>${t('cart')} <sup>${state.cart.length}</sup></h2></div><button class="close-button" data-action="close-modal">✕</button></div>
      ${state.cart.length === 0 ? `<div class="empty-cart"><div class="empty-orbit">AB</div><h3>${t('emptyCart')}</h3><button class="ghost-button" data-nav="products" data-close-modal>${t('continue')}</button></div>` : `
      <div class="cart-items">
        ${state.cart.map(item => `<div class="cart-item">
          <img src="${esc(item.image_url)}" alt="">
          <div><strong>${esc(item.name)}</strong>${item.variant_label ? `<span class="item-variant">${esc(item.variant_label)}</span>` : ''}<span class="item-price">${money(item.price)}</span>
          <div class="quantity"><button data-minus="${item.id}" data-vid="${item.variant_id || ''}">−</button><b>${item.quantity}</b><button data-plus="${item.id}" data-vid="${item.variant_id || ''}">+</button></div></div>
          <button class="remove-item" data-remove="${item.id}" data-vid="${item.variant_id || ''}">${t('remove')}</button>
        </div>`).join('')}
      </div>
      <div class="cart-summary">
        <div class="summary-row"><span>${t('subtotal')}</span><span>${money(sub)}</span></div>
        <div class="summary-row"><span>${t('shippingCost')}</span><span>${shipping === 0 ? t('freeShipping') : money(shipping)}</span></div>
        <div class="summary-row total-row"><span>${t('total')}</span><strong>${money(total)}</strong></div>
        <small>${sub < threshold ? t('shippingText') : t('freeShipping')}</small>
        <button class="primary-button full" data-action="checkout">${t('checkout')} →</button>
      </div>`}
    </aside>
  </div>`
}

/* ===== CHECKOUT MODAL ===== */
function checkoutModal() {
  const sub = cartSubtotal()
  const threshold = Number(state.settings.free_shipping_threshold || 1000)
  const shipCost = Number(state.settings.shipping_cost || 60)
  const afterDisc = sub - state.discount
  const shipping = state.settings.free_shipping ? 0 : (afterDisc >= threshold ? 0 : shipCost)
  const total = afterDisc + shipping
  const steps = [t('stepInfo'), t('stepPayment'), t('stepConfirm')]
  return `<div class="modal-backdrop" id="modalBackdrop">
    <aside class="side-modal" style="width:min(560px,100%)">
      <div class="modal-header"><div><span class="section-kicker">FINAL CHECKPOINT</span><h2>${t('checkoutTitle')}</h2><p>${t('checkoutSub')}</p></div><button class="close-button" data-action="close-modal">✕</button></div>
      <div class="checkout-steps">${steps.map((l, i) => `<div class="checkout-step ${state.checkoutStep === i + 1 ? 'active' : state.checkoutStep > i + 1 ? 'done' : ''}"><b>${t('step')} ${i + 1}</b>${l}</div>`).join('')}</div>
      <div class="checkout-form" id="checkoutFormContainer">
        ${state.checkoutStep === 1 ? checkoutStep1() : ''}
        ${state.checkoutStep === 2 ? checkoutStep2() : ''}
        ${state.checkoutStep === 3 ? checkoutStep3(sub, shipping, total) : ''}
      </div>
    </aside>
  </div>`
}

function checkoutStep1() {
  return `<label class="form-field">${t('name')}<input id="co_name" required></label>
  <div class="form-grid-2">
    <label class="form-field">${t('phone')}<input id="co_phone" inputmode="tel" required></label>
    <label class="form-field">${t('whatsapp')}<input id="co_wa" inputmode="tel"></label>
  </div>
  <div class="form-grid-2">
    <label class="form-field">${t('governorate')}<input id="co_gov" required></label>
    <label class="form-field">${t('city')}<input id="co_city"></label>
  </div>
  <label class="form-field">${t('address')}<textarea id="co_addr" rows="3" required></textarea></label>
  <label class="form-field">${t('landmark')}<input id="co_lm"></label>
  <label class="form-field">${t('notes')}<textarea id="co_notes" rows="2"></textarea></label>
  <button class="primary-button full" data-action="checkout-next">${t('next')} →</button>`
}

function checkoutStep2() {
  return `<div class="payment-options">
    <label class="payment-option ${state.paymentMethod === 'cod' ? 'selected' : ''}"><input type="radio" name="pay" ${state.paymentMethod === 'cod' ? 'checked' : ''} data-pay="cod"><div><strong>🚚 ${t('cod')}</strong><small>${t('shippingText')}</small></div></label>
    <label class="payment-option ${state.paymentMethod === 'online' ? 'selected' : ''}"><input type="radio" name="pay" ${state.paymentMethod === 'online' ? 'checked' : ''} data-pay="online"><div><strong>💳 ${t('online')}</strong><small>${t('paymentNotConfigured')}</small></div></label>
  </div>
  <div style="display:flex;gap:10px"><button class="ghost-button" data-action="checkout-back">← ${t('back')}</button><button class="primary-button full" data-action="checkout-next">${t('next')} →</button></div>`
}

function checkoutStep3(sub, shipping, total) {
  return `<div class="coupon-row"><input id="co_coupon" value="${esc(state.couponCode)}" placeholder="${t('couponCode')}" ${state.couponApplied ? 'disabled' : ''}><button data-action="apply-coupon" ${state.couponApplied ? 'disabled' : ''}>${t('applyCoupon')}</button></div>
  ${state.couponApplied ? `<div class="coupon-applied"><span>${t('couponApplied')}: ${esc(state.couponCode)}</span><button data-action="remove-coupon" style="background:none;border:0;color:var(--green);cursor:pointer">✕</button></div>` : ''}
  <h3 style="font:10px var(--display);color:var(--blue);letter-spacing:1px;margin-bottom:12px">${t('orderSummary')}</h3>
  <div style="max-height:200px;overflow-y:auto;margin-bottom:16px">
    ${state.cart.map(item => `<div class="cart-item"><img src="${esc(item.image_url)}" style="width:48px;height:48px"><div><strong style="font-size:11px">${esc(item.name)}</strong>${item.variant_label ? `<span class="item-variant">${esc(item.variant_label)}</span>` : ''}<span class="item-price">${money(item.price)} × ${item.quantity}</span></div><span style="font-size:11px;color:var(--orange);font-weight:700">${money(item.price * item.quantity)}</span></div>`).join('')}
  </div>
  <div class="cart-summary" style="border-top:1px solid var(--line);padding-top:16px">
    <div class="summary-row"><span>${t('subtotal')}</span><span>${money(sub)}</span></div>
    ${state.discount > 0 ? `<div class="summary-row"><span>${t('discount')}</span><span style="color:var(--green)">-${money(state.discount)}</span></div>` : ''}
    <div class="summary-row"><span>${t('shippingCost')}</span><span>${shipping === 0 ? t('freeShipping') : money(shipping)}</span></div>
    <div class="summary-row total-row"><span>${t('total')}</span><strong>${money(total)}</strong></div>
  </div>
  <div style="display:flex;gap:10px;margin-top:20px"><button class="ghost-button" data-action="checkout-back">← ${t('back')}</button><button class="primary-button full" data-action="submit-order">${t('confirm')}</button></div>`
}

/* ===== EVENT BINDING ===== */
function bindEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault()
    const page = el.dataset.nav
    state.page = page
    state.query = ''
    state.modal = null
    render()
    window.scrollTo(0, 0)
  }))

  document.querySelectorAll('[data-scroll]').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.getElementById(el.dataset.scroll)
    target?.scrollIntoView({ behavior: 'smooth' })
  }))

  document.querySelector('[data-action="lang"]')?.addEventListener('click', () => setLang(state.lang === 'ar' ? 'en' : 'ar'))

  const searchInput = document.getElementById('searchInput')
  if (searchInput) searchInput.addEventListener('input', (e) => {
    state.query = e.target.value
    if (state.page !== 'products') { state.page = 'products'; render(); return }
    clearTimeout(window._searchTimer)
    window._searchTimer = setTimeout(() => render(), 200)
  })

  document.querySelector('[data-action="cart"]')?.addEventListener('click', () => { state.modal = 'cart'; render() })
  document.querySelector('[data-action="close-modal"]')?.addEventListener('click', () => { state.modal = null; render() })
  document.querySelector('[data-close-modal]')?.addEventListener('click', () => { state.modal = null; render() })
  document.getElementById('modalBackdrop')?.addEventListener('click', (e) => { if (e.target.id === 'modalBackdrop') { state.modal = null; render() } })

  document.querySelectorAll('[data-plus]').forEach(btn => btn.addEventListener('click', () => updateQty(btn.dataset.plus, btn.dataset.vid || null, 1)))
  document.querySelectorAll('[data-minus]').forEach(btn => btn.addEventListener('click', () => updateQty(btn.dataset.minus, btn.dataset.vid || null, -1)))
  document.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => removeFromCart(btn.dataset.remove, btn.dataset.vid || null)))

  document.querySelector('[data-action="checkout"]')?.addEventListener('click', () => { state.modal = 'checkout'; state.checkoutStep = 1; state.discount = 0; state.couponCode = ''; state.couponApplied = false; render() })
  document.querySelector('[data-action="checkout-next"]')?.addEventListener('click', checkoutNext)
  document.querySelector('[data-action="checkout-back"]')?.addEventListener('click', () => { state.checkoutStep--; render() })
  document.querySelectorAll('[data-pay]').forEach(r => r.addEventListener('change', () => { state.paymentMethod = r.dataset.pay; render() }))
  document.querySelector('[data-action="apply-coupon"]')?.addEventListener('click', applyCoupon)
  document.querySelector('[data-action="remove-coupon"]')?.addEventListener('click', () => { state.couponApplied = false; state.couponCode = ''; state.discount = 0; render() })
  document.querySelector('[data-action="submit-order"]')?.addEventListener('click', submitOrder)
  document.querySelector('[data-action="order-whatsapp"]')?.addEventListener('click', () => {
    if (state.lastOrder) openOrderWhatsApp(state.lastOrder)
  })

  document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter
    state.page = 'products'
    render()
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }))

  document.querySelectorAll('[data-add]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation()
    const p = state.products.find(x => sameId(x.id, btn.dataset.add))
    if (p) addToCart(p)
  }))

  document.querySelectorAll('[data-wish]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation()
    const id = String(btn.dataset.wish)
    state.wishlist = state.wishlist.includes(id) ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id]
    localStorage.setItem('ab-wishlist', JSON.stringify(state.wishlist))
    render()
  }))

  document.querySelectorAll('[data-product]').forEach(el => el.addEventListener('click', () => {
    state.page = 'product-detail'
    state.productSlug = el.dataset.product
    render()
    loadProductDetail(state.productSlug)
    window.scrollTo(0, 0)
  }))

  document.querySelector('[data-action="back-products"]')?.addEventListener('click', () => { state.page = 'products'; state._detailProduct = null; render() })
  document.querySelectorAll('[data-variant]')?.forEach(btn => btn.addEventListener('click', () => {
    const v = (state._detailProduct.variants || state.variants[state._detailProduct.id] || []).find(x => sameId(x.id, btn.dataset.variant))
    state.selectedVariant = v
    render()
  }))
  document.querySelectorAll('[data-qty]')?.forEach(btn => btn.addEventListener('click', () => {
    const delta = parseInt(btn.dataset.qty)
    state.qty = Math.max(1, state.qty + delta)
    render()
  }))
  document.querySelector('[data-action="add-detail"]')?.addEventListener('click', () => {
    if (!state._detailProduct) return
    addToCart(state._detailProduct, { quantity: state.qty, variant: state.selectedVariant })
  })
  document.querySelector('[data-action="buynow"]')?.addEventListener('click', () => {
    if (!state._detailProduct) return
    addToCart(state._detailProduct, { quantity: state.qty, variant: state.selectedVariant })
    state.modal = 'checkout'
    state.checkoutStep = 1
    render()
  })
  document.querySelectorAll('[data-img]')?.forEach(btn => btn.addEventListener('click', () => {
    state.activeImage = parseInt(btn.dataset.img)
    render()
  }))

  document.querySelector('[data-action="continue-shopping"]')?.addEventListener('click', () => {
    state.page = 'home'
    state.lastOrder = null
    state.modal = null
    render()
    window.scrollTo(0, 0)
  })

  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault()
    toast(state.lang === 'ar' ? 'تم الاشتراك بنجاح' : 'You are on the list', 'success')
    e.target.reset()
  })

  document.querySelectorAll('[data-action="whatsapp"]').forEach(link => link.addEventListener('click', (event) => {
    event.preventDefault()
    window.open(whatsappHref(), '_blank', 'noopener,noreferrer')
  }))
}

/* ===== CHECKOUT LOGIC ===== */
function checkoutNext() {
  if (state.checkoutStep === 1) {
    const name = document.getElementById('co_name')?.value.trim()
    const phone = document.getElementById('co_phone')?.value.trim()
    const gov = document.getElementById('co_gov')?.value.trim()
    const addr = document.getElementById('co_addr')?.value.trim()
    if (!name || !phone || !gov || !addr) { toast(t('required'), 'error'); return }
    state._checkoutData = {
      customer_name: name, customer_phone: phone, whatsapp_number: document.getElementById('co_wa')?.value.trim() || phone,
      governorate: gov, city: document.getElementById('co_city')?.value.trim() || '', address: addr,
      landmark: document.getElementById('co_lm')?.value.trim() || '', notes: document.getElementById('co_notes')?.value.trim() || ''
    }
    state.checkoutStep = 2
    render()
  } else if (state.checkoutStep === 2) {
    state.checkoutStep = 3
    render()
  }
}

async function applyCoupon() {
  const code = document.getElementById('co_coupon')?.value.trim()
  if (!code) return
  if (!db) { toast(t('couponInvalid'), 'error'); return }
  const sub = cartSubtotal()
  const { data: c } = await db.from('coupons').select('*').eq('code', code).eq('is_active', true).maybeSingle()
  const now = new Date()
  const badDate = c && (
    (c.expires_at && new Date(c.expires_at) < now) ||
    (c.end_date && new Date(c.end_date + 'T23:59:59') < now) ||
    (c.starts_at && new Date(c.starts_at) > now) ||
    (c.start_date && new Date(c.start_date + 'T00:00:00') > now) ||
    (c.usage_limit != null && Number(c.used_count || 0) >= Number(c.usage_limit)) ||
    (sub < Number(c.min_order_amount || 0)))
  if (!c || badDate) { toast(t('couponInvalid'), 'error'); render(); return }
  let d = c.discount_type === 'percentage' ? sub * Number(c.discount_value) / 100 : Number(c.discount_value)
  if (c.max_discount != null) d = Math.min(d, Number(c.max_discount))
  state.discount = Math.round(Math.min(d, sub) * 100) / 100
  state.couponCode = code
  state.couponApplied = true
  toast(t('couponApplied'), 'success')
  render()
}

async function submitOrder() {
  if (state.cart.length === 0) return
  const whatsappPopup = state.paymentMethod === 'online' ? window.open('about:blank', '_blank') : null
  const cartSnapshot = state.cart.map(item => ({ ...item }))
  const payload = {
    items: state.cart.map(item => ({ product_id: item.id, variant_id: item.variant_id || null, variant_label: item.variant_label || '', quantity: item.quantity })),
    ...state._checkoutData,
    payment_method: state.paymentMethod,
    coupon_code: state.couponApplied ? state.couponCode : ''
  }
  const btn = document.querySelector('[data-action="submit-order"]')
  if (btn) { btn.disabled = true; btn.textContent = t('loading') }

  if (!db) {
    const subtotal = cartSubtotal()
    const shipping = subtotal >= state.settings.free_shipping_threshold ? 0 : state.settings.shipping_cost
    state.lastOrder = normalizeOrder({
      order_number: `PZ-${Date.now().toString().slice(-8)}`,
      customer_name: state._checkoutData.customer_name,
      customer_phone: state._checkoutData.customer_phone,
      whatsapp_number: state._checkoutData.whatsapp_number,
      governorate: state._checkoutData.governorate,
      city: state._checkoutData.city,
      address: state._checkoutData.address,
      landmark: state._checkoutData.landmark,
      notes: state._checkoutData.notes,
      payment_method: state.paymentMethod,
      status: 'pending',
      payment_status: 'unpaid',
      subtotal,
      discount: state.discount,
      shipping_cost: shipping,
      total: Math.max(0, subtotal - state.discount + shipping),
      created_at: new Date().toISOString(),
    }, cartSnapshot.map(item => ({ product_name: item.name, quantity: item.quantity, price: item.price, product_image: item.image_url, variant_label: item.variant_label })))
    if (state.paymentMethod === 'online') openOrderWhatsApp(state.lastOrder, whatsappPopup, false)
    state.cart = []
    saveCart()
    state.modal = null
    state.page = 'success'
    toast(t('success'), 'success')
    render()
    window.scrollTo(0, 0)
    return
  }

  const { data, error } = await db.rpc('create_order', { p_payload: payload })
  if (error || !data) {
    if (whatsappPopup && !whatsappPopup.closed) whatsappPopup.close()
    if (btn) { btn.disabled = false; btn.textContent = t('confirm') }
    const msg = String(error?.message || '')
    if (msg.includes('OUT_OF_STOCK')) toast(t('outOfStock'), 'error')
    else if (msg.includes('COUPON')) toast(t('couponInvalid'), 'error')
    else toast(t('required'), 'error')
    return
  }

  const orderData = data.order || data
  const itemsData = data.items || orderData.items || []
  const normalizedOrder = normalizeOrder(orderData, itemsData)
  const customer = state._checkoutData || {}
  state.lastOrder = {
    ...normalizedOrder,
    customer_name: normalizedOrder.customer_name || customer.customer_name || '',
    customer_phone: normalizedOrder.customer_phone || customer.customer_phone || '',
    whatsapp_number: normalizedOrder.whatsapp_number || customer.whatsapp_number || '',
    governorate: normalizedOrder.governorate || customer.governorate || '',
    city: normalizedOrder.city || customer.city || '',
    address: normalizedOrder.address || customer.address || '',
    landmark: normalizedOrder.landmark || customer.landmark || '',
    notes: normalizedOrder.notes || customer.notes || '',
    payment_method: state.paymentMethod,
    items: normalizedOrder.items.length
      ? normalizedOrder.items.map((item, index) => ({ ...item, product_name: item.product_name || item.name || cartSnapshot[index]?.name || '', quantity: item.quantity || cartSnapshot[index]?.quantity || 1, price: item.price || cartSnapshot[index]?.price || 0 }))
      : cartSnapshot.map(item => ({ product_name: item.name, quantity: item.quantity, price: item.price, product_image: item.image_url, variant_label: item.variant_label }))
  }
  if (state.paymentMethod === 'online') openOrderWhatsApp(state.lastOrder, whatsappPopup, false)
  // Notify only after create_order has returned a persisted order; email failures never undo checkout.
  void notifyOrderEmail(orderData, itemsData, state.cart.map(item => ({ ...item })))
  state.cart = []
  saveCart()
  state.modal = null
  state.page = 'success'
  toast(t('success'), 'success')
  render()
  window.scrollTo(0, 0)
}

/* ===== INIT ===== */
async function init() {
  document.documentElement.lang = state.lang
  document.documentElement.dir = translations[state.lang].dir
  render()
  try {
    await loadStore()
    state.loading = false
    setupRealtime()
    render()
  } catch (err) {
    state.loading = false
    render()
    toast(t('noProducts'), 'error')
  }
}
init()
