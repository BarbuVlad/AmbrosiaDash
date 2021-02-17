import React from 'react';

import Login from "./Components/Login";
import NavBar from "./Components/NavBar";




  let App = () => {
    const logged = localStorage.getItem('logged')
    if(logged === "login successfull"){
      console.log(logged)
      return (
          <NavBar/>
      )}
      else
  return (
   <Login/>
//<NavBar/>

  );
};



export default App;
