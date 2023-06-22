import axios from 'axios';
import PropType from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function SearchBar({ setResults, results, setSelect, input, setInput }) {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(-1);

  let [placeholderText, setPlaceholderText] = useState('Buscar producto')

  const handleKeyDown = (e) => {

    setPlaceholderText(input === '' && e.key === 'Enter' ? "Escribe algo" : "Buscar producto")

    const resultsLength = results.length;
    if (e.key === 'ArrowUp') {
      setActiveIndex(activeIndex === 0 ? resultsLength - 1 : activeIndex - 1);
    } else if (e.key === 'ArrowDown') {
      setActiveIndex(activeIndex === resultsLength - 1 ? 0 : activeIndex + 1);
    } else if (e.key === 'Enter' && e.target.value !== '') {
      navigate(`/detail/${results[activeIndex].id}`);
      setResults([])
      setInput("")
      setActiveIndex(-1)
    }
  };

  useEffect(() => {
    setSelect(activeIndex)
  }, [setSelect, activeIndex])


  const getData = async (value) => {
    try {
      let results = [];
      // const response = await axios.get(`http://localhost:3001/products/?name=${value}`);
      const response = await axios.get(`/products/?name=${value}`);
      if (value) results = response.data;
      setResults(results.filter((e)=>!e.banned && e.stock !== 0));
    } catch (error) {
      console.log(error.message);
      setResults([]);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    getData(value);
    setActiveIndex(-1)
  };

  return (
    <div className='relative flex items-center w-[80%] max-w-[640px] border rounded-[10px]'>
      <input type="search" placeholder={placeholderText}
        className="block text-white p-3 rounded-lg w-[100%] outline-none"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
SearchBar.propTypes = {
  setResults: PropType.func,
  input: PropType.string,
  setInput: PropType.func,
  setSelect: PropType.func,
  results: PropType.array
};
