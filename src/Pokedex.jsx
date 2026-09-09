import { useState } from "react";

function Pokedex() {
  const [pokemon, setPokemon] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [erro, setErro] = useState(false);

  async function buscarPokemon() {
    if (!pesquisa.trim()) return;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase().trim()}`
    );

    if (response.ok) {
      const data = await response.json();
      setPokemon(data);
      setErro(false);
    } else {
      setPokemon(null);
      setErro(true);
    }
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
      <button onClick={buscarPokemon}>🔍Pesquisar</button>

      <hr />

      {erro && <p>Pokémon não encontrado!</p>}

      {pokemon && (
        <div>
          <h2 style={{ textTransform: "capitalize" }}>
            {pokemon.name}
          </h2>

          <p>
            <strong>Tipo:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>

          <img
            src={
              pokemon.sprites.front_default ||
              pokemon.sprites.other["official-artwork"].front_default
            }
            alt={pokemon.name}
            width={200}
          />
        </div>
      )}
    </div>
  );
}

export default Pokedex;