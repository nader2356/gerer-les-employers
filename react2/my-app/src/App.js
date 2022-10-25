
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { BrowserRouter , Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
   
    <Route path='/SignIn' exact component={SignIn} />
    <Route path='/SignUp'  component={SignUp} />
    <Route path='/Home'  component={Home} />
    
     </BrowserRouter>
  );
}

export default App;
