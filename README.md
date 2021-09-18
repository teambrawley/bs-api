## BS-API 

An npm package that can interact with [bs-api](https://cr.is-a.dev) easily.


### Install 
```
npm install bsapi.js
```

### Updates
 Version v2.0.0 ( Major Update )
> 
- Bug Fixes 
- Added cli

### Types 

| Request Types | Description |
| --------------|----------------|
| `get` | Uses Get Method To Request Data |
| `post` | Uses Post Method To Request Data |
| `ws` | Uses WebSocket To Receive Data ( `player type` ) |

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

bs.<Request_Type>('<Type>','<TAG>').then(res => {

  // Handle Datas

}).catch(err => // Handle Errors )

```

- #### Example Usage
  `Get` A Player's In-Game Profile Information
  
   ```js
   bs.get('player','82PGQVJ2L').then(res => {
   console.log(res)
   }).catch(err => console.log(err))
  ```
  
 `Get` Current Event Rotation ( Async / Await )
 
    ```js
   (async () => {
     console.log(await bs.get('events'));
      })();
     ```
### Tag Validator 
This function allows you to validate a Brawl Stars Tag
```js
const { validator } = require('bsapi.js')
// ... ( async )
await validator('<Type>', '<#TAG>')
```
*supported types : `club`, `player`, `brawler`*

### CLI
Interact with bs-api through cli.
```
npm install -g bsapi.js
```
*to use cli, you'll have to install this package globally*

- ### Usage
  ---
  **For CLI options, use the help command or `-h` (or `--help`) argument :**
  
  ```
  bs help
  ```

### License 
```Apache-2.0```

- ### Contributors

  - [@joeleeofficial](https://github.com/joeleeofficial)
  - [@teambrawley](https://github.com/brawlie)

- ### Disclaimer
  - See [Supercell's Fan Content Policy](https://supercell.com/en/fan-content-policy/)
