module.exports = function(){
    return {
        SetRouting: function(router){
            router.get('/game/:name', this.gamePage);
        },

        gamePage: function(req,res){
            const name  = req.params.name;
            res.render('gamechat/game', {title: 'Meanhero - Game', name: name});
        }
    
    }
}