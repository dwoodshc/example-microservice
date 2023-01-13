/******************************************************************************/
/* This the main routing code for the API Gateway/Proxy                       */
/*                                                                            */
/******************************************************************************/
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

// Get the quotes api from the environment(refer docker-compose.yml)
// This is what tells the app which server/port to contact
const QUOTES_API_GATEWAY = process.env.QUOTES_API
const TEST_API_GATEWAY = process.env.TEST_API
const NEWS_API_GATEWAY = process.env.NEWS_API

// Use CORS to prevent Cross-Origin Requets issue
app.use(cors())

/******************************************************************************/
/* General API */
/******************************************************************************/

// Get the status of the API
app.get('/api/status', (req, res) => {
    return res.json({status: 'OK from Status'})
})


/******************************************************************************/
/* Quote API */
/******************************************************************************/

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


/******************************************************************************/
/* Test API */
/******************************************************************************/

// Returns a string from the test api
app.get('/api/test',async (req, res) => {
    try {
        const url = TEST_API_GATEWAY + '/api/test'
        const test = await axios.get(url)
        return res.json({
            time: Date.now(),
            test: test.data
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        return res.json({
            message: "Internal server error",
        })
    }
    
})


/******************************************************************************/
/* News API */
/******************************************************************************/

// Returns a headline from the News service
app.get('/api/news',async (req, res) => {
    try {
        const url = NEWS_API_GATEWAY + '/api/news'
        const news = await axios.get(url)
        return res.json({
            time: Date.now(),
            news: news.data
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        return res.json({
            message: "Internal server error",
        })
    }
    
})


/******************************************************************************/
/* Operational Methods */
/******************************************************************************/

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
