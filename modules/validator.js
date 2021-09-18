const axios = require('axios')


async function validator(types, value){
if(!types)return new Error('Type Must Be Defined');
if(!value)return new Error('Value Cannot Be Empty');
var type;
if(types.toLowerCase().startsWith('player')){
  type = '/'
}else if(types.toLowerCase().startsWith('club')){
 type = '/clubs/'
}else if(types.toLowerCase().startsWith('brawler')){
  if(typeof value != 'number')new Error('Brawler ID Must Be In Number Type') 
  type = '/brawlers/'
}else {
  return false
}

const response = await axios.get(`https://cr.is-a.dev${type}/${value}`)

if(response.data){
if(response.data.message == '404 Not Found'){
   return 'false'
}else {
  return 'true'
}
}
}



module.exports = validator 
