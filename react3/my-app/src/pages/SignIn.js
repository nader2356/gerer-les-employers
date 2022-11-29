/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from "react";
import axios from "axios";
import  { API } from "../utils/constant"


import google from "../assets/google-icon.svg";
import facebook from "../assets/facebook.png";
import { useValue } from "../contextProvider/ContextProvider";
const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {

  const {dispatch} = useValue();

  const [user, setUser] = useState(initialState);
  const { email, password } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const HandleSubmit = async (e) => {
  
    e.preventDefault();   
      const options = {
        method: "POST",
        url: `${API}/auth/local`,
        data: {
          identifier : email,
          password: password,
        },
      };
      axios.request(options).then(function (response) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'success',
            message: 'The User has been Signed successfully',
          },
        }); 
         localStorage.setItem("user",JSON.stringify(response.data.user))
         dispatch({ type: 'UPDATE_USER', payload: response.data.user });
            window.location.replace("/Home");        
          }).catch(function (error) {
            console.log(error)
            dispatch({
              type: 'UPDATE_ALERT',
              payload: {
                open: true,
                severity: 'error',
                message: error.response.data.msg,
              },
            });
});
} 
  return (
    
    <div className="flex min-h-screen flex-col justify-center bg-[#f3f4f6] py-[5%] sm:px-6 lg:px-8">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="font-mono text-center text-3xl text-neutral-900">
          Bienvenu de nouveau
        </h2>
      </div>
      <div className="mb-auto mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border-1 mx-2 rounded-md border-gray-200 bg-white mt-[5%] py-10 sm:px-10">
          <form onSubmit={HandleSubmit}>
            <div className="space-y-6">
              <div className="space-y-6">
                  <label className="mb-6 block text-sm font-medium leading-none text-gray-700">
                    Adresse e-mail
                  </label>
                  <input
                    className="mb-2 block h-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm
                                     placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none 
                                    focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1"
                   
                    placeholder="john.doe@example.com"
                    name="email"
                    onChange={handleChangeInput}></input>
                <div className="relative">
                  <div className="absolute right-0 -top-[6px] z-10">
                    <a className="text-sm font-medium text-gray-600">
                      Oublié ?
                    </a>
                  </div>
                  <div className="">
                    <label className="mb-6 block text-sm font-medium leading-none text-gray-700">
                      Mot de passe
                    </label>
                    <input
                      className="mb-2 block h-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm
                                     placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none 
                                    focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1" placeholder="..............."
                      value={password} name="password" onChange={handleChangeInput} type="password"></input>
                  </div>
                </div>
              </div>
              <button
                className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5   rounded-md border border-transparent text-white bg-slate-800 hover:bg-slate-900 focus:outline-none 
                            focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 w-full justify-center"
              >
                Se connecter
              </button>
            </div>
          </form>
          <hr className="my-8"></hr>
          <div className="space-y-3">
            <button
              className="inline-flex items-center text-sm font-medium relative h-9 
        px-4 py-2.5 rounded-md border border-gray-200 text-slate-900 bg-white
         hover:bg-gray-100 w-full justify-center">
          <img className="mr-2 h-5 w-5" src={google} alt=""/>
              Se connecter avec Google
            </button>
            <button
              className="inline-flex items-center text-sm font-medium relative h-9 
        px-4 py-2.5 rounded-md border border-gray-200 text-slate-900 bg-white
         hover:bg-gray-100 w-full justify-center"
            >
              <img className="mr-2 ml-4  h-5 w-5" src={facebook} alt=""/>
              Se connecter avec Facebook
            </button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-neutral-600">
          <a href="/SignUp" className="text-brand-500 font-medium">
            Vous n'avez pas de compte ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
