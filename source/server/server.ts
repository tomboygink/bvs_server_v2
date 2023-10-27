import path from "path"
import express from "express"

import http from "http"
import hbs from "hbs"
import config from "../config.json"

class AppServer{
    app:express.Express = null;
    server:http.Server = null;
    constructor(){
        this.app = express();
        this.server = http.createServer(this.app);
        this.app.set('view engine', 'hbs');

        console.log(path.normalize(path.join(__dirname, '..', '..', 'server','views')) )
        this.app.set('views', path.normalize(path.join(__dirname, '..', '..','server', 'views')) ); // путь к шаблонам
        hbs.registerPartials( path.normalize(path.join(__dirname, '..', '..', 'views', 'partials')) ); // путь к частичным представлениям

        this.app.use( '/static', express.static( path.normalize(path.join(__dirname, '..', '..', 'server', 'public')) ) ); // статика
    }
    run(){
        if(this.app === null) return;
        if(this.server === null) return;
        
        this.route();
        this.server.listen(config.config_server.port,()=>{console.log(`Слушаю порт ${config.config_server.port}`)})

    }
    route(){
        this.app.get("/", (req:express.Request, res:express.Response)=>{
            res.render('index.hbs', { title: "Система визуализации СДС" });
        });
        this.app.post("/api", (req:express.Request, res:express.Response)=>{
            res.send('{"sess_code":"qwe"}')
        });
    }

}

var app = new AppServer();
app.run();