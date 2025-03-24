import { useState } from 'react';



const Home = () => {    

    const[blogs, setBlogs] = useState([
        {title : 'My new website', body: 'lorem ipsum...', author: 'ronny', id: 1},
        {title : 'DEV vs DSA', body: 'lorem ipsum...', author: 'sunny', id: 2},
        {title : 'What not to do in Engineering!', body: 'lorem ipsum...', author: 'moi', id: 3},
    ])
    

    
    return ( 
        <div className="home">
            {blogs.map((blog)=>(
                <div className="blog-preview" key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>written by {blog.author}</p>
                </div>
            ))}
        </div>
     );
}
 
export default Home;