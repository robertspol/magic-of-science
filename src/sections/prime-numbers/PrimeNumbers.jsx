import NavBar from "../../NavBar";
import PrimeNumbersCalculator from "./PrimeNumbersCalculator";
import PrimeNumbersInfo from "./PrimeNumbersInfo";

const PrimeNumbers = () => {
    return (
        <section className="prime-numbers">
            <NavBar section="prime-numbers" />

            <div className="prime-numbers__wrapper">
                <h1>Tajemnica liczb pierwszych</h1>
                <PrimeNumbersInfo />
                <PrimeNumbersCalculator />
            </div>
        </section>
    );
};

export default PrimeNumbers;
