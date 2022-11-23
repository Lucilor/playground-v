import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {readFileSync} from "node:fs";
import {fileURLToPath, URL} from "node:url";
import Unocss from "unocss/vite";
import {presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup} from "unocss";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {host: true, port: 4200, https: {key: readFileSync("ssl/localhost.key"), cert: readFileSync("ssl/localhost.crt")}},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "src/components.d.ts"
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true
        })
      ],
      transformers: [transformerDirectives(), transformerVariantGroup()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
