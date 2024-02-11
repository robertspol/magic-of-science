import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const [navVisible, setNavVisible] = useState(false);

    const menuItems = [
        { name: "Strona główna", path: "/" },
        { name: "Liczby pierwsze", path: "/prime-numbers" },
        { name: "Milionerzy nauki", path: "/science-millionaires-intro" },
        { name: "Fascynujący kosmos", path: "/fascinating-space" },
    ];

    const menu = menuItems.map((item) => (
        <li
            key={item.name}
            className={`nav-bar__li nav-bar__li--${props.section}`}
        >
            <Link to={item.path}>{item.name}</Link>
        </li>
    ));

    const handleNavBar = () => {
        setNavVisible(!navVisible);
    };

    const Nav = () => (
        <nav className={`nav-bar nav-bar--${props.section}`}>
            <ul className="nav-bar__list">{menu}</ul>
        </nav>
    );

    return (
        <>
            {navVisible && <Nav />}

            <FontAwesomeIcon
                icon={navVisible ? faX : faBars}
                className="nav-bar-icon"
                onClick={handleNavBar}
            />
        </>
    );
};

export default NavBar;
