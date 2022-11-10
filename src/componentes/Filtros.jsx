import {useState,useEffect} from 'react'


const Filtros = ({filtro,setFiltro}) => {
  return (
    <div className='filtros sombra contenedor-filtro'>
        <form>
            <div className='campo'>
                <label>Filtrar Gastos</label>
                <select    
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="servicios">Servicios</option>
                    <option value="diversion">Diversión</option>
                    <option value="otros gastos">Otros Gastos</option>  
                </select>
            </div>

        </form>

    </div>
  )
}

export default Filtros