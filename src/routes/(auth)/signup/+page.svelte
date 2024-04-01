<script lang="ts">
  import Button from "./../components/Button.svelte";
  import CheckBox from "../components/CheckBox.svelte";
  import Error from "../components/Error.svelte";
  import Header from "../components/Header.svelte";
  import Input from "../components/Input.svelte";
  import Label from "../components/Label.svelte";
  import LinkAction from "../components/LinkAction.svelte";
  import ErrorFloated from "../components/ErrorFloated.svelte";

  export let form;

  let formData = form?.results;
  let errors = form?.errors;
</script>

<svelte:head>
  <title>Sign Up | Blog</title>
</svelte:head>

{#if errors?.message}
  <ErrorFloated message={errors.message} />
{/if}

<Header text="Create your new account" />

<form
  method="post"
  action="?/signup"
  class="space-y-4 md:space-y-5 2xl:space-y-6"
>
  <div>
    <Label forId="email" text="your email" />
    <Input
      inputValue={formData?.email ?? ""}
      type="email"
      placeholder="name@example.com"
    />
    {#if errors?.email}
      <Error text={errors?.email} />
    {/if}
  </div>
  <div>
    <Label forId="username" text="your username" />
    <Input
      inputValue={formData?.username ?? ""}
      type="text"
      name="username"
      placeholder="john_doe"
    />
    {#if !errors?.email && errors?.username}
      <Error text={errors?.username} />
    {/if}
  </div>
  <div>
    <Label forId="password" text="password" />
    <Input
      inputValue={formData?.password ?? ""}
      type="password"
      placeholder="••••••••"
    />
    {#if !errors?.email && !errors?.username && errors?.password}
      <Error text={errors?.password} />
    {/if}
  </div>
  <div>
    <Label forId="confirmed-password" text="Confirm password" />
    <Input
      inputValue={formData?.confirmed_password ?? ""}
      type="password"
      name="confirmed-password"
      placeholder="••••••••"
    />
    {#if !errors?.email && !errors?.username && !errors?.password && errors?.confirmed_password}
      <Error text={errors?.confirmed_password} />
    {/if}
  </div>

  <CheckBox
    forId="terms"
    text="I accept the"
    url="/"
    linkText="Terms and Conditions"
  />

  <Button text="Create an account" />

  <LinkAction
    text="Already have an account?"
    linkText="Login here"
    url="/signin"
  />
</form>
