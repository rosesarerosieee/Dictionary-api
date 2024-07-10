import {useState, useEffect} from  'react';
import axios from 'axios';
import './dictionary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

const Dictionary = () => {

    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState(null);
    const [error, setError] = useState(null);
    const [animateState, setAnimateState] = useState(false);

    const fetchDefinition = async () => {
        try{

            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            setDefinition(response.data[0]);
            setError(null);

        } catch(e){
            setError('Sorry, Word not Found.');
            setDefinition(null);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchDefinition();
        setWord('');
    }

    const triggerAnimation = () => {
        setAnimateState(false);
        setTimeout(() => setAnimateState(true), 0);
    };

    useEffect(() => {
        if(definition){
            triggerAnimation();
        }
    },[definition]);

    return(
        <>
        <div className='container flex items-center justify-center flex-col w-screen h-screen'>
          <h1 className='tittle text-xl text-black font-extrabold uppercase'>Dictionary</h1>  
            <div className='card mt-10'>
                <div className='inputs'>
                    <form onSubmit={handleSubmit}>
                        <div className='text-input'>
                            <input type='text'
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder='Enter a word'
                            required
                            className='w-52 h-8'
                            />
                        </div>

                        <div className='button-submit'>
                            <button type='submit' className='button w-32 h-8 bg-black text-white'>
                                <span className='button-text'>Search</span>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className='search-icon'
                                />
                            </button>
                        </div>
                    </form>

                    {error && <p>{error}</p>}

                    {definition && (
                        <div className={`definitions-container w-full h-full ${animateState ? 'pop-up' : ''}`}>
                        <div className={`word text-center font-extrabold uppercase ${animateState ? 'pop-up' : ''}`}>
                            <h2>{definition.word}</h2>
                        </div>
                        
                        <div className={`definition ${animateState ? 'pop-up' : ''}`}>
                            <h3 className='font-extrabold'>Definitions: </h3>
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
    )
 
}

export default Dictionary;