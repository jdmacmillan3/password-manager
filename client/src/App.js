import './App.css';
import PasswordDatabase from './apis/PasswordDatabase';
import { useState } from 'react';

function App() {

  const [password, setPassWord] = useState('')
  const [account, setAccount] = useState('')

  const addPassword = async (e) => {
    e.preventDefault();
    try{
      await PasswordDatabase.post(`/addPassword`, {
        password: password, 
        account: account,
      });
    } catch (error){
      console.log(error.response.data);
    }
  }

  return (
    <div className = "App">
      <div className = "AddPassword"> 
        <input 
          type = "text" 
          placeholder = "Ex. password123" 
          onChange={(event) => {
            setPassWord(event.target.value);
          }}
        />
        <input 
          type = "text" 
          placeholder = "Ex. Facebook"
          onChange={(event) => {
            setAccount(event.target.value);
          }}
        />
        <button onClick={addPassword}> Add Password</button>
      </div>
    </div>
  );
}

export default App;
