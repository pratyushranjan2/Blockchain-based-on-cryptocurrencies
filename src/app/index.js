const express = require('express')
const Blockchain = require('../blockchain/index')
const bodyparser = require('body-parser')
const P2pServer = require('./p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()
app.use(bodyparser.json())

const bc = new Blockchain()
const p2pServer = new P2pServer(bc)

app.get('/blocks', (req,res) => {
    res.json(bc.chain)
})

app.post('/mine', (req,res) => {
    const block = bc.addBlock(req.body.data)
    p2pServer.syncChains()
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => {
    console.log('Server up on '+HTTP_PORT)
})

p2pServer.listen()