import { RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import router from './Pages/Routes/Routes';

function App() {
  return (
    <div data-theme='light'>
      <RouterProvider router={router}>
        <Home></Home>
      </RouterProvider>

    </div>
  );
}

export default App;
