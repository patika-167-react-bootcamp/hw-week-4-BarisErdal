import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const TodosList:React.FC<{url:string; 
                          updateList: boolean; 
                          cat: any; 
                          status:any;
                        onCatChanges: (val:boolean)=>void
                        }>=(props)=> {
  const [todosArr, setTodosArr] = useState([]);
  const [addCategoryTxt, setAddCategoryTxt] = useState("");

const URL=props.url;

//category Textfield handler
const handleChange = (event: any) => {
  setAddCategoryTxt(event.target.value as string);
};

const handleAddCat = () => {

if (addCategoryTxt.trim().length>0){
  axios.post(`${URL}/category`,{title:addCategoryTxt}).then((resp)=>{
    console.log(resp.data);
props.onCatChanges(true);
   /*  setCatIsUpdated(prev=>!prev); */
        
      });

} else {alert("boş bırakılamaz")} 
};


//modal states
const [open, setOpen] = useState(false);
const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
// end of modal states


  const getTodosArr=()=>{
    axios.get(`${URL}/todo`).then((resp:any)=>{
      console.log("todolar",resp.data);
      setTodosArr(resp.data); })
  }
useEffect(getTodosArr,[props.updateList]);

//style for modals
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};





// Child modal
function ChildModal(props:any) {
  const [open, setOpen] = useState(false);

  // modal içindeki kategoriye ait statusların state'i
  const [statArr, setStatArr]= useState([]);

  //add status state'i
const [toAddStatTitle, setToAddStatTitle]= useState("");
const [toAddStatColor, setToAddStatColor]= useState("");
//add status  states
const handleStatTitle=(event: React.ChangeEvent<HTMLInputElement>)=>{
setToAddStatTitle(event.target.value as string)

}
const handleStatColor=(event: React.ChangeEvent<HTMLInputElement>)=>{
setToAddStatColor(event.target.value as string)

}
  
// stats arr leri cat id den getirir
const getStatsArr=()=>{
  axios.get(`${URL}/status?categoryId=${props.catId}`).then(resp=>{
    console.log("status arr",resp.data);
      setStatArr(resp.data);
    })
}

  const handleOpen = () => {

getStatsArr();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //yeni status ekle butonu handler'ı
  const handleAddStat=()=>{
    if(toAddStatTitle.trim().length>0 && toAddStatColor.trim().length>0){

      const statObj={
        title: toAddStatTitle,
        categoryId: Number(props.catId),
        color: toAddStatColor
      }
    axios.post(`${URL}/status`, statObj).then((resp:any)=>{
   getStatsArr();
            console.log("status ekle butonu",resp.data);
          })
    } else {alert("kategori ve/veya renk ismi boş bırakılamaz")}
  }
///end of child modal

  const handleDelStat=(event:any)=>{
    const statId = event.target.value
    axios.delete(`${URL}/status/${statId}`).then((resp:any)=>{
      console.log("delete'den",resp.data)
      setStatArr((prev:any)=>{
 const deletedArr = prev.filter((item:any)=> item.id !== Number(statId))
 return deletedArr
      } )
    })
  }


  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Status Düzenle</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>

          <Stack direction="row" spacing={2}>
<TextField 
onChange={handleStatTitle} 
margin="normal"
required
name="titleStat"
label="Status Title"
type="text"
id="statTitleToAdd" 
sx={{mt:0}}

/>
<TextField onChange={handleStatColor} sx={{mt:0}}/>
<button onClick={handleAddStat}>Status ekle</button>

          </Stack>
          
<ul>

{statArr.map((stat:any)=> <li key={stat.id} value={stat.id}>{`${stat.title} ${stat.color} `}   
<button value={stat.id} onClick={handleDelStat}>Sil</button>

 </li>)     }
</ul>
        
          <Button onClick={handleClose}>Kapat</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
//end of child modal


const handleCatFromList= (event:any)=>{

  /* event.target.value */
 
/*   {
    title: 
    categoryId:
    statusId: 
    
} */
}


const handleStatusChanges=(event:any)=>{
  return <ChildModal/>

}

const [filteredTodos, setFilteredTodos]=useState([]);

const handleFilterCat = (event: any)=>{
  const ToFilterCatId=Number(event.target.value);
  console.log("filterdaki kat id",ToFilterCatId)
  const filteredCatArr = todosArr.filter((todo:any)=>todo.categoryId === ToFilterCatId);
  setFilteredTodos(filteredCatArr);
}

const handleFilterStat = (event: any)=>{
  const ToFilterStatId=Number(event.target.value);
  console.log("filterdaki status id",ToFilterStatId)
  const filteredCatArr = todosArr.filter((todo:any)=>todo.statusId === ToFilterStatId);
  setFilteredTodos(filteredCatArr);
}

const [isFiltered, setIsFiltered]=useState(false);
const handleFilterButton =()=>{

setIsFiltered(true);
console.log("tüm status",props.status);
}


const handleNotFiltered =()=>{

  setIsFiltered(false);
  
  }

  return (
    <div>
<div>
      <Button onClick={handleOpen}>Kategori Düzenle</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
       
      >
        <Box sx={{ ...style, width: 700 }}>

        <Stack direction="row" spacing={2}>
        <TextField
              margin="normal"
              required
              sx={{width:0.2, height:"50px", mt:0}}
              name="category"
              label="Add Category"
              type="text"
              id="categoryId" 
              onChange={handleChange}           
            />
        <button onClick={handleAddCat} style={{height:"55px"}}>Kategori Ekle</button>

        </Stack>
            
        {props.cat.map((cat:any)=><li value={cat.id} key={cat.id}>{cat.title}  <ChildModal catId={cat.id}/></li>)}
          
        </Box>
      </Modal>
      
    </div>


    <Stack direction="row" spacing={2} sx={{mb: 2, mt:2 }}>
    <div>Filter Area</div>
      <select name="filter-cat" id="filt-cat" defaultValue="" onChange={handleFilterCat}>
        <option value="">Kategori Seçin</option>
      {props.cat.map((cat:any)=> <option value={cat.id} key={cat.id}>{cat.title}</option>)}
        </select>

      <select name="filter-status" id="filt-stat" defaultValue="" onChange={handleFilterStat}>
      <option value="">Status Seçin</option>
        {props.status.map((stat:any)=> <option key={stat.id} value={stat.id}> {stat.title}</option>)}
        </select>
      <button onClick={handleFilterButton}>Filtrele</button>
      <button onClick={handleNotFiltered}>Filtreyi Temizle</button>
      
      </Stack>
    
{ !isFiltered ? todosArr.map((todo:any)=> <li key={todo.id}>
  {todo.title} 
  <select name="todoCat" id="todoCat" value={todo.categoryId || ""} onChange={handleCatFromList}>
    {props.cat.map((cat:any)=> <option value={cat.id} key={cat.id}>{cat.title}</option>)}
  </select>
  <select name="todoStat" id="todoStat" value={todo.statusId || ""} onChange={handleStatusChanges}>
   {props.status.map((stat:any)=> {
  if(todo.categoryId == stat.categoryId){
    return <option value={stat.id} key={stat.id}>{`${stat.title}  statid:${stat.id}`}</option>
  }
  }) } 
    </select>
  </li>) : filteredTodos.map((todo:any)=>
    <li key={todo.id}>
    {todo.title} 
    <select name="todoCat" id="todoCat" value={todo.categoryId || ""} onChange={handleCatFromList}>
      {props.cat.map((cat:any)=> <option value={cat.id} key={cat.id}>{cat.title}</option>)}
    </select>
    <select name="todoStat" id="todoStat" value={todo.statusId || ""} onChange={handleStatusChanges}>
     {props.status.map((stat:any)=> {
    if(todo.categoryId == stat.categoryId){
      return <option value={stat.id} key={stat.id}>{`${stat.title}  statid:${stat.id}`}</option>
    }
    }) } 
      </select>
    </li>
      
    )
  
  
  } 


 </div>
    
  )
}

export default TodosList