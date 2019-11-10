const request = require('request')

const forecast = (latitude, longitude, callback)=>{
   const url='https://api.darksky.net/forecast/66e9d98b6029f7aa52c87f36b603f7a8/'+latitude+','+longitude+'?units=si'
    request({url, json: true}, (error, { body })=>{//we return error and {body} in callback
        if (error){
            callback('Unable to connect', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out.There is " + body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = forecast