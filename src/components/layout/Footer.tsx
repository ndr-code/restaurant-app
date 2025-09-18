import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Music } from 'lucide-react';
import { ROUTES } from '../../config/routes';

function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <img
                src="/icons/logo-foody.svg"
                alt="Foody Logo"
                className="h-8 w-8"
              />
              <span className="display-md-extrabold text-white">Foody</span>
            </div>

            {/* Brand Description */}
            <p className="text-md text-neutral-300 leading-relaxed">
              Enjoy homemade flavors & chef's signature dishes, freshly prepared every day. Order online or visit our nearest branch.
            </p>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg-semibold text-white">Follow on Social Media</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
                  aria-label="Follow us on TikTok"
                >
                  <Music size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-6">
            <h3 className="text-lg-semibold text-white">Explore</h3>
            <nav className="space-y-3">
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                All Food
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Nearby
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Discount
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Best Seller
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Delivery
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Lunch
              </Link>
            </nav>
          </div>

          {/* Help Section */}
          <div className="space-y-6">
            <h3 className="text-lg-semibold text-white">Help</h3>
            <nav className="space-y-3">
              <Link
                to={ROUTES.HELP}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                How to Order
              </Link>
              <Link
                to={ROUTES.HELP}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Payment Methods
              </Link>
              <Link
                to={ROUTES.ORDERS}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Track My Order
              </Link>
              <Link
                to={ROUTES.HELP}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                FAQ
              </Link>
              <Link
                to={ROUTES.CONTACT}
                className="block text-md text-neutral-300 transition-colors hover:text-white"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
