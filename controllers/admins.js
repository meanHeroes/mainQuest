'use strict'
//module.exports = function(formidable, Group, aws){

//const path = require('path');
//const fs = require('fs');

module.exports = function(_, formidable, Group, AWS){
    return {
//         SetRouting: function(router) {
//           router.get('/dashboard', this.dashboard);
//           router.post('/dashboard', AWS.Upload.single('theimg'), this.adminPostPage);
//         },
    
//         dashboard: function(req, res) {
//           res.render('admin/dashboard');
//         },
//         adminPostPage: function(req, res) {
//           const newGroup = new Group();
//           newGroup.name = req.body.group;
//           newGroup.rulesetting = req.body.rulesetting;
//           newGroup.image = req.body.upload;
//           newGroup.save((err) => {
//             res.render('admin/dashboard');
//           });      
//         }
//       }
// }

        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', AWS.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },
        
        adminPage: function(req, res){
            res.render('admin/dashboard');
        },
        adminPostPage: function(req, res){
            const newGroup = new Group();
            newGroup.name = req.body.group;
            newGroup.rulesetting = req.body.rulesetting;
            newGroup.image = req.body.theimg;
            console.log('Group before save')
            newGroup.save((err)=> {
                console.log(err);
                res.render('admin/dashboard');
            })
        },
        
        uploadFile: function(req,res) {
            const form = new formidable.IncomingForm();
            //form.uploadDir = path.join(__dirname, '../public/uploads');

            form.on('file', (field, file) => {
                // fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
                //     if(err) throw err;
                //     console.log('File renamed successfully');
                // })
            });

            form.on('error', (err) =>{
                //console.log(err);
            })
            
            form.on('end', () =>{
                //console.log('File upload is successful');
            })

            form.parse(req);
        }
    }
}