
const FooterBlock = () => {

    return (
        <>
            <footer className="bg-primary text-center text-white ">
                <div className="text-center p-3" >
                    <a className="text-white" href="#">roganovich.online</a> © {(new Date().getFullYear())}
                </div>
            </footer>
        </>
    )
}

export default FooterBlock