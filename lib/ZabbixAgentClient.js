(function(module) {

    var net = require("net");

    function ZabbixAgentClient(port, host) {
        var self = this;

        self.getConnection = function(callback) {
            var connection = net.createConnection(port, host, function() {
                callback(undefined, connection);
            });
        };
    };

    ZabbixAgentClient.prototype.getItemByFullName = function(item, callback) {
        this.getConnection(function(error, connection) {
            if (error) {
                return callback(error);
            }

            connection.on("data", function(data) {
                var header,
                    check,
                    length;

                if (data.length < (4 + 1 + 8 + 1)) {
                    return callback(new Error("Incorrect response size"));
                }

                header = data.slice(0, 4).toString();
                check  = data[4];
                if (header != "ZBXD" || data[4] != 0x01) {
                    return callback(new Error("Incorrect header: " + header + ":" + check));
                }

                length = data.readUInt32LE(5);
                if (data.length != (4 + 1 + 8 + length)) {
                    return callback(new Error("Incorrect length: " + length));
                }

                return callback(undefined, data.slice(data.length - length).toString());
            });

            connection.write(item + "\n");
        });
    };

    ZabbixAgentClient.prototype.getItemWithParams = function(item, params, callback) {
        if (params && params.length) {
            item = item + "[" + params.join(",") + "]";
        }

        return this.getItemByFullName(item, callback);
    };

    module.exports = ZabbixAgentClient;

})(module);
