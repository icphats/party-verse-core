<script>
  import { onMount } from "svelte";
  import loading from "$lib/assets/frontend/loading.gif";
  import { auth } from "../stores/auth";
  import { goto } from "$app/navigation";

  onMount(() => {
    $auth.init();

    setViewportHeight();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", setViewportHeight);
    }
  });

  $: if ($auth.identity) {
    goto("/game");
  }

  //adjusts viewport height for mobile devices **very important**
  function setViewportHeight() {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }
</script>

<main class="main-container">
  {#if !$auth.isReady}
    <img class="loading-image" src={loading} alt="loading" />
  {:else}
    <slot />
  {/if}
</main>

<style>
  .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .loading-image {
    width: 5rem;
  }
</style>
