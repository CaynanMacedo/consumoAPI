import { useState } from "react";

function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

  async function buscarPokemon() {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase()}`);
    const dados = await resposta.json();
    setPokemon(dados);
  }

  return (
    <div>
      <h1>Pokedex</h1>
      <p>Pesquise um Pokemon</p>

      <input
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Digite o Pokemon..."
      />
      <button onClick={() => buscarPokemon(pesquisa)}>Pesquisar</button>

      <hr />

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <p>Tipo: {pokemon.types[0].type.name}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
}

export default Pokedex;