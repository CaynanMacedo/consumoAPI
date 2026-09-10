import { useEffect, useState } from "react";

function App() {
  const [usuarios, setusuarios] = useState([]);
  const [pesquisa, setpesquisa] = useState("");
  async function buscartodos() {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    setusuarios(data.users);
  }
  function mostrarinfo(usuario) {
    alert(
      "Telefone: " +
        usuario.phone +
        "\n E-mail: " +
        usuario.email +
        "\n Cidade: " +
        usuario.address.city
    );
  }
  async function buscarNome(nome) {
    const resposta = await fetch(`https://dummyjson.com/users/search?q=${nome}`);
    const dados = await resposta.json();
    setusuarios(dados.users); 
  }
  
  useEffect(() => {
    buscartodos();
  }, []);

  
  return (
    <div>
      <h1>Consumo de API</h1>
      <p>Buscando dados da API DummyJson</p>

      <hr />

      <input
        value={pesquisa}
        onChange={(e) => setpesquisa(e.target.value)}
        placeholder="Digite seu nome..."
      />
      <button onClick={() => buscarNome(pesquisa)}>🔍Pesquisar</button>

      {usuarios.length == 0 ? (
        <p>Lista vazia...</p>
      ) : (
        <ul>

          {usuarios.map((i) => (
            <li key={i.id}>
              <img
                width= {50}
                src={`https://api.dicebear.com/10.x/initials/svg?seed=${i.firstName}`}
                alt={i.lastName}
                width={30}
              />{" "}
              Sr(a) {i.firstName} {i.lastName} tem {i.age} anos.
              <button onClick={() => mostrarinfo(i)} > Ver informações </button>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default App;