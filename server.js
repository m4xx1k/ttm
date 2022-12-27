const jsonServer = require('json-server')
const app = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const path = require("path")
// Set default middlewares (logger, static, cors and no-cache)
app.use(middlewares)
const PORT = process.env.PORT || 3001

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
app.use(jsonServer.bodyParser)

// Use default router
app.use(router)

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})

app.listen(PORT)