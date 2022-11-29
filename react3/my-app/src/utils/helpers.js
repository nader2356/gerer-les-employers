
import Cookie from "universal-cookie";
const expiresAt = 60 * 24;
const cookie = new Cookie();

export const getToken = () => {
    return cookie.get("access_token")
}

export const removeToken = (token) => {
    return cookie.remove(token)
}

export const setToken = (data) => {
  if(data) {
    let date = new Date();
    date.setTime(date.getTime() + expiresAt * 60 * 1000);
    const options = { path: "/", expires: date };  
    return cookie.set("access_token",data,options)
  }        
}

