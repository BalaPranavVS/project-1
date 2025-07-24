import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signin(){
    let [password,setPassword]=useState("")
    let [confirmPassword,setConfirmPassword]=useState("")
    let [username,setUserName]=useState("")
    let [register,setregister] =useState(false)
    let [passwordText,setPasswordText] =useState("Enter Password:")

    const navigate=useNavigate();
    async function onLogin(event){
        event.preventDefault()
        if(username===""||password===""){
                alert("Either Username or Password is not filled")
                return
            }
        let res=await axios.post("http://localhost:5000/login",{username,password},{withCredentials:true})
        if (res.data.user){
                navigate('/')
            }
        
        else{
            alert("worng user name or password")
            setPassword("")
            setUserName("")
        }
    }

    async function onRegister(event){
        event.preventDefault();
        if (!register){
            setPasswordText("Enter New Password:")
            setregister(true);
        }
        else{
            let res=await axios.post("http://localhost:5000/check",{username});
            if(username===""||password===""){
                alert("Enter the credentials")
                return
            }
            if (res.data.user){
                alert("Username already taken try different name");
                return;
            }else{
                if(password.length<6){
                    alert("Password must have more then 6 characters")
                    return
                }
                if (password===confirmPassword){
                    res=await axios.post("http://localhost:5000/register",{username,password});
                    setregister(false);
                    setPasswordText("Enter Password:");
                    setPassword("");
                    setConfirmPassword("");
                    setUserName("");
                    console.log("Registration Complete")
                }else{
                    alert("Password is missmatched");
                }
            }
        }

    }

    function onBack(event){
        event.preventDefault();
        setregister(false);
        setPasswordText("Enter Password:")
        setPassword("")
        setUserName("")
        setConfirmPassword("");

    }

    return(
        <div className="loginpanel">
            <form >
                <label htmlFor="username">Enter Username: </label>
                <input type="text" onChange={(e) => setUserName(e.target.value)}className="username" value={username} placeholder="Enter your username" name="username"/>
                <br />
                <label htmlFor="password">{passwordText} </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="password" value={password} placeholder="Enter your password" name="password"/>
                {(register)?(<><br />
                <label htmlFor="password">Confirm Password: </label>
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="password" placeholder="Enter your password" name="password"/></>):null}
                <br />
                {(register)? null:
                <input type="submit" onClick={onLogin}name="submit" className="submitButton" value={"Login"}/>}
                <input type="submit" onClick={onRegister} name="register" className="submitButton" value={"Register"} />
                {(register)? 
                <input type="submit" onClick={onBack}name="submit" className="submitButton" value={"Back to Login"}/>:null}
            </form>
        </div>
        
    )
}
export default Signin ;