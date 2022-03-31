
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { Link, Route, Routes } from "react-router-dom"
import Loading from './Loading';
import ListaImagenes from './Imagenes/ListaImagenes/ListaImagenes';
import ImagenId from './Imagenes/ImagenId/ImagenId';
import SubirImagenes from './Imagenes/SubirImagenes/SubirImagenes';
import EditarImagnes from './Imagenes/EditarImagenes/EditarImagnes';

function App() {
  return (
    <div className="App">
       <>
        <div className="TP">
            <h1>Mis imágenes favoritas</h1>
            <div>
              <button className='BP'> <Link to='/'>Mi lista de imágenes</Link>  </button>
              <button className='BS'> <Link to='/imagen/nueva'>Agregar nueva imagen</Link> </button>
            </div>
        </div>
        <ErrorBoundary fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<ListaImagenes />} />
                <Route path="/imagen/:id" element={<ImagenId />} />
                <Route path="/imagen/nueva" element={<SubirImagenes />} />
                <Route path="/imagen/editar/:id" element={<EditarImagnes />} />
            </Routes>
        </ErrorBoundary>
      </>
    </div>
  );
}

export default App;
