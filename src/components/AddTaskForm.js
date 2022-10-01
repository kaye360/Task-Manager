
export default function AddTaskForm(props) {

    const {tasks, setTasks,addTaskDivDisplay, sort} = props

    function addTask(e) {
        e.preventDefault()
        const newTask = {
          title : e.target[0].value,
          description : e.target[1].value,
          id : Number(new Date()),
          complete : false,
          color : e.target[2].value,
          parentTask : Number(e.target[3].value),
        }
        
        let newTasks = [...tasks]

        if (sort === 'new') newTasks.unshift(newTask)
        if (sort === 'old') newTasks.push(newTask)

        setTasks(newTasks)
    }
    
    return(
        <div className={`${addTaskDivDisplay} add-task`}>
            <h2>Add A Task</h2>

            <form onSubmit={addTask}>
            <label>
                Title: 
                <input type="text" name="title" id="title" />
            </label>

            <label>
                Description:
                <textarea></textarea>
            </label>

            <label>
                Color:
                <select name="color" id="color">
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="grey">Grey</option>
                </select>
            </label>

            <label>
                Make SubTask of:
                <select name="parenTask" id="parentTask">
                    <option value="false">None</option>
                    { 
                        tasks.map( (parent) => (
                            !parent.parentTask &&
                            <option value={ parent.id } key={ parent.id }>{ parent.title }</option>
                        ))
                    }
                    
                </select>
            </label>

            <input type="submit" value="Add" name="submit" id="submit" />
            </form>
        </div>
    )
}
