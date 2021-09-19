import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import '../css/Person.css'
import $, { data } from 'jquery';
import { NavLink } from "react-router-dom";


var baseUrl = "http://localhost:4000";
const cookies = new Cookies();



class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,    //Report 1
            dataObtained: [],
            status: false,
        };
    }

    componentDidMount() {
        document.title = "REPORTES | SENACYT";
        this.getReports(this.state.flag);
        //alert(this.state.dataObtained);
    }

    //Get al Backend por JQuery
    getReports = (flag) => {
        console.log("Consultando...");
        var status = false;
        var dataObtained = [];

        if (flag) {
            baseUrl = baseUrl + '/report1';
        }
        else {
            baseUrl = baseUrl + '/report2';
        }

        console.log(baseUrl);

        //llamada a la api mediante Ajax JQuery
        $.ajax({
            url: baseUrl,
            dataType: "json",
            cache: false,
            method: `GET`,
            success: function (data) {
                //si la llamada es correcta entra aqui
                dataObtained = data;
                status = true;
            }.bind(this),
        }).then(() => {
            //lo que queremos que realice despues de realizar la llamada
            if (status) {
                console.log("THEN");
                this.setState({
                    status: true,
                    dataObtained: dataObtained,
                });
                console.log(dataObtained);
            }
        });
    };

    change = () => {
        window.location.href = "./report2"
    }

    render() {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div>
                <Navbar />
                <div className="wrapper fadeInDown">
                    <div className="fadeIn first">
                        <div className="text-center">
                            <div className="text-center">
                                <div className="container">
                                    <button className="btn btn-success" onClick={() => this.change()}>
                                        Cambiar de Reporte
                                    </button><br /><br /><br />
                                </div>
                                {this.state.flag && (
                                    <><h1 className="centrado"><b>REPORTE 1</b></h1>
                                        <h5 className="centrado">Personas registradas con su último título académico</h5>

                                        <div className="text-center">
                                            <h1>.</h1>
                                            {this.state.dataObtained.length > 0 && (
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Username</th>
                                                            <th>Nombre completo</th>
                                                            <th>Teléfono</th>
                                                            <th>Dirección</th>
                                                            <th>Fecha de Nacimiento</th>
                                                            <th>Otros datos personales</th>
                                                            <th>Tipo del Logro Académico</th>
                                                            <th>Año de titulación</th>
                                                            <th>Nombre del título</th>
                                                            <th>Nombre de la institución</th>
                                                            <th>Otros datos del logro</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.dataObtained.map((data, index) => {

                                                            var date2 = data.birthday;
                                                            date2 = new Date(date2);
                                                            var val2 = date2.toLocaleDateString("es-Es", options);

                                                            var date3 = data.degree_date;
                                                            date3 = new Date(date3);
                                                            var val3 = date3.toLocaleDateString("es-Es", options);
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{data.username}</td>
                                                                    <td>{data.name} {data.last_name}</td>
                                                                    <td>{data.phone}</td>
                                                                    <td>{data.address}</td>
                                                                    <td>{val2}</td>
                                                                    <td>{data.other}</td>
                                                                    <td>{data.name_academic_achievements}</td>
                                                                    <td>{val3}</td>
                                                                    <td>{data.title}</td>
                                                                    <td>{data.institution}</td>
                                                                    <td>{data.other_academic}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            )}
                                            {this.state.dataObtained.length == 0 && (
                                                <h3 style={{ color: "red" }}>No hay Datos</h3>
                                            )}
                                            {this.state.status == false && (
                                                <h3 style={{ color: "red" }}>
                                                    Se ha producido un error en el servicio ajax GET
                                                </h3>
                                            )}
                                        </div>

                                    </>
                                )}
                                {!this.state.flag && (
                                    <p> 2 </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Report;