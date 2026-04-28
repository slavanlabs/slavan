import { ColumnDef } from "@tanstack/react-table"

export type Invoice = {
    invoiceNumber: string,
    customer: string,
    amount: string,
    dueDate: number,
    issueDate: number
    status: "paid" | "unpaid" | "overdue" | "void" | "partially-paid"
}

export interface InvoiceTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[]
}