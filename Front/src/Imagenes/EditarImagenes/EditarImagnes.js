import useFetch from "fetch-suspense"
import { Suspense, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../Loading"
import  "./EditarImagenes.css"




function EditarImagnes() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [Imagen, setImagen] = useState('')
    const [loading, setLoading] = useState(false)
    const [verifica, setVerifica] = useState(false)

    const [imagen] =  useFetch('http://localhost:3000/imagenes/' + id)

    const api = 'http://localhost:3000/imagenes/' + id

    const ImagenURL= Imagen && URL.createObjectURL(Imagen)

    const handleSubmit = async e => {
        setLoading(true)
      e.preventDefault()
      const fd = new FormData()

        fd.append('Imagen', Imagen)
        fd.append('titulo', JSON.stringify(title))
        const res = await fetch(api, {
          method: 'PATCH',
          body: fd
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data)
          setLoading(false)
          setVerifica(true)
        } else {
          console.log(res)
          setLoading(false)
        }
        setTitle('')
    }

    return(
        <div className="EditarImagenes-DP">
            <fieldset className="EditarImagenes-fieldset">
                    <legend>Editar</legend>
                    <form onSubmit={handleSubmit} className='EditarImagenes-form'>
                        <label>
                        Título:
                        <br/>
                        <input className="EditarImagenes-input"  required type="text" name="email" value={title} onChange={e => setTitle(e.target.value)} placeholder={imagen.titulo}/>
                        </label>
                        <label>
                          {!ImagenURL ?
                          <div>
                            <img className="EditarImagenes-imagen" src={`http://localhost:3000${imagen.Imagen.replace('./', '/')}`} alt={imagen.titulo} />
                            <input type="file" onChange={e => setImagen(e.target.files[0])} accept="image/x-png,image/gif,image/jpeg" />
                          </div>
                          :
                          <div className='EditarImagenes-ImagenDiv'>
                            <img className="EditarImagenes-imagen" src={ImagenURL} alt='Imagen'/>
                            <input type="file" onChange={e => setImagen(e.target.files[0])} accept="image/x-png,image/gif,image/jpeg" />
                          </div>}
                        </label>
                        <div className='EditarImagenes-cambios'>
                            <button>Hacer Cambios</button>
                        </div>
                    </form>
                </fieldset>
        </div>
    )
}

const EditarImagnesWrapper = () =>
  <Suspense fallback={<Loading />}>
    <EditarImagnes />
  </Suspense>

export default EditarImagnesWrapper