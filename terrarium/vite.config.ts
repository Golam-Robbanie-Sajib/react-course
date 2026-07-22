import { defineConfig } from 'vite';

// TERRARIUM dev/build config.
// - host:true so the dev server is reachable over LAN for on-device touch testing.
// - base:'./' keeps asset paths relative for PWA / Capacitor webview packaging later.
export default defineConfig({
  base: './',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
