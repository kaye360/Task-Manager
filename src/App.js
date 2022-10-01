//Todo

import { useState, useEffect } from 'react';
// import { getTasks } from './utils';

import Task  from './components/Task';
import AddTaskForm from './components/AddTaskForm';

import './App.css';



function App() {

  
  
  //Set up / Checker function
  function init() {
    if (!localStorage.getItem('taskmanager')) {
      localStorage.setItem('taskmanager', '[]')
    }

    if (!localStorage.getItem('taskmanagerSort')) {
      localStorage.setItem('taskmanagerSort', 'new')
    }

  }
  
  init()



  //Global Variables: sort, tasks

  const [sort, setSort] = useState(localStorage.getItem('taskmanagerSort'))


  useEffect( () => {
    localStorage.setItem('taskmanagerSort', sort)
  }, [sort])


  

  const getTasks = Object.values(
    JSON.parse( localStorage.getItem('taskmanager') )
  )
  
  const [tasks, setTasks] = useState(getTasks)

  useEffect( () => {

    const taskstoStr = JSON.stringify(tasks)
    localStorage.setItem('taskmanager', taskstoStr)

  }, [tasks] )









  //Add Task Menu States
  const [addTaskBtnText, setAddTaskBtnText] = useState('Add Task')
  const [addTaskDivDisplay, setAddTaskDivDisplay] = useState('hidden')



  // Task remaining counts
  const incompleteTasks = tasks.filter( task => !task.complete && !task.parentTask).length
  const completeTasks = tasks.filter( task => task.complete && !task.parentTask ).length







  return (
    <div className="App">

    <header>
      <h1>Task Manager</h1>

      <div>

        <button 
          className='btn-sort'
          onClick={ () => {
            setSort( sort === 'new' ? 'old' : 'new')
            setTasks([...tasks].reverse())
          }}
        >
          Sort
        </button>

        <button 
          className='btn-add-task'
          onClick={ () => {
            setAddTaskBtnText(addTaskBtnText === 'Add Task' ? 'Close' : 'Add Task')
            setAddTaskDivDisplay(addTaskDivDisplay === 'visible' ? 'hidden' : 'visible')
          }}
        >
            { addTaskBtnText }
        </button>

      </div>
    </header>


    <AddTaskForm 
      tasks={tasks}
      setTasks={setTasks}
      addTaskDivDisplay={addTaskDivDisplay}
      sort={sort}
    />



    <div className='tasks'>

      <h2>Tasks ({ incompleteTasks })</h2>

      { tasks.map( (task, index) => (
          (task.complete === false && !task.parentTask)  &&
          <Task 
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            key={index}
          />
      ))}

      { incompleteTasks === 0 &&
        <p>
          You have no tasks. Add Some by clicking the button above.
        </p>
      }

    </div>
    
    <div className='tasks'>

      <h2>Completed Tasks ({ completeTasks })</h2>

      { tasks.map( (task, index) => (
          (task.complete && !task.parentTask)  &&
            <Task 
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              parentCompleted={task.complete}
              key={index}
            />
      ))}

    </div>


    </div>
  );
}

export default App;
