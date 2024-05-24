import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    plugins: [
        laravel({
            input: [
                "themes/default/sass/app.scss",
                "themes/default/js/app.js"
            ],
            buildDirectory: "default",
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        
        {
            name: "blade",
            handleHotUpdate({ file, server }) {
                if (file.endsWith(".blade.php")) {
                    server.ws.send({
                        type: "full-reload",
                        path: "*",
                    });
                }
            },
        },
    ],
    resolve: {
        alias: {
            '@': '/themes\default\js',
            '~bootstrap': path.resolve('node_modules/bootstrap'),
        }
    },
    
});
