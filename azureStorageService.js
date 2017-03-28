var azure = require('azure-storage');

module.exports = {
    getLatestEntries: function (count, partitionKey) {

        var tableSvc = azure.createTableService();
        var query = new azure.TableQuery()
            .top(count)
            .where('PartitionKey eq ?', partitionKey);

        return new Promise(function (resolve, reject) {
            tableSvc.queryEntities('rtt', query, null, function (error, result, response) {
                if (error) {
                    reject(error);
                }
                else {
                    result = result.entries.map(entry => {
                        return {
                            timestamp:entry.Timestamp._,
                            rtt:entry.rtt._
                        }
                    })
                    resolve(result);
                }
            });
        });
    }
}