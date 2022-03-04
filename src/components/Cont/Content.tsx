
import React,{useState, useEffect} from 'react';
import AddTodo from './AddTodo';
import axios from 'axios';


function Content(props:any) {
const URL=props.url; 
const [toDos, setTodos] = useState([]);

//default bearer function to prevent code dublicating
axios.defaults.baseURL = URL;
axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}


console.log("content", props.token);

  return (<div>
<h1>Todos</h1>

     <AddTodo url={URL}/>

    </div>
  )
}

export default Content