import Cookies from "universal-cookie";



const cookies = new Cookies();




class Sesion {
    VerifySesion() {
        var status = cookies.get("id") || ""
        if (status !== ""){
            return true;
        }
        return false
    }

    Logout = () => {
        cookies.remove("id");
        cookies.remove("username");
        window.location.href = "./"
    }

  }
  
  export default new Sesion();