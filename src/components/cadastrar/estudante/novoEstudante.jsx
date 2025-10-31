import React from 'react';
import './style.css';
import { api } from '../../../services/service';

function NovoEstudanteModal({ handlleCloseModal, onEstudanteCriado }) {
  const handleSubmit = async () => {
  const novoEstudante = {
    matricula: String(document.getElementById("inputMatricula").value),
    nome: document.getElementById("inputName").value,
    nascimento: document.getElementById("dataInput").value,
    naturalidade: document.getElementById("inputNaturalidade").value,
    raca: document.getElementById("selectRaca").value,
    turno: document.getElementById("selectTurno").value, 
    endereco: {
      cep: document.getElementById("inputCep").value,
      bairro: document.getElementById("inputBairro").value,
      logradouro: document.getElementById("inputLogradouro").value,
      numero: String(document.getElementById("inputNumber").value),
      pais: document.getElementById("selectPais").value,
      uf: document.getElementById("selectEstado").value,
      cidade: document.getElementById("selectCidade").value
    },
    responsavel: {
      nome: document.getElementById("inputNomeResponsavel").value,
      cpf: document.getElementById("inputCpfResponsavel").value,
      rg: document.getElementById("inputRgResponsavel").value,
      orgaoExpedidor: document.getElementById("inputOrgao").value,
      uf: document.getElementById("selectUf").value,
      telefoneResidencial: document.getElementById("inputTelefone").value,
      telefoneComercial: document.getElementById("inputComercial").value,
      celular: document.getElementById("inputCelular").value,
      email: document.getElementById("inputEmail").value,
      profissao: document.getElementById("inputProfissao").value,
      parentesco: document.getElementById("inputParentesco").value
    }
  };
    try {
      const response = await api.post("/alunos", novoEstudante);
      alert("Estudante cadastrado com sucesso!");

      if (onEstudanteCriado) {
        onEstudanteCriado();
      }

      handlleCloseModal();
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error);
      alert(error.response?.data?.mensagem || "Erro ao cadastrar estudante.");
    }
  };



  return (
    <div className="body-modalEstudante">
      <div className="modal-content">
        <h1 className='title-cadastroEstudante'>Cadastrar novo estudante</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputMatricula">Matrícula</label>
              <input type="number" className='inputMatricula' id="inputMatricula" />
            </div>
            <div className="campo">
              <label htmlFor="inputName">Nome completo</label>
              <input type="text" className='inputName' id="inputName" />
            </div>
            <div className="campo">
              <label htmlFor="dataInput">Data de nascimento</label>
              <input type="date" className='dataInput' id="dataInput" />
            </div>
            <div className="campo">
              <label htmlFor="inputNaturalidade">Naturalidade</label>
              <input type="text" className='inputNaturalidade' id="inputNaturalidade" />
            </div>
            <div className="campo">
              <label htmlFor="selectRaca">Raça</label>
              <select className='selectRaca' id="selectRaca">
                <option value=""></option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="parda">Parda</option>
                <option value="amarela">Amarela</option>
                <option value="indigena">Indígena</option>
              </select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputCep">CEP</label>
              <input type="text" className='inputCep' id="inputCep" />
            </div>
            <div className="campo">
              <label htmlFor="inputBairro">Bairro</label>
              <input type="text" className='inputBairro' id="inputBairro" />
            </div>
            <div className="campo">
              <label htmlFor="inputLogradouro">Logradouro</label>
              <input type="text" className='inputLogradouro' id="inputLogradouro" />
            </div>
            <div className="campo">
              <label htmlFor="inputNumber">Número</label>
              <input type="number" className='inputNumber' id="inputNumber" />
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectPais">País</label>
              <select className='selectPais' id="selectPais">
                <option value=""></option>
                <option value="brasil">Brasil</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="selectEstado">Estado</label>
              <select className='selectEstado' id="selectEstado">
                <option value=""></option>
                <option value="Go">Goias</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="selectCidade">Cidade</label>
              <select className='selectCidade' id="selectCidade">
                <option value=""></option>
                <option value="anapolis">Anápolis</option>
              </select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <select className='selectTurno' id="selectTurno">
                <option value=""></option>
                <option value="vespertino">vespertino</option>
              </select>
            </div>
          </div>

          <h2 className='h2-responsavel'>Responsável 1</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeResponsavel">Nome completo</label>
              <input type="text" className='inputNomeResponsavel' id="inputNomeResponsavel" />
            </div>
            <div className="campo">
              <label htmlFor="inputCpfResponsavel">CPF</label>
              <input type="number" className='inputCpfResponsavel' id="inputCpfResponsavel" />
            </div>
            <div className="campo">
              <label htmlFor="inputRgResponsavel">RG</label>
              <input type="number" className='inputRgResponsavel' id="inputRgResponsavel" />
            </div>
            <div className="campo">
              <label htmlFor="inputOrgao">Órgão expedidor</label>
              <input type="text" className='inputOrgao' id="inputOrgao" />
            </div>
            <div className="campo">
              <label htmlFor="selectUf">UF</label>
              <select className='selectUf' id="selectUf">
                <option value=""></option>
                <option value="GO">GO</option>
              </select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputTelefone">Telefone residencial</label>
              <input type="number" className='inputTelefone' id="inputTelefone" />
            </div>
            <div className="campo">
              <label htmlFor="inputComercial">Telefone comercial</label>
              <input type="number" className='inputComercial' id="inputComercial" />
            </div>
            <div className="campo">
              <label htmlFor="inputCelular">Celular</label>
              <input type="number" className='inputCelular' id="inputCelular" />
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className='inputEmail' id="inputEmail" />
            </div>
            <div className="campo">
              <label htmlFor="inputProfissao">Profissão</label>
              <input type="text" className='inputProfissao' id="inputProfissao" />
            </div>
            <div className="campo">
              <label htmlFor="inputParentesco">Parentesco</label>
              <input type="text" className='inputParentesco' id="inputParentesco" />
            </div>
          </div>

          <button className="button-responsavel">Adicionar responsável</button>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar' onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoEstudanteModal;
