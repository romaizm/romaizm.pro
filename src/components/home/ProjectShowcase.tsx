"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface ProjectPreview {
  id: number;
  title: string;
  platform: string;
  color: string;
}

const projects: ProjectPreview[] = [
  { id: 1, title: "Oloaa", platform: "Shopify", color: "from-violet-500 to-purple-600" },
  { id: 2, title: "Nord43", platform: "WooCommerce", color: "from-blue-500 to-cyan-500" },
  { id: 3, title: "Autozakaz", platform: "WordPress", color: "from-orange-500 to-red-500" },
  { id: 4, title: "FATTL", platform: "Shopify", color: "from-emerald-500 to-teal-500" },
];

export function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  // Auto-rotate through projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[500px] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating cards stack */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full h-full"
      >
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const offset = (index - activeIndex + projects.length) % projects.length;

          return (
            <motion.div
              key={project.id}
              animate={{
                scale: isActive ? 1 : 0.85 - offset * 0.05,
                y: offset * 20,
                x: offset * 10,
                rotateZ: isActive ? 0 : -2 + offset * 2,
                opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                zIndex: projects.length - offset,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              {/* Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {/* Gradient background placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Top - Platform badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                      {project.platform}
                    </span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border border-white/30 rounded-lg"
                    />
                  </div>

                  {/* Center - Project visual placeholder */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      {/* Placeholder browser mockup */}
                      <div className="w-64 h-40 md:w-80 md:h-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                        {/* Browser header */}
                        <div className="h-6 bg-white/10 flex items-center gap-1.5 px-3">
                          <div className="w-2 h-2 rounded-full bg-red-400" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400" />
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <div className="ml-4 flex-1 h-3 bg-white/10 rounded-full max-w-[120px]" />
                        </div>
                        {/* Content area placeholder */}
                        <div className="p-4 space-y-2">
                          <div className="h-3 bg-white/20 rounded w-3/4" />
                          <div className="h-3 bg-white/10 rounded w-1/2" />
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <div className="h-12 bg-white/10 rounded" />
                            <div className="h-12 bg-white/10 rounded" />
                            <div className="h-12 bg-white/10 rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <motion.div
                        animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30"
                      />
                      <motion.div
                        animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-3 -left-6 w-16 h-10 bg-white/15 backdrop-blur-sm rounded-lg border border-white/20"
                      />
                    </motion.div>
                  </div>

                  {/* Bottom - Project title */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      Click to view project
                    </p>
                  </div>
                </div>

                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Navigation dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-neutral-900 dark:bg-white w-6"
                : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
