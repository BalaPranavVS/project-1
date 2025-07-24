import { motion } from 'framer-motion';

function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'p-6',
  ...props 
}) {
  return (
    <motion.div
      className={`card ${padding} ${hover ? 'card-hover' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;