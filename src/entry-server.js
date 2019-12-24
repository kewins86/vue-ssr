import { createApp } from './app'

export default context => {
	
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)

    const matchedComponents = router.getMatchedComponents()
    console.log('router',matchedComponents)
    if (!matchedComponents.length) {
		return reject({code: 404})
	}
		
    Promise.all(matchedComponents.map(Component => {
      if (Component.asyncData) {
        return Component.asyncData({
          store
        })
      } else {
        resolve(app)
      }
    })).then(() => {
        context.state = store.state
        resolve(app)          
    }).catch(reject)
  })
  
}