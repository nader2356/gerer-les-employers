
import React, {  useState } from "react";
import axios from "axios";
import { useValue } from "../contextProvider/ContextProvider";
import { getToken } from "../utils/helpers";

const SecondTab = () => {
    
  const {dispatch} = useValue();
  const [Age , setAge] = useState();  
  const [ DateDeNaissance , setDateDeNaissance] = useState();

  const user  = localStorage.getItem("user");
  const token = getToken();

 

  const HandleSubmit = async (e) => {
    const options = {
      method: "PUT",
      url: `http://localhost:1337/api/users/${user.id}`,
      data: {
        Age: Age,
        DateDeNaissance:  DateDeNaissance,
      },
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'success',
            message: 'Utilisateur modifier avec succées',
          },
        }); 
       
      })
      .catch(function (error) {
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: error.response.data.msg,
          },
        });
       
      });
   
  };

    return (
   
        <form onSubmit={HandleSubmit}>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-items-center">
                      <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
                        Age d un utilisateur
                      </label>
                    </div>
                    <div className="mt-2 flex rounded-md">
                      <div className="relative w-full">
                        <input className=" mt-2 block h-9 w-full  border border-gray-300 py-2 px-3  mb-4 
                        placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 border-l-1 
                        rounded-md rounded-l-none font-sans text-sm leading-4 focus:!ring-0 border-1 1
                        focus:border-5 border-l-gray-300 bg-gray-100 text-gray-900 " 
                        type="number"
                        onChange={(e) => setAge(e.target.value)}
                        value={user.Age}
                        ></input>
                      </div>
                    </div>
                   
                  
                  <div className="w-full">
                    <label className="mb-5  mt-1 block text-sm font-medium text-gray-700">
                     Date De Naissance d un utilisateur              
                    </label>

                    <input className=" block h-9 w-full rounded-md border border-gray-300 py-2 px-3 
                     placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none 
                     focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 border-l-1  rounded-l-none mt-4
                     font-sans text-sm leading-4 focus:!ring-0 border-1 focus:border-5 border-l-gray-300 bg-gray-100
                    text-gray-900"
                   Type="date"
                   onChange={(e) => setDateDeNaissance(e.target.value)}
                   value={user.DateDeNaissance}></input>
                  </div>

                </div>
                
                </div>
                
                <button disabled={!user.Age  || !user.DateDeNaissance ? true : false} className=" items-center text-sm font-medium relative h-9 px-4 py-2.5   rounded-md border border-transparent text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 mt-8 flex w-full flex-row justify-center">
                  Prochain etape
                </button>
                
              </form>
             
    )
}
export default SecondTab