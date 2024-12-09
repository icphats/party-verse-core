<script>
  import "../../index.scss";
  import { onMount } from "svelte";
  import { auth } from "../../stores/auth";
  import { goto } from "$app/navigation";

  // $: if (!$auth.identity) {
  //   //check to make sure we are on the client side only
  //   if (typeof window !== "undefined") {
  //     goto("/");
  //   }
  // }

  var index = `PartyWorld`;
  var main_pck = `${index}.pck`;
  var wasm = `${index}.wasm`;

  var GODOT_CONFIG = {
    args: [],
    canvasResizePolicy: 2,
    ensureCrossOriginIsolationHeaders: true,
    executable: index,
    experimentalVK: true,
    fileSizes: { [main_pck]: 1755936, [wasm]: 43016933 },
    focusCanvas: true,
    gdextensionLibs: [],
    executableBuffer: null,
  };

  function displayFailureNotice(err) {
    $auth.setLoading(false);
    console.error(err);
    if (err instanceof Error) {
      console.error(err.message);
    } else if (typeof err === "string") {
      console.error(err);
    } else {
      console.error("An unknown error occured");
    }
  }

  onMount(async () => {
    console.log("Game mounted");
    let Engine = window.Engine;
    const engine = new Engine(GODOT_CONFIG);

    // wait for 100ms (due to svelte weird bug of loading)
    // canvas wasn't loaded yet when the startGame was called
    await new Promise((resolve) => setTimeout(resolve, 100));
    engine.startGame({}).then(() => {
      console.log("Game started");
      $auth.setLoading(false);
    }, displayFailureNotice);
  });
</script>

<canvas class="canvas" id="canvas">Your browser does not support the canvas tag</canvas>

<style>
  .canvas {
    /* color: black; */
    /* background-color: turquoise; */
  }
</style>
