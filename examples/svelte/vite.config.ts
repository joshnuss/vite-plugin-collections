import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import collection from 'vite-plugin-collections'
import * as z from 'zod'

export default defineConfig({
	plugins: [
		collection({
			base: 'posts',
			fields: z.object({
				title: z.string().nonempty(),
				summary: z.string().optional()
			})
		}),

		sveltekit()
	]
});
