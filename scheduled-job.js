const axios = require('axios')

axios
  .get('https://us-central1-personalclub-52112.cloudfunctions.net/api/cronjob')
  .then(res => console.log(res.data.message))
  .catch(err => console.log(err + ' Wrong day'))
