<script>
  import { onMount } from "svelte";
  import loading from "$lib/assets/frontend/loading.webp";
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
    //check to make sure we are on the client side only
    // if (typeof window !== "undefined") {
    //   goto("/game");
    // }
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
    <div class="loading-container">
      <div class="loading-inner-container">
        <img class="loading-image" src={loading} alt="loading" />
      </div>
    </div>
  {/if}
  <slot />
</main>

<style>
  .main-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .loading-container {
    position: absolute;
    height: 0;
    width: 0;
    z-index: 1;
  }

  .loading-inner-container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    translate: -50% -50%;
    height: 100vh;
    width: 100vw;
    z-index: 1;
    background-color: var(--main-bg-color);
  }

  .loading-image {
    position: relative;
    width: 5rem;
  }
</style>
