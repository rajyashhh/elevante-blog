import { useState } from 'react';
import BlogList from './bloglist';



const Home = () => {    

    const[blogs, setBlogs] = useState([
        {title : 'My new website', body: 'lorem ipsum...', author: 'ronny', id: 1},
        {title : 'DEV vs DSA', body: 'lorem ipsum...', author: 'sunny', id: 2},
        {title : 'What not to do in Engineering!', body: 'lorem ipsum...', author: 'moi', id: 3},
    ])
    

    
    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All Blogs"/>
        </div>
     );
}
 
export default Home;