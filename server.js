const fs = require('fs')
const path = require('path')
const express = require('express')
const renderer = require('vue-server-renderer').createRenderer()
const app = express()

// Server
const createApp = require('./dist/bundle.server.js')['default']

// Client
const clientBundleFileUrl = '/bundle.client.js'
app.use('/', express.static(__dirname + '/dist'))

// api
app.get('/api/getList', (req, res) => {
    res.json(
        {
            list: [
                {name:'news1', id:1},
                {name:'news2', id:2},
                {name:'news3', id:3},
                {name:'news4', id:4},
            ]
        }
    )
})
app.get('/api/getNews', (req, res) => {
    res.json(
        {
            data: {
                title: '今日焦点',
                content: '撒地方就是家赖斯佛埃及'
            }
        }
    )
})
function renderToString (context) {
	return new Promise((resolve, reject) => {
		renderer.renderToString(context,(err,html) => {
			if (err) {
				reject(err)
				return
			}
			resolve(html)
		})
	})
}
// Server
app.get('*', (req, res) => {

  const context = { url: req.url }
  
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
        console.log('html', html)
        console.log('err', err)
        console.log('app', app)
        if (err){
            res.status(500).send(`
                <h1>Error: ${err.message}</h1>
                <pre>${err.stack}</pre>
            `)
        } else {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Vue 2.0 SSR</title>
                </head>
                <body>
                    <div id="app">
                    ${html}
                    </div>
                    <script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>
                    <script src="${clientBundleFileUrl}"></script>
                </body>
                </html>`
            )
        }
    });
  }, err => {
    if (err.code === 404) {
        res.status(404).end('Page not found')
    }
  })

})

app.listen(8080, () => {
   console.log('启动') 
})