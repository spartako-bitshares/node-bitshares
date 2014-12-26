var bitshares = require("../"),
        async = require('async'),
     minimist = require('minimist');

// USAGE:  node examples/main.js  --rpcuser user  --rpcpassword pass  --httpport 4000

var main = function(){
  var argv = minimist(process.argv.slice(2));
  var client = null;
  // Waterfall operations example
  async.waterfall([
    function(cb){
      bitshares.createClient(argv.rpcuser,argv.rpcpassword,argv.host||"127.0.0.1",argv.httpport,cb);
    },
    function(_client, cb){
      client = _client;
      cb(false,{});
    },      
    function(res, cb){
      client.get_info([],cb);
    },      
    function(res, cb){
      console.log("get_info",res);
      client.wallet_open(["default"],cb);
    },
    function(res, cb){
      console.log("open",res);
      client.wallet_account_balance([],cb);
    },
    function(res, cb){
      console.log("balance",res);
      cb(false,"end");
    },
  ], function (err, res) {
    if(err){
      console.log("err",err);
    }
    else{
      console.log(res);
    }
  });
};

main();
