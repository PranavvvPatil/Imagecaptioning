import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const ShiningStars = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-200"
        initial={{
          opacity: 0.1,
          scale: 0.5,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          opacity: [0.1, 0.8, 0.1],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          repeatType: "reverse",
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-900 via-[#1a0b2e] to-[#0f0728] overflow-hidden">
      <ShiningStars />
      
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,214,0,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(216,180,254,0.05),transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              SnapCaption
            </h2>
            <p className="text-purple-200/80">
              Turn your moments into words with our state-of-the-art image captioning technology.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent 
                  backdrop-blur-xl rounded-full flex items-center justify-center
                  border border-purple-500/20 hover:border-yellow-500/40 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-purple-300" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent 
                  backdrop-blur-xl rounded-full flex items-center justify-center
                  border border-purple-500/20 hover:border-yellow-500/40 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-purple-300" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {['About', 'Features', 'Team', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <Link to={`/${item.toLowerCase()}`} className="text-purple-200/80 hover:text-yellow-200 transition-colors">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">info@snapcaption.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-amber-300/80 w-5 h-5" />
                <span className="text-purple-200/80">+91 123 456 7890</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-purple-500/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200/70 text-sm">
              © 2025 SnapCaption. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-purple-200/70 hover:text-yellow-200 text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;