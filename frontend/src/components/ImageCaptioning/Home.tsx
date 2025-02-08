import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube } from "swiper/modules";
import { motion } from "framer-motion";
import { FC } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  BrainCircuit,
  Cpu,
  Shield,
  Workflow,
  MessageSquareCode,
  Image as ImageIcon,
  Lightbulb,
  Zap,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-cube";
import amitImage from "../../assets/home/amit.jpg";
import pranavImage from "../../assets/home/pranav.jpg";
import ganeshImage from "../../assets/home/ganesh.jpg";

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 2 + 1,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 2 + 1,
        }}
        transition={{
          duration: Math.random() * 10 + 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: Math.random() * 300 + 100,
          height: Math.random() * 300 + 100,
          filter: "blur(8px)",
        }}
      />
    ))}
  </div>
);

const FloatingParticles = ({ color = "blue" }) => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-2 h-2 rounded-full bg-${color}-500 opacity-20`}
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        transition={{
          duration: Math.random() * 5 + 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);



interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent 
      backdrop-blur-xl rounded-2xl p-8 
      border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 
      shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)]
      relative group overflow-hidden"
  >
    {/* Background glow effect */}
    <div
      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent 
      opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10"
    />

    <div className="flex flex-col items-center text-center relative z-10">
      <motion.div
        className="mb-6 p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full
          ring-2 ring-white/[0.08] hover:ring-blue-500/30 transition-all duration-300
          relative overflow-hidden shadow-lg"
        whileHover={{
          rotate: 360,
          transition: { duration: 1, ease: "easeInOut" },
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          rotate: {
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        {/* Inner glow for icon */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-sm" />
        <Icon className="w-8 h-8 text-blue-300 relative z-10 group-hover:text-blue-200 transition-colors duration-300" />
      </motion.div>

      <h3 className="text-xl font-semibold bg-gradient-to-br from-white to-blue-100/90 bg-clip-text text-transparent mb-3">
        {title}
      </h3>
      <p className="text-gray-300/90 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Define the prop types for TeamMember
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  floatDelay: number;
}

const TeamMember: FC<TeamMemberProps> = ({
  name,
  role,
  image,
  linkedin,
  github,
  floatDelay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.3,
      },
    }}
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      y: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: floatDelay,
      },
    }}
    whileHover={{ scale: 1.02, y: -15 }}
    className="relative group"
  >
    <div className="relative overflow-hidden">
      {/* Animated background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
        opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700 -z-10"
      />

      <div
        className="bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-transparent 
        backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] 
        group-hover:border-blue-500/30 transition-all duration-500
        shadow-[0_8px_32px_rgba(0,0,0,0.15)] group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.25)]"
      >
        {/* Profile Image Container */}
        <motion.div
          className="relative mb-8 group"
          whileHover={{ scale: 1.02 }}
        >
          {/* Image glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-purple-500/40 
            opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"
          />

          {/* Image frame */}
          <div
            className="relative h-64 rounded-2xl overflow-hidden 
            ring-2 ring-white/[0.08] group-hover:ring-blue-500/30 
            transition-all duration-500 transform"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform scale-105 
                group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10">
          <motion.h3
            className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-white 
              bg-clip-text text-transparent mb-2"
            whileHover={{ scale: 1.02 }}
          >
            {name}
          </motion.h3>

          <p className="text-lg text-blue-200/90 font-medium mb-6">{role}</p>

          <div className="flex gap-6 justify-center mt-6">
            {linkedin && (
              <motion.a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="group/icon"
              >
                <LinkedinIcon
                  className="w-8 h-8 text-blue-300 group-hover/icon:text-blue-400 
                  transition-all duration-300 transform"
                />
              </motion.a>
            )}
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="group/icon"
              >
                <GithubIcon
                  className="w-8 h-8 text-blue-300 group-hover/icon:text-white 
                  transition-all duration-300 transform"
                />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-8 md:p-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Turn Moments into Words with SnapCaption!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Our advanced transformer-based system generates accurate and
            contextual captions for your images, powered by state-of-the-art
            deep learning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full max-w-2xl mx-auto"
  >
    <Swiper
      modules={[Autoplay, EffectCube]}
      effect="cube"
      grabCursor={true}
      loop={true}
      speed={1000}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      autoplay={{ delay: 2600, pauseOnMouseEnter: true }}
      className="rounded-2xl shadow-2xl"
    >
      {[
        {
          img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/49db1b5f-09f6-4433-be57-51687585600c",
          caption: "A large building with a red dome and tall tower stands out at sunset",
        },
        {
          img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2d165721-fe2e-4cf0-a63e-20bc5bc3f847",
          caption: "A brightly lit clock tower glows purple against a star-filled night sky",
        },
        {
          img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d311d1de-7382-4c03-b083-5f7e88458158",
          caption: "Tall buildings line a busy street with trees on both sides under a cloudy sky",
        },
        {
          img: "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/be223a30-52d1-4a0b-8d57-2e52f02e2245",
          caption: "A tall tower with pink cherry blossoms in front of a blue sky.",
        },
      ].map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img
            src={slide.img}
            alt="Slide"
            className="w-full h-[500px] object-cover rounded-2xl"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white rounded-b-2xl backdrop-blur-md">
            <p className="text-lg md:text-xl font-light tracking-wider leading-relaxed font-serif italic">
              {slide.caption}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </motion.div>
      </section>

      <section className="relative z-10 py-32 px-8 md:px-16 bg-gradient-to-br from-blue-950 via-indigo-950/95 to-blue-900 overflow-hidden">
       

        {/* Ambient background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_100%)]" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-2xl text-gray-300/90 font-light">
              State-of-the-art Transformer Architecture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={BrainCircuit}
              title="Transformer Model"
              description="Advanced neural architecture for accurate image understanding and context analysis"
              delay={0}
            />
            <FeatureCard
              icon={Shield}
              title="Multi-Head Attention"
              description="Sophisticated attention mechanism for capturing complex image relationships"
              delay={0.2}
            />
            <FeatureCard
              icon={Workflow}
              title="Parallel Processing"
              description="High-speed processing with GPU acceleration for real-time captioning"
              delay={0.4}
            />
            <FeatureCard
              icon={MessageSquareCode}
              title="Natural Language"
              description="Advanced NLP for human-like caption generation"
              delay={0.6}
            />
            <FeatureCard
              icon={ImageIcon}
              title="Image Analysis"
              description="Deep feature extraction for comprehensive scene understanding"
              delay={0.8}
            />
            <FeatureCard
              icon={Cpu}
              title="CUDA Optimized"
              description="Optimized performance on NVIDIA GPUs for faster processing"
              delay={1.0}
            />
            <FeatureCard
              icon={Lightbulb}
              title="Smart Context"
              description="Contextual understanding for more relevant captions"
              delay={1.2}
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Updates"
              description="Continuous model improvements and feature updates"
              delay={1.4}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-32 px-8 md:px-16 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-900 overflow-hidden">
        <FloatingParticles />

        {/* Additional ambient background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            className="text-center mb-24"
          >
            <h2
              className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-white 
          bg-clip-text text-transparent mb-6"
            >
              Meet Our Team
            </h2>
            <p className="text-2xl text-blue-200/90 font-light">
              The minds behind SnapCaption!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <TeamMember
              name="Amit More"
              role="AI Research Lead"
              image={amitImage}
              linkedin="https://www.linkedin.com/in/amit-more-57a646249/"
              github="https://github.com/amitmore-007"
              floatDelay={0}
            />
            <TeamMember
              name="Pranav Patil"
              role="Frontend Developer"
              image={pranavImage}
              linkedin="https://www.linkedin.com/in/pranavvpatil/"
              github="https://github.com/PranavvvPatil"
              floatDelay={0.2}
            />
            <TeamMember
              name="Renuka Jadhav"
              role="Backend Engineer"
              image="/images/renuka.jpg"
              linkedin="https://www.linkedin.com/in/renuka-jadhav-26a515291/"
              github="https://github.com/renukajadhav"
              floatDelay={0}
            />
            <TeamMember
              name="Ganesh Lakhe"
              role="UI/UX Designer"
              image={ganeshImage}
              linkedin="https://www.linkedin.com/in/ganesh-lakhe/"
              github="https://github.com/Ganeshrlakhe"
              floatDelay={0}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
