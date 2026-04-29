import { Invoice } from "@/types/invoice-table";

export const invoices: Invoice[] = [
    {
        invoiceNumber: "1",
        customer: "Acme group",
        amount: "3000",
        dueDate: Date.now(),
        issueDate: Date.now(),
        status: "paid"
    },
    {
        invoiceNumber: "2",
        customer: "Globex Corporation",
        amount: "4500",
        dueDate: Date.now(),
        issueDate: Date.now(),
        status: "overdue"
    },
    {
        invoiceNumber: "3",
        customer: "Initech",
        amount: "1500",
        dueDate: Date.now(),
        issueDate: Date.now(),
        status: "void"
    },
    {
        invoiceNumber: "3",
        customer: "Initech",
        amount: "1500",
        dueDate: Date.now(),
        issueDate: Date.now(),
        status: "unpaid"
    },
     {
        invoiceNumber: "3",
        customer: "Initech",
        amount: "1500",
        dueDate: Date.now(),
        issueDate: Date.now(),
        status: "partially-paid"
    }
]