const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

// Get the quotes api from the environment(refer docker-compose.yml)
// This is what tells the app which server/port to contact
const QUOTES_API_GATEWAY = process.env.QUOTES_API
const DAVE_API_GATEWAY = process.env.DAVE_API

// Use CORS to prevent Cross-Origin Requets issue
app.use(cors())

/******************************************* */
/* General API */
/******************************************* */

// Get the status of the API
app.get('/api/status', (req, res) => {
    return res.json({status: 'ok'})
})

// Get the status of the API
app.get('/api/statusDave', (req, res) => {
    return res.json({status: 'OK from Dave'})
})


/******************************************* */
/* Quote API */
/******************************************* */

// Returns a random quote from the quote api
app.get('/api/randomquote',async (req, res) => {
    try {
        const url = QUOTES_API_GATEWAY + '/api/quote-random'
        const quote = await axios.get(url)
        return res.json({
            time: Date.now(),
            quote: quote.data
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        return res.json({
            message: "Internal server error",
        })
    }
    
})



/******************************************* */
/* Dave API */
/******************************************* */

// Returns a random quote from the quote api
app.get('/api/davequote',async (req, res) => {
    try {
        const url = DAVE_API_GATEWAY + '/api/quote-dave'
        const quote = await axios.get(url)
        return res.json({
            time: Date.now(),
            quote: quote.data
            //quote: "dsdsadasfffff"
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        return res.json({
            message: "Internal server error",
        })
    }
    
})




/******************************************* */
/* General API */
/******************************************* */

// Handle any unknown route
app.get('*', (req, res) => {
    res.status(404)
    return res.json({
        message: 'Resource not found'
    })
});

// starts the app
app.listen(3000, () => {
    console.log('API Gateway is listening on port 3000!')
})
