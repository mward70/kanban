import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    //return the decoded token
    const token = this.getToken();
    return token? jwtDecode<JwtPayload>(token): null
  }

  loggedIn() {
    //return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    //return a value that indicates if the token is expired
    try{
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true; 
      return decoded.exp * 1000 < Date.now(); // Convert expiration to milliseconds
    } catch (error){
      return true;
    }
  }

  getToken(): string | null{
    //return the token
    const token = localStorage.getItem('id_token');
    console.debug('Retrieved token:', token);
    return token;
  }

  login(idToken: string) {
    //set the token to localStorage
    localStorage.setItem('id_token', idToken);
    //redirect to the home page
    window.location.assign('/');
  }

  logout() {
    //remove the token from localStorage
    localStorage.removeItem('id_token');
    //redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
