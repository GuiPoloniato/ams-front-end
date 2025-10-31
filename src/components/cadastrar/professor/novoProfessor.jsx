import React from 'react';
import { api } from '../../../services/service';

import './style.css';

function NovoProfessorModal({ handlleCloseModal, onProfessoresCriados}) {
  const handleSubmit = async () => {
    const novoProfessor = {
      nome: document.getElementById("inputNome")?.value,
      formacao: document.getElementById("inputFormacao")?.value,
      telefone: document.getElementById("inputTelefone")?.value,
      email: document.getElementById("inputEmail")?.value,
      endereco: {
        cep: document.getElementById("inputCep")?.value,
        bairro: document.getElementById("inputBairro")?.value,
        logradouro: document.getElementById("inputLogradouro")?.value,
        numero: String(document.getElementById("inputNumber")?.value),
        pais: document.getElementById("selectPais")?.value,
        uf: document.getElementById("selectEstado")?.value,
        cidade: document.getElementById("selectCidade")?.value
      },
    };

    if (!novoProfessor.nome || !novoProfessor.formacao || !novoProfessor.telefone) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }


    try {
      const response = await api.post("/professores", novoProfessor);
      alert("professor cadastrado com sucesso!");

      if (onProfessoresCriados) {
        onProfessoresCriados();
      }
      
      handlleCloseModal();
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      alert(error.response?.data?.mensagem || "Erro ao cadastrar professor.");
    }
  };


  return (
    <div className="body-modalProfessor">
      <div className="modal-content">
        <h1 className='title-cadastroProfessor'>Cadastrar novo professor</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNome">Nome completo</label>
              <input type="text" className='inputNome' id="inputNome" />
            </div>
            <div className="campo">
              <label htmlFor="inputFormacao">Formação</label>
              <input type="text" className='inputFormacao' id="inputFormacao" />
            </div>
            <div className="campo">
              <label htmlFor="inputTelefone">Telefone</label>
              <input type="number" className='inputTelefone' id="inputTelefone" />
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input type="text" className='inputEmail' id="inputEmail" />
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
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar' onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoProfessorModal;
