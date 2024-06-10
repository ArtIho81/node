import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const { email, password } = userData;
    const user = userService.search({email});
    if (!user) {
      throw new Error("User not found");
    }
    if (password !== user.password) {
      throw new Error(`Password isn't correct`);
    }

    return user;
  }
}

const authService = new AuthService();

export { authService };
