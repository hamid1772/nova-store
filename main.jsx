import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// داده‌های نمونه محصولات فروشگاه؛ برای اضافه کردن محصول جدید یک آبجکت به این آرایه اضافه کنید.
const products = [
  { id: 1, name: 'هدفون بی‌سیم', category: 'audio', categoryName: 'صوتی', price: 1850000, emoji: '🎧', description: 'صدای شفاف و باتری قدرتمند', tag: 'پرفروش', rating: 4.8 },
  { id: 2, name: 'اسپیکر بلوتوثی', category: 'audio', categoryName: 'صوتی', price: 1250000, emoji: '🔊', description: 'صدای پرقدرت در ابعاد کوچک', tag: 'جدید', rating: 4.7 },
  { id: 3, name: 'ماوس بی‌سیم', category: 'accessory', categoryName: 'لوازم جانبی', price: 650000, emoji: '🖱️', description: 'طراحی ارگونومیک و دقیق', tag: 'پیشنهاد', rating: 4.6 },
  { id: 4, name: 'کیبورد مکانیکی', category: 'accessory', categoryName: 'لوازم جانبی', price: 2100000, emoji: '⌨️', description: 'کلیدهای نرم و نورپردازی جذاب', tag: 'ویژه', rating: 4.6 },
  { id: 5, name: 'فلش USB', category: 'storage', categoryName: 'ذخیره‌سازی', price: 390000, emoji: '💾', description: 'حافظه قابل حمل برای فایل‌ها', tag: '', rating: 4.5 },
  { id: 6, name: 'وب‌کم HD', category: 'camera', categoryName: 'تصویری', price: 990000, emoji: '📷', description: 'تصویر واضح برای جلسات آنلاین', tag: 'محبوب', rating: 4.4 },
  { id: 7, name: 'گیم‌پد', category: 'gaming', categoryName: 'گیمینگ', price: 1450000, emoji: '🎮', description: 'کنترل راحت برای بازی‌های روز', tag: '', rating: 4.7 },
  { id: 8, name: 'پایه لپ‌تاپ', category: 'accessory', categoryName: 'لوازم جانبی', price: 720000, emoji: '💻', description: 'بهبود زاویه دید و گردش هوا', tag: '', rating: 4.3 },
];
const categories = [
  { id: 'all', name: 'همه محصولات', icon: '▦' }, { id: 'audio', name: 'صوتی', icon: '♫' },
  { id: 'accessory', name: 'لوازم جانبی', icon: '⌁' }, { id: 'storage', name: 'ذخیره‌سازی', icon: '▣' },
  { id: 'camera', name: 'تصویری', icon: '◎' }, { id: 'gaming', name: 'گیمینگ', icon: '✦' },
];
const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);


function App() {
  // حالت‌های رابط کاربری: جستجو، فیلتر دسته، ترتیب نمایش، سبد خرید و پیام کوتاه
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nova-cart') || '{}'); } catch { return {}; }
  });
  const [notice, setNotice] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  // نگهداری سبد خرید در مرورگر تا بعد از بازخوانی صفحه باقی بماند
  useEffect(() => { localStorage.setItem('nova-cart', JSON.stringify(cart)); }, [cart]);

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => (category === 'all' || p.category === category) &&
      (p.name.toLowerCase().includes(query.trim().toLowerCase()) || p.categoryName.includes(query.trim())));
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    return list;
  }, [query, category, sort]);

  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);

  // افزودن محصول و نمایش بازخورد به کاربر
  const addToCart = (product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setNotice(`${product.name} به سبد خرید اضافه شد`);
    window.setTimeout(() => setNotice(''), 2200);
  };
  const updateQuantity = (id, delta) => setCart((current) => {
    const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) };
    if (next[id] === 0) delete next[id];
    return next;
  });

  return <div className="app-shell">
    <div className="top-strip"><span>ارسال سریع به سراسر کشور</span><span>پشتیبانی ۲۴ ساعته: ۰۲۱-۱۲۳۴۵۶۷</span><span>خرید امن و آسان</span></div>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Nova Store صفحه اصلی"><span className="brand-mark">✦</span><span><strong>Nova Store</strong><small>فروشگاه محصولات دیجیتال</small></span></a>
      <label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو در محصولات..." aria-label="جستجوی محصولات" /><button onClick={() => setQuery('')} aria-label="پاک کردن جستجو">×</button></label>
      <div className="header-actions"><button className="login-button">ورود / ثبت‌نام</button><button className="cart-button" onClick={() => setCartOpen(true)} aria-label="نمایش سبد خرید">سبد خرید <span className="cart-count">{cartCount}</span></button></div>
    </header>
    <nav className="nav-row" aria-label="منوی اصلی"><a className="active" href="#home">صفحه اصلی</a><a href="#products">محصولات</a><a href="#categories">دسته‌بندی‌ها</a><a href="#about">درباره ما</a><a href="#footer">تماس با ما</a></nav>

    <main id="home">
      <section className="hero-banner">
        <div className="hero-copy"><span className="hero-kicker">انتخاب هوشمندانه، خرید آسان</span><h1>تکنولوژی، همیشه<br />در دسترس شما!</h1><p>محصولات منتخب دیجیتال با کیفیت و قیمت مناسب</p><a href="#products" className="primary-link">مشاهده محصولات <span>←</span></a></div>
        <div className="hero-art" aria-hidden="true"><span className="art-glow"></span><div className="art-device device-laptop">💻</div><div className="art-device device-phone">📱</div><div className="art-device device-headphone">🎧</div><div className="art-device device-watch">⌚</div></div>
        <div className="hero-dots" aria-hidden="true"><i className="selected"></i><i></i><i></i></div>
      </section>

      <section className="category-section" id="categories"><div className="section-heading"><h2>دسته‌بندی محصولات</h2><p>محصول مورد نظرت را سریع پیدا کن</p></div><div className="category-list">{categories.slice(1).map((c) => <button key={c.id} className={`category-tile ${category === c.id ? 'chosen' : ''}`} onClick={() => setCategory(c.id)}><span className="category-icon">{c.icon}</span><span>{c.name}</span></button>)}</div></section>

      <section className="products-section" id="products"><div className="products-title"><div><h2>محصولات فروشگاه</h2><p>{filteredProducts.length} محصول برای انتخاب شما</p></div><div className="product-controls"><button className={`clear-filter ${category !== 'all' ? 'visible' : ''}`} onClick={() => setCategory('all')}>حذف فیلتر</button><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="مرتب‌سازی"><option value="popular">پیشنهاد فروشگاه</option><option value="price-low">ارزان‌ترین</option><option value="price-high">گران‌ترین</option><option value="name">نام محصول</option></select></div></div>
        <div className="category-pills">{categories.map((c) => <button key={c.id} className={category === c.id ? 'pill-active' : ''} onClick={() => setCategory(c.id)}>{c.name}</button>)}</div>
        {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((p) => <article className="product-card" key={p.id}><div className="product-visual"><span className="product-emoji">{p.emoji}</span>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="favorite" aria-label={`افزودن ${p.name} به علاقه‌مندی‌ها`} onClick={(e) => e.currentTarget.classList.toggle('liked')}>♡</button></div><div className="product-info"><span className="product-category">{p.categoryName}</span><h3>{p.name}</h3><p className="product-description">{p.description}</p><div className="rating"><span>★</span> {p.rating.toLocaleString('fa-IR')} <small> (امتیاز کاربران)</small></div><div className="price-line"><strong>{formatPrice(p.price)}</strong><span>تومان</span></div><button className="add-button" onClick={() => addToCart(p)}>افزودن به سبد <span>＋</span></button></div></article>)}</div> : <div className="empty-results"><span>⌕</span><h3>محصولی پیدا نشد</h3><p>عبارت جستجو یا دسته‌بندی را تغییر دهید.</p><button onClick={() => { setQuery(''); setCategory('all'); }}>نمایش همه محصولات</button></div>}
      </section>
      <section className="benefits"><div><span>♧</span><strong>ضمانت بازگشت کالا</strong><small>۷ روز ضمانت خرید</small></div><div><span>♧</span><strong>پشتیبانی حرفه‌ای</strong><small>همیشه در کنار شما</small></div><div><span>▣</span><strong>ارسال سریع</strong><small>در کوتاه‌ترین زمان</small></div><div><span>◇</span><strong>پرداخت امن</strong><small>با خیال راحت خرید کنید</small></div></section>
    </main>
    <footer id="footer"><div className="footer-brand"><span className="brand-mark">✦</span><div><strong>Nova Store</strong><p>فروشگاه محصولات دیجیتال</p></div></div><div className="footer-links"><strong>دسترسی سریع</strong><a href="#home">صفحه اصلی</a><a href="#products">محصولات</a><a href="#categories">دسته‌بندی‌ها</a></div><div className="footer-links"><strong>خدمات مشتریان</strong><a href="#footer">پیگیری سفارش</a><a href="#footer">سوالات متداول</a><a href="#footer">تماس با ما</a></div><div className="newsletter"><strong>عضویت در خبرنامه</strong><p>برای اطلاع از تخفیف‌ها ایمیل خود را وارد کنید.</p><form onSubmit={(e) => { e.preventDefault(); setNotice('عضویت شما ثبت شد (نمونه نمایشی)'); window.setTimeout(() => setNotice(''), 2500); }}><input type="email" required placeholder="ایمیل شما" aria-label="ایمیل برای خبرنامه"/><button type="submit">عضویت</button></form></div><div className="copyright">تمامی حقوق این وب‌سایت متعلق به نوا است. © ۱۴۰۵</div></footer>
    {notice && <div className="toast" role="status">✓ {notice}</div>}
    {cartOpen && <div className="modal-backdrop" onClick={() => setCartOpen(false)}><section className="cart-modal" role="dialog" aria-modal="true" aria-label="سبد خرید" onClick={(e) => e.stopPropagation()}><div className="modal-head"><h2>سبد خرید شما</h2><button onClick={() => setCartOpen(false)} aria-label="بستن">×</button></div>{cartCount === 0 ? <div className="empty-cart"><span>🛒</span><p>سبد خرید شما خالی است.</p><button onClick={() => setCartOpen(false)}>ادامه خرید</button></div> : <><div className="cart-items">{products.filter((p) => cart[p.id]).map((p) => <div className="cart-item" key={p.id}><span className="cart-item-icon">{p.emoji}</span><div className="cart-item-details"><strong>{p.name}</strong><small>{formatPrice(p.price)} تومان</small><div className="quantity-controls"><button onClick={() => updateQuantity(p.id, -1)} aria-label="کم کردن تعداد">−</button><span>{(cart[p.id] || 0).toLocaleString('fa-IR')}</span><button onClick={() => updateQuantity(p.id, 1)} aria-label="افزودن تعداد">+</button></div></div><strong className="line-price">{formatPrice(p.price * cart[p.id])} تومان</strong></div>)}</div><div className="cart-total"><span>مجموع سبد خرید</span><strong>{formatPrice(cartTotal)} تومان</strong></div><button className="checkout-button" onClick={() => setNotice('مرحله پرداخت در نسخه نمایشی فعال نیست')}>ادامه و پرداخت</button></>}</section></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
