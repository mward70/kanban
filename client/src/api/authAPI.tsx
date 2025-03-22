import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth"

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    // const { username, password } = userInfo; // Extract username and password
    const response = await fetch("/auth/login", {  //API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInfo }), // Use extracted values
    });

    if (!response.ok) {
      console.error("Authentication failed");
      throw new Error("Invalid login credentials");
    }

    const data = await response.json();
    console.log("Logged in with:", data);
    
  AuthService.login(data.token);
    
    return data;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
}



export { login };
