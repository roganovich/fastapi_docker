import HeaderBlock from "../blocks/Header"
import FooterBlock from "../blocks/Footer"

const MainLayout = ({children}) => {
    return (
        <>
        <HeaderBlock />
        {children}
        <FooterBlock />
        </>
    )
}

export default MainLayout