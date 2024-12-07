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

  onMount(() => {
    console.log("Game mounted");

    let Engine = window.Engine;
    const engine = new Engine(GODOT_CONFIG);
    engine.startGame({});
  });
</script>

<div>Game</div>
<canvas id="canvas"> Your browser does not support the canvas tag. </canvas>
