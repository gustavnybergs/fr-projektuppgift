import React, { useState } from 'react';
import { TodoItem, TodoState } from '../types/todoTypes';
import '../styles/TodoList.css';


const TodoList: React.FC = () => {
    // Huvudstate för todos och input
    const [todos, setTodos] = useState<TodoState>({
        items: [],
        filter: 'all' // Förberedd för framtida filtreringar
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

    // Event handler som lyssnar efter Enter-tangent i input-fältet
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    // Funktion som växlar completed-status för en todo
    const toggleTodo = (id: number): void => {
        setTodos(prev => ({
            ...prev,
            // Mappar genom alla items och inverterar completed för matchande id
            items: prev.items.map(item => 
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    // Ta bort todo baserat på id
    const deleteTodo = (id: number): void => {
        setTodos(prev => ({
            ...prev,
            // Filtrerar bort item med matchande id
            items: prev.items.filter(item => item.id !== id)
        }));
    };

    // Render-delen av komponenten
    return (
        <section className="todo-container">
            <h2>Todo List</h2>
            {/* Input-sektion med textfält och lägg till-knapp */}
            <form className="todo-input" onSubmit={(e) => {
                e.preventDefault();
                addTodo();
            }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Skriv en ny uppgift..."
                />
                <button type="submit">Lägg till</button>
            </form>
            
            {/* Lista av todos med conditional rendering:
                - Visar meddelande om listan är tom
                - Annars mappar och visar alla todos */}

            <ul className="todo-list">
                {todos.items.length === 0 ? (
                    <p>Inga uppgifter än. Lägg till en!</p>
                ) : (
                    todos.items.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {/* Styling för genomstruken text om todo är completed */}
                            <span 
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.title}
                            </span>
                            <button onClick={() => deleteTodo(todo.id)}>Ta bort</button>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
};

export default TodoList;
