'use strict';

module.exports = function(_, passport, User, validator){
    
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/auth/google', this.getGoogleLogin);
            router.get('/auth/google/callback', this.googleLogin);
            
            
            //router.post('/', User.LoginValidation, this.postLogin);
            router.post('/', [
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is invalid'),
                validator.check('password').not().isEmpty().isLength({min: 5}).withMessage('Password is required and must be 5 characters long')
            ], this.postValidation, this.postLogin)

            //router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.post('/signup', [
                validator.check('username').not().isEmpty().isLength({min: 5}).withMessage('Email is invalid'),
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is invalid'),
                validator.check('password').not().isEmpty().isLength({min: 5}).withMessage('Password is required and must be 5 characters long')
            ], this.postValidation, this.postSignUp)
        },

        indexPage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'Meanhero | Login', messages: errors, hasErrors: errors.length > 0});
        },
        
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
        
        getSignUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'Meanhero | SignUp', messages: errors, hasErrors: errors.length > 0});
        },
        
        postValidation: function(req, res, next) {
            const err =validator.validationResult(req);
            console.log(err);
            const errors = err.array();
            const messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            if (messages.isEmpty) {
                req.flash('error', messages); 
                console.log(error);
                if(req.url === '/'){
                    res.redirect('/');
                }else if(req.url === '/signup'){
                    res.redirect('/signup');
                }
            }
            return next();
        },

        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        
        
        getGoogleLogin: passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
        }),
        
        googleLogin: passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        
        }
    
}















