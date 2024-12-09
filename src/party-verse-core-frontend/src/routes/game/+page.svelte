<script>
  import "../../index.scss";
  import { onMount } from "svelte";

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
    console.error(err);
    if (err instanceof Error) {
      console.error(err.message);
    } else if (typeof err === "string") {
      console.error(err);
    } else {
      console.error("An unknown error occured");
    }
  }

  onMount(() => {
    console.log("Game mounted");
    let Engine = window.Engine;
    const engine = new Engine(GODOT_CONFIG);
    engine
      .startGame({
        onProgress: function (current, total) {
          if (current > 0 && total > 0) {
            console.log("Progress: ", current, total);
          } else {
            console.log("Progress: ", current, total);
          }
        },
      })
      .then(() => {
        console.log("Game started");
      }, displayFailureNotice);
  });
</script>

<canvas id="canvas">Your browser does not support the canvas tag</canvas>
