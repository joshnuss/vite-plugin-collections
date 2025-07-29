import path from 'path'
import { extract_types, write_definitions, reset_types } from './typing.js'
import { parse_markdown } from './markdown.js'
import type { Plugin } from 'vite'
import type { TransformResult } from 'rollup'
import type { PluggableList } from 'unified'
import type { ZodObject } from 'zod'

export type Options = {
  base: string
  pattern?: string
  fields?: ZodObject
  plugins?: {
    remark?: PluggableList
    rehype?: PluggableList
  }
  sort?: {
    field: string
    order?: 'ascending' | 'descending'
  }
}

const definitions_path = 'collection.d.ts'

export default function collection(options: Options): Plugin {
  const root_path = path.join('src', options.base)
  const pattern = options.pattern || '*.md'

  return {
    name: 'vite-plugin-collections',
    async config() {
      reset_types(definitions_path)

      return {
        resolve: {
          alias: {
            [`#${options.base}`]: path.resolve(`./${root_path}`)
          }
        }
      }
    },

    resolveId(id) {
      if (id.endsWith(root_path)) {
        return id
      }
    },

    load(id) {
      if (id.endsWith(root_path)) {
        return `
          export function get(id) {
            return import(\`./${options.base}/\${id}.md\`)
          }

          export async function list() {
            const files = import.meta.glob('./${options.base}/${pattern}')
            const records = await Promise.all(
              Object
                .values(files)
                .map((content) => content())
            )
            return records${build_sort(options.sort)}
          }
        `
      }
    },

    async transform(content, file): Promise<TransformResult> {
      if (!path.extname(file).match(/^\.md/)) {
        return
      }

      const vfile = await parse_markdown(content, options.plugins?.remark || [], options.plugins?.rehype || [])

      let attributes: ZodObject | unknown

      if (options.fields) {
        attributes = options.fields.parse(vfile.data.matter)
      }

      let constants: string[] = []

      if (attributes) {
        constants = Object.entries(attributes).map(
          ([key, value]) => `export const ${key} = ${JSON.stringify(value)}`
        )
      }

      return {
        code: `
          export const id = "${path.basename(file, '.md')}"
          export const body = \`${vfile.value}\`
          ${constants.join('\n')}
        `
      }
    },

    async buildStart() {
      const typings = await extract_types(options.fields)
      await write_definitions(definitions_path, options.base, typings)
    },
  }
}

function build_sort(sort: Options['sort']): string {
  if (!sort) return ''

  const {field, order} = sort

  if (order == 'descending') {
    return `.sort((a, b) => {
      if (a.${field} > b.${field}) {
        return -1
      }
      if (a.${field} < b.${field}) {
        return 1
      }
      return 0
    })`
  }

  return `.sort((a, b) => {
    if (a.${field} < b.${field}) {
      return -1
    }
    if (a.${field} > b.${field}) {
      return 1
    }
    return 0
  })`
}
