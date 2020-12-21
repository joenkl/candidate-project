import {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route  } from 'react-router-dom'
import {api} from './helpers/api';
import './App.css';
import UserCards from './components/UserCards';

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
        {healthError&&<div>Something is not working...</div>}
        {health&&<div>Healthy</div>}
        {"Accessing User Profile card page with url/:id"}
        <BrowserRouter  >
          <Switch>
            <Route path="/:id" children={<UserCards />} />
          </Switch>
        </BrowserRouter >
    </div>
  );
}

export default App;
