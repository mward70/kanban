import { UserLogin } from "../interfaces/UserLogin";
import AuthService from "../utils/auth";

const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userInfo), // Use extracted values
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
};

export { login };
