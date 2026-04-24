import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../../utils/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Semua field wajib diisi');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password dan Confirm Password tidak sama');
      return;
    }

    try {
      const response = await register({ name, email, password });

      console.log('REGISTER RESPONSE:', response);

      if (!response.error) {
        localStorage.setItem('name', name);
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat register');
    }
  }

  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <form className="input-register" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </section>
  );
}