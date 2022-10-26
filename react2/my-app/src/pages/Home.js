
import Cookie from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useEffect, useState} from "react";
import NavBar from "../component/NavBar";

export default function Home ()  {

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [user , SetUser] = useState({});
  const cookie = new Cookie();
  const jwt = cookie.get("access_token")
  console.log(jwt)

  
  useEffect(() => {
    const FetchListClient= async () => {
      const url = "http://localhost:1337/api/users/me"
      const options = {
          "method": "GET",
          "headers": {
            Authorization: `Bearer ${jwt}`
          }
      }
      const response = await fetch(url, options)
          .then(res => res.json()
          )
          .catch(e => {
              console.error({
                  "message": "error",
                  error: e
              });
          });

      console.log("RESPONSE: ", response)
      SetUser(response); 
  };
  FetchListClient()
},
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const HandleSubmit =  async (e) => {

    const options = {
      method: "PUT",
      url: `http://localhost:1337/api/users/${user.id}`,
      data: {
        Nom:  Nom,
        Prenom: Prenom
      },
    };
    axios.request(options).then(function (response) {
      console.log(response)
      //toast.success("Utilisateur ajouter avec succées !")
    })  
  .catch(function (error) {
     toast.success(error.response.data.error.message)
     console.log(error.response)
  });
};

  return (
    <>
    <ToastContainer></ToastContainer>
    <div className=" min-h-screen bg-gray-100">

     <NavBar/>
      <div className="mx-auto px-4 py-6  md:py-12">
        <div className="relative">
          <div className="sm:mx-auto sm:w-full sm:max-w-[600px]">
            <div className="mx-auto sm:max-w-[520px]">
            <header>
              <p className="  text-[28px] text-center  mb-10 font-medium leading-7">
                Bienvenu 
              </p>
              <p className="font-sans text-base font-normal text-gray-500">
                Nous avons juste besoin de quelques informations de base pour
                configurer votre profil.
              </p>
              <p className="font-sans text-base mt-5 font-normal text-gray-500">
                Vous pourrez modifier cela plus tard.
              </p>
</header>
              <div className="mt-6 space-y-2">
                <p className="text-xs font-medium text-gray-500 dark:text-white">
                  {" "}
                  Etape 1 sur 4
                </p>
                <div className="flex w-full space-x-2 rtl:space-x-reverse">
                  <div className="h-1 w-1/4 rounded-[1px] bg-black dark:bg-white"></div>
                  <div className="h-1 w-1/4 rounded-[1px] bg-black dark:bg-white"></div>
                  <div className="h-1 w-1/4 rounded-[1px] bg-black dark:bg-white"></div>
                  <div className="h-1 w-1/4 rounded-[1px] bg-black dark:bg-white"></div>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-md   border border-gray-200 bg-white p-4 dark:bg-black sm:p-8">
              <form  >
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-items-center">
                      <label className="mb-2 block text-sm font-medium leading-none text-gray-700">
                        Nom d utilisateur
                      </label>
                    </div>

                    <div className="mt-2 flex rounded-md">
                      <div className="relative w-full">
                        <input className=" mt-2 block h-9 w-full  border border-gray-300 py-2 px-3  
                        placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 
                        focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 border-l-1 
                        rounded-md rounded-l-none font-sans text-sm leading-4 focus:!ring-0 border-1 1
                        focus:border-5 border-l-gray-300 bg-gray-100 text-gray-900 " 
                        value={user.Nom}
                        onChange={(e) => setNom(e.target.value)}></input>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="mb-5 block text-sm font-medium text-gray-700">
                     Prenom d utilisateur                 
                    </label>

                    <input className=" block h-9 w-full rounded-md border border-gray-300 py-2 px-3 
                     placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none 
                     focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 border-l-1 mb-0 mt-0 rounded-l-none 
                     font-sans text-sm leading-4 focus:!ring-0 border-1 focus:border-5 border-l-gray-300 bg-gray-100
                    text-gray-900"
                    value={user.Prenom}
                    onChange={(e) => setPrenom(e.target.value)} ></input>
                  </div>

                
                </div>
                <button onClick={HandleSubmit} className=" items-center text-sm font-medium relative h-9 px-4 py-2.5   rounded-md border border-transparent text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 mt-8 flex w-full flex-row justify-center">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

