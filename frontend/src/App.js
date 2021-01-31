import React, {useState,useEffect} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [lists, setlists] = useState([])
  const [value, setvalue] = useState("")

  useEffect(() => {
    // 데이터베이스 값 가져옴.
    axios.get('/api/values')
    .then(response=>{
      console.log('response',response.data)
      setlists(response.data)
    })
  }, [])


  const changeHandler = (event) => {
    setvalue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();


    axios.post('/api/value',{value:value})
    .then(response => {
      if(response.data.success){
        console.log('response',response)
        setlists([...lists,response.data])
        setvalue("");

      } else {
        alert('DB Insert failed')
      }
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div classNamer="container">

          {lists && lists.map((list,index)=>{
            return <li key={index}>{list.value}</li>
          })}
          <form className="example" onSubmit={submitHandler}>
            <input type="text" 
            placeholder="입력해주세요..."
            onChange={changeHandler}
            value={value}
            /><button type="submit">확인</button>

          </form>
          
        </div>

        
       
      </header>
    </div>
  );
}

export default App;
