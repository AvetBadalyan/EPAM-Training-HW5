module.exports = class NotEligibleForMortgageException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotEligibleForMortgageException';
    }
}
