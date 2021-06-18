import React, { useContext,useState,useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import app from './base';
import { AuthContext } from "./Auth";


const SuperPrivateRouter = ({ component: Component, ...rest }) => {

const {currentUser} = useContext(AuthContext);
const {superUser} = useContext(AuthContext)
 
// const firestore = app.firestore( )
// const [superUser, setSuperUser] = useState(null);
  



//   useEffect(() => {
//     if (currentUser!==null) {
//         firestore.collection('users').doc(currentUser.uid).get().then(res=>{
//         const data = res.data()
//         setSuperUser(data)
//         // setPending(false)
//         })
//       }
//   }, []);

  
//   console.log(superUser);


  let isSuper
  if (superUser!==null) {
    if (superUser.roles=='super') {
        isSuper=true
      } else {
        isSuper=false
      } 
  }
  // console.log(isSuper);
  
  
  return (
    <Route
      {...rest}
      render={routeProps =>
        isSuper ? 
          <Component {...routeProps} />
         : 
         null
        
      }
    ></Route>
  );
};


export default SuperPrivateRouter