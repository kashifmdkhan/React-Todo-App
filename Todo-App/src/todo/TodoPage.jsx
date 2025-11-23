import { useState } from "react"
import TodoItem from "./TodoItem";

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

    const emptyState = (
        <h2>Nothing's Here, Add a todo</h2>
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
    <div>
        <h1 className="bg-red-500">Super Todo</h1>

        <form action="" onSubmit={handleFormSubmit}>
            <input 
            type="text" 
            name="todo" 
            placeholder="Enter Your Todo here..." 
            />
            <button>Submit</button>
        </form>

        {!isTodoEmpty &&
            <form onSubmit={handleSearchTodo}>
                <input
                type="text"
                name="search"
                placeholder="Search Todo"
                />
                <button>Search</button>
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
        {searchTodo!='' &&
            <button onClick={handleClearSearch}>Clear Search</button>
        }
        {!isSortedTodos &&
            <button onClick={handleSortTodos}>Sort Todos</button>
        }

        {!isTodoEmpty &&
        <div>
            <label>Status</label>
            <select value={filterStatus} onChange={handleStatusChange}>
                <option value='All'>All Todos</option>
                <option value='Completed'>Completed Todos</option>
                <option value='Incomplete'>Incomplete Todos</option>
            </select>
        </div>
        }

        {!isTodoEmpty && <button onClick={handleDeleteAll}>Delete All</button>}

        {!isTodoEmpty && 
            <p>{completedTodos} / {todos.length} completed</p>
        }

        {!isTodoEmpty? (
            <div>
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