import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Card from '../ui/Card';

function SkillProgress({ skills }) {
  const getColorByScore = (score) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getGradeByScore = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Skill Assessment
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([skill, score], index) => (
          <motion.div
            key={skill}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-32 h-32 mb-4">
              <CircularProgressbarWithChildren
                value={score}
                maxValue={100}
                styles={buildStyles({
                  pathColor: getColorByScore(score),
                  trailColor: '#e5e7eb',
                  strokeLinecap: 'round',
                  pathTransitionDuration: 1.5,
                })}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {score}%
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: getColorByScore(score) }}
                  >
                    Grade {getGradeByScore(score)}
                  </div>
                </div>
              </CircularProgressbarWithChildren>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize mb-2">
              {skill}
            </h4>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: getColorByScore(score) }}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

export default SkillProgress;