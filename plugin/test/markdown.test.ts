import { parse_markdown } from '../src/markdown'
import type { Root as MdastRoot } from 'mdast'
import type { Root as HastRoot } from 'hast'

describe('parse_markdown', () => {
  it('converts to markdown', async () => {
    const markdown = '# Title'
    const file = await parse_markdown(markdown)

    expect(file.value).toBe('<h1>Title</h1>')
  })

  it('returns front matter', async () => {
    const markdown = '---\ntitle: Title\n---\n'
    const file = await parse_markdown(markdown)

    expect(file.data).toEqual({
      matter: {
        title: 'Title'
      }
    })
  })

  it('uses remark plugins', async () => {
    const markdown = '# Title'
    const plugin = () => {
      return (ast: MdastRoot) => {
        // overwrite <h1>'s inner value
        // @ts-expect-error
        const root = ast.children[0].children[0].value = 'Updated'
        return ast
      }
    }
    const file = await parse_markdown(markdown, [plugin])

    expect(file.value).toBe('<h1>Updated</h1>')
  })

  it('uses rehype plugins', async () => {
    const markdown = '# Title'
    const plugin = () => {
      return (ast: HastRoot) => {
        // overwrite <h1>'s inner value
        // @ts-expect-error
        ast.children[0].children[0].value = 'Updated'
        return ast
      }
    }
    const file = await parse_markdown(markdown, [], [plugin])

    expect(file.value).toBe('<h1>Updated</h1>')
  })
})
