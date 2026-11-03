import React,{useState,useEffect,useContext} from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import Footer from './Footer'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from './AuthContext';
export default function Home() {
  const { logout,user } = useAuth();
  
if(user && user.status!=="enabled"){
  logout()  
  return toast.error("Account isn't Approved Yet Please Contact Admin")
  }
if(user && user.role!=="admin"){
  logout()
  return toast.error("Account isn't Admin Yet Please Contact Super Admin")
}
  else if(user && user.role=="admin"){
    return window.location.href="/admindashboard"
   }
  else{
  return(<><AdminLogin/><Footer/></>)
 }}