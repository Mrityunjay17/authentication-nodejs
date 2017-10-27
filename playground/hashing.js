const{SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

var hash=SHA256('Mrityunjay Pandey').toString();

var name={id:'Mrityunjay',
            name:'ndjvhnjkfv'}

var token=jwt.sign(name,'12345bc');

console.log(token);


var decode=jwt.verify(token,'12345bc');


console.log('Decode  ',decode);