node-bitshares
==============

API wrapper for bitshares toolkit in nodejs.

Start the bitshares_client using this command:

```
$ ./bitshares_client  --rpcuser user  --rpcpassword pass --server --httpport 4000
```

the createClient method create the rpc client
```js
var bitshares = require('bitshares');

bitshares.createClient("user","pass","127.0.0.1",4000,function(err,client){
	if(err){return console.log(err);};
	// You can call every method from help command, the first arg is the params list
	client.get_info([],function(err,res){
		if(err){return console.log(err);};
		console.log("result",res);
	});
});

```

See examples/ for other commands usage.

