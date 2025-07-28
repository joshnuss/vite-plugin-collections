import { unified, type PluggableList } from 'unified'
import { matter } from 'vfile-matter'
import remarkRehype from 'remark-rehype'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import remarkHTML from 'remark-html'
import rehypeStringify from 'rehype-stringify'
import type { VFile } from 'vfile'

export async function parse_markdown(
  markdown: string,
  remark: PluggableList = [],
  rehype: PluggableList = []
): Promise<VFile> {
  const data = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remark)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkHTML)
    .use(remarkRehype)
    .use(rehype)
    .use(rehypeStringify)
    .use(() => (tree, file) => {
      matter(file)
    })
    .process(markdown)

  return data
}
