import { Task } from "./Task";

export interface ToDo {
    id: string;
    title : string;
    tasks: Task[];
}