import React, { useState, FormEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Mail, Lock, CheckCircle2, XCircle, Loader2, UserPlus } from 'lucide-react';

// Aurora component remains the same
const Aurora = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,87,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(58,182,246,0.15),transparent_50%)]" />
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
      <div className="absolute inset-0 backdrop-blur-[100px] mix-blend-normal opacity-30" />
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  const [passwordValidations, setPasswordValidations] = useState([
    { text: 'At least 6 characters', valid: false },
    { text: 'At least one number', valid: false },
    { text: 'At least one special character', valid: false }
  ]);

  const validatePassword = (password: string) => {
    setPasswordValidations([
      { text: 'At least 6 characters', valid: password.length >= 6 },
      { text: 'At least one number', valid: /\d/.test(password) },
      { text: 'At least one special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
    ]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordValidations.some(v => !v.valid) || password !== confirmPassword) return;

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate('/home');
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-slate-950 relative overflow-x-hidden mt-9 pt-2">
      {userLoggedIn && <Navigate to="/protected" replace={true} />}
      
      <Aurora />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(99, 102, 241), rgb(59, 130, 246));
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(79, 70, 229), rgb(29, 78, 216));
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="w-full max-w-md mx-auto px-3 py-8 relative z-10"
      >
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="relative backdrop-blur-2xl bg-white/[0.12] rounded-3xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-6 md:mb-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl p-[2px] mb-4"
                >
                  <div className="w-full h-full bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                    <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-400 mt-2">Join our community today</p>
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
                        onFocus={() => setActiveField('email')}
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
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePassword(e.target.value);
                        }}
                        onFocus={() => setActiveField('password')}
                        className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                          focus:outline-none focus:border-indigo-500 transition-all duration-300
                          placeholder-gray-500"
                        placeholder="Create password"
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {activeField === 'password' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 space-y-1"
                        >
                          {passwordValidations.map((validation, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              {validation.valid ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={validation.valid ? 'text-green-400' : 'text-gray-400'}>
                                {validation.text}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2 transition-colors group-focus-within:text-indigo-400">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                        transition-colors group-focus-within:text-indigo-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setActiveField('confirmPassword')}
                        className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                          focus:outline-none focus:border-indigo-500 transition-all duration-300
                          placeholder-gray-500"
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                    <AnimatePresence>
                      {activeField === 'confirmPassword' && confirmPassword && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-2 flex items-center gap-2 text-sm"
                        >
                          {password === confirmPassword ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">Passwords match</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span className="text-red-400">Passwords don't match</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="submit"
                    disabled={isRegistering || password !== confirmPassword || passwordValidations.some(v => !v.valid)}
                    className="w-full relative group overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-70"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 group-hover:opacity-90" />
                    <div className="relative bg-black/20 backdrop-blur-xl rounded-[10px] py-3 px-4 transition-all duration-300 group-hover:bg-black/40
                      flex items-center justify-center gap-2 text-white font-medium"
                    >
                      {isRegistering ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <span>Create Account</span>
                      )}
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
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-indigo-400 hover:text-blue-400 transition-colors duration-300 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;