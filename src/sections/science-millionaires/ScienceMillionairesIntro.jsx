import { Link } from "react-router-dom";
import NavBar from "../../NavBar";

const ScienceMillionairesIntro = () => {
    return (
        <section className="science-millionaires-intro">
            <NavBar section="science-millionaires" />

            <div className="science-millionaires-intro__wrapper">
                <h1>Milionerzy nauki</h1>

                <p>
                    Odpowiedz na 10 pytań z dziedziny nauki i zostań Milionerem
                    nauki!
                </p>

                <div className="science-millionaires-intro__rules">
                    <p>
                        Skorzystać możesz z 3 kół ratunkowych, z których każdego
                        użyć można tylko 1 raz. Poniżej opis każdego z nich.
                    </p>

                    <ul>
                        <li>
                            <h2>Pół na pół</h2>
                            <p>
                                Usunięte zostają dwie błędne odpowiedzi i
                                pozostają jedna prawidłowa i jedna błędna.
                            </p>
                        </li>
                        <li>
                            <h2>Telefon do przyjaciela</h2>
                            <p>
                                Wykonany zostaje telefon do wyznaczonej przed
                                programem osoby z nadzieją, że zna odpowiedź na
                                pytanie...
                            </p>
                        </li>
                        <li>
                            <h2>Pytanie do publiczności</h2>
                            <p>
                                Publiczność zgromadzona na widowni głosuje na
                                wybraną odpowiedź, po czym gracz może
                                przeanalizować procentowy wykres głosów.
                            </p>
                        </li>
                    </ul>
                </div>

                <Link
                    to="/science-millionaires"
                    className="science-millionaires-intro__start"
                >
                    Rozpocznij grę
                </Link>
            </div>
        </section>
    );
};

export default ScienceMillionairesIntro;
