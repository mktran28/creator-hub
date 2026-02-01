import { useEffect, useState } from "react"
import { supabase } from "../client"
import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header";

export default function EditCreator() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function fetchCreator() {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setName(data.name);
                setUrl(data.url);
                setDescription(data.description);
                setImageURL(data.imageURL || "");
            }

            setLoading(false);
        }

        fetchCreator();
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")
        setSaving(true)

        const {error} = await supabase
            .from('creators')
            .update({name: name, description: description, url: url, imageURL: imageURL || null})
            .eq('id', id)

        if (error) {
            setError(error.message);
            setSaving(false)
            return;
        }
        
        setSaving(false)
        navigate("/")
    }

    if (loading) {
        return <div>Loading...</div>
    }

    async function handleDelete() {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this creator?"
        );

        if (!confirmDelete) {
            return;
        }

        setSaving(true);
        setError("")

        const {error} = await supabase
            .from('creators')
            .delete()
            .eq('id', id)

        if (error) {
            setError(error.message);
            setSaving(false);
            return;
        }

        navigate("/")
    }
    
    return (
        <div>
            <Header />

            <div className = "bg-light-blue min-h-screen flex justify-center items-center p-5">
                <div className = "w-full max-w-lg space-y-5">
                    <h1 className = "text-3xl text-dark-blue font-bold text-center">Edit Creator</h1>

                    {error && <div div className = "text-red-600">Error: {error}</div>}

                    <form onSubmit = {handleSubmit} className = "w-full max-w-xl bg-medium-blue rounded-xl p-5 space-y-5 text-white">
                        <div>
                            <label>Name:</label>
                            <input
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {name}
                                onChange = {(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>URL:</label>
                            <input 
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {url}
                                onChange = {(e) => setUrl(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>Description:</label>
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
                            <input 
                                className = "w-full rounded-xl bg-white text-dark-blue p-5"
                                value = {imageURL}
                                onChange = {(e) => setImageURL(e.target.value)}
                            />
                        </div>

                        <button
                            className = "w-full bg-dark-blue text-white rounded-xl px-3 py-1"
                            type = "submit"
                            disabled = {saving}
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </button>

                        <button
                            className = "w-full bg-dark-blue text-white rounded-xl px-3 py-1"
                            type = "button"
                            onClick = {handleDelete}
                            disabled = {saving}
                        >
                            Delete creator
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}