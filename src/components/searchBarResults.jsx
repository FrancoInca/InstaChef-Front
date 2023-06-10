import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SearchResults({ results, setResults, setInput, input, select }) {


  if (results.length)
    return (
      <div className="absolute flex flex-col z-10 overflow-y-scroll scrollbar-thin scrollbar-track-yellow-800 scrollbar-thumb-primary-500 max-h-72 w-80 top-16 rounded-md bg-[#1E1F22]">
        {results.map((e, index) => (
          <Link
            key={e.id}
            to={`/detail/${e.id}`}
            onClick={() => {
              setResults([]);
              setInput('');
            }}>
            <div key={e.id} className="flex justify-between items-center max-w-xs p-4 border-blue-150">
              <p>{e.name}</p>
              <img className='max-w-[32%] max-h-[7%]' src={e.image} alt={e.name} />
            </div>
          </Link>
        ))}
      </div>
    );
  if (input)
    return (
      <div className="absolute flex items-center justify-center z-10 h-36 w-72 top-16 rounded-md bg-[#1E1F22]">
        <div className="{style.noResults}">
          <p className='text-base text-center font-bold m-0'>{`No se encontró el producto "${input.length > 6 ? input.slice(0, 6) + '...' : input}"`}</p>
        </div>
      </div>
    );
}
SearchResults.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
  setInput: PropTypes.func,
  input: PropTypes.string,
};
