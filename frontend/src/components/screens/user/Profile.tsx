
import { useContext } from "react"
import { AuthContext } from '../../../providers/AuthProvider'
import MainLayout from '../../layouts/main'

const Profile = () => {
    const { user, setUser } = useContext(AuthContext)

    return (
        <>
        <MainLayout>
            <div className="card" style={
                    {
                        width: '18rem'
                    }
                }>
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="card-img-top" alt="{post.title}" />
                    <div className="card-body">
                        <h5 className="card-title">#{user.id}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{user.name}</li>
                            <li className="list-group-item">{user.email}</li>
                        </ul>
                    </div>
                </div>
        </MainLayout>
        </>
    )
}

export default Profile