import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import './styles.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCEP] = useState('');
  


  async function handleSearch(){
    if(input == ''){
      alert("Preencha algum CEP!") //inserção de CPF vazio
      return;
    }

    try {
      //send to the CEP's api the number of the input
      const response = await api.get(`${input}/json`);
      setCEP(response.data); //save the json info on the cep
      setInput(''); //clean the input
      console.log(response.data); //log for debugg
    } 
    catch (error) {
      alert("Erro, tome um café e volte mais tarde!");
      setInput('');
    }
  }
  return (
    <div className="container">
        <h1 className="Title">Buscador de CEP</h1>
          <div className="containerInput">
          <input 
          type = "text" 
          placeholder="Digite seu CEP:"
          value = {input} 
          onChange={(e)=> setInput(e.target.value)}
          />
          <button className="buttonsearch" onClick={handleSearch}>
                <FiSearch size = {25} color = "#FFF"/>
          </button>
          </div>

        {Object.keys(cep).length > 0 && (
           <main className='main'>
              <h2> Cep: {cep.cep} </h2>
              <span>Rua: {cep.logradouro}</span>
              <span>Complemento: {cep.complemento}  </span>
              <span>Bairro: {cep.bairro} </span>
              <span>Cidade: {cep.localidade}</span>
              <span>UF: {cep.uf} </span> 
              <span>DDD; {cep.ddd} </span>       
         </main>
        )};
      </div> 
    
  );
}

export default App;
