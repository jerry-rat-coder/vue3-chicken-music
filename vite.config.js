import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";


const BASELESSFIlEPATH = './src/assets/css/variable.css'
    // https://vitejs.dev/config
export default defineConfig({
    plugins: [
        vue({
            // 设置属性为 响应式的
            reactivityTransform: true
        }),
        vueSetupExtend(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src",
                import.meta.url)),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `
                  @import "@/assets/css/variable.less";
                  @import "@/assets/css/icon.less";
                  @import "@/assets/css/mixin.less";
                `
            }
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            "^/api": {
                // target: "http://127.0.0.1:3000",
                target: "http://cloud-music.pl-fe.cn",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, "/"),
            },
        },
    }
})