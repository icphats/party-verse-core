<script>
  import "../index.scss";
  import { onMount } from "svelte";
  import { auth } from "../stores/auth";
  import kewk from "$lib/assets/kewk.png";
  // import { backend } from "$lib/canisters";

  let images = [];

  const imageModules = import.meta.glob("$lib/assets/**/*.png");

  onMount(async () => {
    $auth.init();
    await preload();
  });

  async function preload() {
    const newImages = [];
    for (const path in imageModules) {
      const image = await imageModules[path]();
      newImages.push(image.default);
    }
    images = newImages;
  }

  const login = async () => {
    $auth.login();
  };

  $: pid = $auth.pid;

  function getRandomStyle(index) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDuration = 30 + Math.random() * 100; // Duration for the floating animation
    const animationName = `float${index}`;

    const keyframes = `
      @keyframes ${animationName} {
        0% { transform: translate(${Math.random() * 100 - randomX}vw, ${Math.random() * 100 - randomY}vh); }
        25% { transform: translate(${Math.random() * 100 - randomX}vw, ${Math.random() * 100 - randomY}vh); }
        50% { transform: translate(${Math.random() * 100 - randomX}vw, ${Math.random() * 100 - randomY}vh); }
        75% { transform: translate(${Math.random() * 100 - randomX}vw, ${Math.random() * 100 - randomY}vh); }
        100% { transform: translate(${Math.random() * 100 - randomX}vw, ${Math.random() * 100 - randomY}vh); }
      }
    `;

    // Inject keyframes into the document's style
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return {
      style: `
        left: ${randomX}%;
        top: ${randomY}%;
        animation: ${animationName} ${randomDuration}s infinite alternate;
      `,
    };
  }
</script>

<div class="parent">
  <div class="floating-background">
    {#each images as src, index}
      <img {src} alt={src} class="floating-png" style={getRandomStyle(index).style} />
    {/each}
  </div>
  <div class="inner-container">
    <div class="">{pid ? pid : "Not logged in"}</div>
    <button class="play-button glow-effect" on:click={login}>Play</button>
  </div>
</div>

<style>
  .parent {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .play-button:active {
    background-color: white;
    color: black;
  }

  .play-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-purple);
    color: white;
    padding: 0.8rem 1.2rem;
    border-radius: 0.25rem;
    border: none;
    height: 100%;
  }

  .glow-effect {
    position: relative;
    overflow: visible;
  }

  .glow-effect::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background-color: #39ff14; /* Neon green */
    border-radius: 7px; /* Slightly larger than the button's border-radius */
    z-index: -1;
    animation: blink 2s infinite;
    filter: blur(8px);
    pointer-events: none;
  }

  .floating-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    /* height: calc(var(--vh, 1vh) * 100); */
    z-index: -1;
    background-color: #0f0c30;
  }

  .floating-png {
    position: absolute;
    max-width: 25px;
    max-height: 25px;
  }
</style>
