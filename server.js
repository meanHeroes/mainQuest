const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
//const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');
const _ = require('lodash');
const socketIO = require('socket.io');
const {Users} = require('./helpers/UsersClass');

const container = require('./container');


container.resolve(function(users, _, admins, home, game){

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/meanhero', {useNewUrlParser: true, useUnifiedTopology: true});

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        const io = socketIO(server);
        server.listen(3000, function(){
            console.log('Listening on port 3000');
        });
        ConfigureExpress(app);

        require('./socket/gamechat')(io, Users);

        //Setup Router
        const router = require('express-promise-router')();
        users.SetRouting(router);
        admins.SetRouting(router);
        home.SetRouting(router);
        game.SetRouting(router);

        app.use(router);
    }
    
    function ConfigureExpress(app){
        require('./passport/passport-local');
        require('./passport/passport-google');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
    
        //app.use(validator());

        app.use(session({
            secret: 'my-secret',
            saveInitialized: true,
            saveUninitialized: true,
            resave: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }

});