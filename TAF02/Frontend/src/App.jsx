import { BrowserRouter , Route, Routes, Link ,Outlet } from "react-router-dom";
import ListeStagiaires from "./ListeStagiaires";
import SearchByName from "./SearchByName";
import ByGmail from "./ByGmail";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <BrowserRouter>
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={"/"} className="navbar-brand">Les Stagiaires</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/name"} className="nav-link">Cherch by name</Link>
            </li>
            <li className="nav-item">
              <Link to={"/gmail"} className="nav-link">Stagiaires by Gmail</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

        <div className="mt-3">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<ListeStagiaires />} />
              <Route path="name" element={<SearchByName />} />
              <Route path="gmail" element={<ByGmail />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;