import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from './pages/Registration';
import Login from './pages/Login';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Registration/>} />
        <Route path='/Login' element={<Login/>}></Route>
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
