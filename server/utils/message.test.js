let expect = require('expect');
let {generateMessage} = require ('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {

    let message = generateMessage('Ben', 'Hey there');

    expect(message.from).toBe('Ben')
    expect(message.text).toBe('Hey there')
    expect(typeof message.createdAt).toBe('number')





  })
})
