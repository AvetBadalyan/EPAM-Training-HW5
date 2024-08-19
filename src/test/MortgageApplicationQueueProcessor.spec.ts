import { strict as assert } from "assert";
import MortgageApplicationQueueProcessor from "../MortgageApplicationQueueProcessor";
import Customer from "../domain/Customer";
import NotEligibleForMortgageException from "../exceptions/NotEligibleForMortgageException";
import WrongDataException from "../exceptions/WrongDataException";

interface CustomerRepositoryMock {
  get: (customerId: number) => Customer | null;
}

describe("MortgageApplicationQueueProcessor", () => {
  let customerRepositoryMock: CustomerRepositoryMock = {
    get: (customerId: number) => null,
  };

  const process = (
    customerId: number,
    amountRequested: number,
    customerRepositoryMock: CustomerRepositoryMock
  ) => {
    const processor = new MortgageApplicationQueueProcessor(
      customerRepositoryMock
    );
    try {
      processor.processRequest(customerId, amountRequested);
    } catch (e) {
      if (e instanceof NotEligibleForMortgageException) return;
      throw e;
    }
  };

  describe("happy path test", () => {
    [
      [1, 1000, 0, 500, 1500],
      [2, 240, 0, 100, 340],
      [3, 0, 0, 400, 0],
      [4, 500, 1, 1000, 500],
    ].forEach(
      ([
        customerId,
        balance,
        badCreditHistoryCount,
        amountRequested,
        expected,
      ]) => {
        it(`given a customerId ${customerId} when is valid then request is processed`, () => {
          const customer = new Customer(
            customerId,
            "first",
            "last",
            balance,
            badCreditHistoryCount
          );
          customerRepositoryMock.get = () => customer;

          process(customerId, amountRequested, customerRepositoryMock);
          assert.strictEqual(customer.balance, expected);
        });
      }
    );
  });

  describe("unhappy path test", () => {
    it("given a customerId when not valid then request fails", () => {
      const customerId = 1000;
      const amountRequested = 1500;

      customerRepositoryMock.get = () => null;

      assert.throws(
        () => process(customerId, amountRequested, customerRepositoryMock),
        WrongDataException
      );
    });
  });
});
