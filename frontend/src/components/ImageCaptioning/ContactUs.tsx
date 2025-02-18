import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ReachOut = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        setStatus("An error occurred while sending your message. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-cyan-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 via-transparent to-cyan-50/50" />
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-rose-200/20 rounded-full mix-blend-normal filter blur-3xl" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-sky-200/20 rounded-full mix-blend-normal filter blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Let's Start a Conversation
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Have a project in mind? We'd love to discuss how we can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-4 space-y-4"
          >
            {/* Quick Contact Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Contact</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Email us at</p>
                      <p className="text-slate-800">hello@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-cyan-50 rounded-lg">
                      <Phone className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Call us at</p>
                      <p className="text-slate-800">+1 (555) 000-0000</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Visit us at</p>
                      <p className="text-slate-800">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200"
          >
            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                    status.includes("successfully")
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {status.includes("successfully") ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{status}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/90 border pl-11 ${
                        errors.name ? "border-red-300" : "border-slate-200"
                      } text-slate-900 rounded-lg px-4 py-3 outline-none transition-all duration-300
                      focus:border-blue-500 focus:bg-white group-hover:bg-white placeholder:text-slate-400`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/90 border pl-11 ${
                        errors.email ? "border-red-300" : "border-slate-200"
                      } text-slate-900 rounded-lg px-4 py-3 outline-none transition-all duration-300
                      focus:border-blue-500 focus:bg-white group-hover:bg-white placeholder:text-slate-400`}
                      placeholder="Your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-white/90 border pl-11 ${
                      errors.phone ? "border-red-300" : "border-slate-200"
                    } text-slate-900 rounded-lg px-4 py-3 outline-none transition-all duration-300
                    focus:border-blue-500 focus:bg-white group-hover:bg-white placeholder:text-slate-400`}
                    placeholder="Your phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <div className="relative group">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-600" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-white/90 border pl-11 ${
                      errors.message ? "border-red-300" : "border-slate-200"
                    } text-slate-900 rounded-lg px-4 py-3 outline-none transition-all duration-300
                    focus:border-blue-500 focus:bg-white group-hover:bg-white placeholder:text-slate-400`}
                    placeholder="Your message"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg
                         font-medium transition-all duration-300
                         disabled:opacity-70 disabled:cursor-not-allowed relative group
                         focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center space-x-2">
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;