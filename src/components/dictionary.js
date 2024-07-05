import {useState} from  'react';
import axios from 'axios';
import './dictionary.css';

const Dictionary = () => {

    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState(null);
    const [error, setError] = useState(null);

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

    return(
        <>
        <div className='container'>
            <div className='card'>
                <div className='inputs'>
                    
                    <form onSubmit={handleSubmit}>
                        
                        <input type='text'
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder='Enter a word'
                        required
                        />

                        <div className='button'>
                            <button type='submit'>Search</button>
                        </div>
                    </form>

                    {error && <p>{error}</p>}

                    {definition && (
                        <>
                        <div className='word'>
                            <h2>{definition.word}</h2>
                        </div>
                        
                        <div className='definition'>
                            <h3>Definitions: </h3>
                            {definition.meanings.map((meaning, index) => (
                                <div key={index}>
                                    <span>{meaning.partofSpeech}</span>
                                    {meaning.definitions.map((def, idx) => (
                                        <p key={idx}>{def.definition}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                        </>
                    )}

                </div>
            </div>
        </div>
        </>
    )
 
}

export default Dictionary;