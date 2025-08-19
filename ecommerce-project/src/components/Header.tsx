import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogo from '../assets/images/mobile-logo-white.png'
import './Header.css';

// Type Alias = works like a variable, but for types
type HeaderProps = {
  cart: {
    productId: string;
    quantity: number; 
    deliveryOptionId: string; 
  }[];
}

// TypeScript does not have enough info to figure out the type
export function Header({ cart }: HeaderProps) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();



  const getTextInput = (event: {
    target: {
      value: string;
    }
  }) => {
    setSearch(event.target.value);
  }

  const searchProducts = () => {
    navigate(`/?search=${search}`);
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
          <input className="search-bar" type="text" placeholder="Search" onChange={getTextInput} value={search}/>

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}