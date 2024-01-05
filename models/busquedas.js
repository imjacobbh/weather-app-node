import axios from 'axios';
import 'dotenv/config'
import fs from 'fs'

class Busquedas {
    historial = [];
    dbPath = "./db/database.json"
    constructor() {
        this.leerDB()
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'proximity': 'ip'
        }
    }

    get historialCapitalizado(){
        return this.historial.map(it => {
            let palabras = it.split(" ")
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1))

            return palabras.join(" ")
        })
    }
    async searchCity(lugar = '') {
        try {
            const instanceD = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })
            const resp = await instanceD.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        }
        catch (error) {
            console.log(error)
            return [];
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': "metric",
            'lang': "es"
        }
    }
    async getWeatherPlace({ lat = 0.0, lon = 0.0 }) {
        try {
            const instanceD = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instanceD.get();
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    agregarHistorial(lugar =""){

        //prevenir duplicados
        if(this.historial.includes(lugar.toLocaleLowerCase)){
            return
        }
        this.historial.unshift(lugar.toLocaleLowerCase())

        //grabar en bd
        this.guardarDB()
    }

    guardarDB(){
        fs.writeFileSync(this.dbPath, JSON.stringify(this.historial))
    }

    leerDB(){
        const data = fs.readFileSync(this.dbPath)
        this.historial = JSON.parse(data)
    }
}

export default Busquedas