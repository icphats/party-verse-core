import { AuthClient } from "@dfinity/auth-client";
import { readable } from "svelte/store";
// import { createAgent, createActor } from '@dfinity/utils';
 
const isLocal = process.env.DFX_NETWORK !== "ic";

export const getIdentityProvider = () => {
  let idpProvider;
  // Safeguard against server rendering33
  if (typeof window !== "undefined") {
    // Safari does not support localhost subdomains
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isLocal && isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;
    } else if (isLocal) {
      idpProvider = `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
    }
  }
  return idpProvider;
};


export const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
  */
 
  loginOptions: {
    identityProvider: getIdentityProvider(),
    derivationOrigin : isLocal ? "http://localhost:3000" : "https://partyverse.live",
    maxTimeToLive: BigInt(4) * BigInt (7) * BigInt(24) * BigInt(3_600_000_000_000), // 4 weeks
  },

};

// function actorFromIdentity(identity) {
//   return createActor(canisterId, {
//     agentOptions: {
//       host:
//         process.env.DFX_NETWORK === "ic"
//           ? "https://icp-api.io"
//           : "http://localhost:4943",
//       identity,
//     },
//   });
// }

/**
 *
 * @param {import("@dfinity/agent").Identity} identity
 * @returns {import("@dfinity/agent").ActorSubclass<import("../../../../declarations/whoami/whoami.did")._SERVICE>}
 */

/**
 * @typedef {Object} Auth
 * @property {boolean} isAuthenticated
 * @property {import("@dfinity/agent").Identity | null} identity
 * @property {import("@dfinity/agent").ActorSubclass<import("../../../../declarations/whoami/whoami.did")._SERVICE> | null} whoamiActor
 * @property {AuthClient | null} authClient
 * @property {import("@dfinity/agent").HttpAgent | null} agent
 * @property {boolean} isReady
 * @property {() => void} login
 * @property {() => void} logout
 * @property {() => void} init
 */

/**
 * @type {Auth}
 */
const initialAuth = {
  isAuthenticated: false,
  isReady: false,
  login: () => {},
  logout: () => {},
  init: () => {},
  identity: null,
  authClient: null,
  loading: true,
};

/**
 * This is a simple auth store that is used to demonstrate how to use
 * the auth store in a SvelteKit app.
 * @type {import("svelte/store").Readable<Auth>}
 */
export const auth = readable(initialAuth, (set) => {
  /**
   * @type {Auth}
   */
  const auth : any = {
    ...initialAuth,
    init: async () => {
      // if (typeof window === "undefined") {
      //   // Exit early if not in a browser environment, remove later
      //   return;
      // }
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      auth.authClient = authClient;
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = isAuthenticated ? authClient.getIdentity() : null;
      // const whoamiActor = identity ? actorFromIdentity(identity) : null;

      auth.isAuthenticated = isAuthenticated;
      auth.identity = identity;
      auth.isReady = true;
      
      set(auth);
    },
    login: async () => {

        if (!auth.isReady) return;
        if (!auth.authClient) {
          await auth.init();
        }
        auth.authClient?.login({
          ...defaultOptions.loginOptions,
          identityProvider: getIdentityProvider(),
          onSuccess: async () => {
            const authClient = auth.authClient;
            const isAuthenticated =
              (await authClient?.isAuthenticated()) ?? false;
            const identity = isAuthenticated
              ? authClient?.getIdentity() ?? null
              : null;


            auth.isAuthenticated = isAuthenticated;
            auth.identity = identity;

            set(auth);
          },
        });
    },
    logout: async () => {
      await auth.authClient?.logout();
      auth.isAuthenticated = false;
      auth.identity = null;
      auth.agent = null;
      
      set(auth);
    },
    setLoading: (loading: boolean) => {
      auth.loading = loading;
      set(auth);
    },
  };
  set(auth);
});