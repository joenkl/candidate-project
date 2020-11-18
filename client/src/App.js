import {useEffect, useState} from 'react';
import {api} from './helpers/api';
import './App.css';

function App() {
  const [health,setHealth] = useState(null);
  const [healthError,setHealthError] = useState(null);

  useEffect(()=>{
    let request = async () =>{
         try {
          const response = await api.health();
          setHealth(response.data);
          setHealthError(null);
         }catch(err){
          setHealthError(err);
          setHealth(null);
         }
    };
    request();
  },[]);

  return (
    <div className="App">
        {healthError&&<div>Somthing is not working...</div>}
        {health&&<div>Healthy</div>}
    </div>
  );
}

export default App;
