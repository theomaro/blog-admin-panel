export interface User {
  username: string;
  current_role: string;
  full_name: string | "";
  phone: string | "";
  email: string;
  avatar_url: string | "";
  current_status: string;
  last_login_at: string | "";
}

interface UserDetails {
  username: string;
  current_role: string;
  full_name: string | null;
  sex: string | null;
  birth_date: string | null;
  phone: string | null;
  email: string;
  biography: string | null;
  location: string | null;
  avatar_url: string | null;
  current_status: string;
  last_login_at: string | "";
}

interface SearchUser {
  searchTerms: string;
  username: string;
  current_role: string;
  full_name: string;
  phone: string;
  email: string;
  avatar_url: string;
  current_status: string;
  last_login_at: string;
}

interface SearchStoreModel<T extends Record<PropertyKey, any>> {
  data: T[];
  filtered: T[];
  searchTerm: string;
}

interface PaginateStoreModel<T extends Record<PropertyKey, any>> {
  data: T[];
  totalItems: number;
  totalRows: number;
}
