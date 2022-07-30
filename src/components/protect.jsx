import {Route,useNavigate} from 'react-router-dom'
const Protect = ({path,element}) => {
    const navigate = useNavigate()
    return ( <>
    {
        localStorage.getItem("token")?<Route path={path} element={element}/> : navigate('/login')
    }
    </> );
}
 
export default Protect;