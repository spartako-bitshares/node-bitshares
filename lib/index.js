var request = require('request');
var _ = require("underscore");
_.str = require('underscore.string');
_.mixin(_.str.exports());

var factoryCreateMethod = function(client,method){
  client[method] = function(params,cb){
    var data = {
      "method": method,
      "params": params,
      "jsonrpc": "2.0",
      "id": 0,
    };    
    request.post({
      url: client.url,
      headers:{
	'content-type': 'application/json',
	'Authorization': "Basic "+new Buffer(client.user + ':' + client.password).toString('base64'),
      },
      body : data,
      json : true
    },function(err,res){
      if(err){
	cb(err);
      }
      else{
	if(res.body.error){
	  cb(res.body.error.detail);
	}
	else{
	  cb(false,res.body.result);
	}
      }
    });
  };
};

var createClient = function(user,password,host,port,cb){
  var client = {
    user : user,
    password : password,
    host : host,
    port : port,
    url : _.sprintf("http://%s:%d/rpc",host,port)
  };    
  factoryCreateMethod(client,"help");
  client.help([],function(err,res){
    if(err){
      return cb(err);
    }
    // Create methods in dinamic way using help command
    var commands = res.split("\n");
    commands.forEach(function(line){
      var command = line.split(" ")[0];
      factoryCreateMethod(client,command);
    });
    cb(false,client);
  });
};

exports.createClient = createClient;
