import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarProfessor({ handleCloseModal, visualizarSelecionado }) {
  const [ formData, setFormData ] = useState({
        nomeCompleto: '',
        telefone: '',
        formacao: '',
        cep: '',
        bairro: '',
        logradouro: '',
        numero: '',
        pais: '',
        estado: '',
        cidade: '',
        turno: ''
    })
  

  useEffect(() => {
    if (visualizarSelecionado) {
      setFormData(visualizarSelecionado);
    }
  }, [visualizarSelecionado]);

  return (
    <div className="body-modalVisualizarProfessor">
      <div className="modal-content">
        <h1 className='title-modalVisualizarProfessor'>Visualizar professor</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
                <label htmlFor="inputName">Nome completo</label>
              <span className='inputName'>{formData.nomeCompleto}</span>
            </div>
            <div className="campo">
                <label htmlFor="inputTelefone">Telefone</label>
              <span className='inputTelefone'>{formData.telefone}</span>
            </div>
            <div className="campo">
                <label htmlFor="inputFormacao">Formacao</label>
              <span className='inputFormacao'>{formData.formacao}</span>
            </div>
            </div>

            <div className="linha-flex">
            <div className="campo">
                <label htmlFor="inputCep">CEP</label>
              <span className='inputCep'>{formData.cep}</span>
            </div>
            <div className="campo">
                <label htmlFor="inputBairro">Bairro</label>
              <span className='inputBairro'>{formData.bairro}</span>
            </div>
            <div className="campo">
                <label htmlFor="inputLogradouro">Logradouro</label>
              <span className='inputLogradouro'>{formData.logradouro}</span>
            </div>
            <div className="campo">
                <label htmlFor="inputNumber">Número</label>
              <span className='inputNumber'>{formData.numero}</span>
            </div>
            </div>

            <div className="linha-flex">
            <div className="campo">
                <label htmlFor="selectPais">País</label>
              <span className='selectPais'>{formData.pais}</span>
            </div>
            <div className="campo">
                <label htmlFor="selectEstado">Estado</label>
              <span className='selectEstado'>{formData.estado}</span>
            </div>
            <div className="campo">
                <label htmlFor="selectCidade">Cidade</label>
              <span className='selectCidade'>{formData.cidade}</span>
            </div>
            <div className="campo">
                <label htmlFor="selectTurno">Turno</label>
              <span className='selectTurno'>{formData.turno}</span>
            </div>
        </div>

        <div className="button">
        <button className='btn-voltar' onClick={handleCloseModal}>Voltar</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ModalVisualizarProfessor;
