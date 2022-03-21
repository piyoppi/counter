import { removeTypeKey, setTypeKey } from '../../../src/adapter/aws/store.js'

describe('removeTypeKey', () => {
  test('Remove type keys', () => {
    expect(removeTypeKey({a: {S: 'foo'}, b: {N: 1}})).toEqual({a: 'foo', b: 1})
  })
})

describe('setTypeKey', () => {
  test('Set type keys', () => {
    expect(setTypeKey({a: 'foo', b: 1})).toEqual({a: {S: 'foo'}, b: {N: '1'}})
  })
})
