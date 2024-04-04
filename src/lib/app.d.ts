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
  search: string;
}
