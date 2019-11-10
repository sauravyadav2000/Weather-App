const path = require('path')
const express = require('express')//used to interact with server
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')



//Define path for express config
const app = express()//to take all the features of express
const publicDirectoryPath = path.join(__dirname, '../public')//To join the path
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)//Setting path for views
hbs.registerPartials(partialsPath)//for fixed footer and header

//Steup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{//For dynamic page
    res.render('index',{
        name:'Saurav',
        title:'Weather'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        name:'Saurav',
        class:4,
        title:'About'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{//help means render it in help.hbs
        name:'Saurav',
        age:20,
        title:'Help'
    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address){
        return res.send({
            error : 'You must enter the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, Location}={})=>{
    if (error){
       return  res.send({error})
    }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {return res.send({error})}
            res.send({
                forecast: forecastData,
                address: req.query.address,
                Location

            })
        })

})

    // res.send({
    //     forecast: 'Its snowing outside',
    //     temperature: 23 +'degree',
    //     location: req.query.address
    // })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        name:'Saurav',
        errorMessage:'Help page not found'
    })
})

app.get('*',(req,res)=>{//* is a wild card character
    res.render('error',{
    errorMessage:'Error 404',
        name:'Saurav',
    })
})
app.listen(3000, ()=>{//to set localhost
    console.log('Server is up')
})