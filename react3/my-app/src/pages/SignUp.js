/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-undef */

import i from "../assets/undraw_remotely_2j6y.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes,faCheck} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import  { API }from "../utils/constant";
import { useValue } from "../contextProvider/ContextProvider";
import google from "../assets/google-icon.svg";
import visibilityIcon from "../assets/visibilityIcon.svg";

import Cookie from "universal-cookie";


const  SignUP = () => {  
 
  
  const {dispatch} = useValue();
  const [lengthUsername,setLengthUsernameValidated]=useState(false);
  const [ValidEmail,setEmailValid]=useState(false);
  const [lengthEmail,setLengthEmailValidated]=useState(false);
  const [Password,setPassword]=useState("");
  const [Username,setUsername]=useState("");
  const [Email,setEmail]=useState("");
  const [lowerValidated, setLowerValidated]=useState(false);
  const [upperValidated, setUpperValidated]=useState(false);
  const [numberValidated, setNumberValidated]=useState(false);
  const [specialValidated, setSpecialValidated]=useState(false);
  const [lengthValidated, setLengthValidated]=useState(false);
  const [ShowPassword, SetShowPassword] = useState(false)

  const togglePassword = () => {
   
     SetShowPassword(!ShowPassword);
  };

const expiresAt = 60 * 24;
const cookie = new Cookie();
  const handleChangeEmail= (e) => {
    const lengthEmail = new RegExp('(?=.{1,})')
    // eslint-disable-next-line no-useless-escape
    const EmailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    let Email =e.target.value
    setEmail(Email)
    if(lengthEmail.test(Email)){
      setLengthEmailValidated(true);
    }
    else{
      setLengthEmailValidated(false);
    }

    if(EmailRegex.test(Email)){
      setEmailValid(true);
    }
    else{
      setEmailValid(false);
    }
  }

  const handleChangeUsername= (e) => {
    const lengthUsername = new RegExp('(?=.{1,})')
    
    let username =e.target.value
    setUsername(username)
   if(lengthUsername.test(username)){
    setLengthUsernameValidated(true);
    }
    else{
      setLengthUsernameValidated(false);
    } 
  }

  const handleChangePassword = (e)=>{

    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    // eslint-disable-next-line no-useless-escape
    const special = new RegExp('(?=.*[.!@#\$%\^&\*])');
    const length = new RegExp('(?=.{7,})') 
    let password =e.target.value

    setPassword(password)
    if(lower.test(password)){
      setLowerValidated(true);
    }
    else{
      setLowerValidated(false);
    }
    if(upper.test(password)){
      setUpperValidated(true);
    }
    else{
      setUpperValidated(false);
    }
    if(number.test(password)){
      setNumberValidated(true);
    }
    else{
      setNumberValidated(false);
    }
    if(special.test(password)){
      setSpecialValidated(true);
    }
    else{
      setSpecialValidated(false);
    }
    if(length.test(password)){
      setLengthValidated(true);
    }
    else{
      setLengthValidated(false);
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      url: `${API}/auth/local/register`,
      data: {
        username: Username,
        email: Email,
        password: Password,
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
      
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = { path: "/", expires: date };          
        cookie.set("access_token", response.data.jwt, options);
        window.location.replace("/Home");
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
 
    <div className="flex min-h-screen items-center bg-[#f3f4f6] ">
      <div className="mx-auto block max-w-7xl px-7 lg:flex">
        <div className="hidden w-full lg:block lg:w-1/2">
          <div className="mt-18  mb-14 text-4xl font-semibold text-gray-800 md:text-6xl">
            <div className=" mt-[30%] max-w-[450px] ">
              <img src={i} alt="Image" className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full lg:mt-0 lg:ml-[150px] lg:w-1/2">
          <div className="border bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-md">
            <div className="px-3 py-4 sm:px-10">
              <div>
                <h2 className="font-cal mb-2 text-2xl text-center">SignUp</h2>
              </div>
              <div className="relative mt-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>              
               <span className="bg-white px-2 text-gray-500 pt-5">
                </span>              
              </div>
              <div className="mt-4">
                <form   onSubmit={HandleSubmit} className="space-y-4">
                  <label className="mb-2 block text-sm font-medium leading-none text-gray-700 font-size-0 dark:white-300 animate-pulse rounded-md bg-gray-300 text-transparent w-16 sr-only">
                    username
                  </label>
                  <input
                    placeholder="username"
                    className="mb-2 block h-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400
                     hover:border-gray-400 focus:border-neutral-300 
                     focus:outline-none focus:ring-2 
                     focus:ring-neutral-800 focus:ring-offset-1 my-0"
                    type="text"
                    onChange={handleChangeUsername}          
                  ></input>
                <div className='tracker-box'>
                  <div className={lengthUsername?'validated':'not-validated'}>
            {lengthUsername?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheck}/>  
              </span>
            ):(
              <span className='list-icon'>
                <FontAwesomeIcon icon={faTimes}/>  
              </span>
            )}
            At least one caractere letter
               </div>
              </div>
                  <label className="mb-2 block text-sm font-medium leading-none text-gray-700 font-size-0 dark:white-300 animate-pulse rounded-md bg-gray-300 text-transparent w-16 sr-only">
                    email
                  </label>
                  <input
                    placeholder="Email"
                    className="mb-2 block h-9 w-full rounded-md border 
                    border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 my-0"
                    onChange={handleChangeEmail}
                    type="email"
                  ></input>              
                    <div className='tracker-box'>
                  <div className={ValidEmail?'validated':'not-validated'}>
            {ValidEmail?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheck}/>  
              </span>
            ):(
              <span className='list-icon'>
                <FontAwesomeIcon icon={faTimes}/>  
              </span>
            )}
           email must be valid
               </div>
               <div className={lengthEmail?'validated':'not-validated'}>
            {lengthEmail?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheck}/>  
              </span>
            ):(
              <span className='list-icon'>
                <FontAwesomeIcon icon={faTimes}/>  
              </span>
            )}
            At least one caractere letter
               </div>
              </div>
                  <label className="mb-2 block text-sm font-medium leading-none text-gray-700 font-size-0 dark:white-300 animate-pulse rounded-md bg-gray-300 text-transparent w-16 sr-only">
                    password
                  </label>
                  <div className="relative mb-1 flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-800 focus-within:ring-offset-1">
                    <input
                     type={ShowPassword ? 'text': 'password'} 
                      placeholder="Password"
                      className="mb-2 block h-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 hover:border-gray-400
                       focus:border-neutral-300 
                       focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 
                        border-r-0 pr-10  rounded-r-none !my-0 !ring-0"
                        onChange={handleChangePassword} name="password" id='password'></input>
                    <div className=" h-9 border border-gray-300 px-3 rounded-r-md border-l-0">
                      <div className="flex h-full flex-col justify-center px-1  text-sm">
                        <img
                          src={visibilityIcon} alt="showpassword" className="showPassword"  onClick={togglePassword}/>
                      </div>
                    </div>
                  </div>
                  <div className='tracker-box'>
                  <div className={lowerValidated?'validated':'not-validated'}>
            {lowerValidated?(
              <span className='list-icon green'>
                <FontAwesomeIcon icon={faCheck}/>  
              </span>
            ):(
              <span className='list-icon'>
                <FontAwesomeIcon icon={faTimes}/>  
              </span>
            )}
            At least one lowercase letter
          </div>
          <div className={upperValidated?'validated':'not-validated'}>
            {upperValidated?(
              <span className='list-icon green'>
              <FontAwesomeIcon icon={faCheck}/>  
            </span>
          ):(
            <span className='list-icon'>
              <FontAwesomeIcon icon={faTimes}/>  
            </span>
          )}
            At least one uppercase letter
          </div>
          <div className={numberValidated?'validated':'not-validated'}>
            {numberValidated?(
              <span className='list-icon green'>
              <FontAwesomeIcon icon={faCheck}/>  
            </span>
          ):(
            <span className='list-icon'>
              <FontAwesomeIcon icon={faTimes}/>  
            </span>
          )}
            At least one  number
          </div>
          <div className={specialValidated?'validated':'not-validated'}>
            {specialValidated?(
              <span className='list-icon green'>
              <FontAwesomeIcon icon={faCheck}/>  
            </span>
          ):(
            <span className='list-icon'>
              <FontAwesomeIcon icon={faTimes}/>  
            </span>
          )}
            At least one special letter
          </div>
          <div className={lengthValidated?'validated':'not-validated'}>
            {lengthValidated?(
              <span className='list-icon green'>
              <FontAwesomeIcon icon={faCheck}/>  
            </span>
          ):(
            <span className='list-icon'>
              <FontAwesomeIcon icon={faTimes}/>  
            </span>
          )}
            At least minimum 7 caractere
          </div>
</div> 
                  <div className="mt-5">
                    <button
                      className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5   rounded-md border border-transparent text-white bg-slate-800 hover:bg-slate-900 focus:outline-none 
                            focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 w-full justify-center">
                      Sign up for free
                    </button>
                  </div>
                </form>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 pb-0.5 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5 mb-5 mt-2  
                    rounded-md border border-gray-200 text-brand-900 bg-white 
                    hover:bg-gray-100 w-full justify-center  text-center" type="button" disabled>
                    <img className="mr-2 h-5 w-5" src={google} alt=""   />
                    Google
                  </button>
                  <button
                    className="inline-flex items-center text-sm font-medium relative h-9 px-4 py-2.5  mt-2  
                    rounded-md border border-gray-200 text-brand-900 bg-white hover:bg-gray-100 w-full  
                    justify-center  text-center" type="button" disabled>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mr-2 h-5 w-5 text-green-500">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 
                  11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 
                  16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 
                  3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1
                   1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                    SAML SSO
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" border-gray-200 bg-gray-50  py-3 sm:px-10 text-center">
            <a href="/SignIn" className="text-sm  leading-5 text-gray-500 ">
            Déjà inscrit(e) ? <span className="text-[#0a66c2]">S’identifier</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default SignUP;
