import { Suspense, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../../Loading"
import './SubirImagen.css'


const api = 'http://localhost:3000/imagenes'

function SubirImagenes() {
const [imagen, setImagen] = useState('')
const [title, setTitle] = useState('')
const [loading, setLoading] = useState(false)
const [ver, setVer] = useState(false)
const [id, setId] = useState(null)


  const imagenURL= imagen && URL.createObjectURL(imagen)

  const handleSubmit = async e => {
    setLoading(true)
  e.preventDefault()

  if (imagen && title) {
    const fd = new FormData()

    fd.append('image', imagen)
    fd.append('imageSave', JSON.stringify({titulo: title}))
    const res = await fetch(api, {
      method: 'POST',
      body: fd
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      setId(data)
      setLoading(false)
      setVer(true)
      window.location.reload(true)
    } else {
      console.log(res)
      setLoading(false)
    }
  }
}

    return(
        loading ?
        <Loading />
        :
        ver ?
        <div className="SubirImagenes-div">
          <h1> Imagen subida correctamente </h1>
        </div>
        :
        <div className="SubirImagenes-div">
            <div className="SubirImagenes-div2">
                <button onClick={handleSubmit} className="SubirImagenes-button">Subir</button>
                <label>
                    Titulo:
                    <br/>
                    <input  className="SubirImagenes-input" required  name="SubirImagenes-titulo" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                {!imagenURL ?
                    <div className='SubirImagenes-div3'>
                      <div className="SubirImagenes-button">📷</div>
                      <input type="file" onChange={e => setImagen(e.target.files[0])} accept="image/x-png,image/gif,image/jpeg" />
                    </div>
                    :
                    <div className='SubirImagenes-div3'>
                        <img className='SubirImagenes-imagen' src={imagenURL} alt='imagen'/>
                        <input type="file" onChange={e => setImagen(e.target.files[0])} accept="image/x-png,image/gif,image/jpeg" />
                    </div>}
                </label>
            </div>
        </div>
    )
}

const SubirImagenesWrapper = () =>
  <Suspense fallback={<Loading className="SubirImagenes-div"/>}>
    <SubirImagenes />
  </Suspense>

export default SubirImagenesWrapper