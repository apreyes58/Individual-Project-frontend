import './App.css';
import Navbar from "./components/navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Films from "./pages/films.js";
import Customers from "./pages/customers.js";

function App() {
    return (
        <div className='App'>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/customers" element={<Customers />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
