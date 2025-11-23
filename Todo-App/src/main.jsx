import { createRoot } from 'react-dom/client'
import './index.css'
import TodoPage from './todo/TodoPage'

createRoot(document.getElementById('root')).render(
    <TodoPage />
)
