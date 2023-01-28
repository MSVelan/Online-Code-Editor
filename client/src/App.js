import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios'
import React,{ useState } from 'react'; 

function App() {

  const [code, setcode] = useState('')
  const [output, setoutput] = useState('')

  const submit = async ()=>{
    const payload = {
      language: "cpp",
      code
    }
    try{
      const {data} = await axios.post("http://localhost:5000/run",payload)
      setoutput(data.output)
    }catch(err){
      const {data} = err.response;
      console.log(err.response);
      setoutput(data.error.stderr)
    }
  }

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea name="" id="" cols="75" value={code} onChange={(e)=>{setcode(e.target.value)}} rows="20"></textarea>
      <br />
      <button type="submit" onClick={submit} className='btn btn-success'>Run</button>
      <h6>{output}</h6>
    </div>
  );
}

export default App;
