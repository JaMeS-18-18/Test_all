import React, {useEffect , useState} from 'react';
import { useLocation } from 'react-router-dom';
const ResultPage = () => {

  const [box, setBox] = useState([]);
  const Result = useLocation().state
  let i = 0
useEffect(() => {
  let curr_box = [...box]
  Result.corrctjavob.map(item =>{
    Result.javob.map(element => {
      if (item === element.answer) {
        i++
       curr_box.push(i)
      }
    })
  })
  setBox(curr_box)
}, []);

  return (
    <div>
      <table className='table border-1'>
        <thead className='thead'>
          <th>#</th>
          <th>Yo'nalish</th>
          <th>Savollar soni</th>
          <th>Togri javoblar</th>
          <th>Toplagan bali</th>
          <th>%</th>
        </thead>
        <tbody>
          <td>1</td>
          <td>Mahsus savollar</td>
          <td>{Result.javob.length}</td>
          <td>{box.length}</td>
          <td>{box.length * 5}</td>
          <td>{box.length * 5}</td>
        </tbody>
      </table>
    </div>
  );
}

export default ResultPage;
