import { ReactComponent as Logo } from "../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {BiCloudUpload ,BiMoneyWithdraw} from "react-icons/bi"
import {AiOutlineTransaction} from "react-icons/ai"
import { useEffect } from "react";

export default function AdminNav(props){

    const navigate = useNavigate();
    
    return(
        <div className="adminNav">
            <div className="adminLogo">
                <Logo/>
                <h3>Eduvi</h3>
            </div>
            <div className="adminMenu">
                <button id="revenue" onClick={() => navigate("/admindashboard/revenue")} ><BiMoneyWithdraw size={24} style={{marginRight : "5px" ,fill: "inherit"}}/> Revenue</button>
                <button id="upload" onClick={() => navigate("/admindashboard/upload")}><BiCloudUpload size={25} style={{marginRight : "5px",  fill :"inherit"}}/>Upload</button>
                <button id="transaction" onClick={() => navigate("/admindashboard/transactions")}><AiOutlineTransaction size={24} style={{marginRight : "5px", fill :"inherit"}}/>Transactions</button>
            </div>
        </div>
    )
}