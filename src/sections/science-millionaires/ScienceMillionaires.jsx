import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { gameData } from "./science-millionaires-data";
import NavBar from "../../NavBar";

const ScienceMillionaires = () => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState("");
    const [afterAnswer, setAfterAnswer] = useState("");
    const [isOn, setIsOn] = useState(true);
    const [fiftyFifty, setFiftyFifty] = useState("");
    const [fiftyFiftyText, setFiftyFiftyText] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneText, setPhoneText] = useState("");
    const [phoneReply, setPhoneReply] = useState("");
    const [audience, setAudience] = useState("");
    const [audienceText, setAudienceText] = useState("");
    const [audienceVote, setAudienceVote] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        setData(mixData());
    }, []);

    const mixData = () => {
        const mixedData = [...gameData];

        for (let i = 0; i < gameData.length; i++) {
            const randomIndex = Math.floor(Math.random() * gameData.length);

            [mixedData[i], mixedData[randomIndex]] = [
                mixedData[randomIndex],
                mixedData[i],
            ];
        }

        return mixedData;
    };

    const makeAfter = (text, click, btnText) => (
        <div className="science-millionaires__verdict">
            <p>{text}</p>
            <button className="science-millionaires__btn-after" onClick={click}>
                {btnText}
            </button>
        </div>
    );

    const handleAnswer = (answer, correctAnswer) => {
        if (isOn) {
            setSelected(answer);

            if (answer === correctAnswer) {
                setIsOn(false);

                setAfterAnswer(
                    makeAfter(
                        "Prawidłowa odpowiedź!",
                        handleNextQuestion,
                        "Następne pytanie"
                    )
                );

                if (index === 9) {
                    setAfterAnswer(
                        makeAfter(
                            "Gratulacje - zostałeś Milionerem Nauki!",
                            handleStart,
                            "Rozpocznij grę ponownie"
                        )
                    );

                    return;
                }
            } else {
                setIsOn(false);
                setIsOver(true);

                setAfterAnswer(
                    makeAfter(
                        `Zła odpowiedź! Prawidłowa odpowiedź to ${correctAnswer}!`,
                        handleStart,
                        "Rozpocznij grę ponownie"
                    )
                );
            }
        }
    };

    const addClass = (letter) => {
        if (selected) {
            if (letter === data[index].correctAnswer) {
                return "correct";
            }

            if (selected === letter) {
                return "incorrect";
            }
        }
    };

    const makeButtons = () => {
        const buttonsData = [
            { answer: data[index].answers.a, letter: "A" },
            { answer: data[index].answers.b, letter: "B" },
            { answer: data[index].answers.c, letter: "C" },
            { answer: data[index].answers.d, letter: "D" },
        ];

        if (fiftyFifty) {
            const buttons = buttonsData.map((btn) => (
                <button
                    key={btn.answer}
                    className={`science-millionaires__answer ${addClass(
                        btn.letter
                    )}`}
                    onClick={() =>
                        handleAnswer(btn.letter, data[index].correctAnswer)
                    }
                >
                    {btn.letter === wrongLetters[0] ||
                    btn.letter === wrongLetters[1] ? (
                        ""
                    ) : (
                        <span className="science-millionaires__letter">
                            {btn.letter}:
                        </span>
                    )}

                    {btn.letter === wrongLetters[0] ||
                    btn.letter === wrongLetters[1]
                        ? ""
                        : btn.answer}
                </button>
            ));

            return buttons;
        }

        const buttons = buttonsData.map((btn) => (
            <button
                key={btn.answer}
                className={`science-millionaires__answer ${addClass(
                    btn.letter
                )}`}
                onClick={() =>
                    handleAnswer(btn.letter, data[index].correctAnswer)
                }
            >
                <span className="science-millionaires__letter">
                    {btn.letter}:
                </span>
                {btn.answer}
            </button>
        ));

        return buttons;
    };

    const handleNextQuestion = () => {
        setIndex(index + 1);
        setSelected("");
        setAfterAnswer("");
        setFiftyFiftyText("");
        setPhoneText("");
        setPhoneReply("");
        setAudienceText("");
        setAudienceVote([]);
        setWrongLetters([]);
        setIsOn(true);
    };

    const handleStart = () => {
        setData(mixData());
        setIndex(0);
        setSelected("");
        setAfterAnswer("");
        setFiftyFifty("");
        setFiftyFiftyText("");
        setPhone("");
        setPhoneText("");
        setPhoneReply("");
        setAudience("");
        setAudienceText("");
        setAudienceVote([]);
        setWrongLetters([]);
        setIsOn(true);
        setIsOver(false);
    };

    const printData = data.map((item) => (
        <div key={item.question} className="science-millionaires__qa-wrapper">
            <p>Pytanie nr {index + 1}</p>
            <div className="science-millionaires__question">
                {item.question}
            </div>

            <div className="science-millionaires__answers-wrapper">
                {makeButtons()}
            </div>
        </div>
    ));

    const handleFiftyFifty = () => {
        if (isOn) {
            if (!fiftyFifty && !isOver) {
                setFiftyFifty("fifty-fifty");

                const letters = ["A", "B", "C", "D"];

                const wrongLetters = letters.filter(
                    (answer) => answer !== data[index].correctAnswer
                );

                const randomIndex = Math.floor(Math.random() * 3);
                wrongLetters.splice(randomIndex, 1);

                setWrongLetters(wrongLetters);
            } else {
                setFiftyFiftyText(
                    <p className="science-millionaires__lifeline-text">
                        Użyłeś już koła ratunkowego pół na pół!
                    </p>
                );
            }
        }
    };

    const handlePhone = () => {
        if (isOn) {
            if (!phone && !isOver) {
                setPhone("phone");

                const randomNum = Math.random();

                if (randomNum > 0.5) {
                    setPhoneReply("yes");
                } else {
                    setPhoneReply("no");
                }
            } else {
                setPhoneText(
                    <p className="science-millionaires__lifeline-text">
                        Użyłeś już koła ratunkowego telefon do przyjaciela!
                    </p>
                );
            }
        }
    };

    const handlePhoneReply = () => {
        if (phoneReply === "") return;

        if (phoneReply === "yes") {
            return (
                <p className="science-millionaires__phone-reply">
                    Cześć! Jestem w stanie Ci pomóc. Prawidłowa odpowiedź to{" "}
                    {data[index].correctAnswer}!
                </p>
            );
        } else {
            return (
                <div className="science-millionaires__phone-reply">
                    <p>
                        Przyjaciel: Niestety nie znam odpowiedzi na to
                        pytanie...
                    </p>
                </div>
            );
        }
    };

    const handleAudience = () => {
        if (isOn) {
            if (!audience && !isOver) {
                setAudience("audience");

                let correctAnswer = "";

                switch (data[index].correctAnswer) {
                    case "A":
                        correctAnswer = 0;
                        break;
                    case "B":
                        correctAnswer = 1;
                        break;
                    case "C":
                        correctAnswer = 2;
                        break;
                    case "D":
                        correctAnswer = 3;
                        break;
                    default:
                        return;
                }

                const audienceVote = [10, 20, 30, 40];

                for (let i = audienceVote.length - 1; i > 0; i--) {
                    const change = Math.floor(Math.random() * 20 - 10);

                    audienceVote[i] += change;
                    audienceVote[i - 1] -= change;

                    [audienceVote[3], audienceVote[correctAnswer]] = [
                        audienceVote[correctAnswer],
                        audienceVote[3],
                    ];
                }

                setAudienceVote(audienceVote);
            } else {
                setAudienceText(
                    <p className="science-millionaires__lifeline-text">
                        Użyłeś już koła ratunkowego pytanie do publiczności!
                    </p>
                );
            }
        }
    };

    const handleAudienceVote = () => {
        if (audienceVote.length === 0) return;

        const letters = ["A", "B", "C", "D"];

        const bars = audienceVote.map((vote, i) => (
            <div key={i} className="science-millionaires__bar-wrapper">
                <div
                    className="science-millionaires__bar"
                    style={{ height: `${vote}%` }}
                >
                    <div className="science-millionaires__percent">{vote}%</div>
                </div>

                <div className="science-millionaires__vote-letter">
                    {letters[i]}
                </div>
            </div>
        ));

        return <div className="science-millionaires__chart">{bars}</div>;
    };

    const audienceImg = [];

    for (let i = 0; i < 3; i++) {
        audienceImg.push(
            <div
                key={i}
                className={`science-millionaires__audience-body${i + 1}`}
            >
                <div className="science-millionaires__audience-head"></div>
                <div className="science-millionaires__audience-neck"></div>
                <div className="science-millionaires__audience-corps"></div>
            </div>
        );
    }

    const lifelinesData = [
        { name: "fifty-fifty", img: "50:50", click: handleFiftyFifty },
        {
            name: "phone",
            img: <FontAwesomeIcon icon={faPhoneVolume} />,
            click: handlePhone,
        },
        {
            name: "audience",
            img: audienceImg,
            click: handleAudience,
        },
    ];

    // const lifelines = lifelinesData.map((lifeline) => (
    //     <div
    //         key={lifeline.name}
    //         className={`science-millionaires__lifeline ${
    //             (fiftyFifty && fiftyFifty === lifeline.name) ||
    //             (phone && phone === lifeline.name) ||
    //             (audience && audience === lifeline.name)
    //                 ? "science-millionaires__lifeline--used"
    //                 : ""
    //         } ${
    //             lifeline.name === "phone" &&
    //             "science-millionaires__lifeline--phone"
    //         } ${
    //             lifeline.name === "audience" &&
    //             "science-millionaires__lifeline--audience"
    //         }`}
    //         onClick={lifeline.click}
    //     >
    //         {lifeline.img}
    //     </div>
    // ));

    const lifelines = lifelinesData.map((lifeline) => (
        <div
            key={lifeline.name}
            className={`science-millionaires__lifeline ${
                (fiftyFifty && fiftyFifty === lifeline.name) ||
                (phone && phone === lifeline.name) ||
                (audience && audience === lifeline.name)
                    ? "science-millionaires__lifeline--used"
                    : ""
            } ${
                lifeline.name === "fifty-fifty"
                    ? "science-millionaires__lifeline--fifty-fifty"
                    : ""
            } ${
                lifeline.name === "phone"
                    ? "science-millionaires__lifeline--phone"
                    : ""
            } ${
                lifeline.name === "audience"
                    ? "science-millionaires__lifeline--audience"
                    : ""
            }`}
            onClick={lifeline.click}
        >
            {lifeline.img}
        </div>
    ));

    return (
        <div className="science-millionaires">
            <button
                className="science-millionaires__start-over"
                onClick={handleStart}
            >
                Zacznij od nowa
            </button>

            <NavBar section="science-millionaires" />

            <div className="science-millionaires__wrapper">
                <div className="science-millionaires__lifelines-wrapper">
                    {lifelines}
                </div>

                {printData[index]}

                {fiftyFiftyText && !isOver && fiftyFiftyText}
                {phoneText && !isOver && phoneText}
                {audienceText && !isOver && audienceText}

                {handlePhoneReply()}
                {handleAudienceVote()}

                {afterAnswer}
            </div>
        </div>
    );
};

export default ScienceMillionaires;
