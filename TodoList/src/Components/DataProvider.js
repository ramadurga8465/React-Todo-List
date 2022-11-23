import React ,{useState,useEffect,createContext} from 'react'
export const DataContext = createContext();
export const DataProvider = (props)=> {
    const [list,setList] = useState([])
 return(
        <DataContext.Provider value={[list,setList]}>
            {props.children}
        </DataContext.Provider>
    )
}