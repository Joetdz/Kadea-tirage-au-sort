import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Loader from "./component/Loader";

function App() {
  const liste = [];
  localStorage.setItem("liste", liste);
  const initilaListe = localStorage.getItem("liste");
  const [winners, setWinners] = useState(liste);
  const [isLoading, setIsloaading] = useState(false);
  console.log(winners);

  const getwinner = () => {
    setIsloaading(true);
    axios
      .get("http://localhost:8000/")
      .then((data) => {
        const monObjet = data.data;
        const monTableau = Object.keys(monObjet).map(function (cle) {
          return [Number(cle), monObjet[cle]];
        });
        console.log(monTableau, "tab");
        setTimeout(function () {
          setIsloaading(false);
          setWinners([...winners, monTableau]);
        }, 10000);

        console.log(data.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    localStorage.setItem("liste", JSON.stringify(winners));
    console.log(winners);
  }, [winners]);
  return (
    <div className="App">
      <div className="header">
        <img src={logo} />
        <h1>Une formation qui change une vie</h1>
      </div>
      <div className="main">
        <div className="tirage-sec">
          <h2>Tirage au sort 5 formations courtes gratuites à gagner</h2>
          <div className="card">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1>Let's Go</h1>
                <button onClick={getwinner}>Start</button>
              </>
            )}
          </div>
        </div>
        <div className="winners-sec">
          <h2>Winners</h2>

          <div className="winner">{winners[0] ? winners[0][0][1] : ""}</div>
          <div className="winner">{winners[1] ? winners[1][0][1] : ""}</div>
          <div className="winner">{winners[2] ? winners[2][0][1] : ""}</div>
          <div className="winner">{winners[3] ? winners[3][0][1] : ""}</div>
          <div className="winner">{winners[4] ? winners[4][0][1] : ""}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
