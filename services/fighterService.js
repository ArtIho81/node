import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  defaultHealth = 85;

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkUniqueName(name, id) {
    const isNameExist = this.search({ name });
    const unique = id ? isNameExist?.id === id : !isNameExist;
    if (!unique) {
      throw new Error(`Fighter ${name} already exist`);
    }
  }

  add(candidate) {
    this.checkUniqueName(candidate.name.toLowerCase());
    candidate.health = candidate.health ?? this.defaultHealth;
    candidate.name = candidate.name.toLowerCase();
    const fighter = fighterRepository.create(candidate);
    return fighter;
  }

  getAll() {
    return fighterRepository.getAll();
  }

  update(id, update) {
    update.name && this.checkUniqueName(update.name, id);
    const updatedFighter = fighterRepository.update(id, update);
    if (!updatedFighter) {
      throw new Error(`Fighter wasn't found`);
    }
    return updatedFighter;
  }

  delete(id) {
    const deletedFighter = fighterRepository.delete(id);
    if (deletedFighter.length === 0) {
      throw new Error(`Fighter wasn't found`);
    }
    return deletedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
