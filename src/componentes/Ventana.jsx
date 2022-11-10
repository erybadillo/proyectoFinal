import { useState,useEffect } from 'react'
import Mensaje from './Mensaje'
import Cerrarventana from '../img/cerrar.svg'


const Ventana = ({setVentana,animarVentana,setanimarVentana,saveGasto,editarGasto,seteditarGasto}) => {

    const[mensaje,setMensaje]=useState('')
    const[nombre,setNombre]=useState('')
    const[cantidad,setCantidad]=useState('')
    const[categoria,setCategoria]=useState('')
    const[id,setId]=useState('')
    const[fecha,setFecha]=useState('')

    useEffect(()=>{
        if(Object.keys(editarGasto).length>0){
                setNombre(editarGasto.nombre)
                setCantidad(editarGasto.cantidad)
                setCategoria(editarGasto.categoria)
                setId(editarGasto.id)
                setFecha(editarGasto.fecha)

        }
    },[]);

    const ocultarVentana=()=>{
         setanimarVentana(false)
         seteditarGasto({})

        setTimeout (()=>{
           setVentana(false)
        },500)

    }

    const handleSubmit=e=>{
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
               setMensaje('') 
            }, 3000);
            return;
        }

        saveGasto({nombre,cantidad,categoria,id,fecha})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
        <img
        src={Cerrarventana}
        alt="Cerrar Ventana"
        onClick={ocultarVentana}
        />
        </div>

        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarVentana ? "animar":'cerrar'}`}
        
        >
            <legend>{editarGasto.nombre ? 'Editar Gasto': 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="forGto">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                className="campo"
                id="nombre"
                type="text" 
                placeholder='Anade el Nombre del Gasto'
                value={nombre}
                onChange={e => setNombre (e.target.value)}
                />
            </div>

            <div className="forGto">
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                className="campo"
                id="cantidad"
                type="number" 
                placeholder="Anade la cantidad gastada: Ej. 300"
                value={cantidad}
                onChange={e=>setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="forGto">
                <label htmlFor="categoria">Categoría</label>

                <select 
                    className="campo"
                    id="categoria"
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                >
                    <option value="">--- Seleccione ---</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="servicios">Servicios</option>
                    <option value="diversion">Diversión</option>
                    <option value="otros gastos">Otros Gastos</option>
                </select>
            </div>

            <input
            className="Anadirgto"
            type="submit" 
            value={editarGasto.nombre ? 'Guardar Cambios': 'Añadir Gasto'}
            />
        </form>
    </div>
  )
}

export default Ventana