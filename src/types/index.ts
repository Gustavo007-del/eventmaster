// Updated types to fix TypeScript errors
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
  // Note: password is intentionally excluded from public User type
}

// Internal database user type (includes password)
export interface DatabaseUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

// ... (rest of the types from fixed-types.ts above)


export interface Service {
  id: number;
  name: string;
  description: string;
  price_from: number;
  category: string;
  features: string[];
  image_url: string;
  popular?: boolean;
}

export interface Equipment {
  id: number;
  name: string;
  description: string;
  price_per_day: number;
  category: string;
  image_url: string;
  available: boolean;
}

export interface Booking {
  id: number;
  user_id: number;
  service_name: string;
  event_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_amount: number;
  event_type: string;
  guests: number;
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  user_id: number;
  booking_id: number;
  rating: number;
  comment: string;
  approved: boolean;
  created_at: string;
  user_name?: string;
  event_type?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
}
