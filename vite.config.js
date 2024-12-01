import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        // port: 3000,
        port: 5173,
        // open: true,
        proxy: {
            '/api': {
                // target: 'http://localhost:3000',
                // target: 'http://localhost:27017',
                target: 'https://harmonyhub-vzfi.onrender.com',
                changeOrigin: true,
                secure: false
            }
        }
    },
    build: {
        outDir: "build",
        assetsDir: "assets",
    },
    css: {
        modules: false,
    },
    resolve: {
        alias: {
            "@": "/src",
            // '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': {}
    }
});
