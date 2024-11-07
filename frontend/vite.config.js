import { defineConfig } from "vite";
import React from '@vitejs/plugin-react'

export default defineConfig({
    plugins:[React()],
    server:{
        open:true,
        port:3000,
        proxy:{
            '/api':{
                target:'http://localhost:5050',
                changeOrigin:true,
                rewrite:(path)=> path.replace(/^\/api/,'/api')
            }
        }
    }
})