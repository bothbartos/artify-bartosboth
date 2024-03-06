import { Link, Outlet } from "react-router-dom"
export default function Layout(){
  return (
    <div className="navDiv">
      <nav className="navBar">
        <ul>
          <li><Link to={"/"}>ARTIFY</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}