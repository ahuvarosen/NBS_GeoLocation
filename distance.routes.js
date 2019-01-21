//var distance = require('google-distance-matrix');
'use strict';

const express = require('express');

const app = express();

const controller = require('./distance.server.controller.js')

/*app.get('/distance', (req,res)=>{

  return controller.getDistance(req,res)

})*/

app.route('/distance').get(controller.getDistance)

app.route('/popular').get(controller.getDistance)

/*app.get('/popular', (req,res)=>{
  
  console.log(req.query);

  res.send("hello world")
})*/
var server=app.listen(3000,function() {console.log('the server is running...')});
//"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="

