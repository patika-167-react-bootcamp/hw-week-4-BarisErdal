import React,{useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TodosList from './TodosList';


const AddTodo:React.FC<{url: string}>=(props)=>{

interface CatType {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number
}

interface StatType{
    id: number;
    title: string;
    color: string;
    createdAt: Date;
     updatedAt: Date;
     categoryId: number
  }


    const [category, setCategory] = useState<CatType[]>([]);
    const [selectedCatId, setSelectedCatId] = useState<string>("-1"); 

    const [status, setStatus] = useState<StatType[]>([]);
    const [selectedStatusId, setSelectedStatusId] = useState<string>("");


    const [allStatusArr, setAllStatusArr]= useState<StatType[]>([]);


    const [todoText, setTodoText] = useState<string>('');

    //her yeni todo eklenmesinde listenin render edilmesi için
    const [isListUpdated, setIsListUpdated] = useState(false);

    const URL=props.url;

    //handle func for input
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setTodoText(event.target.value as string);
    };


    const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
     setSelectedCatId(event.target.value as string);
     
  /*    console.log(event.target.value,"event target vavlue"); */
     const catId =String(event.target.value);
     axios.get(`${URL}/status?categoryId=${catId}`).then((resp:any)=>{
      setStatus(resp.data); })
    };



    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      setSelectedStatusId(event.target.value as string); 
     };

     const handleButton = (event: any) => {
       if(todoText.trim().length>0) {

        const body={
          title: todoText,
          categoryId: Number(selectedCatId),
          statusId: Number(selectedStatusId)
        }
        axios.post(`${URL}/todo`,body).then((resp:any)=>{
          console.log(resp); 
        }).then(()=>{

          setIsListUpdated((prev)=> !prev);
        })

       } else { alert("geçerli bir todo adı girin")}
      /* console.log(event.target.value); */
     };
   
const getCat=()=>{
  let arrStatus:StatType[]=[];

  axios.get(`${URL}/category`).then((resp:any)=>{
    console.log("Kategoriler",resp.data);
    setCategory(resp.data); 
  return resp.data;
  }).then((resp:any)=>{

resp.forEach((cat:any) => {
  


    axios.get(`${URL}/status?categoryId=${cat.id}`).then((resp:any)=>{
    /*  console.log("statuslar",resp.data) */
    
    arrStatus=[...resp.data, ...arrStatus]
    
    }).then((resp:any)=>{    setAllStatusArr(arrStatus)})
     
  

  
});

    })

    

}
useEffect(getCat,[URL, isListUpdated]);


//Kategori eklendiğinde yeniden render edilmesi için TodosList'ten handler
const handleCatChanges=(isChanged:boolean)=>{
  if (isChanged) { getCat();

  }
}

const handleStatChanges=(isChanged:boolean)=>{
  if (isChanged) { getCat();

  }
}

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{mb:5}}>
  <TextField
              margin="normal"
              required
              sx={{width:0.2 ,height: "50px", mt: 0}}
              name="todo"
              label="ToDo"
              type="text"
              id="todoId" 
              onChange={handleChange} 
                 
            />
  <select          
          id="category"
          value={selectedCatId}
          onChange={handleCategory} 
           style={{height: "50px"}}   
        >
<option value="-1">Kategori Seçin</option>
{category.map((cat:any)=> <option value={String(cat.id)} key={cat.id}>{cat.title}</option>)}
        </select>
  <select  
          id="status"
          value={selectedStatusId}
          onChange={handleStatus}
          style={{height: "50px"}}         
        >       
 {status.map((stat:any)=> <option value={String(stat.id)} key={stat.id}>{stat.title}</option>)}     
        </select>
  
  <Button variant="contained" endIcon={<SendIcon />} onClick={handleButton} sx={{height: "50px"}}> Send </Button>
  </Stack>


<TodosList  url={props.url} 
            updateList={isListUpdated} 
            cat={category} 
            status={allStatusArr}
            onCatChanges={handleCatChanges}

            />


 
    </div>
  )
}

export default AddTodo