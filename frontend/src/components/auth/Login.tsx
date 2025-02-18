import React, { useState, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Lock, Mail, Loader2 } from 'lucide-react';

// Refined Aurora component with subtle gradients
const Aurora = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Sophisticated layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,87,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(58,182,246,0.15),transparent_50%)]" />
      
      {/* Soft glow effects */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(94,87,255,0.1),transparent_50%)]"
      />
      
      {/* Ethereal gradient mesh */}
      <div className="absolute inset-0 backdrop-blur-[100px] mix-blend-normal opacity-30" />
    </div>
  );
};

const Login = () => {
  // ... rest of the component remains the same ...
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage((error as Error).message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (error) {
        console.error("Google Sign-In Error:", error);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950 pt-20 overflow-hidden">
      {userLoggedIn && <Navigate to="/protected" replace={true} />}
      
      <Aurora />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="w-full max-w-md mx-auto px-3"
      >
        <div className="relative">
          {/* Refined decorative elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative backdrop-blur-2xl bg-white/[0.12] rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10">
            {/* Rest of the form JSX remains exactly the same */}
            {/* ... Copy all the form JSX from the original component ... */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-6 md:mb-8"
            >
              <div className="mb-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl p-[2px]"
                >
                  <div className="w-full h-full bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                    <Lock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </motion.div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">Sign in to continue your journey</p>
            </motion.div>

            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                      transition-colors group-focus-within:text-indigo-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                        focus:outline-none focus:border-indigo-500 transition-all duration-300
                        placeholder-gray-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-400">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                      transition-colors group-focus-within:text-indigo-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                        focus:outline-none focus:border-indigo-500 transition-all duration-300
                        placeholder-gray-500"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full relative group overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 group-hover:opacity-90" />
                  <div className="relative bg-black/20 backdrop-blur-xl rounded-[10px] py-3 px-4 transition-all duration-300 group-hover:bg-black/40
                    flex items-center justify-center gap-2 text-white font-medium"
                  >
                    {isSigningIn ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </div>
                </button>

                <button
                  onClick={onGoogleSignIn}
                  disabled={isSigningIn}
                  className="w-full relative group overflow-hidden rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-70"
                >
                  <div className="relative px-4 py-3 transition-all duration-300 bg-black/20 group-hover:bg-black/40
                    flex items-center justify-center gap-3 text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M47.532 24.553c0-1.632-.132-3.272-.414-4.877H24.48v9.242h12.963c-.558 2.981-2.28 5.618-4.83 7.293v6.076h7.819c4.578-4.217 7.208-10.425 7.208-17.734z" fill="#4285F4"/>
                      <path d="M24.48 48c6.518 0 11.978-2.147 15.9-5.815l-7.819-6.076c-2.17 1.447-4.935 2.307-8.081 2.307-6.218 0-11.49-4.203-13.362-9.847H3.033v6.27C7.074 42.893 15.333 48 24.48 48z" fill="#34A853"/>
                      <path d="M11.118 28.569c-.476-1.428-.75-2.963-.75-4.569s.274-3.141.75-4.569V13.16H3.033C1.101 16.427 0 20.113 0 24s1.101 7.573 3.033 10.84l8.085-6.271z" fill="#FBBC04"/>
                      <path d="M24.48 9.584c3.504 0 6.644 1.204 9.117 3.567l6.94-6.94C36.484 2.347 30.96 0 24.48 0 15.333 0 7.074 5.107 3.033 13.16l8.085 6.271c1.872-5.644 7.144-9.847 13.362-9.847z" fill="#EA4335"/>
                    </svg>
                    <span>{isSigningIn ? 'Signing In...' : 'Continue with Google'}</span>
                  </div>
                </button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-indigo-400 hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;