//need to fix angular
//f24
Run these commands to create a sample MongoDb collection
```javascript
use january
db.createCollection('profiles')
db.profiles.insertOne({ username: "Jenny Smith", password: "the password", wishlist: [ { itemname: "Miu Miu Shearling tote", itemprice: 720, rating: 4, comments:["is this availiable in cream?"] } ] } )
db.profiles.insertOne({ username: "Kenny Jones", password: "another password", wishlist: [ { itemname: "Margiela Trench", itemprice: 1420, rating: 5, comments:["are the sleeves detailed in canvas?"] } ] } )

```
