// import React, { useState } from "react";
// import axios from "axios";

// const ReachOut = () => {
//   // Define form data structure
//   interface FormData {
//     name: string;
//     email: string;
//     phone: string;
//     message: string;
//   }

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [status, setStatus] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validate = (): boolean => {
//     let isValid = true;
//     const newErrors: Partial<FormData> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required.";
//       isValid = false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//       isValid = false;
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Invalid email format.";
//       isValid = false;
//     }

//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//       isValid = false;
//     } else if (!phoneRegex.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//       isValid = false;
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validate()) {
//       try {
//         const response = await axios.post("http://localhost:5001/api/contact", formData);

//         if (response.status === 201) {
//           setStatus("Form submitted successfully!");
//           setFormData({
//             name: "",
//             email: "",
//             phone: "",
//             message: "",
//           });
//           setErrors({});
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         setStatus("An error occurred while submitting the form. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="w-full h-lvh bg-[#18212C] flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Reach Out to Us</h1>
//         {status && <p className={`text-center ${status.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{status}</p>}
//         <form onSubmit={handleSubmit}>
//           {/* Name Field */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Phone Number Field */}
//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.phone ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your phone number"
//             />
//             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//           </div>

//           {/* Message Field */}
//           <div className="mb-4">
//             <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
//               Message
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className={`w-full p-2 border rounded-lg ${
//                 errors.message ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your message"
//               rows={4}
//             ></textarea>
//             {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReachOut;

import React, { useState } from "react";
import axios from "axios";

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
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post("http://localhost:5001/api/contact", formData);

        if (response.status === 201) {
          setStatus("Form submitted successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setErrors({});
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setStatus("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-zinc-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg">
        {/* Decorative background elements */}
        <div className="absolute -top-8 -left-8 w-64 h-64 bg-rose-400 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>

        <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl transition-all duration-300">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Reach Out to Us
          </h1>

          {status && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              status.includes("successfully")
                ? "bg-rose-500/20 text-rose-100"
                : "bg-red-500/20 text-red-100"
            }`}>
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${
                  errors.name ? "border-red-400" : "border-white/10"
                } text-white rounded-lg px-4 py-3 outline-none transition-all duration-300
                focus:border-rose-400/50 focus:bg-white/10 placeholder:text-white/50`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-300 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${
                  errors.email ? "border-red-400" : "border-white/10"
                } text-white rounded-lg px-4 py-3 outline-none transition-all duration-300
                focus:border-rose-400/50 focus:bg-white/10 placeholder:text-white/50`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${
                  errors.phone ? "border-red-400" : "border-white/10"
                } text-white rounded-lg px-4 py-3 outline-none transition-all duration-300
                focus:border-rose-400/50 focus:bg-white/10 placeholder:text-white/50`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-300 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-white/5 border ${
                  errors.message ? "border-red-400" : "border-white/10"
                } text-white rounded-lg px-4 py-3 outline-none transition-all duration-300
                focus:border-rose-400/50 focus:bg-white/10 placeholder:text-white/50`}
                placeholder="Enter your message"
              />
              {errors.message && (
                <p className="text-red-300 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 px-6 rounded-lg
                       font-medium transition-all duration-300 hover:from-rose-600 hover:to-amber-600
                       transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;