import { Link } from "react-router-dom";

export default function CreatorCard({creator}) {
    const {id, name, url, description, imageURL} = creator;

    if (!creator) {
        return null;
    }

    return (
        <article className = "w-full max-w-sm mx-auto rounded-xl p-5 shadow-2xl space-y-5 bg-white">
            {imageURL && 
                <img src = {imageURL} alt = {`Photo of ${name}`}/>
            }

            <Link to = {`/creators/${id}`} className = "text-xl font-bold hover:underline inline-block">{name}</Link>

            <div className = "flex gap-5 text-white">
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
                <Link to = {`/creators/${id}/edit`} className = "bg-medium-blue rounded-xl px-3 py-1">Edit</Link>
            </div>

            <p>{description}</p>
        </article>
    )
}