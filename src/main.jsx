import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaSun,
  FaMoon,
  FaTimes,
  FaPlus,
  FaMinus,
  FaTrash,
  FaStar,
  FaArrowLeft,
  FaHeadphones,
  FaKeyboard,
  FaGamepad,
  FaMouse,
  FaLaptop,
  FaCamera,
  FaMobileAlt,
  FaBolt,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

// ==============================
// محصولات فروشگاه
// ==============================
const products = [
  {
    id: 1,
    name: "هدفون بی‌سیم Sonic Pro",
    category: "audio",
    price: 1850000,
    oldPrice: 2200000,
    icon: "headphones",
    color: "#e9e4ff",
    badge: "پرفروش",
    rating: 4.8,
    description: "صدای شفاف، طراحی راحت و باتری قدرتمند",
  },
  {
    id: 2,
    name: "کیبورد مکانیکی RGB",
    category: "accessories",
    price: 2100000,
    oldPrice: 2500000,
    icon: "keyboard",
    color: "#e0f3ff",
    badge: "ویژه",
    rating: 4.7,
    description: "تجربه تایپ حرفه‌ای با نورپردازی جذاب",
  },
  {
    id: 3,
    name: "دسته بازی Pro Controller",
    category: "gaming",
    price: 1450000,
    oldPrice: null,
    icon: "gamepad",
    color: "#ffe8d8",
    badge: "جدید",
    rating: 4.6,
    description: "کنترل دقیق و طراحی ارگونومیک برای بازی",
  },
  {
    id: 4,
    name: "ماوس بی‌سیم Ultra",
    category: "accessories",
    price: 850000,
    oldPrice: 990000,
    icon: "mouse",
    color: "#e0f5e9",
    badge: "",
    rating: 4.5,
    description: "سبک، سریع و مناسب کار و بازی",
  },
  {
    id: 5,
    name: "لپ‌تاپ NovaBook Air",
    category: "digital",
    price: 32500000,
    oldPrice: 35000000,
    icon: "laptop",
    color: "#f0e5ff",
    badge: "پیشنهاد",
    rating: 4.9,
    description: "قدرت و سرعت در طراحی سبک و مدرن",
  },
  {
    id: 6,
    name: "وب‌کم Full HD",
    category: "digital",
    price: 2350000,
    oldPrice: null,
    icon: "camera",
    color: "#fff1d9",
    badge: "",
    rating: 4.4,
    description: "تصویر واضح برای جلسات و استریم",
  },
  {
    id: 7,
    name: "هندزفری Air Sound",
    category: "audio",
    price: 1250000,
    oldPrice: 1500000,
    icon: "headphones",
    color: "#ffe4ef",
    badge: "تخفیف",
    rating: 4.6,
    description: "صدای باکیفیت در ابعاد کوچک و سبک",
  },
  {
    id: 8,
    name: "پایه خنک‌کننده لپ‌تاپ",
    category: "accessories",
    price: 980000,
    oldPrice: null,
    icon: "laptop",
    color: "#dff5f5",
    badge: "",
    rating: 4.3,
    description: "بهبود جریان هوا و کاهش دمای دستگاه",
  },
];

// ==============================
// ابزارهای کمکی
// ==============================
const formatPrice = (price) =>
  price.toLocaleString("fa-IR") + " تومان";

const iconMap = {
  headphones: FaHeadphones,
  keyboard: FaKeyboard,
  gamepad: FaGamepad,
  mouse: FaMouse,
  laptop: FaLaptop,
  camera: FaCamera,
  mobile: FaMobileAlt,
};

// ==============================
// استایل‌های داخلی صفحه
// ==============================
const css = `
* { box-sizing: border-box; }
body { margin: 0; font-family: Tahoma, Arial, sans-serif; }
button, input, select { font: inherit; }
button { cursor: pointer; }

.nova {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --text: #202238;
  --muted: #777b90;
  --border: #e8e9f1;
  --primary: #635bdf;
  --primary-soft: #eeedff;
  --shadow: 0 8px 30px rgba(31, 35, 70, .06);
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  transition: background .25s, color .25s;
}
.nova.dark {
  --bg: #151622;
  --surface: #202131;
  --text: #f3f3fa;
  --muted: #a5a6b8;
  --border: #343549;
  --primary: #938bff;
  --primary-soft: #302e4e;
  --shadow: 0 8px 30px rgba(0,0,0,.16);
}
.nova button { border: 0; }
.nova .container { max-width: 1200px; width: 92%; margin: auto; }

.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 10;
}
.topbar-inner {
  height: 76px; display: flex; align-items: center;
  justify-content: space-between; gap: 20px;
}
.brand { font-size: 25px; font-weight: 900; color: var(--primary); letter-spacing: -1px; }
.brand span { color: var(--text); }
.searchbox {
  flex: 1; max-width: 460px; display: flex; align-items: center;
  gap: 10px; background: var(--bg); border: 1px solid var(--border);
  border-radius: 13px; padding: 0 14px; height: 44px;
}
.searchbox input {
  width: 100%; outline: none; border: none; background: transparent; color: var(--text);
}
.actions { display: flex; gap: 10px; align-items: center; }
.iconbtn {
  width: 43px; height: 43px; border-radius: 13px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--bg); color: var(--text); position: relative;
}
.cart-count {
  position: absolute; top: -5px; right: -5px; border-radius: 50%;
  width: 19px; height: 19px; font-size: 11px; display: grid;
  place-items: center; background: #ff647c; color: white;
}
.hero { padding: 32px 0 24px; }
.hero-box {
  border-radius: 24px; overflow: hidden; padding: 42px;
  min-height: 260px; display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(120deg, #6259dd, #9285fa);
  color: white; position: relative;
}
.hero-copy { max-width: 540px; position: relative; z-index: 1; }
.hero-copy small { opacity: .8; font-size: 13px; }
.hero-copy h1 { font-size: clamp(25px, 4vw, 42px); line-height: 1.5; margin: 12px 0; }
.hero-copy p { line-height: 2; color: #f1efff; font-size: 14px; }
.hero-cta {
  margin-top: 14px; border-radius: 11px; padding: 12px 20px;
  background: white; color: #5e56d8; font-weight: bold;
}
.hero-art {
  width: 230px; height: 230px; border-radius: 50%;
  background: rgba(255,255,255,.13); display: grid; place-items: center;
  font-size: 100px; flex-shrink: 0;
}
.features {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 15px; margin: 15px 0 35px;
}
.feature {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 15px; padding: 17px; display: flex;
  gap: 12px; align-items: center;
}
.feature-icon { color: var(--primary); font-size: 22px; }
.feature strong { display: block; font-size: 14px; }
.feature small { display: block; margin-top: 6px; color: var(--muted); font-size: 12px; }
.section-head {
  display: flex; justify-content: space-between; align-items: center;
  gap: 15px; margin-bottom: 18px;
}
.section-head h2 { font-size: 22px; margin: 0; }
.section-head p { font-size: 13px; color: var(--muted); margin-top: 8px; }
.categories {
  display: flex; gap: 9px; flex-wrap: wrap; margin: 20px 0;
}
.cat-btn {
  border: 1px solid var(--border) !important; background: var(--surface);
  color: var(--text); border-radius: 10px; padding: 10px 16px;
  font-size: 13px; transition: .2s;
}
.cat-btn.active { background: var(--primary); color: white; border-color: var(--primary) !important; }
.sort-select {
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text); border-radius: 10px; padding: 10px;
}
.products {
  display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 17px;
}
.product {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 18px; overflow: hidden; transition: transform .2s, box-shadow .2s;
}
.product:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
.product-art {
  height: 170px; display: grid; place-items: center; position: relative;
}
.product-icon { font-size: 65px; opacity: .85; }
.product-badge {
  position: absolute; top: 12px; right: 12px; border-radius: 7px;
  padding: 5px 8px; font-size: 11px; background: var(--surface); color: var(--primary);
}
.product-info { padding: 15px; }
.product-info h3 { font-size: 14px; margin: 0 0 9px; line-height: 1.8; }
.description { font-size: 12px; color: var(--muted); line-height: 1.8; min-height: 42px; }
.rating { color: #f5a623; font-size: 12px; margin: 8px 0; }
.price { font-weight: bold; color: var(--primary); font-size: 14px; }
.old-price { color: var(--muted); text-decoration: line-through; font-size: 11px; margin-top: 5px; }
.product-bottom {
  display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 13px;
}
.add-btn {
  background: var(--primary); color: white; border-radius: 9px;
  width: 38px; height: 38px; display: grid; place-items: center;
}
.empty {
  grid-column: 1/-1; text-align: center; padding: 50px;
  color: var(--muted); background: var(--surface); border-radius: 15px;
}
.footer {
  margin-top: 50px; padding: 30px 0; text-align: center;
  color: var(--muted); border-top: 1px solid var(--border); font-size: 12px;
}
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 20; display: flex; justify-content: flex-end;
}
.cart-panel {
  width: 420px; max-width: 100%; height: 100%;
  background: var(--surface); padding: 22px; overflow-y: auto;
  color: var(--text);
}
.cart-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }
.cart-head h2 { margin:0; font-size:20px; }
.cart-row { display:flex; gap:12px; padding:14px 0; border-bottom:1px solid var(--border); align-items:center; }
.cart-row-icon { width:55px; height:55px; border-radius:12px; display:grid; place-items:center; font-size:25px; }
.cart-row-info { flex:1; }
.cart-row-info strong { font-size:13px; display:block; margin-bottom:8px; }
.cart-row-info small { color:var(--muted); font-size:11px; }
.qty-controls { display:flex; gap:8px; align-items:center; margin-top:10px; }
.qty-controls button { width:25px; height:25px; background:var(--bg); color:var(--text); border-radius:7px; }
.cart-total { padding-top:20px; font-weight:bold; display:flex; justify-content:space-between; }
.checkout-btn { width:100%; padding:13px; border-radius:11px; background:var(--primary); color:white; margin-top:18px; font-weight:bold; }
.cart-empty { text-align:center; color:var(--muted); padding:50px 0; }
@media(max-width:950px) {
  .products { grid-template-columns: repeat(3, minmax(0,1fr)); }
  .hero-art { width:170px; height:170px; font-size:75px; }
}
@media(max-width:680px) {
  .topbar-inner { height:auto; padding:12px 0; flex-wrap:wrap; }
  .brand { font-size:21px; }
  .searchbox { order:3; max-width:none; flex-basis:100%; }
  .hero-box { padding:25px; min-height:220px; }
  .hero-art { width:105px; height:105px; font-size:50px; }
  .hero-copy h1 { font-size:25px; }
  .hero-copy p { font-size:12px; }
  .features { grid-template-columns:1fr; gap:10px; }
  .products { grid-template-columns: repeat(2, minmax(0,1fr)); gap:10px; }
  .product-art { height:130px; }
  .product-icon { font-size:50px; }
  .product-info { padding:11px; }
  .product-info h3 { font-size:12px; }
  .description { font-size:11px; }
  .price { font-size:12px; }
  .section-head { align-items:flex-start; flex-direction:column; }
}
@media(max-width:360px) {
  .products { grid-template-columns:1fr; }
}
`;

// ==============================
// برنامه اصلی
// ==============================
function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("nova-theme") === "dark"
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
  try {
    const savedCart = JSON.parse(localStorage.getItem("nova-cart"));

    // بررسی اینکه اطلاعات سبد خرید حتماً آرایه باشد
    return Array.isArray(savedCart) ? savedCart : [];
  } catch (error) {
    return [];
  }
});

  // ذخیره تم انتخابی
  useEffect(() => {
    localStorage.setItem("nova-theme", dark ? "dark" : "light");
  }, [dark]);

  // ذخیره سبد خرید
  useEffect(() => {
    localStorage.setItem("nova-cart", JSON.stringify(cart));
  }, [cart]);

  // فیلتر و مرتب‌سازی محصولات
  const filteredProducts = products
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === "cheap") return a.price - b.price;
      if (sort === "expensive") return b.price - a.price;
      return a.id - b.id;
    });

  // افزودن محصول به سبد
  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // تغییر تعداد محصول در سبد
  function changeQuantity(id, amount) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // حذف محصول
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const categories = [
    { id: "all", label: "همه محصولات" },
    { id: "audio", label: "صوتی" },
    { id: "gaming", label: "گیمینگ" },
    { id: "accessories", label: "لوازم جانبی" },
    { id: "digital", label: "دیجیتال" },
  ];

  return (
    <>
      <style>{css}</style>

      <div className={`nova ${dark ? "dark" : ""}`} dir="rtl">
        {/* نوار بالای سایت */}
        <header className="topbar">
          <div className="container topbar-inner">
            <div className="brand">
              NOVA <span>STORE</span>
            </div>

            <div className="searchbox">
              <FaSearch />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجوی محصولات..."
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="پاک کردن">
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="actions">
              <button
                className="iconbtn"
                onClick={() => setDark(!dark)}
                title="تغییر تم"
              >
                {dark ? <FaSun /> : <FaMoon />}
              </button>

              <button
                className="iconbtn"
                onClick={() => setCartOpen(true)}
                title="سبد خرید"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="cart-count">{totalItems}</span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="container">
          {/* بنر اصلی */}
          <section className="hero">
            <div className="hero-box">
              <div className="hero-copy">
                <small>تجربه خرید متفاوت</small>
                <h1>دنیای تکنولوژی، یک قدم جلوتر</h1>
                <p>
                  محصولات دیجیتال باکیفیت، قیمت مناسب و تجربه خرید آسان در نوا استور.
                </p>
                <button
                  className="hero-cta"
                  onClick={() =>
                    document
                      .getElementById("products-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  مشاهده محصولات <FaArrowLeft style={{ marginRight: 8 }} />
                </button>
              </div>
              <div className="hero-art">
                <FaHeadphones />
              </div>
            </div>
          </section>

          {/* مزیت‌های فروشگاه */}
          <section className="features">
            <div className="feature">
              <FaTruck className="feature-icon" />
              <div>
                <strong>ارسال سریع</strong>
                <small>تحویل مطمئن سفارش‌ها</small>
              </div>
            </div>
            <div className="feature">
              <FaShieldAlt className="feature-icon" />
              <div>
                <strong>خرید مطمئن</strong>
                <small>تجربه خرید امن و آسان</small>
              </div>
            </div>
            <div className="feature">
              <FaBolt className="feature-icon" />
              <div>
                <strong>محصولات متنوع</strong>
                <small>انتخابی برای هر سلیقه</small>
              </div>
            </div>
          </section>

          {/* فهرست محصولات */}
          <section id="products-section">
            <div className="section-head">
              <div>
                <h2>محصولات فروشگاه</h2>
                <p>محصول مورد نظرت را پیدا کن و به سبد خرید اضافه کن.</p>
              </div>

              <select
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">مرتب‌سازی پیش‌فرض</option>
                <option value="cheap">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </div>

            <div className="categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`cat-btn ${category === cat.id ? "active" : ""}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="products">
              {filteredProducts.length === 0 ? (
                <div className="empty">
                  محصولی با این مشخصات پیدا نشد.
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const ProductIcon = iconMap[product.icon] || FaMobileAlt;

                  return (
                    <article className="product" key={product.id}>
                      <div
                        className="product-art"
                        style={{ background: product.color }}
                      >
                        {product.badge && (
                          <span className="product-badge">{product.badge}</span>
                        )}
                        <ProductIcon className="product-icon" />
                      </div>

                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <div className="description">{product.description}</div>

                        <div className="rating">
                          <FaStar /> {product.rating}
                        </div>

                        <div className="product-bottom">
                          <div>
                            <div className="price">
                              {formatPrice(product.price)}
                            </div>
                            {product.oldPrice && (
                              <div className="old-price">
                                {formatPrice(product.oldPrice)}
                              </div>
                            )}
                          </div>

                          <button
                            className="add-btn"
                            onClick={() => addToCart(product)}
                            title="افزودن به سبد خرید"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>

          {/* پایین صفحه */}
          <footer className="footer">
            © {new Date().getFullYear()} Nova Store — تجربه‌ای نو در خرید دیجیتال
          </footer>
        </main>

        {/* پنل سبد خرید */}
        {cartOpen && (
          <div className="overlay" onClick={() => setCartOpen(false)}>
            <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
              <div className="cart-head">
                <h2>سبد خرید شما</h2>
                <button
                  className="iconbtn"
                  onClick={() => setCartOpen(false)}
                  aria-label="بستن"
                >
                  <FaTimes />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <FaShoppingCart size={40} />
                  <p>سبد خرید شما خالی است.</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => {
                    const ItemIcon = iconMap[item.icon] || FaMobileAlt;

                    return (
                      <div className="cart-row" key={item.id}>
                        <div
                          className="cart-row-icon"
                          style={{ background: item.color }}
                        >
                          <ItemIcon />
                        </div>

                        <div className="cart-row-info">
                          <strong>{item.name}</strong>
                          <small>{formatPrice(item.price)}</small>

                          <div className="qty-controls">
                            <button onClick={() => changeQuantity(item.id, 1)}>
                              <FaPlus />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => changeQuantity(item.id, -1)}>
                              <FaMinus />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              title="حذف"
                              style={{ color: "#e45b6b", marginRight: 5 }}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="cart-total">
                    <span>مجموع خرید</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <button
                    className="checkout-btn"
                    onClick={() =>
                      alert("سبد خرید آماده است. در نسخه بعدی پرداخت را اضافه می‌کنیم.")
                    }
                  >
                    ادامه خرید
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);