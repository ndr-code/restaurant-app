import { Link } from 'react-router-dom';
import { ROUTES } from '../../config/routes';

function Footer() {
  return (
    <footer className='bg-neutral-950 text-white'>
      <div className='mx-auto max-w-7xl px-4 py-12 md:py-16'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12'>
          {/* Brand Section */}
          <div className='space-y-6'>
            {/* Logo and Brand Name */}
            <div className='flex items-center gap-3'>
              <img
                src='/icons/logo-foody.svg'
                alt='Foody Logo'
                className='h-11 w-11'
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(18%) sepia(97%) saturate(4456%) hue-rotate(354deg) brightness(95%) contrast(94%)',
                }}
              />
              <span className='display-md-extrabold text-white'>Foody</span>
            </div>

            {/* Brand Description */}
            <p className='text-md max-w-sm leading-relaxed text-neutral-300'>
              Enjoy homemade flavors & chef's signature dishes, freshly prepared
              every day. Order online or visit our nearest branch.
            </p>

            {/* Social Media Section */}
            <div className='space-y-4'>
              <h3 className='text-lg-semibold text-white'>
                Follow on Social Media
              </h3>
              <div className='flex gap-4'>
                <a
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-10 w-10 items-center justify-center rounded-full border-1 border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white'
                  aria-label='Follow us on Facebook'
                >
                  <img src='/icons/fb.svg' alt='Facebook' className='h-5 w-5' />
                </a>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-10 w-10 items-center justify-center rounded-full border-1 border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white'
                  aria-label='Follow us on Instagram'
                >
                  <img
                    src='/icons/ig.svg'
                    alt='Instagram'
                    className='h-5 w-5'
                  />
                </a>
                <a
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-10 w-10 items-center justify-center rounded-full border-1 border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white'
                  aria-label='Follow us on LinkedIn'
                >
                  <img
                    src='/icons/linkedin.svg'
                    alt='LinkedIn'
                    className='h-5 w-5'
                  />
                </a>
                <a
                  href='https://tiktok.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex h-10 w-10 items-center justify-center rounded-full border-1 border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white'
                  aria-label='Follow us on TikTok'
                >
                  <img
                    src='/icons/tiktok.svg'
                    alt='TikTok'
                    className='h-5 w-5'
                  />
                </a>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-8'>
            {/* Explore Section */}
            <div className='space-y-6'>
              <h3 className='text-lg-semibold text-white'>Explore</h3>
              <nav className='space-y-3'>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  All Food
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Nearby
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Discount
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Best Seller
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Delivery
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Lunch
                </Link>
              </nav>
            </div>
            {/* Help Section */}
            <div className='space-y-6'>
              <h3 className='text-lg-semibold text-white'>Help</h3>
              <nav className='space-y-3'>
                <Link
                  to={ROUTES.HELP}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  How to Order
                </Link>
                <Link
                  to={ROUTES.HELP}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Payment Methods
                </Link>
                <Link
                  to={ROUTES.ORDERS}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Track My Order
                </Link>
                <Link
                  to={ROUTES.HELP}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  FAQ
                </Link>
                <Link
                  to={ROUTES.CONTACT}
                  className='text-md block text-neutral-300 transition-colors hover:text-white'
                >
                  Contact Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
