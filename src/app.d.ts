// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      currentUser: User | null;
    }
    // interface PageData {}
    // interface Platform {}

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
  }
}

export {};
