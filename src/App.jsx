import { createRef, useState } from "react";

function App() {

  const [usuarios, setusuarios] = useState([])

  async function buscartodos(){

    const response = await fetch("https://dummyjson.com/users")
    const data = await response.json()
    console.log(data);
    setusuarios(data.users)
  }

function mostrarinfo(usuarios){
  alert("Telefone: " + usuarios.phone + "\n E-mail: " + usuarios.email + "\n Cidade: " + usuarios.address.city)
}


  return (  
    <div>

      <h1>Consumo de API</h1>
      <p>Buscando dados da API DummyJson</p>
      <button onClick={buscartodos}> Carregar dados </button>
      

      {usuarios.length == 0 ? (
        <p>Lista vazia...</p>
      ) : (
        <ul>
          {usuarios.map((i) => ( 
            <li key={i.id}>
              Sr(a) {i.firstName} {i.lastName} tem {i.age} anos.
              <button onClick={() => mostrarinfo(i) } >Ver informações</button>
            </li>   
          ))}
        </ul>
      )}
    </div>
  );
}

export default App ;