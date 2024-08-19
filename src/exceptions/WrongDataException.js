module.exports = class WrongDataException extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongDataException';
    }
}
