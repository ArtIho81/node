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

  checkFighter(fighter) {
    const { name } = fighter;
    const isFighterExist = this.search({ name });
    if (isFighterExist) {
      throw new Error(`Fighter ${name} already exist`);
    }
  }

  add(candidate) {
    this.checkFighter(candidate);
    candidate.health = candidate.health ?? this.defaultHealth;
    const fighter = fighterRepository.create(candidate);
    return fighter;
  }

  getAll() {
    return fighterRepository.getAll();
  }

  update(id, update) {
    this.checkFighter(update);
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
