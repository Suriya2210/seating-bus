// apiUtils.js
export async function getAccessLevel(id) {
  try {
    const response = await fetch(`http://localhost:3000/associates/get-associate/${id}`);
    const data = await response.json();
    //Logic to deduce the role/previllege
    let isManager = data.data.user.ismanager;
    let isAdmin = data.data.user.isAdmin;

    let role;
    if(isManager && isAdmin){
      role = "AdminManager";
    }else if(isManager){
      role = "Manager";
    }else if(isAdmin){
      role = "Admin";
    }else{
      role = "Associate";
    }
    return role;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to handle it in the caller function if needed
  }
}



