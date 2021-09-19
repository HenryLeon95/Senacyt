import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import '../css/Person.css'
import $, { data } from 'jquery';


var baseUrl = "http://localhost:4000";



class Report2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataObtained: [],
            status: false,
        };
    }

    componentDidMount() {
        document.title = "REPORTES | SENACYT";
        this.getReports();
        //alert(this.state.dataObtained);
    }

    //Get al Backend por JQuery
    getReports = () => {
        var status = false;
        var dataObtained = [];
        baseUrl = baseUrl + '/report2';

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
                this.setState({
                    status: true,
                    dataObtained: dataObtained,
                });
            }
        });
    };

    change = () => {
        window.location.href = "./report"
    }

    render() {
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
                                <><h1 className="centrado"><b>REPORTE 2</b></h1>
                                    <h5 className="centrado">Áreas de desempeño registradas con el número de personas en ellas.</h5>

                                    <div className="text-center">
                                        <h1>.</h1>
                                        {this.state.dataObtained.length > 0 && (
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Nombre del área</th>
                                                        <th>Cantidad de personas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.dataObtained.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.name_area}</td>
                                                                <td>{data.amount_people}</td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Report2;