import React from "react"
import NavBar from "../NavBar/NavBar";
import {PageWrapper} from './styles'

type Props = {
    children?: JSX.Element
}

const Page: React.FC<Props> = ({children}) => {
    return <PageWrapper>
        <NavBar />
        {children}
    </PageWrapper>
}

export default Page