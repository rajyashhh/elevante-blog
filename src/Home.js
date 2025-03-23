import { useState } from 'react';



const Home = () => {

    
    const [name, setName] = useState('Ogilvy');
    const [age, setAge] = useState(25);
    function handleClick(){
        setName('Yash');
        setAge(19);
    }
    

    
    return ( 
        <div className="home">
            <p>{name} is {age} years old!</p>
            <h2>Homepage</h2>
            <button onClick={handleClick}>CLick me!</button>
            
        </div>
     );
}
 
export default Home;