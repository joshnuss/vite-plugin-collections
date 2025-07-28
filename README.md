vite-plugin-collections
-----------------------

A Vite plugin for working with folders of markdown content.

A simple solution for building blog and docs sites.

# Getting Started

Install the plugin:

```bash
pnpm install -D vite-plugin-collections
```

Add plugin to `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import collection from 'vite-plugin-collections'
import * as z from 'zod'

export default defineConfig({
  plugins: [
    collection({
      // corresponds to folder src/posts
      base: 'posts',

      // collection matches files src/posts/*.md
      pattern: '*.md',

      // front matter fields use a Zod schema
      fields: z.object({
        title: z.string().nonempty(),
        banner: z.url(),
        summary: z.string().optional(),
        date: z.iso.date(),
        tags: z.array(z.string()).optional(),
      }),
    })
  ]
})
```

This will add an import alias `#posts`, which can be used to load one or more files.

To load a **list** of markdown files:

```ts
import { list } from '#posts'

const posts = await list()
```

To load a **single** markdown file:

```ts
import { get } from '#posts'

const post = await get(slug)
```

## License

MIT
