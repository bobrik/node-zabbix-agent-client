node.js client for zabbix-agent communication
===========================

Gather metrics from zabbix-controlled servers directly from your node.js application. No storage required.

## Installation

Just install from npm:

```
npm install zabbix-agent-client
```

## Usage

```javascript
var ZabbixAgentClient = require("zabbix-agent-client"),
    client            = new ZabbixAgentClient(10050, "127.0.0.1"),
    item              = "system.cpu.util",
    params            = ["", "nice", "avg1"];

client.getItemWithParams(item, params, function(error, result) {
    if (error) {
        console.log("Got error", error);
    }

    console.log("Result: " + result);
});
```

## API

* Requiring

```javascript
var ZabbixAgentClient = require("zabbix-agent-client");
```

* New zabbix agent connection:

```javascript
var client = new ZabbixAgentClient(10050, "127.0.0.1");
```

* Getting item by full name:

```javascript
client.getItemByFullName(name, callback);
```

* Getting item by name and params:

```javascript
client.getItemWithParams(name, params, callback);
```

`callback` - usual node.js style callback function with `error` and `result` arguments

## Authors

* [Ian Babrou](https://github.com/bobrik)
