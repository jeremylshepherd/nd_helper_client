import { Status } from ".";

export type Task = {
    id: number,
    task: string,
    comments?: string,
    status: Status
};