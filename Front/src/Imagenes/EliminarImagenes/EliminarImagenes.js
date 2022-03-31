import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import Loading from "../../Loading"
import "./EliminarImagenes.css"


const api = 'http://localhost:3000/imagenes'

function EliminarImagnes() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [ver, setVer] = useState(false)

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    const res = await fetch(api, {
      method: 'DELETE',
      body: JSON.stringify({id: id}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      setLoading(false)
      setVer(true)
      alert('La imagen ha sido eliminada')
      navigate('/')
      window.location.reload(true)
    } else {
      console.log(res)
      setLoading(false)
    }
  }

    return(
        loading ?
        <Loading />
        :
        (ver ?
        <h1>Eliminado</h1>
        :
        <div className="EliminarImagenes-div">
            <h3>Seguro que quieres eliminar?</h3>
            <button onClick={handleSubmit}>Si</button>
            <button ><Link to='/'>Cancelar</Link></button>
        </div>)
    )
}

export default EliminarImagnes
