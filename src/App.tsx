import CreateUser from "./components/user/createUser/CreateUser";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import UserList from "./components/user/displayUser/UserList";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={`/createuser/${0}`} className="nav-link " aria-current="page" >Registration</Link>
              </li>
              <li className="nav-item">
                <Link to="/userlist" className="nav-link active" >View user List</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/">
          <Route index element={<UserList />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/createuser/:id" element={<CreateUser />} />
        </Route>
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;

