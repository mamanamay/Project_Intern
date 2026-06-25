import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// Conditionally load SSL certs if they exist (for local dev without Docker)
const keyPath = path.resolve(__dirname, '../nginx/ssl/server.key');
const certPath = path.resolve(__dirname, '../nginx/ssl/server.crt');
const hasCerts = fs.existsSync(keyPath) && fs.existsSync(certPath);

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true,
			interval: 500
		},
		...(hasCerts ? {
			https: {
				key: fs.readFileSync(keyPath),
				cert: fs.readFileSync(certPath)
			}
		} : {})
	}
});
