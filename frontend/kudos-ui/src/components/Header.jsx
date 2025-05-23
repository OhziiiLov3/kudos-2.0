import { useState } from 'react';
import '../styles/Header.css';

const Header = ({onCreateBoardClick}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <header className="header">
      <div className="header__title">Kudos App</div>
        {user && (
        <button className="header__button" onClick={onCreateBoardClick}>
          + New Board
        </button>
      )}
      {user ? (
        <button className="header__button logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <div className="header__auth-wrapper">
          <button
            className="header__button login"
            onClick={() => setShowOptions(!showOptions)}
          >
            Login / Signup
          </button>
          {showOptions && (
            <div className="auth-options-dropdown">
              <button onClick={() => handleNavigate('/login')}>Login</button>
              <button onClick={() => handleNavigate('/signup')}>Sign Up</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
