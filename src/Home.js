import { useState } from 'react';
import BlogList from './bloglist';



const Home = () => {    



    const[blogs, setBlogs] = useState([
        {title : 'My new website', body: 'lorem ipsum...', author: 'Hari om', id: 1},
        {title : 'DEV vs DSA', body: 'lorem ipsum...', author: 'sunny', id: 2},
        {title : 'What not to do in Engineering!', body: 'lorem ipsum...', author: 'sahil', id: 3},
    ])
    
    function handleDelete(id){
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }
    
    // useEffect(()=>{
    //     console.log("Use Effect run");
    // },[name])
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All Blogs" handleDelete={handleDelete}/>
            
        </div>
     );
}
 
export default Home;