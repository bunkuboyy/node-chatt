var expect = require('expect');
var {messageGenerator} = require('./message.js');

describe('generate message',() =>{
  it('should generate correct message',() =>{
    var from = "bunku";
    var text = "cool";
    var get = messageGenerator(from,text);

    expect(get).toMatchObject({from});
  })
})
