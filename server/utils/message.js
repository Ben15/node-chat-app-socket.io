let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
};


let message = generateMessage('Ben', 'Hey')

console.log(message);

module.exports = {generateMessage}
