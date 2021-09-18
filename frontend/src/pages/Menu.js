import React, { Component } from "react";
import Cookies from "universal-cookie";



const cookies = new Cookies();



class Menu extends Component {
    Logout =()=>{
        cookies.remove("id");
        cookies.remove("username");
        window.location.href = "./"
    }

    render(){
        console.log(cookies.get('id'));
        console.log(`Username: ` + cookies.get('username'));
        return (
            <div>
                Menu Principal <br/>
                <button onClick={()=>this.Logout()}>
                    Logout
                </button>
            </div>
        );
    }
}


export default Menu;