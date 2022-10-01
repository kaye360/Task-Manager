import { useState, useEffect } from "react";

import SubTask from "./SubTask";


export default function Task(props) {

    let {task, tasks, setTasks} = props
    let color

    switch (task.color) {
        case 'red': 
            color = 'firebrick' 
            break;
        case 'blue': 
            color = 'slateblue' 
            break;
        case 'purple': 
            color = 'rebeccapurple' 
            break;
        case 'green': 
            color = 'olivedrab' 
            break;
        default: 
            color = 'slategrey'
    }

    const style = {
        position : 'relative',
        padding : '0.5rem 1rem',
        borderLeft : `5px solid ${color}`,
        backgroundColor : '#f9f9f9',
        minHeight : '2rem',
        opacity : task.complete ? '0.5' : '1',
    }


    const inputWrapper = {
        width : '75%',
        marginBlock : '0.5rem',
    }

    const btnWrapper = {
        position : 'absolute',
        top : '0.5rem',
        right : '1rem',
        border : '0',
        cursor : 'pointer',
    }

    const delBtnStyle = {
        padding : '0.3rem 0.6rem',
        backgroundColor : 'firebrick',
        borderRadius : '0.5rem',
        color : '#fff',
        border : '0',
        cursor : 'pointer',
    }

    const editBtnStyle = {
        marginRight : '0.5rem',
        padding : '0.3rem 0.6rem',
        backgroundColor : 'darkcyan',
        borderRadius : '0.5rem',
        color : '#fff',
        border : '0',
        cursor : 'pointer',
    }

    const completeBtnStyle = {
        marginRight : '0.5rem',
        padding : '0.3rem 0.6rem',
        border : '0',
        backgroundColor : 'transparent',
        cursor : 'pointer',
    }

    const descriptionStyle = {
        whiteSpace : 'pre-line',
    }







    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [editMode, setEditMode] = useState(false)

    useEffect( () => {
        setTitle(task.title)
        setDescription(task.description)
    }, [task.title, task.description])







    function editTask(taskToEdit, edits) {

        //Get Task/TaskIndex to edit
        taskToEdit = tasks.find( task => task.id === taskToEdit )
        const taskToEditIndex = tasks.findIndex( task => task.id === taskToEdit.id)

        //Make the edits in taskToEdit Obj if passed thru edits obj
        edits.title && (taskToEdit.title = edits.title)
        edits.description && (taskToEdit.description = edits.description)
        edits.color && (taskToEdit.color = edits.color)
        edits.complete !== undefined && (taskToEdit.complete = edits.complete)


        //Copy tasks array and update task
        const newTasks = [...tasks]
        newTasks[taskToEditIndex] = taskToEdit
        
        //update state variale to new array copy
        setTasks(newTasks)
        setTitle(title)
        setDescription(description)

    }




    
    function deleteTask(taskToDelete) {

        const newTaskList = tasks.filter( (task) => {
            return !((taskToDelete === task.id) || (taskToDelete === task.parentTask))
        })
        
        setTasks(newTaskList)
    }




    const subTasks = tasks.filter( subTask => subTask.parentTask === task.id )
    const completeSubTasks = subTasks.filter( (subTask) => subTask.complete )

    

    return(
        <>
        
        <div style={ style }>

            <div style={ inputWrapper }>

            { editMode 
                ? <input 
                    type="text" 
                    value={title} 
                    name={`title${task.id}`} 
                    id={`title${task.id}`} 
                    onChange={ (e) => {
                        setTitle(e.target.value)
                        editTask(task.id, {title : e.target.value})
                    } }
                  /> 
                : <h3>
                    {title} &nbsp;
                    {
                        subTasks.length > 0 &&
                        `(${completeSubTasks.length}/${subTasks.length})`
                    }
                  </h3> 
            }

            </div>

            <div style={ inputWrapper }>

            { editMode 
                ? <textarea 
                    name={`description${task.id}`} 
                    id={`description${task.id}`}
                    value={description}
                    onChange={ (e) => { 
                        setDescription(e.target.value)
                        editTask(task.id, {description: e.target.value})
                    }}
                  />
                : <p style={ descriptionStyle }>{description}</p> 
            }

            </div>

            { editMode && 
                <div>
                    Color:
                    <select 
                      name="color" 
                      id="color"
                      defaultValue={task.color}
                      onChange={ (e) => {
                        editTask(task.id, {color : e.target.value})
                      }}
                    >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="grey">Grey</option>
                    </select>
                </div>
            }



            <div style={btnWrapper}>

                <button 
                    style={ editBtnStyle } 
                    onClick={ () => {
                        setEditMode(editMode ? false : true) 
                    }}>
                        { editMode ? 'Done' : "Edit"}
                </button>

                <button 
                    style={ delBtnStyle }
                    onClick={ () => {
                        deleteTask(task.id)
                    }}
                >
                    Delete
                </button>

                <p>
                Complete : 
                <button 
                    style={ completeBtnStyle }
                    onClick={ () => {
                        editTask(task.id, { complete: !task.complete})
                    }}
                >
                    {task.complete ? '☑️' : '🔲'}
                </button>
            </p>
                
            </div>        

        </div>

        { subTasks.map( subTask => (
                <SubTask 
                    subTask={subTask} 
                    parentComplete={task.complete} 
                    key={subTask.id} 

                    editTask={editTask}
                    deleteTask={deleteTask}

                    inputWrapper={inputWrapper}
                    btnWrapper={btnWrapper}
                    delBtnStyle={delBtnStyle}
                    editBtnStyle={editBtnStyle}
                    completeBtnStyle={completeBtnStyle}
                    descriptionStyle={descriptionStyle}
                /> 
        ))}
        </>
    )
}