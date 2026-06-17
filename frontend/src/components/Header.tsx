import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../utils/AuthContext';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogo from '../assets/images/mobile-logo-white.png'
import './Header.css';

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number; 
    deliveryOptionId: string; 
  }[];
}

export function Header({ cart }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchInput = (event: {
    target: {
      value: string;
    }
  }) => {
    const value = event.target.value;
    setSearch(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      if (value) {
        navigate(`/?search=${value}`);
      } else {
        navigate('/');
      }
    }, 300);
  }

  const handleKeyDown = (event: {
    key: string;
  }) => {
    if (event.key === 'Enter') {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

      if (search) {
        navigate(`/?search=${search}`);
      } else {
        navigate('/');
      }
    }
  }

  // Accumulation Pattern
  let totalQuantity = 0; 

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity; 
  });

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={LogoWhite} />
            <img className="mobile-logo"
              src={MobileLogo} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Поиск" onChange={handleSearchInput} onKeyDown={handleKeyDown} value={search}/>
        </div>

        <div className="right-section">
          {isAuthenticated ? (
            <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#fff', fontSize: 14 }}>{user?.email}</span>
              <button onClick={logout} className="logout-button" style={{
                background: 'none', border: '1px solid #fff', color: '#fff',
                padding: '4px 12px', borderRadius: 4, cursor: 'pointer', fontSize: 13
              }}>Выйти</button>
            </div>
          ) : (
            <NavLink className="orders-link header-link" to="/login" style={{ textDecoration: 'none' }}>
              <span className="orders-text">Войти</span>
            </NavLink>
          )}

          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Заказы</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Корзина</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}