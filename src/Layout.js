import React,{useState } from 'react';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { MyContext } from './context';

export default function Layout({ children }) {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    console.log("email1 = ", email)
    return (
        <>
            <MyContext.Provider value={{ name, email }}>
                <Navbar name={name} setname={setname} setemail={setemail} />
                {children}
                <Footer />
            </MyContext.Provider>
        </>
    )
}