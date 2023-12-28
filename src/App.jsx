import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  LogIn,
  SignUp,
  Movies,
  Shows,
  Bookmarked,
  Profile,
  MovieDetails,
  ShowDetails,
} from './pages/index';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <SearchContextProvider>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                }
              />
              <Route
                path="/movies"
                element={
                  <MainLayout>
                    <Movies />
                  </MainLayout>
                }
              />
              <Route
                path="/shows"
                element={
                  <MainLayout>
                    <Shows />
                  </MainLayout>
                }
              />
              <Route
                path="/movie-details/:id"
                element={
                  <MainLayout>
                    <MovieDetails />
                  </MainLayout>
                }
              />
              <Route
                path="/show-details/:id"
                element={
                  <MainLayout>
                    <ShowDetails />
                  </MainLayout>
                }
              />
              <Route
                path="/bookmarked"
                element={
                  <MainLayout>
                    <ProtectedRoute>
                      <Bookmarked />
                    </ProtectedRoute>
                  </MainLayout>
                }
              />
              <Route
                path="/log-in"
                element={
                  <AuthLayout>
                    <LogIn />
                  </AuthLayout>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <AuthLayout>
                    <SignUp />
                  </AuthLayout>
                }
              />
            </Routes>
          </main>
        </SearchContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
