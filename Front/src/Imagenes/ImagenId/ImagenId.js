import useFetch from "fetch-suspense"
import { Suspense, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../../Loading"
import Modal from "../../Modal"
import EliminarImagnes from "../EliminarImagenes/EliminarImagenes"
import './ImagenId.css'




function ImagenId() {
    const {id} = useParams()
    const [imagen] =  useFetch('http://localhost:3000/imagenes/' + id)
    const [show, setShow ] = useState(false)

    return(
        <div className="imagenId-div">
          <div className="imagenId-CP">
            <div className="imagenId-container">
              <img className="imagenId-imagen" src={`http://localhost:3000${imagen.Imagen.replace('./', '/')}`} alt={imagen.titulo} />
              <h1 className="imagenId-titulo">{imagen.titulo}</h1>
            </div>
            <div className="imagenId-buttons">
              <button className="imagenId-button" title="Editar"><Link to={'/imagen/editar/' + id} >Editar</Link></button>
              <button className="imagenId-button" title="Eliminar" onClick={() => setShow(true)}>Eliminar</button>
            </div>
          </div>
            <Modal show={show} setShow={setShow}>
              <EliminarImagnes />
            </Modal>
        </div>
    )
}

const ImagenIdWrapper = () =>
  <Suspense fallback={<Loading />}>
    <ImagenId />
  </Suspense>

export default ImagenIdWrapper