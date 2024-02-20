import { useCookies } from "react-cookie";
import {Outlet, Navigate} from "react-router-dom"

export const PrivateRoute = () => {
    const [cookies] = useCookies()
    
  return (
    cookies.user ? <Outlet/> : <Navigate to="/login"/>
  )
}
