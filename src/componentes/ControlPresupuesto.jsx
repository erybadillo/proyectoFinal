import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ presupuesto, gastos,setGastos,setPresupuesto,setpreValido }) => {

    const [porcentaje,setPorcentaje]=useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado]=useState(0)


    useEffect(() => {
        const totalGastado = gastos.reduce ((total,gasto)=> gasto.cantidad + total,0)
    
        const totalDisponible=presupuesto - totalGastado

        const nvoPorcentaje=(((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
        setDisponible(totalDisponible)

        setGastado(totalGastado)

        setTimeout(()=>{
            setPorcentaje(nvoPorcentaje)
        },1500)
        
    }, [gastos])

    const cambioMonto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp=()=>{
        const resultado=confirm('¿Deseas reiniciar tu planeador de gastos?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setpreValido(false)
        }
        }
    

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar    
                    styles={buildStyles({
                        pathColor: porcentaje>100?'#7a0420': '#4a227f',
                        textSize: '9px',
                        textColor:porcentaje>100?'#7a0420': '#4a227f',
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className="contenido-presupuesto">
                <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}
                >
                    Reiniciar App
                </button>
                <p>
                    <span>Presupuesto:</span> {cambioMonto(presupuesto)}
                </p>

                <p className={`${disponible <0 ? 'negativo':''}`}>
                    <span>Disponible:</span> {cambioMonto(disponible)}
                </p>

                <p>
                    <span>Gastado:</span> {cambioMonto(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto