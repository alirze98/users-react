import {Link} from 'react-router-dom';
const Navbar = ({user}) => {

  
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="#">
           discover
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to="/">
              Home 
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/users">
              users
            </Link>
          </li>
         {!user ? (<>
          <li class="nav-item">
          <Link class="nav-link" to="/login">
            login
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/register">
            register
          </Link>
        </li>
        </>
         ):
          (
            <>
            <li class="nav-item">
            <Link class="nav-link" to="/dashboard">
              dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/logout">
              logout
            </Link>
          </li>
          </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
