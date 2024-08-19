export default class NotEligibleForMortgageException extends Error {
  constructor(message: string = "Not eligible for mortgage") {
    super(message);
    this.name = "NotEligibleForMortgageException";
  }
}
