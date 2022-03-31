import  useFetch  from "fetch-suspense"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import Loading from "./../../Loading"
import "./ListaImagenes.css"

function ListaImagenes() {
   const imagenes =  useFetch('http://localhost:3000/imagenes')
   console.log(imagenes)

    return(
        <div className="listaImagenes-container">
          {
          !imagenes.length ? <h1>No tienes imágenes, <Link to='/imagen/nueva'>AGREGA UNA.</Link></h1>
          :
          imagenes?.map(imagen =>
              <div key={imagen.id} className="listaImagenes-divMap">
                  <img className="listaImagenes-imagen" src={`http://localhost:3000${imagen.Imagen.replace('./', '/')}`} alt={imagen.titulo} />
                  <h2 className="listaImagenes-titulo">{imagen.titulo}</h2>
                  <button><Link to={'/imagen/'+imagen.id}>Ver imagen</Link></button>
              </div>
          )}
        </div>
    )
}

const ListaImagenesWrapper = () =>
  <Suspense fallback={<Loading className="listaImagenes-DP"/>}>
    <ListaImagenes />
  </Suspense>


export default ListaImagenesWrapper