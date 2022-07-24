import {useState,useEffect} from 'react';
import axios from 'axios';

function App() {
  const [users,setUsers]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const fetchUsers=async()=>{
    try{
      setUsers(null);
      setLoading(true);
      setError(null);
      const response=await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch(e){
      setError(e);
    }
    setLoading(false);
  }
  useEffect(()=>{
  fetchUsers();  
  },[])
  const handleClick=()=>{
    fetchUsers();
  }    
  if(loading)return <div>로딩중...</div>;
  if(error)return <div>에러가 발생했습니다.</div>;
  if(!users)return null;

  return (
    <div>
    <ul>
        {users.map(user=>(
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        )
        )}
    </ul>
    <button onClick={handleClick}>다시 불러오기</button>
    </div>
  );
}

export default App;