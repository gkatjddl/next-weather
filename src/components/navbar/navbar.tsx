import './navbar.css'
import { IoSunny } from "react-icons/io5";

type Props = {}

export default function Navbar({}){
    return(
        <div>
            네비게이션 바<IoSunny className='navbar-logo-icon'/>
        </div>
    )
}

// 리액트 아이콘  
// npm install react-icons --save