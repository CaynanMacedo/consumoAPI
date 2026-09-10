import { useState, useEffect } from "react";
import './pokedex.css';

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [isShiny, setIsShiny] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Alterado limit=1025 para trazer todos os Pokémon existentes
  async function carregarIniciais() {
    setCarregando(true);
    try {
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const dados = await resposta.json();

      const promessas = dados.results.map(async (item) => {
        const res = await fetch(item.url);
        return await res.json();
      });

      const resultados = await Promise.all(promessas);
      setPokemons(resultados);
      setIsShiny(false);
    } catch (erro) {
      console.error("Erro ao carregar os Pokémon:", erro);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarIniciais();
  }, []);

  async function buscarPokemon() {
    if (!pesquisa.trim()) {
      carregarIniciais();
      return;
    }

    try {
      setCarregando(true);
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa.toLowerCase().trim()}`);
      if (resposta.ok) {
        const dados = await resposta.json();
        setPokemons([dados]);
        setIsShiny(false);
      }
    } catch (erro) {
      setPokemons([]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <h1>
        Pokedex <img src="https://art.pixilart.com/f9b3caeb88d6.png" width={30} alt="Pokeball" />
      </h1>

      <div style={{ marginBottom: "25px", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        <input
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          placeholder="Digite o nome ou ID..."
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          onClick={buscarPokemon}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#ef5350", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          Pesquisar
        </button>

        <button
          onClick={carregarIniciais}
          style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#fff", cursor: "pointer" }}
        >
          Mostrar Todos
        </button>

        <button
          onClick={() => setIsShiny(!isShiny)}
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "14px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {isShiny ? "✨ Ver Normal" : "⭐ Ver Shiny"}
        </button>
      </div>

      {carregando && (
        <p style={{ fontWeight: "bold", color: "#555", margin: "20px 0" }}>
          Carregando todos os Pokémon... Isso pode levar alguns segundos.
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", width: "100%", maxWidth: "1200px" }}>
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              width: "250px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
              textAlign: "center"
            }}
          >
            <div style={{ textAlign: "left", marginBottom: "8px" }}>
              <span style={{ fontWeight: "bold", color: "#888" }}>#{String(pokemon.id).padStart(3, '0')}</span>
            </div>

            <div style={{ backgroundColor: "#f9f9f9", borderRadius: "12px", padding: "10px", marginBottom: "12px" }}>
              <img
                width={110}
                height={110}
                src={
                  isShiny
                    ? (pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_shiny || pokemon.sprites?.front_shiny)
                    : (pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default || pokemon.sprites?.front_default)
                }
                alt={pokemon.name}
                style={{ objectFit: "contain" }}
              />
            </div>

            <h2 style={{ textTransform: "capitalize", margin: "0 0 10px 0", color: "#222", fontSize: "1.2rem" }}>
              {pokemon.name}
            </h2>

            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "12px" }}>
              {pokemon.types?.map((t) => (
                <span
                  key={t.type.name}
                  style={{
                    backgroundColor: "#eee",
                    color: "#333",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              backgroundColor: "#f9f9f9",
              padding: "8px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "10px"
            }}>
              <div>
                <div style={{ color: "#777", fontSize: "11px" }}>Altura</div>
                <strong>{pokemon.height / 10} m</strong>
              </div>
              <div>
                <div style={{ color: "#777", fontSize: "11px" }}>Peso</div>
                <strong>{pokemon.weight / 10} kg</strong>
              </div>
            </div>

            <div style={{ textAlign: "left", fontSize: "12px", backgroundColor: "#f9f9f9", padding: "8px", borderRadius: "10px" }}>
              <div style={{ color: "#777", fontSize: "11px", marginBottom: "2px" }}>Habilidades:</div>
              <strong style={{ textTransform: "capitalize" }}>
                {pokemon.abilities?.map((a) => a.ability.name).join(", ")}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokedex;