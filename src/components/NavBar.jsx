import { IconContext } from "react-icons"
import { AiOutlineShoppingCart } from "react-icons/ai"
import InstaChefLogo from "../assets/InstaChefLogo.png"
import { Link } from "react-router-dom"
import ListaDesplegable from "./ListaDesplegable"
import { UserAuth } from "../components/Auth-context/AuthContext"
import SearchBar from "./searchBar"
import { useState } from "react"
import SearchResults from "./searchBarResults"
import LogIn from "./authentication/Log-In"
import SignUp from "./authentication/SignUp"

function NavBar() {
  const { user } = UserAuth()

  //SEARCHBAR
  const [input, setInput] = useState('');
  const [select, setSelect] = useState(-1);
  const [results, setResults] = useState([]);

  //POP UP LOGIN/ REGISTER

  const [triggerPopUp, setTriggerPopUp] = useState(false);
  const [triggerPopUpSignUp, setTriggerPopUpSignUp] = useState(false);

  return (
    <div className="grid bg-[#1E1F22] grid-cols-[1fr_1fr] sm:grid-cols-[1fr_3fr_1fr] h-[80px]">
      <div className="flex items-center justify-center h-[80px]">
        <Link to={"/"}>
          <img src={InstaChefLogo} alt="InstaChefLogo"
            className="max-h-[130px] max-w-[130px] bg-am" />
        </Link>
        <Link to="/home">
          <p className="text-white">Menús</p>
        </Link>
      </div>
      <div className="hidden sm:flex items-center justify-center">
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

          <Link to={"/cart"}><AiOutlineShoppingCart /></Link>
          {
            !user ?
              <>
                <LogIn
                  trigger={triggerPopUp}
                  setTrigger={setTriggerPopUp}
                  setTriggerSignUp={setTriggerPopUpSignUp}
                />
                <SignUp
                  trigger={triggerPopUpSignUp}
                  setTrigger={setTriggerPopUpSignUp}
                  setLoginTrigger={setTriggerPopUp}
                />
                <button onClick={() => { setTriggerPopUp(true) }}
                  className="px-3 py-1.5 mx-2 text-sm text-white duration-150 bg-amber-400 rounded-lg hover:bg-amber-700 active:shadow-lg"
                >
                  Iniciar sesión
                </button>
              </>
              : <ListaDesplegable />
          }
        </IconContext.Provider>

      </div>
    </div>
  )
}
export default NavBar