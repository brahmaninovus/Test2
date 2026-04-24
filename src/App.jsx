import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainPage from './pages/MainPage';
import NotePage from './pages/NotePage';
import NoteInput from './pages/NoteInput';
import { AuthContext } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Header />

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          {!token && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}

          {/* PRIVATE ROUTES */}
          {token && (
            <>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <MainPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/archives"
                element={
                  <PrivateRoute>
                    <MainPage type="archived" />
                  </PrivateRoute>
                }
              />

               <Route
                path="/notes/new"
                element={
                  <PrivateRoute>
                    <NoteInput />
                  </PrivateRoute>
                }
               />

              <Route
                path="/notes/:id"
                element={
                  <PrivateRoute>
                    <NotePage />
                  </PrivateRoute>
                }
              />
            </>
          )}

          {/* fallback */}
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;