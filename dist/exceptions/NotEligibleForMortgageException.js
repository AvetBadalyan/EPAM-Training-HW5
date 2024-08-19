export default class NotEligibleForMortgageException extends Error {
    constructor(message = "Not eligible for mortgage") {
        super(message);
        this.name = "NotEligibleForMortgageException";
    }
}
