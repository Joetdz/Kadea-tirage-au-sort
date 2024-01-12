import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Loader from "./component/Loader";

function App() {
  const tam = new Audio("tam2.mp3");
  const win = new Audio("win.mp3");

  const liste = [];
  localStorage.setItem("liste", liste);
  const initilaListe = localStorage.getItem("liste");
  const [winners, setWinners] = useState(liste);
  const [isLoading, setIsloaading] = useState(false);
  console.log(winners);

  const getwinner = () => {
    setIsloaading(true);
    tam.play();
    axios
      .get("https://tirage.onrender.com/")
      .then((data) => {
        const monObjet = data.data;
        const monTableau = Object.keys(monObjet).map(function (cle) {
          return [Number(cle), monObjet[cle]];
        });
        console.log(monTableau, "tab");
        setTimeout(function () {
          setIsloaading(false);
          win.play();
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
          <h2>Tirage au sort Kadea Bonana</h2>
          <div className="card">
            {isLoading ? (
              <Loader />
            ) : winners.length >= 5 ? (
              <>
                <h1>Félicitations aux gagnants ! </h1>
              </>
            ) : (
              <>
                <h1>Let's Go</h1>
                <button onClick={getwinner}>Start</button>
              </>
            )}
          </div>
        </div>
        <div className="winners-sec">
          <h2>Gagnants</h2>

          <div className="winner">
            <span>
              <strong>{winners[0] ? "" : "1"}</strong>
              {winners[0] ? winners[0][1][1] : ""}
            </span>
            <span>{winners[0] ? winners[0][2][1] : ""}</span>
          </div>
          <div className="winner">
            <strong>{winners[1] ? "" : "2"}</strong>
            <span>{winners[1] ? winners[1][1][1] : ""}</span>
            <span>{winners[1] ? winners[1][2][1] : ""}</span>
          </div>
          <div className="winner">
            <strong>{winners[2] ? "" : "3"}</strong>
            <span>{winners[2] ? winners[2][1][1] : ""}</span>
            <span>{winners[2] ? winners[2][2][1] : ""}</span>
          </div>
          <div className="winner">
            <strong>{winners[3] ? "" : "4"}</strong>
            <span>{winners[3] ? winners[3][1][1] : ""}</span>
            <span>{winners[3] ? winners[3][2][1] : ""}</span>
          </div>
          <div className="winner">
            <strong>{winners[4] ? "" : "5"}</strong>
            <span>{winners[4] ? winners[4][1][1] : ""}</span>
            <span>{winners[4] ? winners[4][2][1] : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
