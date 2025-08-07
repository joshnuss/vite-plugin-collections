vite-plugin-collections
-----------------------

> [!NOTE]
> > Use [content-collections](https://www.content-collections.dev/) instead. It's way more feature packed.

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
    // matches src/posts/*.md
    collection({
      // use folder src/posts
      base: 'posts',

      // front matter fields use a Zod schema
      fields: z.object({
        title: z.string().nonempty(),
        banner: z.url(),
        summary: z.string().optional(),
        date: z.iso.date(),
        tags: z.array(z.string()).optional(),
      })
    })
  ]
})
```

> [!NOTE]
> This will add an import alias `#posts`, use that to access the markdown files.

## Loading files

To load the **list** of markdown files:

```ts
import { list } from '#posts'

const posts = await list()
```

To load a **single** markdown file:

```ts
import { get } from '#posts'

const post = await get(slug)
```

## Types

Types definitions are generated in `collections.d.ts`.

Add it to your `tsconfig.json`:

```json
"files": [
  "collections.d.ts"
]
```

## License

MIT
