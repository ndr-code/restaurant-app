import type { CSSProperties } from 'react';
import type { TargetAndTransition } from 'motion/react';

// Sign In button styles
export const getSignInButtonStyles = (isScrolled: boolean): CSSProperties => ({
  color: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
  borderColor: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
});

export const getSignInButtonHoverStyles = (): TargetAndTransition => ({
  scale: 1.05,
  backgroundColor: 'var(--primary)',
  color: 'var(--background)',
  borderColor: 'var(--primary)',
});

// Sign Up button styles
export const getSignUpButtonStyles = (isScrolled: boolean): CSSProperties => ({
  backgroundColor: isScrolled ? 'var(--base-black)' : 'var(--base-white)',
  borderColor: isScrolled ? 'var(--foreground)' : 'var(--base-white)',
  color: isScrolled ? 'var(--base-white)' : 'var(--base-black)',
});

export const getSignUpButtonHoverStyles = (): TargetAndTransition => ({
  scale: 1.05,
  backgroundColor: 'var(--primary)',
  color: 'var(--background)',
});

// Common button animations
export const buttonAnimations = {
  whileTap: { scale: 0.98 } as TargetAndTransition,
  transition: { type: 'spring' as const, stiffness: 400 },
};
