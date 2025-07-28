import { capitalize, file_exists, delete_file } from '../src/utils'
import fs from 'fs/promises'

describe('capitalize', () => {
  test('ignores empty string', () => {
    const result = capitalize('')

    expect(result).toEqual('')
  })

  test('capitalizes string', () => {
    const result = capitalize('pizza')

    expect(result).toEqual('Pizza')
  })

  test('single letter', () => {
    const result = capitalize('x')

    expect(result).toEqual('X')
  })
})

describe('file_exists', () => {
  test('returns true, when file exists', async () => {
    const exists = await file_exists('test/utils.test.ts')
    expect(exists).toEqual(true)
  })

  test('returns false, when file doesnt exists', async () => {
    const exists = await file_exists('test/fugazi.ts')
    expect(exists).toEqual(false)
  })
})

describe('delete_file', () => {
  test('deletes when file exists, when file exists', async () => {
    const path = 'test/fixtures/example.txt'

    await fs.appendFile(path, 'bla')

    expect(await file_exists(path)).toEqual(true)
    await delete_file(path)
    expect(await file_exists(path)).toEqual(false)
  })

  test('does nothing, when file doesnt exists', async () => {
    const path = 'test/fixtures/fugazi.txt'

    expect(delete_file(path)).toHaveResolved
  })
})
