## BS-API 

An Npm Package That Can Be Used To Interact With [bs-api](https://cr.is-a.dev)


### Install 
`npm i bsapi.js`

### Usage 

```
const bs = require('api-bs')

bs.get('Type','String').then((response) => {
  console.log(response)
})
```

- #### Example Usage
Get A Player's In-Game Profile Information
```
const bs = require('api-bs')

bs.get('player','82PGQVJ2L').then((response) => {
  console.log(response)
})
```

### Types
You can find the list of types at [here](https://github.com/brawlie/BrawlStars-Stats)

### License 
```Apache-2.0```

### Contributors

- [@joeleeofficial](https://github.com/joeleeofficial)
- [@teambrawley](https://github.com/brawlie)
