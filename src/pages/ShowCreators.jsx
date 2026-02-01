import { supabase } from '../client.js'
import { useState, useEffect, useRef } from 'react';
import CreatorCard from '../components/CreatorCard.jsx'
import Header from '../components/Header.jsx'

export default function ShowCreators() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [creators, setCreators] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        async function fetchCreators() {
            const {data, error} = await supabase
                .from('creators')
                .select('*');

            if (error) {
                setError(error.message);
            } else {
                setCreators(data)
            }

            setLoading(false);
        }

        fetchCreators();
    }, [])

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

            <div ref = {contentRef} className = "min-h-screen bg-light-blue p-5 space-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start justify-items-center">
                {creators.length === 0 ? (
                    <div>No creators yet</div>
                ) : (
                    creators.map((creator) => (
                        <CreatorCard creator = {creator} key = {creator.id}/>
                    ))
                )}
            </div>
        </div>
    )
}