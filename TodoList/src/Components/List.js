import React,{useContext} from 'react';
import {DataContext} from './DataProvider'
const List=({items,removeItem,editItem})=>{
    const {name,setName} = useContext(DataContext);
    console.log(name);
     return(
      <div>
        {items.map((item)=>{
            const {id,title} = item;
            return(
                <ul key={id}>
                    <li>
                        {title}
                        <div>
                        <button type="button" onClick={()=> editItem(id)}>Edit</button>&nbsp;
                        <button type="button" onClick={()=> removeItem(id)}>Remove</button>
                        </div>
                    </li>
                </ul>
                );
            })}
        </div>)}
export default List