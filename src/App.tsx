import React, {useEffect,useState} from "react";
import Auth from "./components/Authentication/Auth";
import Content from "./components/Cont/Content";

 /* <BasicTabs />
 <ToDos />
 */
function App() {

const URL:string = "http://localhost:80";

// burayı değiştir api gelince
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [token,setToken] = useState("");



const handleSignedIn=(s:boolean)=>{
  if(s){
checkLogin();

  }
}
 
  function getCookie(cname:string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }



  const checkLogin=()=>{

    const TOKEN = getCookie("token");
    console.log(TOKEN);
    setToken(TOKEN);
  if(TOKEN.trim().length>0){
  setIsLoggedIn(true);
  }
  
   }


 useEffect(checkLogin,[])
   

  
 



  return (
  <React.Fragment>
{isLoggedIn ? <Content url={URL} token={token}/> :<Auth url={URL} signedIn={handleSignedIn}/>}
  </React.Fragment>

 )
}

export default App;
