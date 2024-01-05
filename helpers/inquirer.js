
import('colors')
import inquirer from 'inquirer';
const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [{
            value: '1',
            name: `${"1.".green} Buscar ciudad`
        },
        {
            value: '2',
            name: `${"2.".green} Historial`
        },
        {
            value: '0',
            name: `${"0.".green} Salir`
        }]
    }
]
const inquirerMenu = async () => {
    console.clear()
    console.log("==========================".green)
    console.log("  Seleccione una opción  ")
    console.log("==========================\n".green)
    const { option } = await inquirer.prompt(menuOpts)
    return option
}

const inquirerPause = async () => {
    const press_key = [
        {
            type: 'input',
            name: 'Press',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]
    console.log("\n")
    const pause = await inquirer.prompt(press_key);

}

const listadoLugares = async (lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: lugar.id,
            name: idx + lugar.nombre
        }
    })
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const deleteQuestion = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione el lugar: ',
        choices
    }]

    const { id } = await inquirer.prompt(deleteQuestion)
    return id
}


const listadoSeleccionado = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: idx + tarea.desc,
            checked: (tarea.completadoEn == null) ? false : true
        }
    })
    const deleteQuestion = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciona las tareas a completar',
        choices
    }]

    const { ids } = await inquirer.prompt(deleteQuestion)
    return ids
}
const leerInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc

}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}
export { inquirerMenu, inquirerPause, leerInput, listadoLugares, confirmar, listadoSeleccionado }