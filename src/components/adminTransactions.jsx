import { useEffect, useState } from "react"
import axios from "axios"
import Loader2 from "./circleLoader";

export default function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [limitedtransactions, setlimitedtransactions] = useState([]);

    const showMore = () => {
        if (transactions.length !== 0) {
            setlimitedtransactions([...limitedtransactions, ...transactions.splice(0, transactions.length)])
        }

        console.log(transactions);
    }

    useEffect(() => {

        axios
            .get("http://eduvi.up.railway.app/getTransactions")
            .then(res => {
                setTransactions(res.data.splice(5, res.data.length));
                setlimitedtransactions(res.data.splice(0, 5))
            })
            .catch(err => { console.log(err) });
    }, []);

    return (
        <div className="transactions-wrapper">
            <h1>Recent</h1>
            <table>
                <thead>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Creator</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Amount(₹)</th>
                    <th>Time</th>
                </thead>
                {limitedtransactions.length > 0 ? limitedtransactions.map((transaction, i) => {

                    return (
                        <tbody key={transaction._id}>
                            <td>{i + 1}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.creator}</td>
                            <td>{transaction.name}</td>
                            <td>{transaction.email}</td>
                            <td>₹{transaction.amount / 100}</td>
                            <td>{transaction.time}</td>
                        </tbody>
                    )

                }) : ""}
                {transactions.length > 0 ? <button className="text-xs bg-[rgba(128,128,128,0.15)] text-black rounded-full p-3 pt-1 pb-1 absolute right-24 mt-3" onClick={() => { showMore(); }}>Show More..</button> : ""}
            </table>
            {limitedtransactions.length === 0 ? <div className="flex justify-center items-center w-[200px] mr-auto ml-auto">
                <p className="block w-[200px border-b-black"><Loader2></Loader2></p>
            </div> : ""}
        </div>

    )
}