import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div className = "min-h-screen bg-[url('/background.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center">
            <h1 className = "text-5xl font-bold text-dark-blue p-5">Creatoverse</h1>
            <div className = "flex gap-5">
                <Link to = "/creators/new" className = "rounded-xl bg-dark-blue text-white px-5 py-4">Add a creator</Link>
                <Link to = "/" className = "rounded-xl bg-dark-blue text-white px-5 py-4">View creators</Link>
            </div>
        </div>
    )
}