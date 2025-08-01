
import { cn } from '@/lib/utils';

interface SkillRatingBadgeProps {
  rating: 'High' | 'Medium' | 'Low' | '';
  onClick?: () => void;
  className?: string;
}

const SkillRatingBadge = ({ rating, onClick, className }: SkillRatingBadgeProps) => {
  const getRatingStyles = (rating: string) => {
    switch (rating) {
      case 'High':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border cursor-pointer transition-all duration-200 hover:scale-105',
        getRatingStyles(rating),
        className
      )}
      onClick={onClick}
    >
      {rating || 'Not Rated'}
    </span>
  );
};

export default SkillRatingBadge;
