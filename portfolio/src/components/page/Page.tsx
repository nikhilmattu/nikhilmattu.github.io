import React from "react"
import NavBar from "../NavBar/NavBar";

type Props = {
    children?: JSX.Element
}

const Page: React.FC<Props> = ({children}) => {
    // const location = useLocation();
    // console.log(location)

    return <div className="Page">
        <NavBar />
        {children}
    </div>
}

export default Page