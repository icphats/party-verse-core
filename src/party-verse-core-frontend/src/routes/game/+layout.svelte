<script>
  import { onMount } from "svelte";

  onMount(() => {
    setViewportHeight();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", setViewportHeight);
    }
  });

  //Calibrates viewport height for mobile devices **very important**
  function setViewportHeight() {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }
</script>

<main>
  <slot />
</main>
