import { useState, useContext } from 'react';
import { link } from 'react-router-dom';
import { login } from '../api/notes-api';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginPage() {
  const { loginSuccess } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login({ email, password });
    if (!result.error) {
      loginSuccess(result.data);
    }
  }

  return (
   <section className="login-page">
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form className="input-login" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </section>
  )
}