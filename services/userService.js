import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkUser(user) {
    const { email, phoneNumber } = user;
    const isEmailExist = email && this.search({ email });
    const isPnoneExist = phoneNumber && this.search({ phoneNumber });
    if (isEmailExist || isPnoneExist) {
      throw new Error(
        `User email: ${user.email} or pnone: ${user.phoneNumber} already exist`
      );
    }
  }

  add(candidate) {
    this.checkUser(candidate);
    const user = userRepository.create(candidate);
    return user;
  }

  getAll() {
    return userRepository.getAll();
  }

  update(id, update) {
    this.checkUser(update);
    const updatedUser = userRepository.update(id, update);
    if (!updatedUser) {
      throw new Error(`User wasn't found`);
    }
    return updatedUser;
  }

  delete(id) {
    const deletedUser = userRepository.delete(id);
    if (deletedUser.length === 0) {
      throw new Error(`User wasn't found`);
    }
    return deletedUser;
  }
}

const userService = new UserService();

export { userService };
