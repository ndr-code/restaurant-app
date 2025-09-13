import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';
import { buttonVariants } from './ui/button-variants';

interface LogoutProps {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive' | 'navbar-logout';
  className?: string;
  isScrolled?: boolean;
  compact?: boolean; // For icon-only version
}

function Logout({
  variant = 'ghost',
  className,
  isScrolled = false,
  compact = false,
}: LogoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <motion.button
      onClick={handleLogout}
      className={`${buttonVariants({ variant })} ${className}`}
      style={{
        color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
      }}
      whileHover={{
        scale: 1.05,
        color: 'var(--destructive)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={compact ? '' : 'mr-2'}
      >
        <path
          d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <polyline
          points='16,17 21,12 16,7'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <line
          x1='21'
          y1='12'
          x2='9'
          y2='12'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
      {!compact && 'Logout'}
    </motion.button>
  );
}

export default Logout;
