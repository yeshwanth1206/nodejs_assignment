var fs=require('fs');
var data=fs.createReadStream('India2011.csv');
var rl=require('readline').createInterface({
 input:data,
 //console.log(input);
 });
 rl.on('line',function(line){
   console.log("ind line is"+line);
 });
