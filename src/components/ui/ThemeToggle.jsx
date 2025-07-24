import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function ThemeToggle({ theme, changeTheme }) {
  return (
    <motion.button
      onClick={changeTheme}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme ? (
          <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        ) : (
          <SunIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;