import { useEffect, useRef, useState } from "react";

const PrimeNumbersCalculator = () => {
    const [inputNumber, setInputNumber] = useState("");
    const [primeNumbers, setPrimeNumbers] = useState([]);
    const [primeNumbersLength, setPrimeNumbersLength] = useState("");

    const scrollToBottomDiv = useRef();

    useEffect(() => {
        scrollToBottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }, [primeNumbers]);

    const handleInput = (e) => {
        setInputNumber(e.target.value);
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        if (inputNumber === "") {
            alert(
                "Podaj liczbę, do której zostać mają wypisane liczby pierwsze."
            );
            return;
        }

        if (inputNumber < 2) {
            alert("Najmniejsza liczba pierwsza to 2!");
            setInputNumber("");
            return;
        }

        if (inputNumber > 100000) {
            alert("Odpuść procesorowi i wybierz wartość do 100 000 :)");
            setInputNumber("");
            return;
        }

        const maxNumber = inputNumber;
        const numbers = [];

        for (let i = 2; i <= maxNumber; i++) {
            const results = [];

            for (let j = 1; j <= i; j++) {
                const result = i / j;

                if (Number.isInteger(result)) {
                    results.push(result);
                }
            }

            if (results.length === 2) {
                numbers.push(i);
            }
        }

        const arrNumbers = numbers.map((number, i) => (
            <span key={i} className="prime-numbers__number">
                {number}
            </span>
        ));

        setInputNumber("");
        setPrimeNumbers(arrNumbers);
        setPrimeNumbersLength(arrNumbers.length);
    };

    const handleClear = (e) => {
        e.preventDefault();

        if (primeNumbers !== "") {
            setPrimeNumbers("");
            setPrimeNumbersLength("");
        }
    };

    return (
        <div className="prime-numbers__algorithm">
            <h2>Kalkulator liczb pierwszych</h2>
            <p>
                Do jakiej wartości zostać mają wypisane liczby pierwsze? Podaj
                liczbę od 2 do 100 000 i mierz siły (swojego komputera) na
                zamiary!
            </p>

            <form className="prime-numbers__form">
                <input
                    value={inputNumber}
                    type="number"
                    className="prime-numbers__input"
                    onChange={handleInput}
                    min="2"
                    max="100000"
                />

                <button
                    className="prime-numbers__btn prime-numbers__btn--count"
                    onClick={handleCalculate}
                >
                    Wypisz liczby pierwsze
                </button>

                <button
                    className="prime-numbers__btn prime-numbers__btn--clear"
                    onClick={handleClear}
                >
                    Wyczyść pole z liczbami
                </button>
            </form>

            {primeNumbers.length !== 0 && (
                <>
                    <div className="prime-numbers__numbers-wrapper">
                        {primeNumbers}
                    </div>

                    <div className="prime-numbers__length">
                        Ilość wypisanych liczb: {primeNumbersLength}
                    </div>
                </>
            )}

            <div ref={scrollToBottomDiv}></div>
        </div>
    );
};

export default PrimeNumbersCalculator;
