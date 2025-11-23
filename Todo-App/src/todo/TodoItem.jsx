import React, { useState } from 'react'

const TodoItem = ({item,onTodoToggle,onTodoDelete,onTodoTextUpdate,onMoveUp,onMoveDown,index,todosCount,onCategoryChange}) => {

    const [showEditTodo,setShowEditTodo] = useState(false)

    function handleEditFormSubmitted(e){
        e.preventDefault();
        const todoText = e.target['todo'].value;
        onTodoTextUpdate(item.id, todoText);
        setShowEditTodo(false)
    }

    function handleCategoryChange(e){
        e.target.value
    }


    const todoEditForm = (
        <div>
            <form onSubmit={handleEditFormSubmitted}>
                <input type="text" name='todo'defaultValue={item.text} />
                <button>Update</button>
            </form>
            <button onClick={()=>setShowEditTodo(false)}>Cancel</button>
        </div>
    )
    const todoItemDiv = (
        <div>
        <button disabled={index==0} onClick={()=>onMoveUp(index)}>🔼</button>
        <button disabled={todosCount==index+1} onClick={()=>onMoveDown(index)}>🔽</button>
        <input 
        id={item.id}
        checked={item.completed} 
        type="checkbox" 
        onChange={(e)=>onTodoToggle(item.id,e.target.checked)}
        />
        <label
        style={{textDecoration: item.completed?'line-through':'none'}}
        htmlFor={item.id}>{item.text}</label>

        <label htmlFor='filter-category'>
            Category
        </label>
        <select id='filter-category' value={item.category} 
        onChange={(e) => onCategoryChange(item,e)}
        className={`text-sm border rounded px-2 py-1 focus:outline-none focus:border-blue-500
            ${item.category==='priority'? 'bg-red-50 text-red-500 border-red-200' : 
                item.category==='important' ? 'bg-green-50 text-green-500 border-green-200':
                'bg-yellow-50 text-yellow-500 border-yellow-200'
            }`}
        >
            <option value='general'>General</option>
            <option value='important'>Important</option>
            <option value='priority'>Priority</option>
        </select>
        <button onClick={() => setShowEditTodo(true)}>Edit</button>
        <button onClick={()=> onTodoDelete(item.id)}>
            Delete
        </button>
    </div>
    )

  return (
    <div>
        {showEditTodo ? todoEditForm: todoItemDiv}
    </div>
  )
}

export default TodoItem