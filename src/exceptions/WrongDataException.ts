export default class WrongDataException extends Error {
  constructor(message: string = "Wrong data provided") {
    super(message);
    this.name = "WrongDataException";
  }
}
