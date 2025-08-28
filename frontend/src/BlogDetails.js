import { useParams } from "react-router-dom";
import useFetch from './usefetch';
import { useNavigate } from 'react-router-dom';


const BlogDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id);
    function handleDelete(){
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method : 'DELETE'
        }).then(()=>{
            navigate('/')
        })
    }
    return ( 
        <div className="Blog-details">
            { isPending && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {blog && (
                <article>
                    <h2>
                        {blog.title}
                    </h2>
                    <p>written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete this blog!</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;
