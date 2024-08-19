import WrongDataException from "./exceptions/WrongDataException";
class MortgageApplicationQueueProcessor {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    checkWrongData(customer) {
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
    }
    processRequest(customerId, amountRequested) {
        this.updateBalance(customerId, amountRequested);
    }
    updateBalance(customerId, amountRequested) {
        const customer = this.getCustomer(customerId);
        customer.updateBalance(amountRequested);
    }
    getCustomer(customerId) {
        const customer = this.customerRepository.get(customerId);
        if (!customer) {
            throw new WrongDataException(MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER);
        }
        return customer;
    }
}
MortgageApplicationQueueProcessor.MESSAGE_INVALID_CUSTOMER = "Customer not found!";
export default MortgageApplicationQueueProcessor;
