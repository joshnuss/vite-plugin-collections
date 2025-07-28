import { capitalize, file_exists } from '../src/utils'

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
