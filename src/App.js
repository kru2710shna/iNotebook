import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './components/Home'
import About from './components/About';
import Navbar from './components/NavBar';
import NoteState from './Context/Notes/NoteState';


function App() {
  return (
    <>

        <Router>
          <Navbar />
          <Routes>
            {/* Corrected syntax for Route */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>

    </>
  );
}

export default App;

