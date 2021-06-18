import React, { useEffect, useState } from "react";
import app from './base';
import Spinner from 'react-bootstrap/Spinner'
const firestore = app.firestore( )

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [superUser, setSuperUser] = useState(null);
  
  const [pending, setPending] = useState(true);
  

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      
      if (user!==null) {
        firestore.collection('users').doc(user.uid).get().then(res=>{
        const data = res.data()
        setSuperUser(data)
        setCurrentUser(user)
        setPending(false)
        
        })
      }
      // console.log(user);
      if (user===null) {
        setPending(false)
      }
      
      
    });
  }, []);
  
  if(pending){
    return <>
    <Spinner style={{display:'flex',alignItems:'center'}} size='100%' animation="grow" variant="light" />
    
    </>
  }

  return (
    <AuthContext.Provider value={{currentUser,superUser}}>
      {!pending&&children}
    </AuthContext.Provider>
  );
}






























// import React, { useContext, useEffect, useState } from "react";
// import app from './base';
// import Spinner from 'react-bootstrap/Spinner'

// export const AuthContext = React.createContext();

// export function useAuth(){
//     return useContext(AuthContext)
// }

// export function isSuperAdmin(){

// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [superUser, setSuperUser] = useState(null);
//   const firestore = app.firestore( )
//   const [loading, setLoading] = useState(true)

  

//   console.log(currentUser);
//   console.log(superUser);

//   useEffect(() => {
//     app.auth().onAuthStateChanged(user => {
//       setCurrentUser(user)
//       // // setLoading(false)
     
//         // firestore.collection('users').doc(user.uid).get().then(res=>{
//         // const data = res.data()
//         // // if (data.roles==='super') {
//         // //   setSuperUser(data)
          
//         // // }
//         // setCurrentUser(user)
//         // setSuperUser(data)
//         // setLoading(false)
        
        
//         // })
     
//     })
    
    
//   }, [])
 

  
  
//   return (
//     <AuthContext.Provider value={{currentUser,superUser}}>
//       {children}
//     </AuthContext.Provider>
//   );
// }