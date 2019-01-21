'use strict';

var distance = require('google-distance-matrix');

var q= require('q');

const sql = require('mssql');

var config={   
host : 'ahuvaf-tp',
user     : 'sa',
password : '1234.com',
database : 'geolocation'
}

distance.key('AIzaSyCjHqDFEysAJ136tyulCPeNGklwEVHgA08');

module.exports = {

getDistance:function(req,res){

  var distance;

  distance = findInDB(req)

  if(!distance)

  findInGoogle(req).then(result=>{

    res.send(result)
  })
}
}

const findInDB = function (params){

//var query = "select distance from distances where origin = '"+params.query.origin +"' and dest = '"+ params.query.dest +"'"
var query = "select * from distances"

sql.connect(config, query, (err,result)=>{
 if(result)
 {
   addCountCalls(params)
   return result;
 }
 return null;
})

return null;
 
}

const findInGoogle = function (req){

  var promise=q.defer();

  var origin = []

  origin.push(req.query.origin);

  var dest= [];

  dest.push(req.query.dest);

distance.matrix(origin,dest,function (err, result) {
  if (!err){
     
      var dis = result.rows[0].elements[0].distance.value;
      console.log("dis:", dis);
      promise.resolve(dis);
      //putInDB(distances)
    }
})
return promise.promise;
}
var query = "select * from distances"

sql.connect(config, query, (err,result)=>{
 if(result)
 {
   console.log(result)
   //addCountCalls(params)
   return result;
 }
 return null;
})


