import { motion } from 'framer-motion';
import Card from '../ui/Card';

function StatsCard({ title, value, icon: Icon, color = 'primary', trend }) {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100 dark:bg-primary-900/20',
    success: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    warning: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20',
    danger: 'text-red-600 bg-red-100 dark:bg-red-900/20'
  };

  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <motion.p
            className="text-3xl font-bold text-gray-900 dark:text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {value}
          </motion.p>
          {trend && (
            <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <motion.div
          className={`p-3 rounded-full ${colorClasses[color]}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8" />
    </Card>
  );
}

export default StatsCard;