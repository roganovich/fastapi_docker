import HeaderBlock from "../blocks/Header"
import FooterBlock from "../blocks/Footer"

const MainLayout = ({children}) => {
    return (
        <>
        <HeaderBlock />   
        <div className="container-fluid">
            {children}
        </div>
        <FooterBlock />
        </>
    )
}

export default MainLayout