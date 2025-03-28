import { useEffect, useState } from 'react';
import BlogList from './bloglist';



const Home = () => {    



    const[blogs, setBlogs] = useState(null)
    
    
    
    useEffect(()=>{
        fetch('http://localhost:8000/blogs').then(res => {
            return res.json();
        })
        .then((data)=>{
            console.log(data)
            setBlogs(data);
        });
    }, []);

    return ( 
        <div className="home">
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
            
        </div>
     );
}
 
export default Home;