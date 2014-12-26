var expect = require('expect.js'),
    bitshares = require('../');

describe('client', function() {
  it('createClient', function(done) {
    bitshares.createClient("user","pass","127.0.0.1",4000,function(err,client){
      if(err){
	done(err);
      }
      else{
	expect(client).to.be.an('object');
	done();
      }
    });
  });
  
  it('get_info', function(done) {
    bitshares.createClient("user","pass","127.0.0.1",4000,function(err,client){
      if(err){return done(err);}
      expect(client).to.have.key('get_info');
      client.get_info([],function(err,info){
	if(err){return done(err);}
	expect(info).to.have.key('blockchain_head_block_num');
	expect(info.blockchain_head_block_num).to.be.greaterThan(0);
	done();
      });      
    });
  });
  
});
