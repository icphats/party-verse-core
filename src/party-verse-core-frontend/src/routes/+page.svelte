<script>
  import "../index.scss";
  import { onMount } from "svelte";
  import { auth } from "../stores/auth";
  import Background from "./background.svelte";

  const login = async () => {
    $auth.login();
  };
</script>

<div class="parent">
  <Background />
  <div class="inner-container">
    <div class="landing-page-header-text">Welcome to the Partyverse</div>
    <button class="play-button glow-effect" on:click={login}>Login</button>
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

  .landing-page-header-text {
    font-size: 2rem;
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
    padding: 1.2rem 1.6rem;
    border-radius: 0.25rem;
    border: none;
    height: 100%;
    font-size: 1.2rem;
  }

  .glow-effect {
    position: relative;
    overflow: visible;
  }

  .glow-effect::before {
    content: "";
    position: absolute;
    top: -0.15rem;
    left: -0.15rem;
    right: -0.15rem;
    bottom: -0.15rem;
    background-color: rgb(57, 255, 20); /* Neon green */
    z-index: -1;
    animation: blink 2s infinite;
    filter: blur(0.6rem);
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
