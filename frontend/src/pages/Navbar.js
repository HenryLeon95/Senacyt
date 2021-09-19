import React, { Component } from "react";
import Sesion from "../services/Sesion";



class Navbar extends Component {
    // componentDidMount() {
    //     const url = "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css";
    //     this.addStyle(url);
    // }

    // addStyle = url => {
    //     const style = document.createElement("link");
    //     style.href = url;
    //     style.rel = "stylesheet";
    //     style.async = true;

    //     document.head.appendChild(style);
    // }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarCenteredExample"
                        aria-controls="navbarCenteredExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>

                    <div
                        class="collapse navbar-collapse justify-content-center"
                        id="navbarCenteredExample">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            {Sesion.VerifySesion() && (
                                <><li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href={"./dashboard"}>SENACYT</a>
                                </li><li class="nav-item">
                                        <a class="nav-link" href={"./profile"}>Mi perfil</a>
                                    </li><li class="nav-item">
                                        <a class="nav-link" href="#">Mis Datos Académicos</a>
                                    </li><li class="nav-item">
                                        <a class="nav-link" href="#">Mis Áreas de Desempeño</a>
                                    </li><li class="nav-item">
                                        <a class="nav-link" href="./report">Reportes</a>
                                    </li><li class="nav-item">
                                        <a class="nav-link" href="#" onClick={() => Sesion.Logout()}>Cerrar Sesión</a>
                                    </li></>
                            )}

                            {Sesion.VerifySesion() === false && (
                                <li class="nav-item">
                                    <a class="nav-link" href="./">Iniciar Sesión</a>
                                </li>
                            )}
                            {/* <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a class="dropdown-item" href="#">Action</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#">Another action</a>
                                    </li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"
                                >Disabled</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


export default Navbar;