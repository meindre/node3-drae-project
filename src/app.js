const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
console.log(__dirname)
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Indra Permana',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Indra Permana',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help page',
        name : 'Indra Permana',
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('You must to provide the address')
    }
    geocode(req.query.address,(error,{latitude,longitude,location = {} })=>{
        if(error){
            return res.send(
                {
                error : error 
            }
        )
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                 res.send({
                     error : error
                 })
            }
                res.send({
                    forecast : data,
                    address : req.query.address,
                    location : location
                })
            
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 page',
        errorMessage : 'Page not found !',
        name : 'Indra Permana'
    })
})

app.listen(3000,()=>{
    console.log('Server is on port 3000')
})