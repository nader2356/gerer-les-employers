
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { BrowserRouter , Route} from 'react-router-dom';
import Users from './pages/Client';
import Notification from './component/Notification';

function App() {
  return (
    
    
    <BrowserRouter>
   <Notification/>
    <Route path='/SignIn' exact component={SignIn} />
    <Route path='/SignUp'  component={SignUp} />
    <Route path='/Home'  component={Home} />
    <Route path='/Users'  component={Users} />
     </BrowserRouter>
  );
}

export default App;
