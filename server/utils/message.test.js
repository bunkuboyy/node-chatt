var expect = require('expect');
var {messageGenerator,locationGenerator} = require('./message.js');

describe('generate message',() =>{
  it('should generate correct message',() =>{
    var from = "bunku";
    var text = "cool";
    var get = messageGenerator(from,text);

    expect(get).toMatchObject({from});
  })
})

describe('generate location message', () =>{
  it('should generate correct location object', () =>{
    var from = "User";
    var latitude = 15;
    var longitude = 17;
    var url = 'https://www.google.com/maps?q=15,17';
     var loc= locationGenerator(from,latitude,longitude);

    expect(loc).toMatchObject({from,url});
  })
})
