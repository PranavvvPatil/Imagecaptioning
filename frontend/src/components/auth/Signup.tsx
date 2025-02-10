import React, { useState, FormEvent } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { useAuth } from '../../contexts/authContext';
import { Mail, Lock, CheckCircle2, XCircle, Loader2, UserPlus } from 'lucide-react';

const ParticlesBackground = () => {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#6366F1_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,#2DD4BF_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_top_left,#8B5CF6_0%,transparent_50%)]" />
        
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
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
  const [showValidations, setShowValidations] = useState(false);

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
    <div className="h-screen flex items-center justify-center bg-[#0F172A] pt-28 pb-12 overflow-hidden">
  {userLoggedIn && <Navigate to="/protected" replace={true} />}
  
  <ParticlesBackground />

  <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      margin: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #6366F1, #2DD4BF);
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #4F46E5, #0D9488);
    }
  `}</style>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 100,
      damping: 20,
    }}
    className="relative w-full max-w-md mx-auto px-1"
  >
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#6366F1] to-[#2DD4BF] rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-full blur-3xl opacity-20" />
          
          <div className={`relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/20 
            ${showValidations ? 'h-[85vh]' : 'h-auto'} transition-all duration-300`}>
            <div className={`${showValidations ? 'h-full overflow-y-auto custom-scrollbar' : ''} rounded-3xl`}>
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-[#6366F1] to-[#2DD4BF] rounded-2xl p-[2px] mb-4"
                  >
                    <div className="w-full h-full bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                      <UserPlus className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#2DD4BF] bg-clip-text text-transparent">
                    Create Account
                  </h2>
                  <p className="text-gray-400 mt-2">Join our community today</p>
                </motion.div>

                <form onSubmit={onSubmit} className="space-y-5">
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-5"
                  >
                    <div className="group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                          transition-colors group-focus-within:text-[#2DD4BF]" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                            focus:outline-none focus:border-[#2DD4BF] transition-all duration-300
                            placeholder-gray-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                          transition-colors group-focus-within:text-[#2DD4BF]" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                          }}
                          onFocus={() => setShowValidations(true)}
                          className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                            focus:outline-none focus:border-[#2DD4BF] transition-all duration-300
                            placeholder-gray-500"
                          placeholder="Create password"
                          required
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 
                          transition-colors group-focus-within:text-[#2DD4BF]" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-black/20 border-2 border-white/10 rounded-xl px-10 py-3 text-white
                            focus:outline-none focus:border-[#2DD4BF] transition-all duration-300
                            placeholder-gray-500"
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {showValidations && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 py-2"
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
                  </AnimatePresence>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <button
                      type="submit"
                      disabled={isRegistering || password !== confirmPassword || passwordValidations.some(v => !v.valid)}
                      className="w-full relative group overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]/50 disabled:opacity-70 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#2DD4BF] transition-all duration-300 group-hover:opacity-90" />
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
                      className="text-[#2DD4BF] hover:text-[#6366F1] transition-colors duration-300 font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;