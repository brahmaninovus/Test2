import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { ThemeContext } from '../contexts/ThemeContext'

const Header = () => {
  const { token, user, logout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const nav = useNavigate()

  function handleLogout() {
    logout()
    nav('/login')
  }

  console.log('USER:', user);

  return (
    <header>
      <h1>
        <Link to="/">Aplikasi Catatan</Link>
      </h1>
      {token && (
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">Terarsip</Link>
            </li>
            <li>
              <button onClick={toggleTheme} className="toggle-theme">
                {theme === 'dark' ? (
                  <ion-icon name="sunny-outline"></ion-icon>
                ) : (
                  <ion-icon name="moon-outline"></ion-icon>
                )}
              </button>
            </li>
            <li>
              <button className="button-logout" onClick={handleLogout}>
                <ion-icon name="log-out-outline"></ion-icon>
                <span>{user?.name || 'User'}</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
      {!token && (
        <div className="navigation">
          <button onClick={toggleTheme} className="toggle-theme">
            {theme === 'dark' ? (
              <ion-icon name="sunny-outline"></ion-icon>
            ) : (
              <ion-icon name="moon-outline"></ion-icon>
            )}
          </button>
        </div>
      )}
    </header>
  )
}

export default Header