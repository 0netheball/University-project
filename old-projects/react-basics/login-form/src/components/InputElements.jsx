import {useState} from 'react';
import './InputElements.css';

export default function InputElements() {
  const [showPassword, setShowPassword] = useState(false);
  function displayPassword() {
    
    if (!showPassword) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  }

  return (
    <div className="input-container">
      <input 
        placeholder="Email"
        type="Login"
        className="input-element"
      />
      <div>
        <input 
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          className="input-element"  
        />
        {showPassword ? (<button
          onClick={displayPassword}
        >Hide</button>) : (<button
          onClick={displayPassword}
        >Show</button>)}
      </div>
    </div>
  );
}
