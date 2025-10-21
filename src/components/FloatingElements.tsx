
import { motion } from "framer-motion";
import { Code, Database, Globe, Terminal, Cpu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingElements = () => {
  const icons = [Code, Database, Globe, Terminal, Cpu, Code];
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-brand-purple/10"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Icon size={24 + Math.random() * 32} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
