import React, { Component } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";
import SENACYT from "../SENACYT.png";
import '../css/Menu.css'


const cookies = new Cookies();



class Menu extends Component {
    componentDidMount() {
        document.title = "DASHBOARD | SENACYT";
        if (!cookies.get("id")) {
            window.location.href = "./";
        }
    }

    render() {
        console.log(cookies.get('id'));
        console.log(`Username: ` + cookies.get('username'));
        return (
            <div>
                <Navbar />
                {/* <p className="img-div-center">
                    <h1 className="h1"><b>SENACYT</b></h1>
                    <img className="img-centro-vert-hor" alt="SENACYT" src={SENACYT} title="SENACYT" />
                </p> */}
                <div className="wrapper fadeInDown">
                    <div className="fadeIn first">
                            <h1 className="centrado"><b>SENACYT</b></h1>
                            <img src={SENACYT} alt="SENACYT" title="SENACYT" />
                    </div>
                </div>
                
                {/* Menu Principal <br />
                <button onClick={() => this.Logout()}>
                    Logout
                </button> */}
            </div>
        );
    }
}


export default Menu;