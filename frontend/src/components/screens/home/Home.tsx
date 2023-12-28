import {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import './Home.module.scss'
import {UserContext} from '../../../providers/AuthProvider'
import MainLayout from '../../layouts/main';


function App() {
    const {user} = useContext(UserContext)
    const nav = useNavigate()

    function toLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        nav('/login')
    }

    function toLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        nav('/logout')
    }

    return (
        <>
            <MainLayout>
                <div className="header">
                    <h1>Frontend</h1>
                    {
                        user?.name ?
                            (<>
                                <h2>Welcome {user?.name}</h2>
                                <button type="button" onClick={e => toLogout(e)} className="btn btn-danger">Выйти
                                </button>
                            </>)
                            :
                            (<>
                                <button type="button" onClick={e => toLogin(e)} className="btn btn-primary">Войти
                                </button>
                            </>)
                    }
                </div>
            </MainLayout>
        </>
    )
}

export default App
