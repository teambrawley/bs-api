## BS-API 

An Npm Package That Can Be Used To Interact With [bs-api](https://cr.is-a.dev)


### Install 
`npm i bsapi.js`

### Updates
 Version v1.0.6
> 
- Made Changes To Readme.md
- Added Websocket And Post Function 
 - Added New Response Type

### Types 

| Request Types | Description |
| --------------|----------------|
| `get` | Uses Get Function To Request Data |
| `post` | Uses Post Function To Request Data |
| `ws` | Uses WebSocket To Request Data |

______________________________________

| Response Type | Description |
| ----------- | --------------- |
| `player` | Get A Player's Game Stats |
| `clubs` | Get A Club's Stats |
| `rankings/players` | Top Rankings ( Player ) |
| `rankings/clubs` | Top Rankings ( Club ) |
| `brawlers` | List Of Every Brawlers |
|  You can find the list of every response types at [here](https://github.com/brawlie/BrawlStars-Stats) |




### Usage 

```
const bs = require('bsapi.js')

bs.<Request_Type>('Type','String').then((response) => {})
```

- #### Example Usage
`Get` A Player's In-Game Profile Information
```
const bs = require('bsapi.js')

bs.get('player','82PGQVJ2L').then((response) => {
  console.log(response)
})
```


### License 
```Apache-2.0```

### Contributors

- [@joeleeofficial](https://github.com/joeleeofficial)
- [@teambrawley](https://github.com/brawlie)
