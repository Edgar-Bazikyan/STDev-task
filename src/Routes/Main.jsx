import React from "react"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import '../App.css'

const Main = () => {
    return (
        <div className="App">
            <Header />

            <Outlet />
            
            <Footer />  
        </div>
    )
}


export default Main