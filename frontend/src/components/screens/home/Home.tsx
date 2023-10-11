import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../providers/AuthProvider'
import MainLayout from '../../layouts/main';
import styles from './Home.module.scss'

function App() {
  const { user, setUser } = useContext(AuthContext)
  const nav = useNavigate()

  function toLogin(e: any) {
    nav('/login')
  }

  function toLogout(e: any) {
    nav('/logout')
  }

  return (
    <>
      <MainLayout>
        <div className="container-fluid">
          <div className={styles.header}>
            <h1>Frontend</h1>
            {
              user?.name ?
                (<>
                  <h2>Welcome {user?.name}</h2>
                  <button type="button" onClick={e => toLogout(e)} className="btn btn-danger">Выйти</button>
                </>)
                :
                (<>
                  <button type="button" onClick={e => toLogin(e)} className="btn btn-primary">Войти</button>
                </>)
            }
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default App
