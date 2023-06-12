import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function SearchResults({ results, setResults, setInput, input, select }) {


  if (results.length)
    return (
      <div className="absolute flex flex-col z-20 overflow-y-scroll scrollbar-thin scrollbar-track-yellow-800 scrollbar-thumb-primary-500 max-h-72 max-w-[640px] w-[50%] top-16 rounded-md bg-[#1E1F22] justify-between">
        {results.map((e, index) => (
          <Link
            key={e.id}
            to={`/detail/${e.id}`}
            onClick={() => {
              setResults([]);
              setInput('');
            }}>
            <div key={e.id} className={`${"flex justify-between items-center p-4 border-blue-150"} ${index === select ? "bg-primary-500" : ''} `}>
              <p>{e.name}</p>
              <img className='w-[100px] aspect-video' src={e.image} alt={e.name} />
            </div>
          </Link>
        ))
        }
      </div >
    );
  if (input)
    return (
      <div className="absolute flex items-center justify-center z-10 h-36 w- top-16 rounded-md bg-[#1E1F22] max-w-[640px] w-[40%]">
        <div className="{style.noResults}">
          <p className='text-base text-center font-bold m-0'>{`No se encontró el producto "${input.length > 8 ? input.slice(0, 8) + '...' : input}"`}</p>
        </div>
      </div>
    );
}
SearchResults.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
  setInput: PropTypes.func,
  input: PropTypes.string,
  select: PropTypes.number
};




"flex justify-between items-center max-w-xs p-4 border-blue-150"