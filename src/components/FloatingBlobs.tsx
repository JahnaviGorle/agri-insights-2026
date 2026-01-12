import { motion } from "framer-motion";

const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary green blob */}
      <motion.div
        className="floating-blob w-[600px] h-[600px] bg-blob-1 top-[-200px] left-[-200px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Golden blob */}
      <motion.div
        className="floating-blob w-[500px] h-[500px] bg-blob-2 top-[20%] right-[-150px]"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Sky blue blob */}
      <motion.div
        className="floating-blob w-[450px] h-[450px] bg-blob-3 bottom-[-100px] left-[30%]"
        animate={{
          x: [0, 40, -50, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small accent blob */}
      <motion.div
        className="floating-blob w-[300px] h-[300px] bg-blob-1/50 bottom-[30%] right-[10%]"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default FloatingBlobs;