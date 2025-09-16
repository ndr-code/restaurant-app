import {
  Home,
  UtensilsCrossed,
  ClipboardList,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { AvatarWithInitials } from '../ui/avatar';

// Professional icon components dengan Lucide React
export const MenuIcons = {
  Home: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <Home className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  Restaurant: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <UtensilsCrossed className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  Cart: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <img
        src='/icons/cart.svg'
        alt='Cart'
        className='h-7 w-7 drop-shadow-sm sm:h-8 sm:w-8'
      />
    </div>
  ),

  Orders: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <ClipboardList className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  SignIn: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <LogIn className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  SignUp: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <UserPlus className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  Logout: () => (
    <div className='mr-2 flex h-5 w-5 items-center justify-center rounded-full shadow-sm'>
      <LogOut className='h-4 w-4 drop-shadow-sm' />
    </div>
  ),

  Profile: ({
    user,
  }: {
    user?: { avatar?: string; name?: string; email?: string };
  }) => (
    <div className='mr-2'>
      <AvatarWithInitials
        src={user?.avatar}
        alt={user?.name || 'Profile'}
        name={user?.name}
        size='sm'
      />
    </div>
  ),
};
