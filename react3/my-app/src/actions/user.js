import fetchData from '../utils/FetchData';
import  { API } from "../utils/constant"
const url = `${API}/clients`;


export const getClients = async (dispatch,token) => {
  const result = await fetchData({ url, method: 'GET', token : token}, dispatch);
  if (result) {
    let responseofrequestgetUsers = result.data;
    const listOfUser = responseofrequestgetUsers.map(x => { return {id : x.id , ...x.attributes}} )
    dispatch({ type: 'UPDATE_USERS', payload: listOfUser });
  }

};





export const updateClient= async (updatedFields, ClientId, dispatch,token) => {
  console.log("body of request  Method Update", updatedFields)
  console.log("userId", ClientId)
  const result = await fetchData(
    {
      url: `${API}/clients/${ClientId}`,
      method: 'PUT',
      token: token,
      body: updatedFields,
    },
    dispatch
  );
  if (result) {
   
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The User has been Update successfully',
      },
    });
    console.log("resultDataOfUpdate",result)
    getClients(dispatch);
    
  }
  
};



export const  AddClient = async (updatedFields, dispatch, token) => {
  console.log("body of request Method Add", updatedFields)
  const result = await fetchData(
    {
      url: `${API}/clients`,
      method: 'POST',
      token : token,
      body: updatedFields,
    },
    dispatch
  );
  if (result) {
   
    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The User has been Add successfully',
      },
    });
   
    getClients(dispatch);
    
  }
  console.log("resultDataOfAdd",result)
 
  return result;
};



export const deleteClient = async (Client, dispatch,token) => {
  console.log("Client", Client)
  const result = await fetchData(
    { url: `${API}/clients/${Client.id}`, method: 'DELETE', token: token},
    dispatch
  );
  

  if (result) {
   
    console.log("resultDataOfDelete",result.data.id);

    getClients(dispatch);

    dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'success',
        message: 'The User has been deleted successfully',
      },
    });    
  }

};

module.export = {deleteClient,getClients,updateClient,AddClient}