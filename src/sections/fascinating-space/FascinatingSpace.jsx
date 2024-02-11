import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../../NavBar";

const FascinatingSpace = () => {
    const [inputNumber, setInputNumber] = useState("");
    const [fetchedData, setFetchedData] = useState([]);

    const picturesNumber = useRef();

    const handleKeyDown = (e) => {
        if (e.key === 13 || e.key === "Enter") {
            e.preventDefault();
            picturesNumber.current.blur();
        }
    };

    const handleInput = (e) => {
        setInputNumber(e.target.value);
    };

    const handleFetchPictures = (e) => {
        e.preventDefault();

        if (inputNumber === "" || inputNumber < 1) {
            alert("Podaj liczbę zdjęć do wyświetlenia.");
            return;
        }

        const url = `https://api.nasa.gov/planetary/apod?count=${inputNumber}&api_key=XM5v3W8bOnlG7AVUY1UXNC34P5yQeDUCMQ94hkvx
        `;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Problem z pobraniem danych.");
                }

                return res.json();
            })
            .then((data) => {
                setFetchedData(data);
            })
            .catch((err) => {
                console.error(err);
                alert(err);
            });
    };

    const handleDisplayPictures = () => {
        return fetchedData.map((item, i) =>
            item.hdurl || item.url ? (
                <li key={i} className="fascinating-space__picture">
                    <figure>
                        <figcaption>
                            {item.title && (
                                <p className="fascinating-space__img-title">
                                    {item.title}
                                </p>
                            )}
                            {item.date && <p>Data: {item.date}</p>}
                            {item.copyright && (
                                <p>Prawa autorskie: {item.copyright}</p>
                            )}
                        </figcaption>

                        <img
                            src={item.hdurl || item.url}
                            className="fascinating-space__img"
                            alt="space"
                        />
                    </figure>
                </li>
            ) : (
                <li key={i}>Brak zdjęcia</li>
            )
        );
    };

    return (
        <section className="fascinating-space">
            <NavBar section="fascinating-space" />

            <div className="fascinating-space__wrapper">
                <h1>Magiczne zdjęcia spoza naszego podwórka</h1>

                {fetchedData.length === 0 && (
                    <p>
                        Podaj ilość zdjęć kosmosu jaką chcesz zobaczyć, a po
                        kliknięciu w rakietę zostaną losowo pobrane prosto od
                        NASA!
                    </p>
                )}

                <form className="fascinating-space__form">
                    <input
                        ref={picturesNumber}
                        value={inputNumber}
                        type="number"
                        className="fascinating-space__input"
                        onChange={handleInput}
                        min="1"
                        onKeyDown={handleKeyDown}
                    />

                    {fetchedData.length === 0 ? (
                        <div className="fascinating-space__rocket-icon-wrapper">
                            <p>
                                Wsiądź do rakiety i zacznij zwiedzanie
                                wszechświata!
                            </p>

                            <FontAwesomeIcon
                                icon={faRocket}
                                onClick={handleFetchPictures}
                                className="fa-beat-fade"
                            />
                        </div>
                    ) : (
                        <button
                            className="fascinating-space__reload-btn"
                            onClick={handleFetchPictures}
                        >
                            Pobierz kolejne zdjęcia
                        </button>
                    )}
                </form>

                {fetchedData.length !== 0 && (
                    <ul className="fascinating-space__pictures-list">
                        {handleDisplayPictures()}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default FascinatingSpace;
