import { defineConfig } from "vite";
export default defineConfig(async () => {
  const [{ default: react }, { default: tailwindcss }] = await Promise.all([
    import("@vitejs/plugin-react"),
    import("@tailwindcss/vite")
  ]);

  return {
    plugins: [react(), tailwindcss()],
  };
});