import path from 'path'
import { reset_types } from './typing'
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
  return {
    name: 'vite-plugin-collections',
    async config() {
      reset_types(definitions_path)

      return {
        resolve: {
          alias: {
            [`#${options.base}`]: path.resolve(`./src/${options.base}`)
          }
        }
      }
    }
  }
}
