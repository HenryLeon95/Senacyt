import React, { Component } from "react";
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
import $, { data } from 'jquery';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:4000";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            username: '',
            password: ''
        },
        status: false,
        personG: {}
    }

    // personG = {
    //     id: 0,
    //     username: '',
    //     password: '',
    //     name: '',
    //     last_name: '',
    //     phone: '',
    //     address: '',
    //     birthday: '',
    //     other: ''
    // }

    // Guarda en el estado el valor del input
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    // iniciarSesion = () => {
    //     await axios.post(baseUrl, )
    // }


    //Consuiendo LOGIN con JQUERY
    loginPerson = (e) => {
        e.preventDefault();
        var person = {};
        var status = false;
        person.username = this.state.form.username;
        person.password = this.state.form.password;

        var personJson = JSON.stringify(person);
        var personLogin = {};

        $.ajax({
            url: baseUrl + '/login',
            type: "POST",
            data: personJson,
            contentType: "application/json",
            success: function (data) {
                //person = data[0]
                personLogin = data[0]
                status = true
            }.bind(this),
            error: function (){
                alert("¡Falló al autentificar, verifique sus credenciales!");
                //console.log("Error en Ajax api LOGIN")
            },
        }).then(() => {
            if (status){
                cookies.set("id", personLogin.id, {path: "/"});
                cookies.set("username", personLogin.username, {path: "/"});
                this.setState({
                    status: true,
                    personG: personLogin
                });
                alert(`Bienvenido ${personLogin.name} ${personLogin.last_name}`);
                window.location.href="./dashboard";
            }
        });
    };

    render() {
        return (
            // <div className="containerPrincipal">
            //     <div className="containerSecundario">
            //         <div className="form-group">
            //             <label>Usuario: </label><br />
            //             <input type="text" className="form-control" /> <br />
            //             <label>Contraseña: </label><br />
            //             <input type="password" className="form-control" /> <br />
            //             <button className="btn-btn-primary">Iniciar Sesión</button>
            //         </div>
            //     </div>
            // </div>
            <html>
            <body>
            <><script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="https://eduinpro.com/blog/wp-content/uploads/2019/07/1007192.jpg" id="icon" alt="User Icon" />
                    </div>
                    <form onSubmit={this.loginPerson}>
                        {/* <div className="form-group"> */}
                        <input type="text" id="login" className="fadeIn second" name="username" placeholder="login" 
                        onChange={this.handleChange} />
                        <input type="password" id="password" className="fadeIn third" name="password" placeholder="password"
                        onChange={this.handleChange} />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                        {/* </div> */}
                    </form>
                    <div id="formFooter">
                    </div>
                </div>
            </div></>
            </body>
            </html>
        );
    }
}

export default Login;