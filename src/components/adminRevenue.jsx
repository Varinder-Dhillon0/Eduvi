import { useEffect, useState } from "react"
import RevenueCard from "./RevenueCard"
import axios from "axios"
import Loader from "./loader2";

export default function Revenue({email , name}) {

    const [stats, setstats] = useState({});


    useEffect(() => {
        

        axios
            .post("https://eduvi.up.railway.app/getStats", {
                email: email,
            })
            .then((res) => {
                setstats(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [email]);

    return (
        <div className="revenue-wrapper">
            <div className="stats">
                {Object.keys(stats).length > 0 ? Object.keys(stats).map((title, i) => {
                    return <RevenueCard title={title} stats={stats[title]} key={i}></RevenueCard>
                }) : <Loader></Loader>}
            </div>
        </div>
    )
}