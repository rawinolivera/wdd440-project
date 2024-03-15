import Nav from "./nav"
import Login from "./login"
import Search from "./search"
import ShoppingCart from "./shopping-cart"
export default function Header(){
    return(
    <div>
        <div>
            <h1>This is a logo</h1>
        </div>
        <div>
            <Search />
        </div>
        <div>
            <Nav />
        </div>
        <div>
            <ShoppingCart />
        </div>
        <div>
            <Login />
        </div>
    </div>

    )
}