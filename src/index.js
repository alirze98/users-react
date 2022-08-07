import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import {UsersContextProvider} from './store/usersContext';
ReactDOM.render(<UsersContextProvider>
    <BrowserRouter><App /></BrowserRouter>
</UsersContextProvider>,document.getElementById("root"))