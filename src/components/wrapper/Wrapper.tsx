import { Navbar } from "../navbar";

type Props = {
    children: React.ReactNode;
}

export const Wrapper = (props: Props) => {


    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}