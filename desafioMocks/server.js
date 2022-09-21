const faker = require('faker')
const express = require('express')
const getRandom = require('./controllers/productosFaker')

const app = express()


const fakerGenerator = async () => {
  let array = []
  for(let i = 0; i < 6; i++){
    const prod = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image()
    }
    array.push(prod)
  }
  return array
}



app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/productos-test', getRandom)

app.listen(8080)

console.log(`Running on port 8080`)

module.exports= fakerGenerator