import React from 'react'
import Nuevopresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Encabezado = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    preValido,
    setpreValido 
}) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>

            {preValido ? (
                <ControlPresupuesto 
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setpreValido={setpreValido}
                />   
            ): (
                <Nuevopresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                preValido={preValido}
                setpreValido={setpreValido}
            />
            )}
            
        </header>
    )
}

export default Encabezado