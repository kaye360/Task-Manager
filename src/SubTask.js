import { useState, useEffect } from "react";

export default function SubTask(props) {

    let {subTask, parentComplete, editTask, deleteTask, inputWrapper, btnWrapper, delBtnStyle, editBtnStyle, completeBtnStyle, descriptionStyle} = props
    let color

    switch (subTask.color) {
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
        padding : '0.5rem 0.6rem',
        marginLeft : '2rem',
        borderLeft : `5px solid ${color}`,
        backgroundColor : '#fafafa',
        opacity : parentComplete || subTask.complete ? '0.5' : '1',
    }


    const [title, setTitle] = useState(subTask.title)
    const [description, setDescription] = useState(subTask.description)
    const [editMode, setEditMode] = useState(false)

    useEffect( () => {
        setTitle(subTask.title)
        setDescription(subTask.description)
    }, [subTask.title, subTask.description])



    return(
        // <div style={ style }>
        //     <h4>{subTask.title}</h4>
        //     <p>{subTask.description}</p>
        // </div>

        <div style={ style }>

            <div style={ inputWrapper }>

            { editMode 
                ? <input 
                    type="text" 
                    value={title} 
                    name={`title${subTask.id}`} 
                    id={`title${subTask.id}`} 
                    onChange={ (e) => {
                        setTitle(e.target.value)
                        editTask(subTask.id, {title : e.target.value})
                    } }
                  /> 
                : <h3>{title}</h3> 
            }

            </div>

            <div style={ inputWrapper }>

            { editMode 
                ? <textarea 
                    name={`description${subTask.id}`} 
                    id={`description${subTask.id}`}
                    value={description}
                    onChange={ (e) => { 
                        setDescription(e.target.value)
                        editTask(subTask.id, {description: e.target.value})
                    }}
                  />
                : <p style={descriptionStyle}>{description}</p> 
            }

            </div>

            { editMode && 
                <div>
                    Color:
                    <select 
                      name="color" 
                      id="color"
                      defaultValue={subTask.color}
                      onChange={ (e) => {
                        editTask(subTask.id, {color : e.target.value})
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
                        deleteTask(subTask.id)
                    }}
                >
                    Delete
                </button>

                <p>
                Complete : 
                <button 
                    style={ completeBtnStyle }
                    onClick={ () => {
                        editTask(subTask.id, { complete: !subTask.complete})
                    }}
                >
                    {subTask.complete ? '☑️' : '🔲'}
                </button>
            </p>
                
            </div>        

        </div>
    )
}