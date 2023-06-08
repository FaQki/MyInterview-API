import app from './app'
import './database'

app.listen(app.get('port'), ()=>{
    console.log("server or port", app.get('port'))
})

//arranca la aplicacion