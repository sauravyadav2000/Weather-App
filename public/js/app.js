console.log('Client side javascript')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()//this will not refresh page automatically

    const location = search.value //value is the content in the search bar
    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }else {
                // console.log(data.Location)
                // console.log(data.forecast)
                messageOne.textContent = 'Your full address = '+data.Location
                messageTwo.textContent =  'Todays forecast: '+data.forecast


            }

        })
    })


})