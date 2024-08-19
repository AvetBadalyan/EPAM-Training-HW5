import WrongDataException from "./exceptions/WrongDataException";
import Customer from "./domain/Customer";

interface CustomerRepository {
  get(customerId: number): Customer | null;
}

export default class MortgageApplicationQueueProcessor {
  customerRepository: CustomerRepository;

  static MESSAGE_INVALID_CUSTOMER = "Customer not found!";

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  checkWrongData(customer: Customer | null): void {
    if (!customer) {
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
    }
  }

  processRequest(customerId: number, amountRequested: number): void {
    this.updateBalance(customerId, amountRequested);
  }

  updateBalance(customerId: number, amountRequested: number): void {
    const customer = this.getCustomer(customerId);
    customer.updateBalance(amountRequested);
  }

  getCustomer(customerId: number): Customer {
    const customer = this.customerRepository.get(customerId);
    if (!customer) {
      throw new WrongDataException(
        MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER
      );
    }
    return customer;
  }
}
