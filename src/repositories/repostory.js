export default class Repostory {
  constructor() {
    if (new.target == Repostory) {
      throw new Error(
        "Repostory ne peut pas être instanciée. Utilisez les méthodes statiques ou une sous-classe."
      );
    }
  }

  static async save(student) {
    throw new Error("save non implementer");
  }

  static async findById(id) {
    throw new Error("find non implementer");
  }

  static async findAll() {
    throw new Error("find non implementer");
  }

  static async delete(id) {
    throw new Error("find non implementer");
  }
}
