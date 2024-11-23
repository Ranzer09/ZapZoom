import {BrowserRouter} from 'react-router-dom'
import Header from './components/header';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import AdminRouter from './AdminRouter';
import UserRouter from './UserRouter';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      {/* <UserRouter/> */}
      <AdminRouter/> 
      </BrowserRouter>
    </div>
  );
}

export default App;
