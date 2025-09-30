// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import history from 'connect-history-api-fallback'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://www.swiggy.com/dapi",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//     middlewareMode: false,
//     setupMiddlewares: (middlewares, devServer) => {
//       middlewares.use(history())
//       return middlewares
//     },
//   },
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://www.swiggy.com",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, "/dapi"),
//       },
//     },
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-m": {   // 👈 for mapi
        target: "https://www.swiggy.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-m/, "/mapi"),
      },
      "/api-d": {   // 👈 for dapi
        target: "https://www.swiggy.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-d/, "/dapi"),
      },
      "/api": {   // 👈 for mapi
        target: "https://www.swiggy.com",
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, " "),
      },
    },
  },
})

