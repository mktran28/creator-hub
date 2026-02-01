import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../client"
import Header from '../components/Header.jsx'

export default function AddCreator() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")
        setLoading(true)

        const {error} = await supabase
            .from('creators')
            .insert({name: name, description: description, url: url, imageURL: imageURL || null})

        if (error) {
            setError(error.message);
            setLoading(false)
            return;
        }
        
        setLoading(false)
        navigate("/")
    }

    useEffect(() => {
        if (!loading && contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, [loading])
    
    return (
        <div>
            <Header/>

            <div ref = {contentRef} className = "bg-light-blue min-h-screen flex justify-center items-center p-5">
                <div className = "w-full max-w-lg space-y-5">
                    <h1 className = "text-3xl text-dark-blue font-bold text-center">Add a Creator</h1>

                    {error && <div className = "text-red-600">Error: {error}</div>}

                    <form onSubmit = {handleSubmit} className = "w-full max-w-xl bg-medium-blue rounded-xl p-5 space-y-5 text-white">
                        <div>
                            <label>Name:{" "}</label>
                            <input
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {name}
                                onChange = {(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>URL:</label>
                            <br/>
                            <input 
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {url}
                                onChange = {(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Description:</label>
                            <br/>
                            <textarea 
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {description}
                                onChange = {(e) => setDescription(e.target.value)}
                                rows = {3}
                                required
                            />
                        </div>
                        
                        <div>
                            <label>Image URL:</label>
                            <br/>
                            <input 
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {imageURL}
                                onChange = {(e) => setImageURL(e.target.value)}
                            />
                        </div>

                        <button
                            className = "w-full bg-dark-blue text-white rounded-xl px-3 py-1"
                            type = "submit"
                            disabled = {loading}
                        >
                            {loading ? "Loading..." : "Save creator"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}