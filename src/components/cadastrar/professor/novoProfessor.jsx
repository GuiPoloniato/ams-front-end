import React from 'react';
import './style.css';

function NovoProfessorModal({ handlleCloseModal }) {
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
              <label htmlFor="inputTelefone">Telefone</label>
              <input type="number" className='inputTelefone' id="inputTelefone" />
            </div>
            <div className="campo">
              <label htmlFor="inputFormacao">Formação</label>
              <input type="text" className='inputFormacao' id="inputFormacao" />
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
              <select className='selectPais' id="selectPais"></select>
            </div>
            <div className="campo">
              <label htmlFor="selectEstado">Estado</label>
              <select className='selectEstado' id="selectEstado"></select>
            </div>
            <div className="campo">
              <label htmlFor="selectCidade">Cidade</label>
              <select className='selectCidade' id="selectCidade"></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <select className='selectTurno' id="selectTurno"></select>
            </div>
          </div>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-salvar'>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NovoProfessorModal;
