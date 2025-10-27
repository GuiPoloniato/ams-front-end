import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarProfessor({ handleCloseModal, visualizarSelecionado }) {
  const [formData, setFormData] = useState({
    nome: '',
    formacao: '',
    telefone: '',
    email: '',
    cep: '',
    bairro: '',
    logradouro: '',
    numero: '',
    pais: '',
    uf: '',
    cidade: ''
  });

  const formatValue = (valor) => valor ? valor : 'NAO INFORMADO';

  useEffect(() => {
    if (visualizarSelecionado) {
      const endereco = visualizarSelecionado.endereco || {};

      setFormData({
        nome: visualizarSelecionado.nome || 'NAO INFORMADO',
        formacao: visualizarSelecionado.formacao || 'NAO INFORMADO',
        telefone: visualizarSelecionado.telefone || 'NAO INFORMADO',
        email: visualizarSelecionado.email || 'NAO INFORMADO',
        cep: endereco.cep || 'NAO INFORMADO',
        bairro: endereco.bairro || 'NAO INFORMADO',
        logradouro: endereco.logradouro || 'NAO INFORMADO',
        numero: endereco.numero || 'NAO INFORMADO',
        pais: endereco.pais || 'NAO INFORMADO',
        uf: endereco.uf || 'NAO INFORMADO',
        cidade: endereco.cidade || 'NAO INFORMADO'
      });
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
              <label>Nome completo</label>
              <span className='inputName'>{formatValue(formData.nome)}</span>
            </div>
            <div className="campo">
              <label>Formação</label>
              <span className='inputFormacao'>{formatValue(formData.formacao)}</span>
            </div>
            <div className="campo">
              <label>Telefone</label>
              <span className='inputTelefone'>{formatValue(formData.telefone)}</span>
            </div>
            <div className="campo">
              <label>Email</label>
              <span className='inputEmail'>{formatValue(formData.email)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>CEP</label>
              <span className='inputCep'>{formatValue(formData.cep)}</span>
            </div>
            <div className="campo">
              <label>Bairro</label>
              <span className='inputBairro'>{formatValue(formData.bairro)}</span>
            </div>
            <div className="campo">
              <label>Logradouro</label>
              <span className='inputLogradouro'>{formatValue(formData.logradouro)}</span>
            </div>
            <div className="campo">
              <label>Número</label>
              <span className='inputNumber'>{formatValue(formData.numero)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>País</label>
              <span className='selectPais'>{formatValue(formData.pais)}</span>
            </div>
            <div className="campo">
              <label>Estado</label>
              <span className='selectEstado'>{formatValue(formData.uf)}</span>
            </div>
            <div className="campo">
              <label>Cidade</label>
              <span className='selectCidade'>{formatValue(formData.cidade)}</span>
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
