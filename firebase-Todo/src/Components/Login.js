import React, {useState, useEffect} from 'react';
import {signInWithEmailAndPassword, onAuthStateChanged,createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase"
import {useNavigate} from 'react-router-dom';
import "./Login.css"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[isRegister, setRegister] = useState(false);
    const[registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });

    const navigate= useNavigate();

    const handleEmailChange=(e)=>{
          setEmail(e.target.value)
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }

    useEffect(()=>{
       auth.onAuthStateChanged((user)=>{
        if(user){
            navigate("/homePage")
          }
       });
       
    }, [])


    const handleSignIn = ()=>{
    signInWithEmailAndPassword(auth, email,password).then(()=>{
        navigate("/homePage")
    }).catch((err)=>alert(err.message))
         
    }

    const handleRegister = ()=>{
        if(registerInformation.email !== registerInformation.confirmEmail){
           alert("please confirm that email are same")
           return
        }else if(registerInformation.password !== registerInformation.confirmPassword){
           alert("please confirm that password are same")
           return
        }
 
            createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
            .then(()=>{
                navigate("/homePage")
            }).catch((err)=>alert(err.message))
        }


  return (
    <>
   

    <div className="welcome">
    <h1>Todo-List</h1>
        <div>
         
        <div className="login-register-container">
            {isRegister ?
           (
            <>
               <input type="email" placeholder="Email" value={registerInformation.email} 
                   onChange={(e)=> 
                    setRegisterInformation({...registerInformation, email:e.target.value})}/>


                <input type="email" placeholder="confirm Email" value={registerInformation.confirmEmail}
                          onChange={(e)=> 
                            setRegisterInformation({...registerInformation, confirmEmail:e.target.value})}  />
                
                <input type="password" placeholder="password" value={registerInformation.password}
                    onChange={(e)=> 
                        setRegisterInformation({...registerInformation, password:e.target.value})}/>


                 <input type="password" placeholder="confirm password" value={registerInformation.confirmPassword}
                    onChange={(e)=> 
                     setRegisterInformation({...registerInformation, confirmPassword:e.target.value})}/>

                <button onClick={handleRegister} className="sign-in-register-button">Register</button>
                <button onClick={()=>setRegister(false)}>Go Back</button>
              
            </>
           ) :(
            <>
                <input type="email" onChange={handleEmailChange} value={email}/>
                <input type="password" onChange={handlePasswordChange} value={password}/>
                <button onClick={handleSignIn} className="sign-in-register-button" >Sign In</button>
                <button onClick={()=>setRegister(true)} className="create-an-account-button">Create an Account</button>
            </>
           )
                 
         }
           
       </div>
     </div>
    </div>
    </>
  )
}


