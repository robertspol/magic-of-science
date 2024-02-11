import { Link } from "react-router-dom";

const HomePage = () => {
    const linksData = [
        {
            name: "Liczby pierwsze",
            path: "/prime-numbers",
            class: "homepage__link--prime-numbers",
        },
        {
            name: "Milionerzy nauki",
            path: "/science-millionaires-intro",
            class: "homepage__link--science-millionaires",
        },
        {
            name: "Fascynujący kosmos",
            path: "/fascinating-space",
            class: "homepage__link--fascinating-space",
        },
    ];

    const links = linksData.map((link, i) => (
        <li key={i} className={`homepage__link ${link.class}`}>
            <Link to={link.path}>{link.name}</Link>
        </li>
    ));

    return (
        <div className="homepage">
            <header>
                <h1 className="homepage__header">Magia Nauki</h1>
            </header>

            <p className="homepage__text">
                Wejdź do magicznego świata nauki, która pozwala poznawać
                otaczającą nas rzeczywistość!
            </p>

            <nav className="homepage__nav">
                <ul className="homepage__list">{links}</ul>
            </nav>
        </div>
    );
};

export default HomePage;
