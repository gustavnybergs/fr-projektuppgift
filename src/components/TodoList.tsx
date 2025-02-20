import React, { useState } from 'react';
import { TodoItem, TodoState } from '../types/todoTypes';
import '../styles/TodoList.css';


const TodoList: React.FC = () => {
    // State för todos och input
    const [todos, setTodos] = useState<TodoState>({
        items: [],
        filter: 'all'
    });
    const [inputValue, setInputValue] = useState<string>('');

    // Hantera input ändringar
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
    };

    // Funktion för att lägga till en ny todo
    const addTodo = (): void => {
        if (!inputValue.trim()) return; // Avbryt om input är tom

        const newTodo: TodoItem = {
            id: Date.now(),
            title: inputValue,
            completed: false
        };

        setTodos(prev => ({
            ...prev,
            items: [...prev.items, newTodo]
        }));

        setInputValue(''); // Rensa input efter tillägg
    };

    // Hantera Enter-tangent
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    // Toggle todo status
    const toggleTodo = (id: number): void => {
        setTodos(prev => ({
            ...prev,
            items: prev.items.map(item => 
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    // Ta bort todo
    const deleteTodo = (id: number): void => {
        setTodos(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <div className="todo-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress} // 🆕 Använd "onKeyDown" istället för "onKeyPress"
                    placeholder="Skriv en ny uppgift..."
                />
                <button onClick={addTodo}>Lägg till</button>
            </div>
            
            <div className="todo-list">
                {todos.items.length === 0 ? (
                    <p>Inga uppgifter än. Lägg till en!</p>
                ) : (
                    todos.items.map(todo => (
                        <div key={todo.id} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span 
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.title}
                            </span>
                            <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
