import { createContext, useState } from "react";
import axios from "axios";
const UsersContext = createContext({
    users:[],
    getData:()=>{},
    onDelete:(user)=>{},
    onUpdate:(user)=>{}
})

 export function UsersContextProvider(props){
    const [usersData,setUsersData] = useState([])
    const [isLoadingStatus,setisLoadingStatus] = useState(true)

    async function handleCreate(){
        const newUser = {
           first_name:'ali',
           last_name:'hamidi',
           email:'alicamaroff@gamil.com',
           avatar:'https://picsum.photos/200/300'
        };
        const response = await axios.post('https://reqres.in/api/users',newUser)
        setUsersData((prevUsers)=>{setUsersData([...prevUsers,response.data])})
   }
   
    async function handleUpdate(user){
        const updatedUser = {
            first_name:'updated',
            last_name:'user',
            email:'updatedUser@gamil.com',
            avatar:'https://picsum.photos/200/300'
            
         };
        const response =  await axios.put(`https://reqres.in/api/users/${user.id}`,updatedUser)
        const updatedUsers = [...usersData];
        const index = updatedUsers.indexOf(user);
        updatedUsers[index]=updatedUser;
        setUsersData(updatedUsers)
    }
    async function handleDelete(user){
         const response = await axios.delete(`https://reqres.in/api/users/${user.id}`)
         const newUsers = usersData.filter(u=>{
            return u.id !== user.id
         })
         setUsersData(newUsers)
    }
    async function handleGetData(){
        const response = await axios.get('https://reqres.in/api/users');
        setUsersData(response.data.data);
        setisLoadingStatus(false)
    }



    const context = {
        users:usersData,
        getData:handleGetData,
        onDelete:handleDelete,
        onUpdate:handleUpdate,
        isLoading:isLoadingStatus,
        onCreate:handleCreate

    }

    return <UsersContext.Provider value={context}>
        {props.children}
    </UsersContext.Provider>
}
export default UsersContext
