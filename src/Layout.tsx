import { Outlet, Link } from "react-router-dom";

export function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/dnd">DragNDrop</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}