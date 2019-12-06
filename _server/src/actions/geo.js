const Axios = require('axios')
const { google_geo_key } = require('../../config')

const getLocation = (address) => {
  return new Promise((resolve, reject) => {
    if (address) {
      Axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${google_geo_key}`)
        .then(res => resolve(res.data.results[0].geometry.location))
        .catch(err => reject(err))
    } else {
      return reject('Address is required')
    }
  })
}

module.exports = {
  getLocation
}