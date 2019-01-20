'use strict';

var distance = require('google-distance-matrix');

const sql = require('mssql');

const config = {
  user: 'DESKTOP-O9SBDD8/NBS',
  password: '12345678',
  server: 'localhost/SQLExpress',
  database: 'gelocation'}

module.exports = {

getDistance:function(req,res){

  var distance;

  distance = findInDB(req)

  if(!distance))

    var distance = findInGoogle(req)

  res.send(distance)
}

}

const findInDB = function (params){

var query = "select distance from distances where origin = '"+params.query.origin +"' and dest = '"+ params.query.dest +"'"
sql.connect(config, query, (err,result)=>{
 if(result)
 {
   addCountCalls(params)
   return result;
 }
 return null;
 )
}

const findInGoogle = function (req){

  var origin = []

  origin.push(req.query.origin);

  var dest= [];

  dest.push(req.query.dest);

distance.matrix(origin,dest,function (err, distances) {
  if (!err){
      console.log("distance:", distances);
      putInDB(distances)
    }
})

}


var query = "select distance from distances where origin = 'Tel aviv' and dest = 'Jerusalem'"
sql.connect(config, query, (eee,ee)=>{console.log(eee)
  console.log(ee)})

