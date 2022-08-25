import React, { useState, useEffect } from "react";
import { useStateContext } from '../hook/store'
import logo from '../images/logo.png';
import white_flame from '../images/logo-w.png';
import { useLocation } from 'react-router-dom'
import '../App.css';
import BounceLoader from "react-spinners/BeatLoader";
import axios from "axios"




const TestPage = () => {


  const [credentials, setCredentials] = useState({ title: 'new test', section: 2 })

  const state = useLocation();
  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState(0)
  const { userId, selectId } = useStateContext();
  const [showNavText, setShowNavText] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [testid, setTestid] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [QuestionAnswer, setQuestionAnswer] = useState(99)

  // const createTest = async ()=>{
  //     const response = await fetch('http://192.168.89.48:8000/api/test-create/', {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json',
  //                 'Accept': 'application/json'},
  //         body: JSON.stringify(credentials)
  //       })

  //       .then(res=> res.json())
  //         .then( data =>{
  //             console.log(data , "1")

  //         })
  //   }
  const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(answer.length));
  }
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=20&category=23")
      .then(res => {
        console.log(res.data.results);
        setQuiz(res.data.results)
        quiz.map(item => {
          item.action = false
        })
        quiz[0].action = true
      })
      
    }, []);
    
    let son = 0
    // quiz.length>0 && Numclick()
  function Numclick(id) {
    setQuizId(id)
    quiz.map(item => {
      item.action = false
    })
    quiz[id].action = true
    son = 1

    if (id === 0) {
      son = 0
    }  
    

    setQuestionAnswer(99)


    if (quiz[id].incorrect_answers.length < 4) {
      quiz[id].incorrect_answers.splice(getRandomInt(quiz[id].incorrect_answers), 0, quiz[id].correct_answer)
    
    } 
  }


  // const handleClick =(type,status) => {
  //     let clearStatus ={
  //         a:false,
  //         b:false,
  //         c:false,
  //         d:false,
  //         e:false
  //     }
  //     if(type === "a"){
  //         setAnswer({...clearStatus,[type]:status})

  //     }else if (type === 'b'){
  //         setAnswer({...clearStatus,[type]:status})
  //     }else if (type === 'c'){
  //         setAnswer({...clearStatus,[type]:status})
  //     }else if (type === 'd'){
  //         setAnswer({...clearStatus,[type]:status})
  //     }else if (type === 'e'){
  //         setAnswer({...clearStatus,[type]:status})
  //     }

  //   };



  //  useEffect(()=>{
  //     if (testid === 0) {
  //         createTest()
  //     }

  //  },[])


  function Radio(id) {
    setQuestionAnswer(id)
    console.log(quiz[quizId].incorrect_answers);
  }











  return (
    <section className="test-section">

      <nav className="navigation">
        <img src={logo} />

        <div
          className="navigation-menu">
          <ul>
            <li >
              <p className="nav-clock">19:58</p>
            </li>
            <li className="nav-name">
              <p >Khabibuallaye Dilmurod Davron o'g'li</p>
            </li>
          </ul>
        </div>
      </nav>



      {/* <img className="white_flame"  src={white_flame} /> */}
      <div className="test-card">
        <p className="question-title">{(quiz.length > 0) && quiz[quizId].question}</p>

        <div className="vars">
          {
            (quiz.length > 0) && quiz[quizId].incorrect_answers.map((item, index) => {
              return (
                <div className="d-flex" key={index}>
                  <div  onClick={() => Radio(index)} className= {QuestionAnswer === index ? `select_circle abc_selected` : 'select_circle'} ></div>
                  <p className="question">{item}</p>
                </div>
              )
            })
          }
        </div>


        {/* <div className="vars">
            
            <div className="items">
                <p className="abc">A</p>
                <div 
                onClick={(e)=>handleClick('a',true,e)}
                className={answer.a ? `select_circle abc_selected` : 'select_circle'}></div>
                <p className="question">Python yangi organayotganlarga qulay til</p>
            </div>   


            <div className="items">
                <p className="abc">B</p>
                <div 
                onClick={(e)=>handleClick('b',true,e)}
                
                className={answer.b ? `select_circle abc_selected` : 'select_circle'}></div>
                <p className="question">Python yangi organayotganlarga qulay til</p>
            </div>   

            <div className="items">
                <p className="abc">C</p>
                <div 
                onClick={()=>handleClick('c',true)}
                className={answer.c ? `select_circle abc_selected` : 'select_circle'}></div>
                <p className="question">Python yangi organayotganlarga qulay til</p>
            </div>      

            <div className="items">
                <p className="abc">D</p>
                <div 
                onClick={()=>handleClick('d',true)}
                className={answer.d ? `select_circle abc_selected` : 'select_circle'}></div>
                <p className="question">Python yangi organayotganlarga qulay til</p>
            </div>   


            <div className="items">
                <p className="abc">E</p>
                <div 
                onClick={()=>handleClick('e',true)}
                className={answer.e ? `select_circle abc_selected` : 'select_circle'}></div>
                <p className="question">Python yangi organayotganlarga qulay til</p>
            </div>   


        </div> */}


        <div className="numbers">
          {
            (quiz) && quiz.map((index, key) => {
              return (
                <div key={key} className={`number ${(index.action) && 'number-bg'} `} onClick={() => Numclick(key)}>{key + 1}</div>
              )
            })
          }
        </div>

      </div>



      {/* <div className="loader"> 
            <BounceLoader
            color="#3fdcf1"
            loading={true}
            size={80}
            speedMultiplier={1}
            />
        </div> */}

    </section>








  )
}






export default TestPage;