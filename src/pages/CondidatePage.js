import bgimage from '../images/Vector.png';
import logo from '../images/logo.png';
import bell from '../images/bell.png';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../hook/store';
import '../App.css';


const CondidatePage = () => {



  const [credentials,setCredentials] = useState({name: '', surname: '', father_name: ''})
  const [show,setShow] = useState(false)
  const [date,setDate] = useState('')
  const [condidateinfo,setCondidateinfo] = useState(1)
 
  const {userId,setUserId} = useStateContext()
  let navigate = useNavigate();



  const condidate = async ()=>{
    const response = await fetch('http://192.168.89.48:8000/api/students/create/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'},
        body: JSON.stringify(credentials)

      })


      .then(res=> res.json())
      .then( data =>{
        
        if (data.id === 1){
            setShow(true)
            setDate(data.date)
            console.log(data.date)
        } else if (data.id === 3) {
            setCondidateinfo(34);
            let id = data.con_id
            console.log("Condadate was added")
            console.log(condidateinfo)
            setUserId(id)
            navigate('/section');
        } else {
            console.log("Error validating the form")
        }
        
        
      })
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
                ? <div className='error-popup' style={{width: "310px"}}>
                    <div className='error-text'>
                      <h1>Nomzodga cheklov mavjud.</h1>
                      <p>Keyingi test boshlash vaqti {date} kundan so’ng.</p>
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

            <h3 className='condidate_title'>Nomzod</h3>

            <label className='item'>
              <input type="text" name="surname" style={{ backgroundColor: "white" }}
              value={credentials.surname}
              onChange={inputChanged} placeholder="Familiya" />
            </label>

            
            <label className='item'>
              <input type="text" name="name"
              value={credentials.name}
              onChange={inputChanged} placeholder="Isim" />
            </label>

            <label className='item'>
              <input type="text" name="father_name"
              value={credentials.father_name}
              onChange={inputChanged} placeholder="Otasining ismi" />
            </label>

            <div className='sign-btn btn' type='button'>
                <span id='login-title2' onClick={()=>condidate(navigate)}>Keyingisi</span>
            </div >

            </div>
        </div>  

    <img className="bg-image" src={bgimage} />

    </div>
)
}

export default CondidatePage

