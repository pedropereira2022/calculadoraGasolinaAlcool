import { FormEvent, useState } from "react";
import "./App.css";
import logoImg from "./assets/logo.png";

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calcular(event: FormEvent) {
    event.preventDefault();
    const calculo = alcoolInput / gasolinaInput;
    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar álcool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    } else {
      setInfo({
        title: "Compensa usar gasolina!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      });
    }
  }

  function formatarMoeda(value: number) {
    const valorFormatado = value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    return valorFormatado;
  }

  return (
    <div>
      <main className="container">
        <img
          className="logo"
          src={logoImg}
          alt="logo da calculadora de gasolina ou álcool"
        />
        <h1 className="title">Qual a melhor opção?</h1>
        <form action="" className="form" onSubmit={calcular}>
          <label htmlFor="">Àlcool (preço por litro): </label>
          <input
            type="number"
            className="input"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />
          <label htmlFor="">Gasolina (preço por litro): </label>
          <input
            type="number"
            className="input"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />
          <input type="submit" value="Calcular" className="button" />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">{info?.title}</h2>
            <span>Álcool {info?.alcool}</span>
            <span>Gasolina {info?.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
