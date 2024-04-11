// See https://kit.svelte.dev/docs/types#app

import type { User } from "$lib";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      currentUser: User | null;
    }
    // interface PageData {}
    // interface Platform {}
  }
}
