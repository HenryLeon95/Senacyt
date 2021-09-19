import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import '../css/Person.css'


const cookies = new Cookies();



class Person extends Component {
    state = {
        form: {
            username: '',
            password: ''
        },
        status: false,
        date: '',
    }

    date = '';

    componentDidMount() {
        document.title = "MI PERFIL | SENACYT";
        if (!cookies.get("id")) {
            window.location.href = "./";
        }
    }

    render() {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        this.date = (cookies.get("birthday"));
        var date2 = new Date(this.date);
        var val2 = date2.toLocaleDateString("es-Es", options);
        return (
            <div>
                <Navbar />
                <div className="wrapper fadeInDown">
                    <div className="fadeIn first">
                        <h1 className="centrado"><b>MIS DATOS</b></h1>
                        <div className="text-center">
                            <div className="text-center">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <td>{cookies.get("username")}</td>
                                        </tr>
                                        <tr>
                                            <th>Nombre Completo</th>
                                            <td>{cookies.get("name")} {cookies.get("last_name")}</td>
                                        </tr>
                                        <tr>
                                            <th>Teléfono</th>
                                            <td>{cookies.get("phone")}</td>
                                        </tr>
                                        <tr>
                                            <th>Dirección</th>
                                            <td>{cookies.get("address")}</td>
                                        </tr>
                                        <tr>
                                            <th>Fecha de Nacimiento</th>
                                            <td>{val2}</td>
                                        </tr>
                                        <tr>
                                            <th>Otros datos</th>
                                            <td>{cookies.get("other")}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <NavLink
                                                    to={"/profile/" + cookies.get.id}
                                                    className="btn btn-info"
                                                >
                                                    Modificar mis datos
                                                </NavLink>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Person;