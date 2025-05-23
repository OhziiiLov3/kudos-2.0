import '../styles/Header.css';

const  Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header__title">Kudos App</div>
      <button
        className={`header__button ${user ? 'logout' : 'login'}`}
        onClick={user ? handleLogout : () => (window.location.href = '/login')}
      >
        {user ? 'Logout' : 'Login / Signup'}
      </button>
    </header>
  );
}
 
export default Header;