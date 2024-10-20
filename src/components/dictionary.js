import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [animateState, setAnimateState] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const fetchDefinition = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}${word}`
      );
      setDefinition(response.data[0]);
      setError(null);
    } catch (e) {
      setError("Sorry, Word not Found.");
      setDefinition(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDefinition();
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const triggerAnimation = () => {
    setAnimateState(false);
    setTimeout(() => setAnimateState(true), 0);
  };

  useEffect(() => {
    if (definition) {
      triggerAnimation();
    }
  }, [definition]);

  useEffect(() => {
    if (word) {
      localStorage.setItem("word", word); // No need to JSON.stringify a simple string
    }
    if (definition) {
      localStorage.setItem("definition", JSON.stringify(definition)); // Keep this as it is
    }
  }, [word, definition]);

  useEffect(() => {
    const storedWord = localStorage.getItem("word");
    const storedDefinition = localStorage.getItem("definition");

    if (storedWord) {
      setWord(storedWord); // This is already a string, so no need to parse it
    }
    if (storedDefinition) {
      setDefinition(JSON.parse(storedDefinition)); // Parsing required because it's stored as a JSON string
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-[khaki]">
        <div className="relative w-[250px] h-[90vh] flex flex-col items-center justify-start rounded-[50px] overflow-y-auto gap-[20px] bg-[lightgoldenrodyellow] p-[20px] md:w-[400px] md:h-[85vh] xl:w-[400px] xl:h-[85vh]">
          <div className="justify-self-start">
            <h1 className="text-xl text-black font-extrabold uppercase">
              Dictionary
            </h1>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-[20px]">
            <form onSubmit={handleSubmit}>
              <div className="text-input">
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Enter a word"
                  required
                  className="w-52 h-8 text-center text-black font-bold uppercase rounded-[50px] mb-[20px]"
                />
              </div>

              <div className="w-full flex items-center justify-center ">
                <button
                  type="submit"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative flex items-center justify-center w-32 h-10 bg-black text-white rounded-full transition-colors duration-300 hover:bg-white hover:text-black hover:transition-[2s]"
                >
                  {isHover ? (
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  ) : (
                    "search"
                  )}
                </button>
              </div>
            </form>
            {error && <p>{error}</p>}
            {definition &&
              definition.meanings &&
              Array.isArray(definition.meanings) && (
                <div
                  className={`definitions-container w-full h-full ${
                    animateState ? "animate-pop-up" : ""
                  }`}
                >
                  <div
                    className={`word text-center font-extrabold uppercase ${
                      animateState ? "animate-pop-up" : ""
                    }`}
                  >
                    <h2>{definition.word}</h2>
                  </div>

                  <div
                    className={`definition mt-[20px] ${
                      animateState ? "animate-pop-up" : ""
                    }`}
                  >
                    <h3 className="font-extrabold">Definitions:</h3>
                    {definition.meanings.map((meaning, index) => (
                      <div key={index}>
                        <span>{meaning.partofSpeech}</span>
                        {meaning.definitions.map((def, idx) => (
                          <p key={idx}>{def.definition}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dictionary;
