import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import TablesSec from './pages/TablesSec';
import PageWorks from './pages/PageWorks';

function App() {
  
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/tables" element={<TablesSec/>} />
          <Route path="/pageworks" element={<PageWorks/>} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
