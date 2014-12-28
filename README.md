node-bitshares
==============

API wrapper for bitshares toolkit in nodejs.

Start the bitshares node using command:

```
$ ./bitshares_client  --rpcuser user  --rpcpassword pass --server --httpport 4000
```

**Note**: This command is used only for convenience.
For security reason I **strongly** suggest you to change ~/.Bitshares/config.json file and launch bitshares_client without parameters.

Install bitshares npm module
```
$ npm install bitshares
```

createClient method return the rpc client for communicating with bitshares node
```js
var bitshares = require('bitshares');

bitshares.createClient("user","pass","127.0.0.1",4000,function(err,client){
	if(err){return console.log(err);};
	// You can call every method listed in help command, the first arg is the params list
	client.get_info([],function(err,res){
		if(err){return console.log(err);};
		console.log("result",res);
	});
});

```

See [example](/examples/main.js) for other commands usage.

