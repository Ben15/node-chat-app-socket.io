const expect = require('expect')

const {isRealString} = require('./validation.js')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let strTest = isRealString(1)
    expect(strTest).toBe(false)
  })

  it('should reject string with only spaces', () => {
    let strTest = isRealString('   ')
    expect(strTest).toBe(false)
  })

  it('should reject string with only spaces', () => {
    let strTest = isRealString('  Ben  ')
    expect(strTest).toBe(true)
  })
})
