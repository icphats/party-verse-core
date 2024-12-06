<script>
  import "../index.scss";
  import { onMount } from "svelte";

  let images = [];

  const imageModules = import.meta.glob("$lib/assets/party_assets/**/*.png");

  onMount(async () => {
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

<div class="floating-background">
  {#each images as src, index}
    <img {src} alt={src} class="floating-png" style={getRandomStyle(index).style} />
  {/each}
</div>

<style>
  .floating-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(var(--vh, 1vh) * 100);
    overflow: hidden;
    z-index: -1;
    background-color: #0f0c30;
  }

  .floating-png {
    position: absolute;
    max-width: 25px;
    max-height: 25px;
  }
</style>
