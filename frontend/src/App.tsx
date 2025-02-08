import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Signup";
import Navbar from "./components/ImageCaptioning/Navbar";
import Home from "./components/ImageCaptioning/Home";
import { AuthProvider, useAuth } from "./contexts/authContext";
import Loading from "./components/Loading/Loading";
import Footer from "./components/ImageCaptioning/Footer";
import ProtectedRoute from "./components/ImageCaptioning/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";

// Lazy load components
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));
const PrivacyPolicy = React.lazy(() => import("./components/ImageCaptioning/PrivacyPolicy"));
const ReachOut = React.lazy(() => import("./components/ImageCaptioning/ContactUs"));

// Redirect users if they are already logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { userLoggedIn } = useAuth();
  return userLoggedIn ? <Navigate to="/protected" replace /> : children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <div className="w-full min-h-screen flex flex-col">
          <Routes>
            {/* Show Home Only If User Is Not Logged In */}
            <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

            {/* Redirect Logged-In Users Away From Login/Register */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* Protected Page - Requires Login */}
            <Route path="/protected" element={<ProtectedRoute><Suspense fallback={<Loading />}><ProtectedComponent /></Suspense></ProtectedRoute>} />

            {/* Always Visible Pages */}
            <Route path="/privacy-policy" element={<Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>} />
            <Route path="/reach-out" element={<Suspense fallback={<Loading />}><ReachOut /></Suspense>} />

            {/* Lazy Loaded Home Page (if needed separately) */}
            <Route path="/home" element={<Suspense fallback={<Loading />}><HomePage /></Suspense>} />

            {/* Footer Always Visible */}
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
