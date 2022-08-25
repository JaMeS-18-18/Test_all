import bgimage from '../images/Vector.png';
import logo from '../images/logo.png';
import bell from '../images/bell.png';
import '../App.css';
import React, { useState,useEffect,useReducer } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AsyncSelect from "react-select/async";
import Select from "react-select";

import { useStateContext } from '../hook/store' 

const SectionPage = () => {



    const [firstOptions,setFirstOptions]= useState([])
    const [secondOption,setSecondOption]= useState([])

    const {setSelectId} = useStateContext()


    useEffect(()=>{
        getSectionOne()
        getSectionTwo()
    },[])

    const getSectionOne = async ()=>{
        const response = await fetch(`http://192.168.89.48:8000/api/departments/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'}
            }).then(res=> res.json())
            .then((result)=>setFirstOptions(result))
    }


    const getSectionTwo = async ()=>{
        const response = await fetch(`http://192.168.89.48:8000/api/sections/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'}
            }).then(res=> res.json())
            .then((result)=>setSecondOption(result))
        }


    const getSecondSection = async (val)=>{
        const response = await fetch(`http://192.168.89.48:8000/api/sections/filter/${val}/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'}
            }).then(res=> res.json())
            // .then((result)=>setSecondOption(result))
            .then(res => {
                setSecondOption(res)
            })
    }

    const handleFirstSectionChange = (val)=>{
        let value = val.target.value
        getSecondSection(value)
    }

    const handleChangeSecondDepartement = (val)=>{
        let value =val.target.value
        setSelectId(value)
    }

    const [credentials,setCredentials] = useState({section_id: '',});
    const [date,setDate] = useState('');
    const [department,setDepartment] = useState('');
    let navigate = useNavigate();

   
    const condidate = async ()=>{
        console.log(credentials)
        
        navigate('/test', { state: { id: 7, color: 'green' } })
    }



    const inputChanged = event => {
        // const cred = credentials;
        // cred[event.target.name] = event.target.value;
        setCredentials(event.target.value);
    }


return (

    <div className='container'>

        <div className="card">
        
            <div className='logo'>
              <img src={logo} />
            </div>
            
            <div className='card-item'>

            <h3 className='condidate_title'>Bo'limni tanlang</h3>
            
            <label className='item'>
            <select onChange={handleFirstSectionChange}>
              {firstOptions.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
            </label>

            <label className='item' >

            <select onChange={handleChangeSecondDepartement} onClick={inputChanged}>
                {secondOption.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
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

export default SectionPage
