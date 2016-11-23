/**
 * Created by aida on 23/11/16.
 */

var request=require('request');
var q=require('q');

var router = require('express').Router();

var getEntityProfile=function(req,res){
    request({
        method: 'get',
        url: config.entity_profile_url+'?accessToken='+req.user.accessToken
    }, function (error, response,body) {
        if (error)  {
            res.status(400).send(error);
        }
        if (response.statusCode != 200) {
            res.status(statusCode).send();
        } else {
            var result = {entity_profile: JSON.parse(body), user_id: req.user._id};

            //   result.picture = "https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/11150172_662840547182178_4305673317108362832_n.jpg?oh=2102aae8ab5726b46b25cbfecab1e059&oe=588E4EF9";
            res.send(result);
        }

    });

};
router.get('/me', getEntityProfile);

var putEntityProfile=function(req,res){
    request({
        method: 'put',
        body:req.body,
        url: config.entity_profile_url+'?accessToken='+req.user.accessToken,
        json:true
    }, function (error, response,body) {
        if (error)  {
            res.status(400).send(error);
        }
        else {
            res.status(200).send(body);
        }

    });

};
router.put('/me', putEntityProfile);





module.exports = router;
