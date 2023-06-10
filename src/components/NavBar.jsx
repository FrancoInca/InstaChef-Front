import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import InstaChefLogo from "../assets/InstaChefLogo.png"
import { Link, useNavigate } from "react-router-dom"
import ListaDesplegable from "./ListaDesplegable"
import { UserAuth } from "../components/Auth-context/AuthContext"
import SearchBar from "./searchBar"
import { useState } from "react"
import SearchResults from "./searchBarResults"

function NavBar() {
  let navigate = useNavigate()
  const { user } = UserAuth()

  //SEARCHBAR
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');
  const [results, setResults] = useState([]);

  return (
    <div className="grid bg-[#1E1F22] grid-cols-[1fr_3fr_1fr] h-[80px]">
      <div className="flex items-center justify-center h-[80px]">
        <Link to={"/"}>
          <img src={InstaChefLogo} alt="InstaChefLogo"
            className="max-h-[130px] max-w-[130px]" />
        </Link>
        <Link to="/home">
          <p className="text-white">Menús</p>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <SearchBar
          input={input}
          setInput={setInput}
          select={select} setSelect={setSelect}
          results={results} setResults={setResults} />

        <SearchResults
          input={input}
          setInput={setInput}
          select={select} setSelect={setSelect}
          results={results} setResults={setResults}

        />

      </div>
      <div className="flex items-center justify-center">
        <IconContext.Provider value={{ color: "white", size: "42px" }}>
          <div><AiFillHeart /></div>
          <div><AiOutlineShoppingCart /></div>
          {
            !user ? <button onClick={() => navigate("/LogIn")}
              className="px-3 py-1.5 mx-2 text-sm text-white duration-150 bg-amber-400 rounded-lg hover:bg-amber-700 active:shadow-lg"
            >
              Iniciar sesion
            </button> : <ListaDesplegable />
          }
        </IconContext.Provider>

      </div>
    </div>
  )
}
export default NavBar