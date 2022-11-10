import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from './index'

import IconoAhorro from '../img/Nuevos/Ahorro.svg'
import IconoComida from '../img/Nuevos/comida.svg'
import IconoDiversion from '../img/Nuevos/diversion.svg'
import IconoOtros from '../img/Nuevos/Otros gastos.svg'
import IconoServicios from '../img/Nuevos/servicios.svg'

const listadoIconos={
    ahorro: IconoAhorro,
    comida: IconoComida,
    servicios: IconoServicios,
    diversion: IconoDiversion,
    otros: IconoOtros,
}

const Gasto = ({gasto,seteditarGasto,eliminarGasto}) => {
    const{categoria, nombre, cantidad, id, fecha}=gasto

    const leadingActions=()=>(
        <LeadingActions>
            <SwipeAction onClick={() => seteditarGasto(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions=()=>(
        <TrailingActions>
            <SwipeAction onClick={()=> eliminarGasto(id)}
            destructive={true}
            >
                Eliminar
            </SwipeAction>

        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
   
    <div className='gasto sombra'>
        <div className='contenido-gasto'>
            <img className='tamano-imagen'
                src={listadoIconos[categoria]}
                alt="Icono Gasto"
            />


            <div className='descripcion-gasto'>
                <p className='categoria'>{categoria}</p>
                <p className='nombre-gasto'>{nombre}</p>
                <p className='fecha-gasto'>
                    Agregado el: {''}
                    <span>{formatearFecha(fecha)}</span>
                </p>
            </div>
        </div>
        <p className='cantidad-gasto'>${cantidad}</p>
    </div>
    </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto