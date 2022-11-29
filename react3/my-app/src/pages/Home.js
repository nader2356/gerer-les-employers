
import axios from "axios";
import { useState } from "react";
import NavBar from "../component/NavBar";

import FirstTab from "../../src/component/FirstTab";
import SecondTab from "../../src/component/SecondTab";

export default function Home() {
  const [activeTab2, setActiveTab2] = useState("");
  const [Etape, SetEtape] = useState("Etape 1 sur 4");
  const [Form2, setShowForm2] = useState(false);
  const [Form1, setShowForm1] = useState(true);

  const user = localStorage.getItem("user");

  const handleTab22 = () => {
    // update the state to tab2
    setActiveTab2("tb2");
    SetEtape("Etape 2 sur 4");
    console.log(Etape);
    setShowForm2(true);
    setShowForm1(false);
  };
  const handleTab1 = () => {
    setActiveTab2("tb");
    // update the state to tab2
    SetEtape("Etape 1 sur 4");
    console.log(Etape);
    setShowForm2(false);
    setShowForm1(true);
  };

  return (

      <div className=" min-h-screen bg-gray-100">
        <NavBar />
        <div className="mx-auto px-4 py-6  md:py-12">
          <div className="relative">
            <div className="sm:mx-auto sm:w-full sm:max-w-[600px]">
              <div className="mx-auto sm:max-w-[520px]">
                <header>
                  <p className="  text-[28px] text-center  mb-10 font-medium leading-7">
                    Bienvenu
                  </p>
                  <p className="font-sans text-base font-normal text-gray-500">
                    Nous avons juste besoin de quelques informations de base
                    pour configurer votre profil.
                  </p>
                  <p className="font-sans text-base mt-5 font-normal text-gray-500">
                    Vous pourrez modifier cela plus tard.
                  </p>
                </header>
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-medium text-gray-500 dark:text-white">
                    {Etape}
                  </p>

                  <div className="flex w-full space-x-2 rtl:space-x-reverse">
                    <div
                      className="h-1 w-full rounded-[1px] bg-gray-900"
                      onClick={handleTab1}
                    ></div>

                    <div
                      className={
                        activeTab2 === "tb2"
                          ? "h-1 w-full rounded-[1px] bg-gray-900"
                          : "h1 w-full rounded-[1px] bg-gray-400"
                      }
                      onClick={handleTab22}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-md   border border-gray-200 bg-white p-4 dark:bg-black sm:p-8">
                {Form1 && <FirstTab />}
                {Form2 && <SecondTab />}
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
