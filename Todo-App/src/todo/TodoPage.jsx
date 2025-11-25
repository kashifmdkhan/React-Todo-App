import { useState } from "react"
import TodoItem from "./TodoItem";
import { Plus, Search, SortAsc, Trash, BrushCleaning, Rabbit } from "lucide-react";

const TodoPage = () => {

    // const [person,setPerson] = useState({
    //     name:"Kashif",
    //     age:25
    // })

    // function handleIncreaseAge(){
    //     // person.age++;
    //     console.log(person.age);

    //     const newPerson = {...person,age:person.age+1}

    //     setPerson(newPerson)
        
    // }

    const [todos,setTodos] = useState([]);
    const [searchTodo,setSearchTodo] = useState('');
    const [filterStatus,setFilterStatus] = useState('All')
    const isTodoEmpty = todos.length == 0;

    function handleFormSubmit(e){
        e.preventDefault();
        const todoText = e.target["todo"].value
        console.log(todoText);
        if(!todoText || todoText.trim()=='') return;

        // todos.push(todoText)//wrong way
        const newTodos = [...todos,{
            text: todoText,
            id: crypto.randomUUID(),
            completed: false,
            category:'general'
        }]
        setTodos(newTodos);

        e.target.reset();

    }

    function handleSearchTodo(e){
        e.preventDefault();

        const reqtodo = e.target['search'].value
        const matchedTodo = todos.find(item => item.text==reqtodo)

        console.log('i am searched item : ',matchedTodo);

        if(matchedTodo!=null && matchedTodo!=undefined)
        setSearchTodo(matchedTodo);
    }

    function onTodoToggle(id,checked){
        const newTodos = todos.map(todo =>{
            if(todo.id==id){
                return {...todo,completed:checked}
            }
            return todo
        })
        setTodos(newTodos)  
        console.log(todos);
              
    }

    function handleDeleteTodo(id){
        const newTodos = todos.filter(todo => todo.id !==id)
        setTodos(newTodos)
    }

    const emptyState = (<div className="flex flex-col gap-8 items-center text-secondary mt-18">
        <Rabbit/>
        <p>Your Todos are empty</p>
    </div>
    )
    const completedTodos = todos.filter(item => item.completed).length

    function handleDeleteAll(){
        setTodos([]);
    }

    const compareFunction = (a,b) => a.text.localeCompare(b.text)

    function handleSortTodos(){
        const newTodos = [...todos]
        newTodos.sort(compareFunction)
        setTodos(newTodos)
    }

    function handleUpdateTodoText(id,todoText) {
        if(!todoText || todoText.trim()=='') return;
        const newTodos = todos.map(item => {
            if(item.id===id){
                return {...item,text:todoText};
            }
            return item;
        })
        setTodos(newTodos)
    }

    function handleTodoMoveUp(index){
        if(index==0) return;
        const newTodos=[...todos]
        const temp = newTodos[index]
        newTodos[index]= newTodos[index-1];
        newTodos[index-1]=temp;
        setTodos(newTodos);
    }

    function handleTodoMoveDown(index){
        if(index===todos.length-1) return;
        const newTodos = [...todos];
        const temp = newTodos[index]
        newTodos[index] = newTodos[index+1]
        newTodos[index+1] = temp

        setTodos(newTodos)
    }

    function handleClearSearch(){
        setSearchTodo('')
    }

    function handleStatusChange(e){
        setFilterStatus(e.target.value)
    }

    function handleCategoryChange(item,e){

        const newTodos = todos.map(todo => {
            if(todo.id===item.id){
                return {...todo,category:e.target.value}
            }
            return todo;
        })
        setTodos(newTodos)
    }

    const isSortedTodos = todos.every((todo,index,arr) => {
        return index===0 || compareFunction(arr[index-1],todo) <=0
    })

    const filteredTodos = todos.filter(item => {
        if(filterStatus=='Completed') return item.completed
        if(filterStatus=='Incomplete') return !item.completed
        return true;
    })
  return (
    <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
        <h1 className=" text-center font-display text-6xl font-bold text-accent">Super Todo</h1>
        <p className="text-center text-lg font-light text-secondary">Manage your Todos with Ease</p>
        <form className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between gap-4" action="" onSubmit={handleFormSubmit}>
            <input 
            type="text" 
            name="todo" 
            placeholder="Enter Your Todo here..." 
            className="flex-1 font-body focus:outline-none"
            required
            />
            <button className="p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover"> <Plus /> </button>
        </form>

        {!isTodoEmpty &&
            <form className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between gap-4" onSubmit={handleSearchTodo}>
                <input
                type="text"
                name="search"
                placeholder="Search Todo"
                className="flex-1 font-body focus:outline-none"
                />
                <button className="p-3 bg-accent text-black rounded-lg cursor-pointer hover:bg-accent-hover"> <Search/> </button>
            </form>
        }
        {searchTodo!='' &&
            <TodoItem key={searchTodo.id} 
            item={searchTodo}
            onTodoToggle={onTodoToggle} 
            onTodoDelete={handleDeleteTodo}
            onTodoTextUpdate={handleUpdateTodoText}
            onMoveUp={handleTodoMoveUp}
            onMoveDown={handleTodoMoveDown}
            index={0}
            todosCount={1}
            />
        }
        <div className="flex justify-center items-center">
        {searchTodo!='' &&
            <button className="px-4 py-2 ring-2 ring-accent rounded-lg flex items-center gap-2
            hover:bg-yellow-400 hover:text-black cursor-pointer" onClick={handleClearSearch}>
                <BrushCleaning />
                Clear Search
                </button>
        }
        </div>
        <div className="flex justify-center gap-6">
            {!isSortedTodos &&
            <button className="px-4 py-2 ring-2 ring-accent rounded-lg flex items-center gap-2
            hover:bg-yellow-400 hover:text-black cursor-pointer" onClick={handleSortTodos}>
                <SortAsc/>
                Sort Todos
                </button>
        }

        {!isTodoEmpty && <button className="px-4 py-2 ring-2 ring-red-400 rounded-lg flex items-center gap-2
         hover:bg-red-400 hover:text-black cursor-pointer" onClick={handleDeleteAll}> 
            <Trash />
            Delete All
            </button>}
        
        </div>
        
        {!isTodoEmpty &&
        <div className="flex justify-center items-center gap-6">
            <label className="px-4 py-2 ring-2 ring-accent rounded-lg flex items-center gap-2
            hover:bg-yellow-400">Status</label>
            <select value={filterStatus} onChange={handleStatusChange}>
                <option value='All'>All Todos</option>
                <option value='Completed'>Completed Todos</option>
                <option value='Incomplete'>Incomplete Todos</option>
            </select>
        </div>
        }


        {!isTodoEmpty && 
            <p className="text-secondary text-right">
                {completedTodos} / {todos.length} completed
            </p>
        }

        {!isTodoEmpty? (
            <div className="space-y-4">
                {filteredTodos.map((item,index) => <TodoItem key={item.id} 
                item={item} 
                onTodoToggle={onTodoToggle} 
                onTodoDelete={handleDeleteTodo}
                onTodoTextUpdate={handleUpdateTodoText}
                onMoveUp={handleTodoMoveUp}
                onMoveDown={handleTodoMoveDown}
                index={index}
                todosCount={todos.length}
                onCategoryChange={handleCategoryChange}
                />)}
            </div>
         ):emptyState
        }
    </div>
  )
}

export default TodoPage