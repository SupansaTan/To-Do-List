export interface Task {
    id: number;
    name: string;
    date: string;
    photo: Array<String>;
    notify: boolean;
    overdue: boolean;
}