import colors from 'colors'
import { inquirerMenu, inquirerPause, leerInput, listadoLugares } from "./helpers/inquirer.js"
import Busquedas from './models/busquedas.js'
import inquirer from 'inquirer'

console.log("hola mundo".green)

const main = async () => {

    let opt = ''
    const busquedas = new Busquedas()

    do {

        opt = await inquirerMenu()
        if (opt == '0')
            return
        switch (opt) {
            case "1":
                //Mostrar mensaje
                const terminoBusqueda = await leerInput("Ciudad: ")
                //buscar lugar
                const lugares = await busquedas.searchCity(terminoBusqueda)
                //selecciona el lugar
                const selectedPlaceId = await listadoLugares(lugares)
                if (selectedPlaceId == '0')
                    continue;
                const lugarSel = lugares.find(l => l.id === selectedPlaceId)
                busquedas.agregarHistorial(lugarSel.nombre)
                //clima
                const clima = await busquedas.getWeatherPlace(lugarSel.lat, lugarSel.lng)
                //mostrar resultados
                console.clear()
                console.log("Informacion de la ciudad\n".green)
                console.log("Ciudad:", lugarSel.nombre)
                console.log("Lat:", lugarSel.lat)
                console.log("Temperatura:", clima.temp)
                console.log("Minima:", clima.min)
                console.log("Maxima", clima.max)
                console.log("Actualmente:", clima.desc.green)
                break
            case '2':
                busquedas.historialCapitalizado.forEach((lugar,i)=> {
                    const idx = `${i +1 }.`.green
                    console.log(idx, lugar)
                })
                break

        }
        await inquirerPause();
    } while (opt != '0')
}

main()