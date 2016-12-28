/**
 * Created by aida on 17/11/16.
 */
var request=require('request');
var q=require('q');

var router = require('express').Router();
var postPassword=function(req,res){
    request({
        method: 'post',
        body:req.body,
        url: config.change_password_url+'?accessToken='+req.user.accessToken,
        json:true
    }, function (error, response,body) {
        if (error)  {
            res.status(400).send();
        }
        else if (response.statusCode!=201) {
            res.status(response.statusCode).send();
        } else {
                res.status(201).send();
        }

    });

};
router.post('/password', postPassword);


var retrievePassword=function(req,res){
    confirmRetrieve(req.params.username).then(
        function() {
            console.log('retrieve ok');
            res.send('Retrieve ok');
        },
        function(){
            console.log('retrieve error');
            res.status(400).send('Retrieve error');
        }

    )
};
router.post('/retrieve/:username', retrievePassword);

var confirmRetrieve=function(username) {
    var def = q.defer();
    request({
        method: 'post',
        url: config.retrieve_url+username,
        headers: null
    }, function (error, response) {
        if (error)  {
            return def.reject();
        }
        if (response.statusCode != 201) {
            def.reject();
        } else {
            def.resolve();
        }

    });
    return def.promise;
};

module.exports = router;