<script lang="ts">
  import LinkAction from "../components/LinkAction.svelte";
  import CheckBox from "../components/CheckBox.svelte";
  import Label from "../components/Label.svelte";
  import Button from "../components/Button.svelte";
  import FormHeader from "../components/Header.svelte";
  import Input from "../components/Input.svelte";
  import Error from "../components/Error.svelte";
  import ErrorFloated from "../components/ErrorFloated.svelte";

  export let form;

  let formData = form?.results;
  let errors = form?.errors;
</script>

<svelte:head>
  <title>Sign In | Blog</title>
</svelte:head>

{#if errors?.message}
  <ErrorFloated message={errors.message} />
{/if}

<FormHeader text="Sign in to your account" />

<form
  method="post"
  action="?/signin"
  class="space-y-4 md:space-y-5 2xl:space-y-6"
>
  <div>
    <Label forId="username" text="your username" />
    <Input
      inputValue={formData?.username ?? ""}
      type="text"
      name="username"
      placeholder="john_doe"
    />
    {#if errors?.username}
      <Error text={errors?.username} />
    {/if}
  </div>
  <div>
    <Label forId="password" text="password" />
    <Input type="password" placeholder="••••••••" />
    {#if errors?.password && !errors?.username}
      <Error text={errors?.password} />
    {/if}
  </div>
  <div class="flex items-center justify-between">
    <CheckBox forId="remember" text="Remember me" url="/" />
    {#if errors?.password && !errors?.username}
      <LinkAction url="/" linkText="Forgot password?" />
    {/if}
  </div>

  <Button text="Sign in" />

  <LinkAction
    text="Don't have an account yet?"
    url="/signup"
    linkText="Sign up"
  />
</form>
