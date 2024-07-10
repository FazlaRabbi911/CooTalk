import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Notification from './pages/Notification';
import Massage from './pages/Massage';
import Setting from './pages/Setting';
import Feed from './pages/Feed';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration/>} />
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}>
          <Route path='/Home/feed' element={<Feed/>}/>
          <Route path='/Home/massage' element={<Massage/>}/>
          <Route path='/Home/notification' element={<Notification/>}/>
          <Route path='/Home/setting' element={<Setting/>}/>
        </Route>

      </Route>

    )
  );
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
