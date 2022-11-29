const reducer = (state, action) => {
  switch (action.type) {
   
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    case "UPDATE_USER":
      console.log("ee",action.payload)
      return { ...state, currentUser: action.payload };
      
    case "UPDATE_USERS":
      return { ...state, users: action.payload };

    default:
      throw new Error("No matched action!");
  }
};

export default reducer;
