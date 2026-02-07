/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    user?: {
      username: string;
      isAuthenticated: boolean;
    };
  }
}

interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
}
