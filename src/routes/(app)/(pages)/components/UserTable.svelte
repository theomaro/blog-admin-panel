<script lang="ts">
  import type { User } from "$lib";
  import profileImage from "$lib/images/pavatar.jpg";
  import { getFormattedDate } from "$lib/utils";

  export let users: User[];
  export let pageSize: number = 10;
  export let currentPage: number = 1;
</script>

<div class="overflow-auto pb-2">
  <table class="min-w-full leading-normal">
    <thead
      class="bg-gray-800 text-white text-xs 2xl:text-sm text-left font-semibold uppercase tracking-wider"
    >
      <tr>
        <th class="ps-3 py-3">#</th>
        <th class="ps-3 py-3">User</th>
        <th class="ps-3 py-3">Email</th>
        <th class="ps-3 py-3">Phone</th>
        <th class="ps-3 py-3">status</th>
        <th class="ps-3 py-3">Role</th>
        <th class="ps-3 py-3">login at</th>
      </tr>
    </thead>

    <tbody class="text-gray-700 whitespace-no-wrap text-xs 2xl:text-sm">
      {#each users.slice(pageSize * (currentPage - 1), pageSize * currentPage) as user, idx}
        <tr class="even:bg-gray-100">
          <td class="ps-3 py-1.5">{pageSize * (currentPage - 1) + idx + 1}</td>
          <td class="ps-3 py-1.5">
            <div class="flex flex-col items-start lg:flex-row lg:items-center">
              <a
                href="users/{user.username}"
                class="flex-shrink-0 w-8 h-8 md:w-9 md:h-9"
              >
                <img
                  class="w-full h-full rounded-full"
                  src={user?.avatar_url || profileImage}
                  alt={user?.full_name ?? "Unknown"}
                />
              </a>
              <span
                class="lg:ml-3 font-semibold hidden lg:block whitespace-nowrap"
                >{user.full_name ?? "Unknown"}</span
              >
            </div>
          </td>
          <td class="ps-3 py-1.5">
            <a
              class="hover:text-blue-600 whitespace-nowrap"
              href="mailto:{user.email}">{user.email}</a
            ></td
          >
          <td class="ps-3 py-1.5">
            <a
              class="hover:text-blue-600 whitespace-nowrap"
              href="tel:{user.phone}">{user?.phone ?? ""}</a
            >
          </td>
          <td class="ps-3 py-1.5">
            <span
              class="relative inline-block px-3 py-1 text-xs font-semibold text-{user.current_role} leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-{user.current_status} opacity-50 rounded-full"
              ></span>
              <span class="relative">{user.current_status}</span>
            </span>
          </td>
          <td class="ps-3 py-1.5">
            <span
              class="relative inline-block px-3 py-1 text-xs font-semibold text-{user.current_role} leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-{user.current_role} opacity-50 rounded-full"
              ></span>
              <span class="relative">{user.current_role}</span>
            </span>
          </td>
          <td class="ps-3 py-1.5"
            ><p class="whitespace-nowrap">
              {user.last_login_at ? getFormattedDate(user.last_login_at) : ""}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
