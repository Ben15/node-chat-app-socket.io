let expect = require('expect');
let {generateMessage, generateLocationMessage} = require ('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {

    let message = generateMessage('Ben', 'Hey there');

    expect(message.from).toBe('Ben')
    expect(message.text).toBe('Hey there')
    expect(typeof message.createdAt).toBe('number')

  })
})


describe('generateLocationMessage', () => {

  it('should generate location object', () => {

    let from = 'Ben'
    let lat = '-34.8189244'
    let long = '138.7064766'

      let locationMessage = generateLocationMessage(from,lat,long);

      expect(locationMessage.from).toBe('Ben')
      expect(locationMessage.url).toBe('https://www.google.com/maps?q=-34.8189244,138.7064766')
      expect(typeof locationMessage.createdAt).toBe('number')

  })



})
