const router = require('express').Router()
const path = require('path')
router.get('/notes', (req,res) =>{
     // request - the backend is requesting data from the user/client
    // response - what am I sending back to the user/client

// C:\Users\madis\bootcamp\express.js-note-taker\routes\htmlRoutes.js
    res.sendFile(path.join(__dirname, '../public/notes.html' ))
})

module.exports = router