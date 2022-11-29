/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import user from "../assets/user.png"
import { useState } from "react";
 import { removeToken } from "../utils/helpers";

const NavBar = () => {
  
  const SignOut = () => {
    removeToken("access_token");
    window.location.replace("/SignIn");
  };

  const [OpenDrowpdown, SetOpenDrowpdown] = useState(false);

  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => SetOpenDrowpdown(!OpenDrowpdown)}
                >
                  <img
                    className="h-8 w-8 rounded-full" src={user} />
                </button>
              </div>
              <div
                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
          bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            OpenDrowpdown ? "max-h-500" : "hidden"
          } `}
              >
                <a
                  onClick={SignOut}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
