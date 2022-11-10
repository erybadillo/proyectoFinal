import {useState} from "react";
import Mensaje from "./Mensaje";

const Nuevopresupuesto = ({
    presupuesto, 
    setPresupuesto,
    setpreValido
}) => {
    
    const[mensaje, setMensaje]=useState('')

    const adminPresupuesto = (e)=> {
        e.preventDefault();
        
        if(!presupuesto || presupuesto<0){
            setMensaje('No es un presupuesto valido')

            return
        } 
        setMensaje('')
        setpreValido(true)
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit={adminPresupuesto} className="formulario">
                <div>
                    <label className="campo1">Definir Presupuesto</label>


                    <input
                        className="campo"
                        type="number"
                        placeholder="Añade tu Presupuesto"
                        value={presupuesto}
                        onChange={e=>setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input
                    type="submit"
                    value="Agregar"
                    className="boton"
                />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            </form>

        </div>
    )
}

export default Nuevopresupuesto