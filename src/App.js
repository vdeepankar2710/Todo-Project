import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer';
import AddTodo from './components/AddTodo/AddTodo';
import TodoCard from './components/TodoCard/TodoCard';

function App() {
  return (
    <div className="App">
      <MainContainer />
      {/* <AddTodo /> */}
      {/* <TodoCard /> */}
    </div>
  );
}

export default App;
