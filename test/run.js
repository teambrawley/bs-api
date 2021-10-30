const bs = require('./../index.js');

bs.get('player','82PGQVJ2L').then(res => {
console.log(res)
}).catch(err => console.log(err))

bs.post('player','82PGQVJ2L').then(res => {
console.log(res)
}).catch(err => console.log(err))
