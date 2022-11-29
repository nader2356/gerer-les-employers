


const fetchData = async (
   
  { url, method = 'POST', body = null, token= '' },
  dispatch
) => {
  const headers = token
  ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
  : { 'Content-Type': 'application/json' };
  body = body ? { body: JSON.stringify(body) } : {};
  try {
    const response = await fetch(url, { method, headers, ...body });
    const dataofrequest = await response.json();
    console.log("data" ,dataofrequest)
    return dataofrequest;
  } catch (error) {
    console.log("error.message",error.status);
    return null;
  }
};

export default fetchData;