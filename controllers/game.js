module.exports = function(){
    return {
        SetRouting: function(router){
            router.get('/game/:name', this.gamePage);
        },

        gamePage: function(req,res){
            const name  = req.params.name;
            const user = req.user;
            console.log(user);
            res.render('gamechat/game', {title: 'Meanhero - Game', user: user, gameName: name});
        }
    
    }
}