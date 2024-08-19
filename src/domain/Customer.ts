import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";

export default class Customer {
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
  badCreditHistoryCount: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    balance: number,
    badCreditHistoryCount: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.balance = balance;
    this.badCreditHistoryCount = badCreditHistoryCount;
  }

  updateBalance(amount: number): void {
    if (this.isEligibleForMortgage(amount)) {
      this.balance += amount;
    } else {
      throw new NotEligibleForMortgageException();
    }
  }

  isEligibleForMortgage(amountRequested: number): boolean {
    let isEligibleForMortgage = false;

    if (this.badCreditHistoryCount === 0 && this.balance > 0) {
      isEligibleForMortgage = this.balance * 2 >= amountRequested;
    }

    return isEligibleForMortgage;
  }
}
