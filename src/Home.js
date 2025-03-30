
import BlogList from './bloglist';
import useFetch from './usefetch';



const Home = () => {    
    const {data : blogs, isPending, error} = useFetch('http://localhost:2000/blogs');


    
    
    
    
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
            
        </div>
     );
}
 
export default Home;