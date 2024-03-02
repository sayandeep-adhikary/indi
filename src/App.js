import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import "./styles/app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ExploreMovies from "./pages/ExploreMovies";
import Login from "./pages/Login";
import MaybeShowNavbar from "./components/MaybeShowNavbar";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {
  // const {location} = useLocation();
  return (
    <Router>
      <MaybeShowNavbar>
        <Navbar />
      </MaybeShowNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/movies" element={<Search />} />
        <Route path="/explore" element={<ExploreMovies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <MaybeShowNavbar>
        <Footer />
      </MaybeShowNavbar>
    </Router>
  );
}

export default App;
