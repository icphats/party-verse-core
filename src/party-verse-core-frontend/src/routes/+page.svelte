<script>
  import "../index.scss";
  // import { backend } from "$lib/canisters";
  import { auth } from "../stores/auth";
  import kewk from "$lib/images/kewk.png";

  $auth.init();

  const login = async () => {
    $auth.login();
  };

  $: console.log($auth);
  $: pid = $auth.pid;
</script>

<main>
  <div class="parent">
    <div class="inner-container">
      <div>Pid: {pid ? pid : "Not logged in"}</div>
      <button on:click={login}><img class="login-kewk" src={kewk} alt="" /></button>
    </div>
  </div>
</main>

<style>
  .parent {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .login-kewk {
    height: 128px;
    width: 128px;
  }
</style>
