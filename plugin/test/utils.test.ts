import { capitalize } from '../src/utils'

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
