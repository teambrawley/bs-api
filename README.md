## BS-API 

An npm package that can interact with [bs-api](https://cr.is-a.dev) easily.


### Install 
`npm i bsapi.js`

### Updates
 Version v1.0.9
> 
- Bug Fixes 
- Replaced [request](https://npmjs.com/request) with [axios](https://npmjs.com/axios)
- Developing cli

### Types 

| Request Types | Description |
| --------------|----------------|
| `get` | Uses Get Function To Request Data |
| `post` | Uses Post Function To Request Data |
| `ws` | Uses WebSocket To Request Data ( `player type` ) |

______________________________________

| Response Type | Description |
| ----------- | --------------- |
| `player` | Get A Player's Game Stats |
| `clubs` | Get A Club's Stats |
| `rankings/players` | Top Rankings ( Player ) |
| `rankings/clubs` | Top Rankings ( Club ) |
| `brawlers` | List Of Every Brawlers |
| `events` | Events Rotation |
|  You can find the list of every response types at [here](https://github.com/brawlie/BrawlStars-Stats) |




### Usage 

```js
const bs = require('bsapi.js')

bs.<Request_Type>('Type','String').then((response) => {})

//String CAN'T BE BLANK Instead Use Something Like <#> Or </> , For Types Like <events> 
```

- #### Example Usage
`Get` A Player's In-Game Profile Information
```js
const bs = require('bsapi.js')

bs.get('player','82PGQVJ2L').then((response) => {
  console.log(response)
})
```

### Tag Validator 
This function allows you to validate a Brawl Stars Tag
```js
const { validator } = require('bsapi.js')
...
await validator('player', '<#TAG>')
```
*this function must be used inside an async function otherwise it won't work*

### License 
```Apache-2.0```

- ### Contributors

  - [@joeleeofficial](https://github.com/joeleeofficial)
  - [@teambrawley](https://github.com/brawlie)

- ### Disclaimer
  - See [Supercell's Fan Content Policy](https://supercell.com/en/fan-content-policy/)
