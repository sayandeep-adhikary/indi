import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import './styles/app.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/search/movies" element={<Search/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
