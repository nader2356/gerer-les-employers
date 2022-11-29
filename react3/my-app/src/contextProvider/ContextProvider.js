 
import {createContext,useContext,useReducer, useEffect} from 'react';
import reducer from './reducer';

  const initialState = {
     alert: { open: false, severity: 'info', message: '' },
     users: [],
     currentUser: null
  };
  
  const Context = createContext(initialState);
  
  export const useValue = () => {
    return useContext(Context);
  };
  const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser) {
        dispatch({ type: 'UPDATE_USER', payload: currentUser });
      }
    }, []);

    return (
      <Context.Provider value={{ state, dispatch}}>
        {children}
      </Context.Provider>
    );
  };

 
  
  export default ContextProvider;