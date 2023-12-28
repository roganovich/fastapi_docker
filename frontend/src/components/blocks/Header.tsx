
import { Link } from "react-router-dom"
import { useContext, } from "react"
import { UserContext } from "../../providers/AuthProvider"

const HeaderBlock = () => {

    const { user } = useContext(UserContext)
  
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand mt-2 mt-lg-0" to='/'>
                        <h5 className="pt-1">Home</h5>
                    </Link>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/posts'>Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/posts/new'>Add Posts</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/games/table'>Game</Link>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center justify-content-start">
                            <a className="text-reset me-3" href="#">
                                <i className="fas fa-shopping-cart text-white"></i>
                            </a>
                            <div>
                             
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {
                                        user?.name 
                                        ? 
                                        <>
                                        <li className="nav-item">
                                            <Link className="d-flex align-items-center hidden-arrow" to="/profile" >
                                                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height="25" alt="Black and White Portrait of a Man" loading="lazy" />
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/profile'>{user?.name}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/logout'>Log Out</Link>
                                        </li>
                                        </>
                                        :
                                        <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/login'>Log In</Link>
                                        </li>
                                        </>

                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HeaderBlock