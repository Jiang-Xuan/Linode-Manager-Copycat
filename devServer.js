const path = require('path')
const process = require('process')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')
const mime = require('mime')

const app = express()
const compiler = webpack(config)

app.use('/assets', express.static(__dirname + '/assets'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  if (req.url === '/static/common.js') {
    res.send('')
  } else {
    res.sendFile(path.join(__dirname, 'index.html'))
  }
})

const port = process.env.MANAGER_PORT || 4000

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:' + port)
})