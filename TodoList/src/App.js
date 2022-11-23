import React,{useState,useEffect} from 'react'
import List from './Components/List'
import Alert from './Components/Alert'
import { DataProvider } from './Components/DataProvider'; 
const getLocalStorage = ()=>{
let list = localStorage.getItem("list");
if(list){
  return (list = JSON.parse(localStorage.getItem("list")));}
  else{
    return [];
  }



};
const  App = () => {
  const [name,setName] = useState("");
  const [list,setList]=useState(getLocalStorage());
  const [isEditing,setIdEditing]= useState(false);
  const [editID,setEditID]= useState(null);
  const [alert,setAlert]=useState({show:false ,msg:"",type:""});
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list]);

const handleSubmit = (e) =>{
  e.preventDefault();
  if(!name){
    showAlert(true,"danger","please enter value")
  }
  else if(name && isEditing){
    setList(
      list.map((item)=>{
        if(item.id === editID){
          return {...item,title:name}
        }
        return item
      })
    );
    setName("");
    setEditID(null);
    setIdEditing(false);
    showAlert(true,"success","value changes");
 }
 else{
  showAlert(true,"success","Item added to the list")
  const newItem ={id: new Date().getTime().toString(),title:name}
  setList([...list,newItem]);
  setName("");
 }  
  
};

const showAlert = (show = false,type="",msg="") => {
setAlert({show,type,msg});
};
const removeItem = (id) => {
  showAlert(true,"danger","item Removed");
  setList(list.filter((item)=> item.id !== id));

};
const editItem = (id) => {
const editItem= list.find((item)=> item.id === id);
setIdEditing(true);
setEditID(id);
setName(editItem.title);
};
const clearList = () => {
  showAlert(true,"danger","emptyList");
  setList([]);

};
return (
    <DataProvider>
    <div>
      <center>
       <h3>TodoList using LocalStorage</h3>
        <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <input type="text" placeholder="ex:Bread" onChange={(e) => setName(e.target.value)}
          value={name}/>
         &nbsp; <button type="submit"> {isEditing ? "Edit":"submit"}</button>
        </form>
      {list.length > 0 &&(
        <div>
          <List items={list} removeItem={removeItem} editItem={editItem} />
      
         <center><button onClick={clearList}>clearList</button></center>
        </div>
      )}
       
      
      </center>
    </div>
    </DataProvider>
  );
}

export default App;
