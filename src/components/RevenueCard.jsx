
export default function RevenueCard({stats , title}){

    return(
        <div className="revenue-card">
            <h4 >{title}</h4>
            <h1>{stats}</h1>
        </div>
    )
}