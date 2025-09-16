import { AvatarWithInitials } from '../ui/avatar';

// Demo component untuk testing avatar dari API
export const AvatarDemo = () => {
  const sampleUsers = [
    {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Jane Smith',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Alice Johnson',
      avatar: null, // Will show initials
    },
    {
      name: 'Bob Wilson',
      avatar: 'invalid-url', // Will fallback to initials
    },
    {
      name: '', // Will show default 'U'
      avatar: null,
    },
  ];

  return (
    <div className='space-y-8 p-8'>
      <div>
        <h2 className='mb-4 text-xl font-bold'>
          Avatar dari API dengan Fallbacks
        </h2>
        <div className='flex space-x-4'>
          {sampleUsers.map((user, index) => (
            <div key={index} className='text-center'>
              <AvatarWithInitials
                src={user.avatar || undefined}
                name={user.name}
                size='lg'
              />
              <p className='mt-2 text-sm'>{user.name || 'No name'}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>Different Sizes</h3>
        <div className='flex items-center space-x-4'>
          <AvatarWithInitials
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            name='John Doe'
            size='sm'
          />
          <AvatarWithInitials
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            name='John Doe'
            size='md'
          />
          <AvatarWithInitials
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            name='John Doe'
            size='lg'
          />
        </div>
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>
          Initials Only (No Avatar URL)
        </h3>
        <div className='flex space-x-4'>
          <AvatarWithInitials name='Alexander Hamilton' size='md' />
          <AvatarWithInitials name='Madonna' size='md' />
          <AvatarWithInitials name='Cher' size='md' />
          <AvatarWithInitials name='' size='md' />
        </div>
      </div>

      <div className='rounded-lg bg-gray-100 p-4'>
        <h3 className='mb-2 text-lg font-semibold'>API Integration Example</h3>
        <pre className='overflow-x-auto text-sm'>
          {`// Usage dengan data dari API
const { user } = useAuth();

// Di mobile menu
<AvatarWithInitials
  src={user?.avatar}      // URL dari API
  name={user?.name}       // Nama dari API  
  size="md"
/>

// Fallback logic:
// 1. Jika user.avatar valid → tampilkan image
// 2. Jika user.avatar gagal load → tampilkan initials
// 3. Jika user.name kosong → tampilkan 'U'`}
        </pre>
      </div>
    </div>
  );
};
