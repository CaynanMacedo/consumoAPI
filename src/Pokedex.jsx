import { useState } from "react";

function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [pesquisa, setPesquisa] = useState("");

  async function buscarPokemon() {
    if (!pesquisa.trim()) return;

    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase().trim()}`);
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
      <button onClick={buscarPokemon}>Pesquisar</button>

      <hr />

      {pokemon && (
        <div>
          <h2>Nome: {pokemon.name}</h2>
          
          <p>
            Tipo: {pokemon.types?.map((i) => i.type.name).join(", ")}
          </p>

          <img
            width= {200}
            src={pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default}
            alt={pokemon.name}
          />

          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
          <p>Habilidades: {pokemon.abilities?.map( i => i.ability.name + ", ") } </p>

        </div>

      )}

    </div>

  );
}

export default Pokedex;