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

  checkUnique(field, value, id) {
    const isValueExist = this.search({ [field]: value });
    const unique = id ? isValueExist?.id === id : !isValueExist;
    if (!unique) {
      throw new Error(`${value} already exist`);
    }
  }

  add(candidate) {
    this.checkUnique("email", candidate.email.toLowerCase());
    this.checkUnique("phoneNumber", candidate.phoneNumber);
    candidate.email = candidate.email.toLowerCase();
    const user = userRepository.create(candidate);
    return user;
  }

  getAll() {
    return userRepository.getAll();
  }

  update(id, update) {
    update.email && this.checkUnique("email", update.email.toLowerCase(), id);
    update.phoneNumber &&
      this.checkUnique("phoneNumber", update.phoneNumber, id);
    const updatedUser = userRepository.update(id, update);
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
