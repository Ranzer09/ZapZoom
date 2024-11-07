import { defineConfig } from "vite";
import React from '@vitejs/plugin-react'

export default defineConfig({
    plugins:[React()],
    server:{
        open:true,
        port:3000,
        proxy:{
            '/api':{
                target:'https://ecommerce-backend-1yau.onrender.com',
                changeOrigin:true,
                rewrite:(path)=> path.replace(/^\/api/,'/api')
            }
        }
    }
})