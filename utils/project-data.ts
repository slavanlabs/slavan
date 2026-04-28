export type Project = {
    project: string,
    client: string,
    amount: number
    status: "DRAFT" | "IN_PROGRESS" | "INVOICE_SENT" | "CLIENT_PAID" | "MEMBERS_PAID" | "COMPLETED",
    members: number 
}

export const projects: Project[] = [
    {
        project: "Project Alpha",
        client: "Client A",
        amount: 5000,
        status: "DRAFT",
        members: 3
    },
    {
        project: "Project Beta",
        client: "Client B",
        amount: 12000,
        status: "IN_PROGRESS",
        members: 5
    },
    {
        project: "Project Gamma",
        client: "Client C",
        amount: 8000,
        status: "INVOICE_SENT",
        members: 4
    },
    {
        project: "Project Delta",
        client: "Client D",
        amount: 15000,
        status: "CLIENT_PAID",
        members: 6
    },
    {
        project: "Project Epsilon",
        client: "Client E",
        amount: 20000,
        status: "MEMBERS_PAID",
        members: 8
    },
    {
        project: "Project Zeta",
        client: "Client F",
        amount: 10000,
        status: "COMPLETED",
        members: 4
    }
]