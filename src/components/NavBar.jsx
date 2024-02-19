import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "../css/NavBar.css";

const NavBar = () => {
  const { isLoged, logout, nombre, condi } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="navbar-brand logo">
          <img id="imgb" src={require("../logo-economicas.png")} alt="FCE" />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className=" navbar-inverse navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <li className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ margin: "0 5px 0 5px" }}
              >
                Asistencia
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="nav-item">
                  <NavLink to="/asistencia" className="nav-link">
                    Ver Registros{" "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/asistencia/provivirtual" className="nav-link">
                    Registro Virtual
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ margin: "0 5px 0 5px" }}
              >
                Supervision
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li className="nav-item">
                  <NavLink to="/asistencia/asistenciaArea" className="nav-link">
                    Asistencia Area
                  </NavLink>
                </li>
                {/*  <li className="nav-item"><NavLink to="/" className="nav-link"> Control Asis.Virtual</NavLink></li> */}
              </ul>
            </li>

            <li className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ margin: "0 5px 0 5px" }}
              >
                Tramites RRHH
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li className="nav-item">
                  <NavLink
                    to="/asistencia/formInasistencia"
                    className="nav-link"
                  >
                    Justif.Inasistencias
                  </NavLink>
                </li>
                {condi === "2" ? (
                  <li className="nav-item">
                    <NavLink
                      to="/asistencia/formVacaciones"
                      className="nav-link"
                    >
                      Formul.Vacaciones
                    </NavLink>
                  </li>
                ) : null}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/asistencia/cambiarclave" className="nav-link">
                Cambiar PassWord
              </NavLink>
            </li>

            {!isLoged ? (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>{" "}
                </li>
                <li className="nav-item">
                  <NavLink to="/resetpass" className="nav-link btn btn-warning">
                    Reset PassWord
                  </NavLink>{" "}
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-info" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </div>
        </div>
        <div>{isLoged ? <div className="fw-bold">{nombre}</div> : null}</div>
      </div>
    </nav>
  );
};

export default NavBar;
