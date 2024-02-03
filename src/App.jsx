import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [user,setUser] = useState(null);
  const [repoList,setRepoList] = useState(null);
  const [input,setInput] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleSearch = async(e)=>{
    e.preventDefault();
    setUser(null);
    setIsLoading(true);
   try {
    const {data} = await axios.get(`https://api.github.com/users/${input}`); 
    const {data:repoData} = await axios.get(`https://api.github.com/users/${input}/repos`); 
    console.log('data:',data);
    console.log('repo data:',repoData);
    setUser(data);
    setRepoList(repoData);
    if(data){
     setIsLoading(false);
    }
   
   } catch (error) {
    setIsLoading(false)
     if(error.response.status==404){
       alert(`No user found with username ${input} (404)`);
     }else{
      alert('something went wrong :(');
  }
    console.log(error);
   }
  }

  return (
    <>
      <h1>github profile finder</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder='Search username' onChange={e=>setInput(e.target.value)} value={input} />
        <button>SEARCH</button>
      </form>

      {(!user && !isLoading ) &&  <h2 className='intro center'>Your search result will appear here! </h2>}
     
      {user && <div className='user_card'>
        <div className='left_section'>
        <a href={user?.html_url} target="blank">
          <img src={user?.avatar_url} alt="" className='avater' />
        </a>
        </div>
        
        <div className="right_section">
            <h2 className='username'><a href={user?.html_url} target="blank">{user?.login}</a></h2>
            <p className='bio'>Bio: {user?.bio}</p>
            <div className='more_info'>
               <span className='followers' >Followers: {user?.followers}</span>
               <span className='followings' >Following: {user?.following}</span>
               <span>Repos: {user?.public_repos}</span>
            </div>
          
           <div className='repo_list'>
             <a href={repoList[0]?.html_url} target='blank' className='repo'>{repoList[0]?.name}</a>
             <a href={repoList[0]?.html_url} target='blank' className='repo'>{repoList[1]?.name}</a>
             {/* <a href={repoList[0]?.html_url} target='blank' className='repo'>{repoList[2]?.name}</a> */}
           </div>
        </div>
      </div>}
      {isLoading&& <div className='loading center'> <div className='spinner'></div> <span>Loading...</span></div>} 
    </> 
  )
}

export default App
