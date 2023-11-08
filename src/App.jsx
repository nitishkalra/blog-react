import { useDispatch } from 'react-redux';
import conf from './config/conf';
import {useState, useEffect} from 'react';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import {Header, Footer} from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => {
      setLoading(false);
    })
  },[])


  if(loading){
    return <h1 className='text-3xl'>Loading</h1>
  } else {
    return <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header></Header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  }
}

export default App
