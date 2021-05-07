import React, { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [disabled, setDisabled] = useState<boolean>(true);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;
    const randonId = Math.floor(Math.random() * 100);
    const NewTask = {
      id: randonId,
      title: newTaskTitle,
      isComplete: false,
    }
    setTasks([...tasks, NewTask]);
    setNewTaskTitle('');
    setDisabled(true);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = [...tasks];
    const indexTask = tasks.findIndex(task => task.id === id);
    newTasks[indexTask] = {...newTasks[indexTask],  isComplete: !newTasks[indexTask].isComplete}
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) { 
    // Remova uma task da listagem pelo ID
    const taskRemoved = tasks.filter(task => task.id !== id);
    setTasks(taskRemoved);
  }

  function onChangeNewTest(e: React.FormEvent<HTMLInputElement>){
    const newValue = e.currentTarget.value;
    if(newValue.length > 0){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
    setNewTaskTitle(newValue);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={onChangeNewTest}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} disabled={disabled}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}