import { useState, useEffect } from 'react'

import Encabezado from './componentes/Encabezado'
import IconoNvoGto from './img/agrega_gasto.svg'
import Ventana from './componentes/Ventana';
import { generarId } from './componentes';
import ListaGastos from './componentes/ListaGastos';
import Filtros from './componentes/Filtros';

function App() {


  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [preValido, setpreValido] = useState(false)

  const [ventana, setVentana] = useState(false)
  const [animarVentana, setanimarVentana] = useState(false)

  const [editarGasto, seteditarGasto] = useState({})

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')):[]
    )
  
  const[filtro,setFiltro]=useState('')

  const[gastosFiltrados,setgastosFiltrado]=useState([])

  useEffect(() => {
    if (Object.keys(editarGasto).length > 0) {
      setVentana(true)

      setTimeout(() => {
        setanimarVentana(true)
      }, 500);
    }
  }, [editarGasto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0)
    if(presupuestoLS>0){
      setpreValido(true)
    }
  }, [])

  useEffect(()=>{
    if(filtro){
      const gtosFiltrados=gastos.filter(gasto=>gasto.categoria=== filtro);
      setgastosFiltrado(gtosFiltrados)
    }
  },[filtro])


    

  const handleNuevoGasto = () => {
    setVentana(true)
    seteditarGasto({})

    setTimeout(() => {
      setanimarVentana(true)
    }, 500);
  }

  const saveGasto = gasto => {
    console.log(gasto)
    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      seteditarGasto({})
    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }


    setanimarVentana(false)
    setTimeout(() => {
      setVentana(false)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }



  return (
    <div className={ventana ? 'fijar' : ''}>
      <Encabezado
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        preValido={preValido}
        setpreValido={setpreValido}
      />

      {preValido && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListaGastos
              gastos={gastos}
              seteditarGasto={seteditarGasto}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />

          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNvoGto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {ventana && <Ventana
        setVentana={setVentana}
        animarVentana={animarVentana}
        setanimarVentana={setanimarVentana}
        saveGasto={saveGasto}
        editarGasto={editarGasto}
        seteditarGasto={seteditarGasto}
      />}

    </div>

  )
}

export default App
