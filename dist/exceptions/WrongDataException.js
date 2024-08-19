export default class WrongDataException extends Error {
    constructor(message = "Wrong data provided") {
        super(message);
        this.name = "WrongDataException";
    }
}
