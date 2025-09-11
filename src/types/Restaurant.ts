import type { Menu, Review } from './api';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  location: string;
  rating: number;
  priceRange: string;
  image: string;
  isOpen?: boolean;
  openingHours?: OpeningHours;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  features?: string[]; // ['delivery', 'takeout', 'dine_in']
  cuisine?: string[];
  deliveryInfo?: {
    deliveryFee: number;
    minimumOrder: number;
    estimatedTime: string; // '30-45 min'
    deliveryRadius: number; // in km
  };
}

export interface RestaurantDetail extends Restaurant {
  menus: Menu[];
  reviews: Review[];
  gallery?: string[];
  about?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // '09:00'
  closeTime?: string; // '22:00'
  breaks?: {
    start: string;
    end: string;
  }[];
}

export interface RestaurantStats {
  totalOrders: number;
  averageRating: number;
  totalReviews: number;
  popularItems: string[];
}
