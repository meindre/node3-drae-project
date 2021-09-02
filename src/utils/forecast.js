const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=5b52d3829aa8941b9e0c3106bb6e4225&query='+ latitude + ',' + longitude + '&units=m'
    request({url : url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to server', undefined)
        }else if(body.error){
            callback('Unable to find your location, try another place !', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + ' Temperature saat ini adalah ' + body.current.temperature + ' derajat di luar dan kelembapan ' + body.current.humidity + ' . Tapi terasa seperti ' + body.current.feelslike + ' derajat di luar')
        }
    })
}

module.exports = forecast