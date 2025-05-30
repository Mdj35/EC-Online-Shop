import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  Body,
  TopBar,
  TopButton,
  Header,
  LogoWrapper,
  Logo,
  Tagline,
  SearchForm,
  SearchInput,
  SearchIcon,
  Nav,
  NavList,
  NavItem,
  Main,
  ProductBlock,
} from '../Design/Home';

// Modal styles (simple inline for demo)
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};
const modalContentStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 24,
  maxWidth: 350,
  width: '90%',
  boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

function ProductSkeleton() {
  return (
    <div
      style={{
        background: '#e5e7eb',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: '100%',
        maxWidth: 240,
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'pulse 1.5s infinite',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 220,
        height: 120,
        background: '#d1d5db',
        borderRadius: 8,
        marginBottom: 8,
      }} />
      <div style={{ width: '70%', height: 18, background: '#d1d5db', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '90%', height: 14, background: '#d1d5db', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '40%', height: 16, background: '#d1d5db', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '50%', height: 12, background: '#d1d5db', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '40%', height: 12, background: '#d1d5db', borderRadius: 4 }} />
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

const API_URL = 'https://vynceianoani.helioho.st/ecos/products.php';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal and cart state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate(); // <-- Add this line

  // Search suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const searchRef = useRef();

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  // Filter products by type and search
  const filteredProducts = products.filter(prod => {
    const matchesType = filter === 'all' || prod.type === filter;
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Suggestions for search bar
  const suggestions = search
    ? products
        .filter(
          prod =>
            prod.name.toLowerCase().includes(search.toLowerCase())
        )
        .map(prod => prod.name)
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .slice(0, 5)
    : [];

  // Add to cart handler (with quantity)
  const handleAddToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        // Increase quantity in cart, but not above stock
        return prev.map(item =>
          item.id === product.id
            ? { ...item, cartQty: Math.min(item.cartQty + qty, Number(product.quantity)) }
            : item
        );
      }
      return [...prev, { ...product, cartQty: Math.min(qty, Number(product.quantity)) }];
    });
    setSelectedProduct(null);
    setShowCart(true);
  };

  // Remove from cart handler
  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Checkout handler
  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  // Cart modal
  const CartModal = () => (
    <div style={modalOverlayStyle} onClick={() => setShowCart(false)}>
      <div style={{ ...modalContentStyle, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <h2 style={{ marginBottom: 16 }}>Your Cart</h2>
        {cart.length === 0 ? (
          <div style={{ marginBottom: 16 }}>Your cart is empty.</div>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{ marginBottom: 12, width: '100%', display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: 13 }}>₱{item.price} x {item.cartQty}</div>
              </div>
              <button
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
        <div style={{ marginTop: 16, width: '100%', textAlign: 'right' }}>
          <button
            style={{
              background: '#111',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '8px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => setShowCart(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Product modal
  const ProductModal = () => {
    const [qty, setQty] = useState(1);

    if (!selectedProduct) return null;

    const maxQty = Number(selectedProduct.quantity);

    return (
      <div style={modalOverlayStyle} onClick={() => setSelectedProduct(null)}>
        <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
          {selectedProduct.image && (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: '100%', maxWidth: 220, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }}
            />
          )}
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: 8 }}>{selectedProduct.name}</div>
          <div style={{ fontSize: '1rem', marginBottom: 8 }}>{selectedProduct.description}</div>
          <div style={{ color: '#111', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 8 }}>₱{selectedProduct.price}</div>
          <div style={{ fontSize: '0.95rem', color: '#555', marginBottom: 16 }}>Stock: {selectedProduct.quantity}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontWeight: 'bold' }}>Qty:</span>
            <button
              style={{
                width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', background: '#f3f4f6', fontWeight: 'bold', cursor: 'pointer'
              }}
              onClick={() => setQty(q => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >-</button>
            <input
              type="number"
              min={1}
              max={maxQty}
              value={qty}
              onChange={e => {
                let val = Number(e.target.value);
                if (isNaN(val)) val = 1;
                setQty(Math.max(1, Math.min(maxQty, val)));
              }}
              style={{
                width: 48, textAlign: 'center', fontSize: 16, border: '1px solid #ccc', borderRadius: 4, padding: 2
              }}
            />
            <button
              style={{
                width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', background: '#f3f4f6', fontWeight: 'bold', cursor: 'pointer'
              }}
              onClick={() => setQty(q => Math.min(maxQty, q + 1))}
              disabled={qty >= maxQty}
            >+</button>
          </div>
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <button
              style={{
                flex: 1,
                background: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '10px 0',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => handleAddToCart(selectedProduct, qty)}
              disabled={maxQty === 0}
            >
              Add to Cart
            </button>
            <button
              style={{
                flex: 1,
                background: '#e5e7eb',
                color: '#111',
                border: 'none',
                borderRadius: 4,
                padding: '10px 0',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProduct(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle suggestion click
  const handleSuggestionClick = (name) => {
    setSearch(name);
    setShowSuggestions(false);
    setFilter('all');
  };

  // Show only the selected product if suggestion is clicked
  const displayedProducts =
    suggestions.includes(search)
      ? products.filter(prod => prod.name === search)
      : filteredProducts;

  // Keyboard navigation for suggestions
  const handleSearchKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlighted(h => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && highlighted >= 0) {
      handleSuggestionClick(suggestions[highlighted]);
    }
  };

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <Body>
      <TopBar>
        <TopButton onClick={() => setShowCart(true)}>
          <span>SHOP CART</span>
          <i className="fas fa-shopping-cart" />
          {cart.length > 0 && (
            <span style={{
              background: '#ef4444',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 8px',
              fontSize: 12,
              marginLeft: 6
            }}>{cart.reduce((sum, item) => sum + item.cartQty, 0)}</span>
          )}
        </TopButton>
        <TopButton onClick={handleCheckout}>CHECKOUT</TopButton> {/* <-- Update this line */}
      </TopBar>

      <Header>
        <LogoWrapper>
          <Logo>
            <span>EC ONLINE</span>
            <span>SHOP</span>
          </Logo>
          <Tagline>MURA DITO!</Tagline>
        </LogoWrapper>

        <div style={{ position: 'relative', width: '10rem' }} ref={searchRef}>
          <SearchForm onSubmit={e => e.preventDefault()}>
            <SearchInput
              type="text"
              aria-label="Search"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowSuggestions(true);
                setHighlighted(-1);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              autoComplete="off"
            />
            <SearchIcon className="fas fa-search" />
          </SearchForm>
          {showSuggestions && suggestions.length > 0 && (
            <ul
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#fff',
                border: '1px solid #ccc',
                borderTop: 'none',
                zIndex: 10,
                listStyle: 'none',
                margin: 0,
                padding: 0,
                maxHeight: 180,
                overflowY: 'auto',
                borderRadius: '0 0 8px 8px'
              }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  onMouseEnter={() => setHighlighted(i)}
                  style={{
                    padding: '8px 16px',
                    background: highlighted === i ? '#f3f4f6' : '#fff',
                    cursor: 'pointer'
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Header>

      <Nav>
        <NavList>
          <li>
            <NavItem
              as="button"
              style={{ background: filter === 'all' ? '#111' : undefined, color: filter === 'all' ? '#fff' : undefined }}
              onClick={() => setFilter('all')}
            >
              OUR PRODUCTS
            </NavItem>
          </li>
          <li>
            <NavItem
              as="button"
              style={{ background: filter === 'merchandise' ? '#111' : undefined, color: filter === 'merchandise' ? '#fff' : undefined }}
              onClick={() => setFilter('merchandise')}
            >
              MERCHANDISE
            </NavItem>
          </li>
          <li>
            <NavItem
              as="button"
              style={{ background: filter === 'cosmetics' ? '#111' : undefined, color: filter === 'cosmetics' ? '#fff' : undefined }}
              onClick={() => setFilter('cosmetics')}
            >
              COSMETICS
            </NavItem>
          </li>
          <li>
            <NavItem
              as="button"
              style={{ background: filter === 'others' ? '#111' : undefined, color: filter === 'others' ? '#fff' : undefined }}
              onClick={() => setFilter('others')}
            >
              OTHERS
            </NavItem>
          </li>
        </NavList>
      </Nav>

      <Main>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : displayedProducts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>No products found.</div>
        ) : (
          displayedProducts.map(prod => (
            <ProductBlock
              key={prod.id}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedProduct(prod)}
            >
              {prod.image && (
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{
                    width: '100%',
                    maxWidth: 220,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginBottom: 8
                  }}
                />
              )}
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 4 }}>{prod.name}</div>
              <div style={{ fontSize: '0.95rem', marginBottom: 4 }}>{prod.description}</div>
              <div style={{ color: '#111', fontWeight: 'bold', marginBottom: 4 }}>₱{prod.price}</div>
              <div style={{ fontSize: '0.85rem', color: '#555', textTransform: 'capitalize' }}>{prod.type}</div>
              <div style={{ fontSize: '0.85rem', color: '#555' }}>Stock: {prod.quantity}</div>
            </ProductBlock>
          ))
        )}
      </Main>

      {selectedProduct && <ProductModal />}
      {showCart && <CartModal />}
    </Body>
  );
};

export default Home;