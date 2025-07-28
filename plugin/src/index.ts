import type { PluggableList } from 'unified'

export type Options<Schema> = {
  base: string
  pattern: string
  fields?: Schema
  plugins?: {
    remark?: PluggableList
    rehype?: PluggableList
  }
  sort?: {
    field: string
    order?: 'ascending' | 'descending'
  }
}

export type Type = {
  name: string
  type: string
  optional: boolean
}
