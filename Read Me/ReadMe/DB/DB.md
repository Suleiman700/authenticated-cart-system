## <ins>Database</ins>

Database settings are located in: `/server/server.js`

```
// Database
const db_name = "abra-db" // DB name
const users_tbl = require('./Schema/UsersSchema')
const sessions_tbl = require('./Schema/SessionsSchema')
const products_tbl = require('./Schema/ProductsSchema')
const cart_tbl = require('./Schema/CartSchema')

mongoose.connect(`mongodb://localhost:27017/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to local DB')).catch(console.error)
```

