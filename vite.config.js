import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "webapp-tu-v96w.vercel.app/",
  build: {
    outDir: "./dist",
    // emptyOutDir: true,
    rollupOptions: {
      output: {
        // chunkFileNames: "assets/js/[name]-[hash].js",
        // entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            if (name.includes("Akti")) {
              return "assets/svg/categories/aktis/[name]-[hash][extname]";
            } else if (name.includes("Atmo")) {
              return "assets/svg/categories/atmos/[name]-[hash][extname]";
            } else if (name.includes("Orte")) {
              return "assets/svg/categories/orte/[name]-[hash][extname]";
            } else if (name.includes("Personen")) {
              return "assets/svg/categories/personen/[name]-[hash][extname]";
            }
          }

          // if (/\.css$/.test(name ?? '')) {
          //     return 'assets/css/categories[name]-[hash][extname]';
          // }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});

