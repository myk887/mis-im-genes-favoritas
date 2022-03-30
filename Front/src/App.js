
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { Route, Routes } from "react-router-dom"
import Loading from './Loading';
import ListaImagenes from './Imagenes/ListaImagenes';

function App() {
  return (
    <div className="App">
       <>
          <ErrorBoundary fallback={<Loading/>}>
              <Routes>
                  <Route path="/" element={<ListaImagenes />} />
              </Routes>
          </ErrorBoundary>
      </>
    </div>
  );
}

export default App;
