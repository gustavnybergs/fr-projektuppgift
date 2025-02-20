export interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoState {
    items: TodoItem[];
    filter: 'all' | 'active' | 'completed';
}