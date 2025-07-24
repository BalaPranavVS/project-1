import { motion } from 'framer-motion';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

function Header({ theme, changeTheme, user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      try {
        await axios.get("http://localhost:5000/logout", { withCredentials: true });
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img
              src="https://img.studyclap.com/img/institute/logo/6764d0eb9d-kct-coimbatore.png"
              alt="KCT Logo"
              className="h-10 w-10 rounded-lg shadow-sm"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Kumaraguru College of Technology
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Student Portal
              </p>
            </div>
          </motion.div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user && (
              <motion.div
                className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <UserCircleIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user}
                </span>
              </motion.div>
            )}
            
            <ThemeToggle theme={theme} changeTheme={changeTheme} />
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;