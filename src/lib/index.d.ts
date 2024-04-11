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

interface UserDetail {
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

interface Post {
  title: string;
  summary: string;
  status: string;
  slug_url: string;
  author: {
    full_name: string | null;
    username: string;
    avatar_url: string | null;
  };
  created_at: string;
  modified_at: string | null;
}

interface SearchPost {
  searchTerms: string;
  title: string;
  summary: string;
  status: string;
  slug_url: string;
  author: {
    full_name: string | null;
    username: string;
    avatar_url: string | null;
  };
  modified_at: string | null;
}

interface PostDetail {
  title: string;
  meta_title: string | null;
  summary: string;
  body: string | null;
  status: string;
  banner_url: string | null;
  slug_url: string;
  author: {
    full_name: string | null;
    username: string;
    avatar_url: string | null;
  };
  created_at: string;
  modified_at: string | null;
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
