import React, { useState, useEffect } from "react";
import { useStateContext } from '../hook/store'
import logo from '../images/logo.png';
import white_flame from '../images/logo-w.png';
import { Link, useLocation } from 'react-router-dom'
import '../App.css';
import BounceLoader from "react-spinners/BeatLoader";
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const TestPage = () => {
  const [credentials, setCredentials] = useState({ title: 'new test', section: 2 })
  const state = useLocation();

  const handleClose = () => setShow(false);

  const [quiz, setQuiz] = useState([]);
  const [quizId, setQuizId] = useState(0)
  const [AllANSWER, setAllANSWER] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [CORR_ans, setCORR_ans] = useState([]);
  const [QuestionAnswer, setQuestionAnswer] = useState(99)
  const [raqam, setRaqam] = useState(0)
  const [time, setTime] = useState(1 * 1200)
  const [show, setShow] = useState(false);
  const [type_btn, setType_btn] = useState(false);

  const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(answer.length));
  }

  const getPadTime = (myTime) => myTime.toString().padStart(2, '0 ')
  const minute = getPadTime(Math.floor(time / 60));
  const second = getPadTime(time - minute * 60)
  

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=20&category=23")
      .then(res => {
        setQuiz(res.data.results)
        quiz.map(item => {
          item.action = false
          
        })
        quiz[0].action = true
      })
    setRaqam(0)

    const interval = setInterval(() => {
      setTime((time) => (time >= 1 ? time - 1 : 0))
    }, 1000)
    handleShow()

  }, []);

  function handleShow(){
    setShow(true)
  }

  let son = 0
  let current = [...AllANSWER]

  function Numclick(id) {
    setRaqam(1)
    setQuestionAnswer(99)
    setQuizId(id)

    let curr_ans = [...CORR_ans]
    quiz.map(item => {
      item.action = false
     
    })

    quiz[id].action = true
    son = 1
    if (id === 0) {
      son = 0
    }
    if (quiz[id].incorrect_answers.length < 4) {
      quiz[id].incorrect_answers.splice(getRandomInt(quiz[id].incorrect_answers), 0, quiz[id].correct_answer)
    }

    if (raqam === 0) {
      quiz.map((item, index) => {
        curr_ans.push(item.correct_answer)
        current.push({
          answer: "javob belgilanmagan",
          id: index
        })
      })
      setAllANSWER(current)
      setCORR_ans(curr_ans)
      setRaqam(1)
    }


  }



  function Radio(id, element) {
    setQuestionAnswer(id)
    
    let currANS = [...AllANSWER]

    currANS.map((item, index) => {
      if (index === quizId) {
        currANS.splice(index, 1, { answer: element, id: index })
      }
    })
    setAllANSWER(currANS)
  }

  function Gaplash() {
    setType_btn(true)
    setTime(0)
  }
  return (
    <section className="test-section">
      <nav className="navigation">
        <img src={logo} />
        <div
          className="navigation-menu">
          <ul>
            <li >
              <p className="nav-clock">{minute}:{second}</p>
            </li>
            <li className="nav-name">
              <p >Khabibuallaye Dilmurod Davron o'g'li</p>
            </li>
          </ul>
        </div>
      </nav>

      <div className="test-card">
        <p className="question-title">{(quiz.length > 0) && quiz[quizId].question}</p>
         <div className="vars">
          {
            (quiz.length > 0 && raqam === 1) && quiz[quizId].incorrect_answers.map((item, index) => {
              return (
                <div className="d-flex ms-4" key={index}>
                  <div onClick={() => Radio(index, item)} className={QuestionAnswer === index ? `select_circle abc_selected` : 'select_circle'} ></div>
                  <p className="question">{item}</p>
                </div>
              )
            })
          }
        </div>

        <div className="numbers">
          {
            (quiz) && quiz.map((index, key) => {
              return (
                <div key={key} className={`number ${(index.action) && 'number-bg'} `} onClick={() => Numclick(key)}>{key + 1}</div>
              )
            })
          }
        </div>
        <div className="end_btn">
          <Button className="btn btn-danger"  onClick={() => Gaplash()}>YAKUNLASH</Button>
        </div>
      </div>

      {
        (time === 0 || type_btn === true) &&
        <Modal className="d-flex align-items-center" show={show} >
        <Modal.Header >
          <Modal.Title className="text-primary">Test muvoffaqiyatli yakunlandi !</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="d-flex justify-content-center">
          <Link to='/Natija' state={{javob: AllANSWER , corrctjavob:CORR_ans}}  className="btn btn-primary form-control fw-bold" variant="primary" onClick={handleClose}>
          Natijani ko'rish
          </Link>
        </Modal.Footer>
      </Modal>
      }
    </section>
  )
}






export default TestPage;