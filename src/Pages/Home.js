import React, { useEffect, useState } from 'react';
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

const API_URL = 'https://vynceianoani.helioho.st/ecos/products.php';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Filter products by type and search
  const filteredProducts = products.filter(prod => {
    const matchesType = filter === 'all' || prod.type === filter;
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <Body>
      <TopBar>
        <TopButton>
          <span>SHOP CART</span>
          <i className="fas fa-shopping-cart" />
        </TopButton>
        <TopButton>CHECKOUT</TopButton>
      </TopBar>

      <Header>
        <LogoWrapper>
          <Logo>
            <span>EC ONLINE</span>
            <span>SHOP</span>
          </Logo>
          <Tagline>MURA DITO!</Tagline>
        </LogoWrapper>

        <SearchForm onSubmit={e => e.preventDefault()}>
          <SearchInput
            type="text"
            aria-label="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <SearchIcon className="fas fa-search" />
        </SearchForm>
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
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', width: '100%' }}>No products found.</div>
        ) : (
          filteredProducts.map(prod => (
            <ProductBlock key={prod.id}>
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
    </Body>
  );
};

export default Home;