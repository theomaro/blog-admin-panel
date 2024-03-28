<script lang="ts">
  import profileImage from "$lib/images/pavatar.jpg";

  export let user: App.User | null;
</script>

<form
  method="post"
  action="?/updateProfile"
  class="flex flex-col space-y-8 relative"
>
  <div
    class="flex flex-col gap-1 md:absolute md:top-6 md:-right-52 lg:-right-64"
  >
    <label for="">Profile picture</label>

    <div class="relative">
      <div
        class="border w-44 lg:w-48 h-44 lg:h-48 rounded-full overflow-hidden"
      >
        <img src={user?.avatar_url || profileImage} alt="" class="" />
      </div>

      <div class="absolute top-3/4">
        <button
          type="button"
          class="bg-gray-50 rounded-lg px-2 py-0.5 text-sm border"
        >
          <i class="ri ri-edit-line"></i>
          Edit</button
        >
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-1">
    <label for="full_name">Name</label>
    <input
      type="text"
      id="full_name"
      name="full_name"
      value={user?.full_name}
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      value={user?.email}
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="biography">Bio</label>
    <textarea
      id="biography"
      name="biography"
      value={user?.biography ?? ""}
      class="rounded-lg h-20 text-sm text-gray-700 bg-gray-50"
    ></textarea>
  </div>

  <div class="flex flex-col gap-1">
    <label for="phone">Phone</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      value={user?.phone}
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="sex">Sex</label>
    <select
      name="sex"
      id="sex"
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    >
      <option value="">Not specified</option>
      <option value="female">Female</option>
      <option value="male">Male</option>
    </select>
  </div>

  <div class="flex flex-col gap-1">
    <label for="birth_date">Birthdate</label>
    <input
      type="date"
      id="birth_date"
      name="birth_date"
      value={user?.birth_date}
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="location">Location</label>
    <input
      type="text"
      id="location"
      name="location"
      value={user?.location}
      class="rounded-lg text-sm text-gray-700 bg-gray-50"
    />
  </div>

  <div>
    <h2 class="mb-2">Social accounts</h2>

    <div class="flex gap-2 mb-2">
      <label for="">
        <div class="ri ri-facebook-fill"></div>
      </label>
      <input
        type="text"
        value="https://www.facebook/theomaro"
        class="rounded-lg text-xs text-gray-700 bg-gray-50 py-1 flex-1"
      />
    </div>

    <div class="flex gap-2 mb-2">
      <label for="">
        <div class="ri ri-twitter-fill"></div>
      </label>
      <input
        type="text"
        value="https://twitter.com/theopombe"
        class="rounded-lg text-xs text-gray-700 bg-gray-50 py-1 flex-1"
      />
    </div>

    <div class="flex gap-2 mb-2">
      <label for="">
        <div class="ri ri-link"></div>
      </label>
      <input
        type="text"
        placeholder="Link to social profile"
        class="rounded-lg text-xs text-gray-700 bg-gray-50 py-1 flex-1"
      />
    </div>

    <div class="flex gap-2 mb-2">
      <label for="">
        <div class="ri ri-link"></div>
      </label>
      <input
        type="text"
        placeholder="Link to social profile"
        class="rounded-lg text-xs text-gray-700 bg-gray-50 py-1 flex-1"
      />
    </div>
  </div>

  <div>
    <button
      type="submit"
      class="font-semibold text-sm text-white bg-green-600 hover:bg-green-700 py-2 px-5 rounded-lg"
      >Update profile</button
    >
  </div>
</form>
