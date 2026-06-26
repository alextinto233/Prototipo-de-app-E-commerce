import React, { useState, useMemo } from 'react';
import { 
  Search, Bell, Home, LayoutGrid, RefreshCcw, ShoppingCart, 
  Plus, Minus, TrendingUp, Award, Package, ArrowLeft, 
  Info, Trash2, CheckCircle2, ChevronRight
} from 'lucide-react';
import SofiaChatWidget from './components/SofiaChatWidget';
import ProfileScreen, { ProfileButton } from './components/ClientProfileMenu';

// --- DATOS SIMULADOS (Actualizados con Categorías) ---
// PARA CAMBIAR LAS FOTOS: Agrega la URL de tu imagen real en la propiedad 'imageUrl' de cada producto.
const PRODUCTS = [
  { id: 1, title: 'Caja Cerveza Cristal 1L Retornable', category: 'Cervezas', subtitle: 'Caja 12 un.', price: 18000, tag: 'Alta Rotación', tagType: 'alta-rotacion', isReturnable: true, bottlesPerBox: 12, discountPerBottle: 250, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Cerveza_Cristal.jpg/500px-Cerveza_Cristal.jpg' },
  { id: 2, title: 'Pisco Mistral Nobel 40°', category: 'Licores', subtitle: 'Caja 6 un.', price: 42000, tag: 'Premium', tagType: 'premium', isReturnable: false, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pisco-bottles-Chile.jpg/500px-Pisco-bottles-Chile.jpg' },
  { id: 3, title: 'Pepsi Zero 2L', category: 'Bebidas', subtitle: 'Display 6 un.', price: 9500, tag: '', tagType: '', isReturnable: false, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pepsi_2023.svg/500px-Pepsi_2023.svg.png' },
  { id: 4, title: 'Heineken Lata 350cc', category: 'Cervezas', subtitle: 'Pack 24 un.', price: 22500, tag: '', tagType: '', isReturnable: false, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Heineken_Flasche_0.33.jpg/500px-Heineken_Flasche_0.33.jpg' },
  { id: 5, title: 'Bilz Naranja 2L Retornable', category: 'Bebidas', subtitle: 'Caja 8 un.', price: 12500, tag: 'Recomendado', tagType: 'alta-rotacion', isReturnable: true, bottlesPerBox: 8, discountPerBottle: 300, imageUrl: 'https://via.placeholder.com/500x500.png?text=Bilz+Naranja+2L' },
  { id: 6, title: 'Alto del Carmen 35°', category: 'Licores', subtitle: 'Caja 6 un.', price: 35000, tag: '', tagType: '', isReturnable: false, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Pisco_sour_20100613b.JPG/500px-Pisco_sour_20100613b.JPG' },
];

const formatCLP = (amount) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);
};

// --- COMPONENTES REUTILIZABLES ---

const ProductCard = ({ product, cartItem, addToCart, updateQuantity }) => {
  const getTagStyle = () => {
    if (product.tagType === 'alta-rotacion') return 'bg-green-100 text-[#006838] border-[#006838]/20';
    if (product.tagType === 'premium') return 'bg-amber-100 text-amber-800 border-amber-200';
    return '';
  };

  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col h-full relative group">
      {product.tag && (
        <div className="absolute top-0 left-0 w-full px-3 py-2 flex justify-start z-10">
          <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border shadow-sm ${getTagStyle()}`}>
            {product.tagType === 'alta-rotacion' && <TrendingUp size={12} className="mr-1" />}
            {product.tagType === 'premium' && <Award size={12} className="mr-1" />}
            {product.tag}
          </span>
        </div>
      )}
      
      {/* CONTENEDOR DE LA IMAGEN DEL PRODUCTO: Si imageUrl tiene un enlace, mostrará la foto, si no, el ícono por defecto */}
      <div className="bg-gray-50 rounded-xl aspect-square w-full flex items-center justify-center mb-3 mt-6 border border-gray-100 relative overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <Package className="text-gray-300" size={40} strokeWidth={1.5} />
        )}
        {cartItem && (
          <span className="absolute -top-2 -right-2 bg-[#006838] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {cartItem.quantity}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{product.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.subtitle}</p>
        </div>
        
        <div className="mt-3">
          <div className="font-black text-lg text-gray-900 leading-none mb-2">{formatCLP(product.price)}</div>
          {cartItem ? (
            <div className="flex items-center justify-between bg-gray-100 rounded-xl p-1 border border-gray-200">
              <button onClick={() => updateQuantity(product.id, -1)} className="p-1.5 text-gray-600 hover:text-[#006838] hover:bg-white rounded-lg transition-colors">
                <Minus size={18} />
              </button>
              <span className="font-bold text-gray-900 text-sm">{cartItem.quantity}</span>
              <button onClick={() => updateQuantity(product.id, 1)} className="p-1.5 text-gray-600 hover:text-[#006838] hover:bg-white rounded-lg transition-colors">
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[#006838] hover:bg-[#00522c] active:bg-[#004022] text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex justify-center items-center"
            >
              <Plus size={18} className="mr-1" />
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BottomNav = ({ view, setView, cartTotals }) => (
  <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-5 sm:pb-2 z-30 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-[2.5rem] sm:rounded-b-[2.5rem] rounded-none">
    <div className="flex justify-between items-center max-w-sm mx-auto">
      <button onClick={() => setView('home')} className={`flex flex-col items-center p-2 w-16 transition-colors ${view === 'home' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-900'}`}>
        <Home size={24} strokeWidth={view === 'home' ? 2.5 : 2} />
        <span className={`text-[10px] mt-1 ${view === 'home' ? 'font-bold' : 'font-medium'}`}>Inicio</span>
      </button>
      <button onClick={() => setView('catalog')} className={`flex flex-col items-center p-2 w-16 transition-colors ${view === 'catalog' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-900'}`}>
        <LayoutGrid size={24} strokeWidth={view === 'catalog' ? 2.5 : 2} />
        <span className={`text-[10px] mt-1 ${view === 'catalog' ? 'font-bold' : 'font-medium'}`}>Catálogo</span>
      </button>
      <button onClick={() => setView('returnables')} className={`flex flex-col items-center p-2 w-16 transition-colors ${view === 'returnables' ? 'text-[#006838]' : 'text-gray-400 hover:text-gray-900'}`}>
        <RefreshCcw size={24} strokeWidth={view === 'returnables' ? 2.5 : 2} />
        <span className={`text-[10px] mt-1 ${view === 'returnables' ? 'font-bold' : 'font-medium'}`}>Retornables</span>
      </button>
      <button 
        onClick={() => setView('cart')}
        className={`flex flex-col items-center p-2 relative w-16 transition-colors ${view === 'cart' || cartTotals.totalItems > 0 ? 'text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
      >
        <div className="relative">
          <ShoppingCart size={24} strokeWidth={view === 'cart' || cartTotals.totalItems > 0 ? 2.5 : 2} />
          {cartTotals.totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#E4002B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-pulse">
              {cartTotals.totalItems}
            </span>
          )}
        </div>
        <span className={`text-[10px] mt-1 ${view === 'cart' ? 'font-bold' : 'font-medium'}`}>Carro</span>
      </button>
    </div>
  </nav>
);


export default function App() {
  // --- ESTADOS ---
  const [view, setView] = useState('home'); // 'home' | 'catalog' | 'returnables' | 'cart' | 'success' | 'profile'
  const [profileReturnView, setProfileReturnView] = useState('home');
  const [activeCategory, setActiveCategory] = useState('Todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReturnablesInfo, setShowReturnablesInfo] = useState(false);
  
  // Inicializamos el carrito
  const [cart, setCart] = useState([
    { ...PRODUCTS[0], quantity: 5 }
  ]);

  const categories = ['Todo', 'Cervezas', 'Licores', 'Bebidas', 'Retornables'];

  // --- LÓGICA DEL CARRITO ---
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const confirmOrder = () => {
    setView('success');
  };

  const resetApp = () => {
    setCart([]);
    setView('home');
  };

  const openProfile = () => {
    setProfileReturnView(view);
    setView('profile');
  };

  const closeProfile = () => {
    setView(profileReturnView);
  };

  // --- CÁLCULOS DERIVADOS ---
  const cartTotals = useMemo(() => {
    let subtotal = 0;
    let returnablesCount = 0;
    let returnablesDiscount = 0;
    let totalItems = 0;

    cart.forEach(item => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
      
      if (item.isReturnable) {
        const bottles = item.bottlesPerBox * item.quantity;
        returnablesCount += bottles;
        returnablesDiscount += bottles * item.discountPerBottle;
      }
    });

    return {
      subtotal,
      returnablesCount,
      returnablesDiscount,
      total: Math.max(0, subtotal - returnablesDiscount),
      totalItems
    };
  }, [cart]);


  // --- VISTAS ---

  const renderHome = () => {
    // Lógica de filtrado y búsqueda
    const filteredProducts = PRODUCTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'Todo' ? true : activeCategory === 'Retornables' ? p.isReturnable : p.category === activeCategory;
      return matchesSearch && (searchQuery ? true : matchesCategory);
    });

    return (
      <div className="flex flex-col h-full relative">
        <header className="bg-white px-4 pt-5 pb-4 sticky top-0 z-20 shadow-sm rounded-b-2xl border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col pr-2">
              <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">Hola, Samuel</span>
              <span className="text-sm font-bold text-gray-900 flex items-center">
                Casino Mayor Temuco
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
              </span>
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={22} />
                <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <ProfileButton onClick={openProfile} />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cervezas, licores, retornables..." 
              className="w-full bg-gray-100/80 text-sm font-medium text-gray-900 rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#006838] focus:bg-white transition-all border border-transparent focus:border-[#006838]/20 placeholder-gray-500 shadow-inner"
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
          {/* Categorías Filtrables */}
          <div className="flex overflow-x-auto gap-2 px-4 py-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === cat 
                    ? 'bg-[#006838] text-white border-transparent' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006838]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="px-4 mb-6">
            <div className="bg-gradient-to-r from-[#006838] to-[#004224] rounded-2xl p-4 text-white shadow-[0_8px_20px_-6px_rgba(0,104,56,0.5)] relative overflow-hidden flex items-center">
              <div className="relative z-10 w-4/5">
                <span className="text-[10px] font-bold bg-[#E4002B]/90 text-white px-2 py-1 rounded-md inline-block mb-2 uppercase tracking-wider shadow-sm">
                  Oportunidad
                </span>
                <h3 className="font-extrabold text-lg leading-tight mb-1">Gana + Margen: <span className="text-green-300">15% OFF</span></h3>
                <p className="text-xs text-green-100/90 font-medium">devolviendo tus envases de Cristal</p>
              </div>
              <RefreshCcw size={70} className="absolute -bottom-2 -right-4 text-white opacity-10 transform -rotate-12" strokeWidth={1.5} />
            </div>
          </div>

          <div className="px-4">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {searchQuery ? 'Resultados de búsqueda' : (activeCategory === 'Todo' ? 'Catálogo Destacado' : activeCategory)}
              </h2>
              <button onClick={() => setView('catalog')} className="text-[#006838] text-sm font-bold hover:underline">Ver todo</button>
            </div>
            
            <div className="grid grid-cols-2 gap-3.5">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartItem={cart.find(item => item.id === product.id)} 
                  addToCart={addToCart} 
                  updateQuantity={updateQuantity} 
                />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500 font-medium">
                  No se encontraron productos.
                </div>
              )}
            </div>
          </div>
        </main>
        
        <BottomNav view={view} setView={setView} cartTotals={cartTotals} />
      </div>
    );
  };

  const renderCatalog = () => {
    // Lógica de búsqueda en el catálogo general
    const catalogProducts = searchQuery 
      ? PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      : PRODUCTS;

    return (
      <div className="flex flex-col h-full relative bg-[#F3F4F6]">
        <header className="bg-white px-4 py-4 sticky top-0 z-20 shadow-sm rounded-b-2xl border-b border-gray-100 flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en todo el catálogo..." 
              className="w-full bg-gray-100/80 text-sm font-medium text-gray-900 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#006838] focus:bg-white transition-all border border-transparent focus:border-[#006838]/20 placeholder-gray-500 shadow-inner"
            />
          </div>
          <ProfileButton onClick={openProfile} />
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3.5">
            {catalogProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                cartItem={cart.find(item => item.id === product.id)} 
                addToCart={addToCart} 
                updateQuantity={updateQuantity} 
              />
            ))}
            {catalogProducts.length === 0 && (
              <div className="col-span-2 text-center py-8 text-gray-500 font-medium">
                No se encontraron productos.
              </div>
            )}
          </div>
        </main>
        <BottomNav view={view} setView={setView} cartTotals={cartTotals} />
      </div>
    );
  };

  const renderReturnables = () => (
    <div className="flex flex-col h-full relative bg-[#F3F4F6]">
      <header className="bg-[#eaf4ed] px-4 pt-6 pb-8 sticky top-0 z-20 shadow-sm rounded-b-3xl border-b border-[#006838]/20">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-xl font-bold text-[#006838] flex items-center">
            <RefreshCcw size={24} className="mr-2" /> Mis Retornables
          </h1>
          <ProfileButton onClick={openProfile} />
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
          <p className="text-sm text-gray-500 font-medium mb-1">Saldo de Envases a favor</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-black text-gray-900">120 <span className="text-lg text-gray-500 font-medium">un.</span></span>
            <span className="text-xs bg-green-100 text-[#006838] px-2 py-1 rounded-md font-bold mb-1">Ahorro activo</span>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 custom-scrollbar">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Compra con Retorno</h2>
        <div className="grid grid-cols-2 gap-3.5">
          {PRODUCTS.filter(p => p.isReturnable).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              cartItem={cart.find(item => item.id === product.id)} 
              addToCart={addToCart} 
              updateQuantity={updateQuantity} 
            />
          ))}
        </div>
      </main>
      <BottomNav view={view} setView={setView} cartTotals={cartTotals} />
    </div>
  );

  const renderCart = () => (
    <div className="flex flex-col h-full bg-white relative">
      <header className="flex items-center px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <button onClick={() => setView('home')} className="text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-gray-900">Mi Carro - Checkout</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar pb-32">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
            <ShoppingCart size={64} className="text-gray-200 mb-4" />
            <p className="text-lg font-medium">Tu carro está vacío</p>
            <button onClick={() => setView('home')} className="mt-6 text-[#006838] font-bold underline">Volver al catálogo</button>
          </div>
        ) : (
          <>
            <section className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Productos</h2>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{cartTotals.totalItems} items</span>
              </div>
              
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-start justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="bg-gray-50 p-0.5 rounded-lg border border-gray-100 w-12 h-12 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover rounded-md" />
                        ) : (
                          <Package className="text-[#006838]" size={24} />
                        )}
                      </div>
                      <div className="flex-1 pr-2">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">{item.title}</h3>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-600 hover:text-[#006838] bg-white rounded-md shadow-sm">
                              <Minus size={14} />
                            </button>
                            <span className="font-bold text-gray-900 text-sm w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-600 hover:text-[#006838] bg-white rounded-md shadow-sm">
                              <Plus size={14} />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="ml-3 text-red-400 hover:text-red-600 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end justify-between">
                      <span className="font-bold text-gray-900">{formatCLP(item.price * item.quantity)}</span>
                      <span className="text-xs text-gray-400 mt-1">{formatCLP(item.price)} c/u</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {cartTotals.returnablesCount > 0 && (
              <section className="bg-[#eaf4ed] border border-[#006838]/30 rounded-xl p-4 relative overflow-hidden transition-all">
                <div className="flex items-center space-x-2 mb-3">
                  <RefreshCcw className="text-[#006838]" size={20} />
                  <h2 className="font-bold text-[#006838] text-lg leading-tight">Envases Retornables Declarados</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-medium flex items-center">
                    <span className="w-2 h-2 bg-[#006838] rounded-full mr-2"></span>
                    {cartTotals.returnablesCount} envases vacíos entregados
                  </p>
                  <p className="text-[#006838] font-bold text-sm bg-white inline-block px-3 py-1.5 rounded-md border border-[#006838]/20 shadow-sm mt-2">
                    Descuento aplicado: -{formatCLP(cartTotals.returnablesDiscount)}
                  </p>
                </div>
                <button 
                  onClick={() => setShowReturnablesInfo(true)} 
                  className="absolute top-4 right-4 text-[#006838] opacity-60 hover:opacity-100 transition-opacity p-1 bg-white/50 rounded-full hover:bg-white"
                >
                  <Info size={24} />
                </button>
              </section>
            )}

            <section className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Resumen de Pago</h2>
              <div className="space-y-3 text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartTotals.totalItems} un.)</span>
                  <span>{formatCLP(cartTotals.subtotal)}</span>
                </div>
                {cartTotals.returnablesDiscount > 0 && (
                  <div className="flex justify-between text-[#006838] font-medium border-b border-gray-200 pb-3">
                    <span>Abono Retornables</span>
                    <span>-{formatCLP(cartTotals.returnablesDiscount)}</span>
                  </div>
                )}
                <div className={`flex justify-between items-center ${cartTotals.returnablesDiscount === 0 ? 'border-t border-gray-200 pt-3' : 'pt-2'}`}>
                  <span className="font-bold text-gray-900 text-lg">Total a Pagar</span>
                  <span className="font-black text-2xl text-gray-900">{formatCLP(cartTotals.total)}</span>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modal de Información Retornables */}
      {showReturnablesInfo && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm sm:rounded-[2.5rem]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative border border-gray-100">
            <h3 className="font-bold text-xl mb-3 text-[#006838] flex items-center">
              <Info className="mr-2" size={24} />
              Gestión de Envases
            </h3>
            <div className="space-y-4 text-sm text-gray-600 mb-6 leading-relaxed">
              <p>
                Por cada producto retornable en tu carro, nuestro sistema calcula automáticamente el <b>descuento máximo</b> aplicable.
              </p>
              <div className="bg-[#eaf4ed] p-3 rounded-xl border border-green-100">
                <span className="font-bold text-[#006838] block mb-1">Pasos a seguir:</span>
                1. Confirma tu pedido con el descuento.<br/>
                2. Entrega los envases vacíos correspondientes al conductor.<br/>
                3. ¡Listo! El saldo a favor se aplicará en tu boleta.
              </div>
            </div>
            <button 
              onClick={() => setShowReturnablesInfo(false)} 
              className="w-full bg-[#006838] hover:bg-[#00522c] active:bg-[#004022] text-white py-3.5 rounded-xl font-bold transition-colors text-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-20 rounded-b-[2.5rem]">
          <button 
            onClick={confirmOrder}
            className="w-full bg-[#006838] hover:bg-[#00522c] active:bg-[#004022] text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-md flex justify-between items-center px-6"
          >
            <span>Confirmar Pedido</span>
            <span className="flex items-center">
              {formatCLP(cartTotals.total)}
              <ChevronRight size={20} className="ml-2 opacity-70" />
            </span>
          </button>
        </div>
      )}
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col h-full bg-[#006838] text-white relative items-center justify-center p-6 text-center">
      <div className="bg-white/10 p-6 rounded-full mb-6">
        <CheckCircle2 size={80} className="text-white" strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl font-black mb-2">¡Pedido Confirmado!</h1>
      <p className="text-green-100 text-lg mb-8">Tu orden #10045 ha sido ingresada con éxito y está en preparación.</p>
      
      <div className="bg-white text-gray-900 w-full rounded-2xl p-6 shadow-xl mb-8">
        <div className="flex justify-between border-b border-gray-100 pb-3 mb-3">
          <span className="text-gray-500">Total pagado</span>
          <span className="font-bold">{formatCLP(cartTotals.total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Envases a entregar</span>
          <span className="font-bold text-[#006838]">{cartTotals.returnablesCount} un.</span>
        </div>
      </div>

      <button 
        onClick={resetApp}
        className="w-full bg-white text-[#006838] hover:bg-gray-100 font-bold py-4 rounded-xl text-lg transition-colors shadow-md"
      >
        Volver al Inicio
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start sm:items-center p-0 sm:p-4 font-sans">
      <div className="w-full h-full sm:h-[850px] min-h-screen sm:min-h-0 bg-[#F3F4F6] max-w-[400px] relative sm:rounded-[2.5rem] sm:shadow-2xl border-x sm:border-y border-gray-300 overflow-hidden flex flex-col">
        {view === 'home' && renderHome()}
        {view === 'catalog' && renderCatalog()}
        {view === 'returnables' && renderReturnables()}
        {view === 'cart' && renderCart()}
        {view === 'success' && renderSuccess()}
        {view === 'profile' && <ProfileScreen onBack={closeProfile} />}
        {view !== 'profile' && view !== 'cart' && view !== 'success' && <SofiaChatWidget />}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}} />
    </div>
  );
}