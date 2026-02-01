import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';

export default function ViewCreator() {
    const {id} = useParams();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchCreator() {
            const {data, error} = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()
            
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
    }, [id]);

    useEffect(() => {
        if (!loading && contentRef.current) {
            contentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, [loading])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <Header />

            <div ref = {contentRef} className = "bg-light-blue min-h-screen flex justify-center items-center p-5">
                <div className = "w-full max-w-xl space-y-5 bg-white rounded-xl p-5">
                    <h1 className = "text-3xl text-dark-blue font-bold text-center">{name}</h1>

                    <img 
                        className = "max-w h-full"
                        src = {imageURL} 
                        alt = {`Photo of ${name}`}
                    />

                    <div className = "flex gap-5 text-white justify-center">
                        {url && (
                            <a 
                                href = {url} 
                                target = "_blank" 
                                rel = "noreferrer" 
                                className = "bg-medium-blue rounded-xl px-3 py-1"
                            >
                                Visit channel
                            </a>
                        )}

                        <Link 
                            to = {`/creators/${id}/edit`} 
                            className = "bg-medium-blue rounded-xl px-3 py-1"
                        >
                            Edit
                        </Link>
                    </div>

                    <div>{description}</div>
                </div>
            </div>
        </div>
    );
}