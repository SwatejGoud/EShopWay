import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Star,
  Sparkles,
  BadgePercent,
  User,
  HelpCircle,
  Tag,
  TrendingUp,
  LogIn,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Package,
  Moon,
  Sun,
} from "lucide-react";

// =============================
// Theme helper (dark mode)
// =============================
function useTheme() {
  const getInitial = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    // OS preference
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };
  const [theme, setTheme] = useState(getInitial);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

// =============================
// Sample Product Catalog
// =============================
const PRODUCTS = [
  // Electronics
  {
    id: "p1",
    name: "Aurora X1 Wireless Headphones",
    price: 129.99,
    rating: 4.6,
    category: "Electronics",
    brand: "Aurora",
    tags: ["audio", "bluetooth", "noise-canceling", "headphones"],
    img: "https://images.unsplash.com/photo-1518443881235-7db0ae2918cf?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "VoltEdge 65W GaN Charger",
    price: 39.99,
    rating: 4.4,
    category: "Electronics",
    brand: "VoltEdge",
    tags: ["charger", "gan", "usb-c", "travel"],
    img: "https://images.unsplash.com/photo-1588750351247-834d2b8e3cf5?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Nimbus 14\" Laptop Sleeve",
    price: 24.5,
    rating: 4.2,
    category: "Electronics",
    brand: "Nimbus",
    tags: ["laptop", "sleeve", "accessory"],
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1470&auto=format&fit=crop",
  },
  // Fashion
  {
    id: "p4",
    name: "Drift Knit Sneakers",
    price: 84.0,
    rating: 4.5,
    category: "Fashion",
    brand: "Drift",
    tags: ["shoes", "sneakers", "lightweight"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Solace Cotton Tee",
    price: 19.99,
    rating: 4.1,
    category: "Fashion",
    brand: "Solace",
    tags: ["tshirt", "casual", "cotton"],
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p6",
    name: "Harbor Classic Denim Jacket",
    price: 69.99,
    rating: 4.7,
    category: "Fashion",
    brand: "Harbor",
    tags: ["jacket", "denim", "outerwear"],
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1470&auto=format&fit=crop",
  },
  // Home
  {
    id: "p7",
    name: "BrewPro Pour‑Over Kettle",
    price: 59.99,
    rating: 4.3,
    category: "Home",
    brand: "BrewPro",
    tags: ["kitchen", "coffee", "kettle"],
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p8",
    name: "Lumen Glass Table Lamp",
    price: 79.0,
    rating: 4.4,
    category: "Home",
    brand: "Lumen",
    tags: ["lighting", "decor", "lamp"],
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p9",
    name: "CalmNest Weighted Blanket",
    price: 99.5,
    rating: 4.8,
    category: "Home",
    brand: "CalmNest",
    tags: ["sleep", "blanket", "relax"],
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1470&auto=format&fit=crop",
  },
  // Sports
  {
    id: "p10",
    name: "PeakTrail Daypack 20L",
    price: 54.0,
    rating: 4.5,
    category: "Sports",
    brand: "PeakTrail",
    tags: ["outdoor", "backpack", "hiking"],
    img: "https://images.unsplash.com/photo-1542291026-4ea0636e8015?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p11",
    name: "Flow Yoga Mat Pro",
    price: 39.0,
    rating: 4.6,
    category: "Sports",
    brand: "Flow",
    tags: ["yoga", "fitness", "mat"],
    img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p12",
    name: "SwiftRun Performance Shorts",
    price: 29.99,
    rating: 4.2,
    category: "Sports",
    brand: "SwiftRun",
    tags: ["running", "shorts", "lightweight"],
    img: "https://images.unsplash.com/photo-1571907480495-3f2323d3871f?q=80&w=1470&auto=format&fit=crop",
  },
  // Beauty
  {
    id: "p13",
    name: "GlowSerum Vitamin C",
    price: 25.0,
    rating: 4.5,
    category: "Beauty",
    brand: "GlowLab",
    tags: ["skincare", "serum", "vitamin-c"],
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p14",
    name: "SilkWave Hair Dryer",
    price: 49.99,
    rating: 4.3,
    category: "Beauty",
    brand: "SilkWave",
    tags: ["hair", "dryer", "styling"],
    img: "https://images.unsplash.com/photo-1522335789203-9c8e59f6a9f0?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p15",
    name: "PureBalance Moisturizer",
    price: 22.99,
    rating: 4.1,
    category: "Beauty",
    brand: "PureBalance",
    tags: ["skincare", "moisturizer", "hydration"],
    img: "https://images.unsplash.com/photo-1585238341986-53f3f443f6f5?q=80&w=1470&auto=format&fit=crop",
  },
  // Books
  {
    id: "p16",
    name: "Designing for Delight",
    price: 18.0,
    rating: 4.7,
    category: "Books",
    brand: "InkHouse",
    tags: ["ux", "design", "product"],
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p17",
    name: "Java in Practice (6e)",
    price: 34.5,
    rating: 4.8,
    category: "Books",
    brand: "CodePress",
    tags: ["programming", "java", "reference"],
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p18",
    name: "Data Science Snacks",
    price: 21.0,
    rating: 4.4,
    category: "Books",
    brand: "Insight",
    tags: ["data", "machine-learning", "python"],
    img: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1470&auto=format&fit=crop",
  },
  // Toys
  {
    id: "p19",
    name: "MakerBot STEM Kit",
    price: 59.0,
    rating: 4.6,
    category: "Toys",
    brand: "MakerBot",
    tags: ["stem", "kids", "build"],
    img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p20",
    name: "PuzzleBox 1000‑piece",
    price: 17.5,
    rating: 4.3,
    category: "Toys",
    brand: "PuzzleBox",
    tags: ["puzzle", "relax", "gift"],
    img: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p21",
    name: "RoboRacer RC Car",
    price: 44.0,
    rating: 4.2,
    category: "Toys",
    brand: "RoboRacer",
    tags: ["rc", "car", "fun"],
    img: "https://images.unsplash.com/photo-1606232654206-688d0030d09d?q=80&w=1470&auto=format&fit=crop",
  },
  // More items
  {
    id: "p22",
    name: "Nimbus Pro Backpack",
    price: 89.0,
    rating: 4.6,
    category: "Fashion",
    brand: "Nimbus",
    tags: ["bag", "backpack", "travel"],
    img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p23",
    name: "VoltEdge Wireless Charger Pad",
    price: 29.0,
    rating: 4.0,
    category: "Electronics",
    brand: "VoltEdge",
    tags: ["wireless", "charger", "qi"],
    img: "https://images.unsplash.com/photo-1587038666781-74d1b9b62c16?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "p24",
    name: "Harbor Beanie",
    price: 15.0,
    rating: 4.2,
    category: "Fashion",
    brand: "Harbor",
    tags: ["beanie", "winter", "accessory"],
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1470&auto=format&fit=crop",
  },
];

// =============================
// Utilities – Local Storage & Helpers
// =============================
const KEY = { events: "ai_shop_events_v1" };

function loadEvents() {
  try { return JSON.parse(localStorage.getItem(KEY.events) || "[]"); }
  catch { return []; }
}

function saveEvent(evt) {
  const events = loadEvents();
  events.push({ ...evt, ts: Date.now() });
  localStorage.setItem(KEY.events, JSON.stringify(events.slice(-400)));
}

function tokenize(str = "") {
  return str.toLowerCase().replace(/[^a-z0-9\s-]+/g, " ").split(/\s+/).filter(Boolean);
}

// Simple scoring based on user activity: views, cart, and search queries.
function scoreProducts(products, events) {
  const now = Date.now();
  const DECAY_MS = 1000 * 60 * 60 * 24 * 14; // 14 days
  const categoryBoost = new Map();
  const brandBoost = new Map();
  const tagBoost = new Map();
  const recentSearchTokens = [];

  events.forEach((e) => {
    const age = now - (e.ts || now);
    const w = Math.max(0.1, 1 - age / DECAY_MS);

    if (e.type === "search") {
      tokenize(e.query).forEach((t) => {
        tagBoost.set(t, (tagBoost.get(t) || 0) + 0.7 * w);
        recentSearchTokens.push(t);
      });
    }

    if (e.type === "view" || e.type === "add_to_cart") {
      const p = products.find((x) => x.id === e.productId);
      if (p) {
        categoryBoost.set(p.category, (categoryBoost.get(p.category) || 0) + (e.type === "view" ? 0.8 : 1.5) * w);
        brandBoost.set(p.brand, (brandBoost.get(p.brand) || 0) + (e.type === "view" ? 0.6 : 1.2) * w);
        p.tags.forEach((t) => tagBoost.set(t, (tagBoost.get(t) || 0) + 0.4 * w));
      }
    }
  });

  const uniqueTokens = new Set(recentSearchTokens);

  const scored = products.map((p) => {
    const base = p.rating / 5;
    let s = base;
    s += (categoryBoost.get(p.category) || 0) * 0.9;
    s += (brandBoost.get(p.brand) || 0) * 0.7;
    p.tags.forEach((t) => {
      s += (tagBoost.get(t) || 0) * 0.6;
      if (uniqueTokens.has(t)) s += 0.25;
    });
    tokenize(p.name).forEach((t) => { if (uniqueTokens.has(t)) s += 0.15; });
    return { ...p, _score: s };
  });

  const top = scored.sort((a, b) => b._score - a._score);
  const seenCats = new Set();
  const diverse = [];
  for (const item of top) {
    if (diverse.length >= 12) break;
    const cat = item.category;
    if (!seenCats.has(cat) || Math.random() < 0.4) {
      diverse.push(item);
      seenCats.add(cat);
    }
  }
  return diverse;
}

// =============================
// UI – Small Helpers
// =============================
function Chip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/60 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 px-3 py-1 text-xs font-medium">
      {Icon && <Icon size={14} />}{label}
    </span>
  );
}

function StarRating({ value }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} size={14} className={i <= Math.round(value) ? "fill-yellow-400" : "opacity-30"} />);
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}

function ProductCard({ p, onView, onAdd }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="group rounded-2xl bg-white/80 dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform" />
        <div className="absolute left-2 top-2 flex gap-2">
          <Chip icon={Tag} label={p.category} />
          <Chip icon={Sparkles} label={p.brand} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{p.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
              <StarRating value={p.rating} /><span>{p.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-lg font-bold">${p.price.toFixed(2)}</div>
            <button onClick={() => onAdd(p)} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-black text-white text-xs px-3 py-2 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
              <ShoppingCart size={14} /> Add
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.slice(0, 3).map((t) => (<span key={t} className="rounded-lg bg-neutral-100 dark:bg-neutral-800 px-2 py-1 text-[10px]">#{t}</span>))}
        </div>
        <button onClick={() => onView(p)} className="mt-3 inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
          View details <ChevronRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

// =============================
// Main App
// =============================
const TABS = [
  { key: "home", label: "Home", icon: Sparkles },
  { key: "shop", label: "Shop", icon: Package },
  { key: "categories", label: "Categories", icon: Tag },
  { key: "deals", label: "Deals", icon: BadgePercent },
  { key: "new", label: "New", icon: TrendingUp },
  { key: "cart", label: "Cart", icon: ShoppingCart },
  { key: "profile", label: "Profile", icon: User },
  { key: "support", label: "Support", icon: HelpCircle },
];

function NavTabs({ current, onChange, brand="Swatej Shop", theme, setTheme }) {
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-gradient-to-b from-white/90 to-white/60 dark:from-neutral-900/80 dark:to-neutral-900/40">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-3 py-2 shadow dark:bg-white dark:text-black">
              <Sparkles size={16} /><span className="text-sm font-bold tracking-tight">{brand}</span>
            </motion.div>
            <span className="hidden md:inline text-xs text-neutral-500 dark:text-neutral-400">AI‑powered suggestions</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button key={t.key} onClick={() => onChange(t.key)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition shadow-sm ring-1 ring-black/5 dark:ring-white/10 mr-1 ${current === t.key ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"}`}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm shadow-sm ring-1 ring-black/5 dark:ring-white/10 bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {theme === "dark" ? <Moon size={16}/> : <Sun size={16}/>}
              <span className="hidden sm:inline">{theme === "dark" ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onExplore }) {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-8">
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="col-span-2 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-lg">
          <div className="flex items-center gap-2 text-sm opacity-90"><Sparkles size={16} /> Smart Recommendations</div>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            Shop smarter with <span className="underline decoration-white/60">AI‑curated</span> picks
          </h1>
          <p className="mt-3 max-w-lg text-white/90">
            A personal storefront for my portfolio — smart picks based on your activity, fully private to your browser.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={onExplore} className="rounded-2xl bg-white text-black px-5 py-3 font-semibold shadow hover:bg-neutral-100">
              Explore top picks
            </button>
            <button className="rounded-2xl bg-black/30 backdrop-blur px-5 py-3 font-semibold hover:bg-black/40">
              Learn how it works
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-3xl bg-white dark:bg-neutral-900 p-6 ring-1 ring-black/5 dark:ring-white/10 shadow">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"><BadgePercent size={16}/> Limited‑time Deals</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• 20% off Aurora X1 Headphones</li>
            <li>• Save $10 on Flow Yoga Mat Pro</li>
            <li>• Free shipping on orders over $50</li>
          </ul>
          <button onClick={onExplore} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm dark:bg-white dark:text-black">
            Shop deals <ChevronRight size={16}/>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function SearchBar({ value, onChange, onSubmit, onFilterToggle }) {
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div className="flex items-center gap-2 rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 px-3 py-2 shadow-sm">
        <Search size={18} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="Search products, brands, categories…"
          className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        />
        <button onClick={onFilterToggle} className="inline-flex items-center gap-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700">
          <SlidersHorizontal size={14}/> Filters
        </button>
      </div>
    </div>
  );
}

function Filters({ category, setCategory, sort, setSort }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-7xl px-4 mt-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 px-3 py-2 text-sm shadow-sm">
          <Filter size={16}/><span className="text-neutral-600 dark:text-neutral-300">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent outline-none">
            {["All","Electronics","Fashion","Home","Sports","Beauty","Books","Toys"].map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 px-3 py-2 text-sm shadow-sm">
          <span className="text-neutral-600 dark:text-neutral-300">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none">
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Top Rated</option>
            <option value="name_asc">Name A→Z</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

function Section({ title, subtitle, children, icon: Icon }) {
  return (
    <div className="mx-auto max-w-7xl px-4 mt-8">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
            {Icon && <Icon size={16} />}<span>{subtitle}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">{children}</AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [cart, setCart] = useState([]);
  const { theme, setTheme } = useTheme();

  useEffect(() => { saveEvent({ type: "visit" }); }, []);

  const onSearch = () => { saveEvent({ type: "search", query }); if (tab !== "shop") setTab("shop"); };
  const onView = (p) => { saveEvent({ type: "view", productId: p.id }); };
  const onAdd = (p) => { setCart((c) => [...c, p]); saveEvent({ type: "add_to_cart", productId: p.id }); };

  const events = loadEvents();
  const aiPicks = useMemo(() => scoreProducts(PRODUCTS, events), [events]);

  const filtered = useMemo(() => {
    let items = PRODUCTS.slice();
    const qTokens = tokenize(query);
    if (category !== "All") items = items.filter((p) => p.category === category);
    if (qTokens.length) {
      items = items.filter((p) => {
        const hay = tokenize([p.name, p.brand, p.category, p.tags.join(" ")].join(" "));
        return qTokens.every((t) => hay.includes(t));
      });
    }
    switch (sort) {
      case "price_asc": items.sort((a, b) => a.price - b.price); break;
      case "price_desc": items.sort((a, b) => b.price - a.price); break;
      case "rating_desc": items.sort((a, b) => b.rating - a.rating); break;
      case "name_asc": items.sort((a, b) => a.name.localeCompare(b.name)); break;
      default:
        const scored = scoreProducts(items, events).reduce((acc, p, i) => { acc[p.id] = i; return acc; }, {});
        items.sort((a, b) => (scored[a.id] ?? 999) - (scored[b.id] ?? 999));
    }
    return items;
  }, [query, category, sort, events]);

  const total = cart.reduce((s, p) => s + p.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 text-neutral-900 dark:from-neutral-900 dark:via-neutral-950 dark:to-black dark:text-white">
      <NavTabs current={tab} onChange={setTab} brand="Swatej Shop" theme={theme} setTheme={setTheme} />
      {tab === "home" && (<>
        <Hero onExplore={() => setTab("shop")} />
        <SearchBar value={query} onChange={setQuery} onSubmit={onSearch} onFilterToggle={() => setShowFilters((s) => !s)} />
        {showFilters && (<Filters category={category} setCategory={setCategory} sort={sort} setSort={setSort} />)}
        <Section title="AI Picks for You" subtitle="Personalized by your recent activity" icon={Sparkles}>
          {aiPicks.slice(0, 8).map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
        </Section>
        <Section title="Trending Deals" subtitle="Don’t miss these offers" icon={BadgePercent}>
          {PRODUCTS.filter((_, i) => i % 3 === 0).map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
        </Section>
      </>)}
      {tab === "shop" && (<>
        <SearchBar value={query} onChange={setQuery} onSubmit={onSearch} onFilterToggle={() => setShowFilters((s) => !s)} />
        {showFilters && (<Filters category={category} setCategory={setCategory} sort={sort} setSort={setSort} />)}
        <Section title="All Products" subtitle="Browse our catalog" icon={Package}>
          {filtered.map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
        </Section>
      </>)}
      {tab === "categories" && (
        <div className="mx-auto max-w-7xl px-4 mt-8">
          <h2 className="text-xl md:text-2xl font-bold">Shop by Category</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Electronics","Fashion","Home","Sports","Beauty","Books","Toys"].map((c) => (
              <button key={c} onClick={() => { setCategory(c); setTab("shop"); }}
                className="rounded-2xl bg-white dark:bg-neutral-900 p-5 ring-1 ring-black/5 dark:ring-white/10 shadow hover:shadow-md text-left">
                <div className="text-xs text-neutral-600 dark:text-neutral-300">Category</div>
                <div className="text-lg font-semibold">{c}</div>
              </button>
            ))}
          </div>
          <Section title="Top in Each Category" subtitle="Editor’s choice" icon={Star}>
            {["Electronics","Fashion","Home","Sports","Beauty","Books","Toys"].flatMap((cat) => {
              const top = PRODUCTS.filter((p) => p.category === cat).sort((a,b)=>b.rating-a.rating)[0];
              return top ? [top] : [];
            }).map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
          </Section>
        </div>
      )}
      {tab === "deals" && (
        <Section title="Today’s Deals" subtitle="Hand‑picked savings" icon={BadgePercent}>
          {PRODUCTS.filter((_, i) => i % 2 === 0).map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
        </Section>
      )}
      {tab === "new" && (
        <Section title="New Arrivals" subtitle="Fresh drops every week" icon={TrendingUp}>
          {PRODUCTS.slice(-8).map((p) => (<ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />))}
        </Section>
      )}
      {tab === "cart" && (
        <div className="mx-auto max-w-7xl px-4 mt-8">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2"><ShoppingCart size={20}/> Your Cart</h2>
          {cart.length === 0 ? (
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">Your cart is empty. Start adding items!</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                {cart.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-3">
                    <img src={p.img} className="h-16 w-16 rounded-xl object-cover"/>
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm font-semibold">{p.name}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-300">{p.brand} • {p.category}</div>
                    </div>
                    <div className="text-sm font-semibold">${p.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-4 h-fit">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">Subtotal</div>
                <div className="text-2xl font-bold">${total.toFixed(2)}</div>
                <button className="mt-4 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}
      {tab === "profile" && (
        <div className="mx-auto max-w-7xl px-4 mt-8">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2"><User size={20}/> Profile</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Sign in</div>
              <div className="mt-1 text-lg font-semibold">Create an account</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Save your cart, track orders, and sync preferences across devices.</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm dark:bg-white dark:text-black">
                <LogIn size={16}/> Continue
              </button>
            </div>
            <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Preferences</div>
              <div className="mt-1 text-lg font-semibold">AI Controls</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Your activity is stored locally in your browser. Clear to reset suggestions.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => { localStorage.removeItem("ai_shop_events_v1"); window.location.reload(); }} className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm dark:bg-white dark:text-black">Clear activity</button>
                <button onClick={() => alert(JSON.stringify(loadEvents(), null, 2))} className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm">View activity JSON</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === "support" && (
        <div className="mx-auto max-w-7xl px-4 mt-8">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2"><HelpCircle size={20}/> Support</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">FAQ</div>
              <div className="mt-1 text-lg font-semibold">How do suggestions work?</div>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">We boost products that match what you view, add to cart, and search for. Data never leaves your browser.</p>
            </div>
            <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Shipping</div>
              <div className="mt-1 text-lg font-semibold">When will I receive my order?</div>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Most orders ship within 24–48 hours with tracked delivery.</p>
            </div>
            <div className="rounded-2xl bg-white dark:bg-neutral-900 ring-1 ring-black/5 dark:ring-white/10 p-5">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Returns</div>
              <div className="mt-1 text-lg font-semibold">30‑day hassle‑free returns</div>
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">Start a return from your profile after signing in.</p>
            </div>
          </div>
        </div>
      )}
      <footer className="mt-16 border-t border-neutral-200/70 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-600 dark:text-neutral-300 flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Swatej Goud • <a className='underline' href='https://www.linkedin.com/in/swatejgoud' target='_blank'>LinkedIn</a></div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#">Privacy</a>
            <a className="hover:underline" href="#">Terms</a>
            <a className="hover:underline" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
