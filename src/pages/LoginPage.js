import bgimage from '../images/Vector.png';
import logo from '../images/logo.png';
import bell from '../images/bell.png';
import '../App.css';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {


  const [credentials,setCredentials] = useState({username: '', password: ''})
  const [show,setShow] = useState(false)
  let navigate = useNavigate();


  const login = async ()=>{
      const response = await fetch('http://192.168.89.48:8000/api/token/auth/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      })
      


      .then( data => data.json())
      .then( data =>{
        let token = data.token

        if (token) {
          console.log("Logged in")
          localStorage.setItem('token',token)
          navigate('/condidate')
        } else {
          setShow(true)
        }



        
      }          
      )


  }

  const inputChanged = event => {
    const cred = credentials;
    cred[event.target.name] = event.target.value;
    setCredentials({...cred});
  }


return (

    <div className='container'>

        <div>
            { show
                ? <div className='error-popup'>
                    <div className='error-text'>
                      <h1>Parol yoki login notog'ri</h1>
                      <p>Iltimos qayta urunib ko’ring</p>
                    </div>
                    <div className='bell'>
                      <img src={bell} />
                    </div>
                  </div>
                : null
            }
        </div> 

        <div className="card">
        
            <div className='logo'>
              <img src={logo} />
            </div>
            
            <div className='card-item'>

            <label className='item'>
              <p className='login-title'>Username:</p> 
              <input type="text" name="username" style={{ backgroundColor: "white" }}
              value={credentials.username}
              onChange={inputChanged}/>
            </label>

            
            <label className='item'>
              <p className='login-title'>Password:</p>
              <input type="password" name="password"
              value={credentials.password}
              onChange={inputChanged} />
            </label>

            <div className='sign-btn btn' type='button'>
                <span id='login-title2' onClick={()=>login(navigate)}>Sign in</span>
            </div >

            </div>
        </div>  

    <img className="bg-image" src={bgimage} />

    </div>
)
}

export default LoginPage




