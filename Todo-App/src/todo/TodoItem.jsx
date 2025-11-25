import { Check, ChevronDown, ChevronUp, SquarePen, Trash, X } from 'lucide-react';
import React, { useState } from 'react'
import CheckBox from './CheckBox';

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
        <div className='flex justify-between items-center bg-gray-900 px-4 py-2'>
            <form className='flex-1 flex items-center gap-2 px-2 ' onSubmit={handleEditFormSubmitted}>
                <input className='flex-1 border-2 border-secondary px-4 py-2 rounded-lg font-body' type="text" name='todo'defaultValue={item.text} />
                <button><Check/></button>
            </form>
            <button className = 'text-red-400' onClick={()=>setShowEditTodo(false)}><X/></button>
        </div>
    )
    const todoItemDiv = (
        <div className='flex  items-center justify-between gap-4 hover:bg-gray-700 rounded-lg px-4 py-2 group'>
            <div className='flex flex-col gap-1 text-secondary'>
                 <button className='hover:bg-gray-700 rounded-md p-1 cursor-pointer' disabled={index==0} onClick={()=>onMoveUp(index)}>
                    <ChevronUp/>
                    </button>
                 <button className='hover:bg-gray-700 rounded-md p-1 cursor-pointer'disabled={todosCount==index+1} onClick={()=>onMoveDown(index)}>
                    <ChevronDown/>
                 </button>
            </div>
        <div className='flex-1 flex items-center gap-4'>
        <CheckBox id={item.id} checked={item.completed} onChange={(e)=>onTodoToggle(item.id,e.target.checked)} label={item.text}/>
        </div>

        <div className='flex items-center gap-4'>
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
        </div>
        <div className='hidden group-hover:flex gap-4'>     
            <button onClick={() => setShowEditTodo(true)}>
                <SquarePen />
            </button>
            <button className='text-red-400' onClick={()=> onTodoDelete(item.id)}>
                <Trash/>
            </button>
        </div>
        
    </div>
    )

  return (
    <div className='border-t border-secondary '>
        {showEditTodo ? todoEditForm: todoItemDiv}
    </div>
  )
}

export default TodoItem