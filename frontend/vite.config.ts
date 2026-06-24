import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		https: {
			key: fs.readFileSync(path.resolve(__dirname, '../nginx/ssl/server.key')),
			cert: fs.readFileSync(path.resolve(__dirname, '../nginx/ssl/server.crt'))
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				secure: false, // Don't verify local certs for backend proxy
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
