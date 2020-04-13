
module.exports = function(async, Group, _){
    return {
        SetRouting: function(router){            
            router.get('/home', this.homePage);
        }, 

        homePage: function(req, res){
            async.parallel([
                function(callback){
                    Group.find({}, (err, result) => {
                        callback(err, result);
                    })
                },

                function(callback){
                    Group.aggregate([{
                        $group: {
                            _id: "$rulesetting"
                        }
                    }], (err, newResult) => {
                        callback(err, newResult);
                    });
                }
            ], (err, results) => {
                const res1 =results[0];
                //aggregated
                const res2 = results[1];

                const dataChunk = [];
                const chunkSize = 4;

                for (let i = 0; i < res1.length; i += chunkSize){
                    dataChunk.push(res1.slice(i, i+chunkSize));
                }

                const rulesettingSort = _.sortBy(res2, '_id');

                res.render('home', {title: 'Meanhero | Home', data: dataChunk, rulesetting: rulesettingSort});
            })
            
        },
    }
}