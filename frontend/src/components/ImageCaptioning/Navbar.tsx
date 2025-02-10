import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.tsx";
import vector from "../../assets/navbar/Vector - 0.png";
import { doSignOut } from "../../firebase/auth.tsx";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleAuthAction = async () => {
    if (userLoggedIn) {
      await doSignOut();
    }
    navigate("/login");
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-500 py-2 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(120,119,198,0.1),transparent)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_-30%,rgba(120,119,198,0.15),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative transition-transform duration-300 group-hover:rotate-12">
              <img
                src={vector}
                alt="Logo"
                className="w-7 h-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300" />
            </div>
            <Link to="/" className="relative">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient group-hover:from-violet-300 group-hover:via-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                <span className="hover:animate-pulse">Snap</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300">
                  Caption
                </span>
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
              <Sparkles className="absolute -top-4 -right-4 w-4 h-4 text-indigo-400 animate-pulse" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["Privacy Policy", "Contact Us"].map((item) => (
              <div key={item} className="relative group">
                <Link
                  to={item === "Contact Us" ? "/reach-out" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 relative py-2 px-4"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/5 rounded-lg scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </div>
            ))}

            <button
              className="relative px-6 py-2.5 rounded-full overflow-hidden group transition-all duration-300"
              onClick={handleAuthAction}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-violet-400/50 via-indigo-400/50 to-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              <span className="relative flex items-center gap-2 text-white font-medium">
                {userLoggedIn ? "Logout" : "Get Started"}
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-indigo-500/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative text-white transform transition-transform duration-300 group-hover:scale-110">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-4 pb-3 space-y-2">
            {["How It Works", "Privacy Policy", "Contact Us"].map((item, index) => (
              <Link
                key={item}
                to={item === "How It Works" ? "#how-it-works" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="group block relative overflow-hidden"
                style={{
                  transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `all 300ms ${index * 100}ms`,
                }}
              >
                <div className="relative flex items-center justify-between text-gray-300 hover:text-white px-4 py-3 rounded-lg group-hover:bg-white/5 transition-colors duration-300">
                  {item}
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
            <div className="px-4 pt-2">
              <button
                className="w-full relative px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600/90 via-indigo-600/90 to-purple-600/90 text-white font-medium overflow-hidden group"
                onClick={handleAuthAction}
                style={{
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: "all 300ms 300ms",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/0 via-indigo-400/30 to-purple-400/0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {userLoggedIn ? "Logout" : "Get Started"}
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;