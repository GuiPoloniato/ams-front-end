import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizar({ handlleCloseModal, estudante }) {
  const [formData, setFormData] = useState({
    matricula: '',
    nomeCompleto: '',
    dataNascimento: '',
    naturalidade: '',
    raca: '',
    cep: '',
    bairro: '',
    logradouro: '',
    numero: '',
    pais: '',
    estado: '',
    cidade: '',
    turno: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    rgResponsavel: '',
    orgao: '',
    uf: '',
    telefoneResidencial: '',
    telefoneComercial: '',
    celular: '',
    email: '',
    profissao: ''
  });

  useEffect(() => {
    if (estudante) {
      setFormData(estudante);
    }
  }, [estudante]);

  return (
    <div className="body-modalVisualizar">
      <div className="modal-content">
        <h1 className='title-modalVisualizar'>Visualizar estudante</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputMatricula">Matrícula</label>
              <span className='inputMatricula'>{formData.matricula}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputName">Nome completo</label>
              <span className='inputName' id="inputName">{formData.nomeCompleto}</span>
            </div>
            <div className="campo">
              <label htmlFor="dataInput">Data de nascimento</label>
              <span className='dataInput' id="dataInput">{formData.dataNascimento}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputNaturalidade">Naturalidade</label>
              <span className='inputNaturalidade' id="inputNaturalidade">{formData.naturalidade}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectRaca">Raça</label>
              <span className='selectRaca' id="selectRaca">{formData.raca}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputCep">CEP</label>
              <span className='inputCep' id="inputCep">{formData.cep}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputBairro">Bairro</label>
              <span className='inputBairro' id="inputBairro">{formData.bairro}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputLogradouro">Logradouro</label>
              <span className='inputLogradouro' id="inputLogradouro">{formData.logradouro}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputNumber">Número</label>
              <span className='inputNumber' id="inputNumber">{formData.numero}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectPais">País</label>
              <span className='selectPais' id="selectPais">{formData.pais}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectEstado">Estado</label>
              <span className='selectEstado' id="selectEstado">{formData.estado}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectCidade">Cidade</label>
              <span className='selectCidade' id="selectCidade">{formData.cidade}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <span className='selectTurno' id="selectTurno">{formData.turno}</span>
            </div>
          </div>

          <h2 className='h2-responsavel'>Responsável 1</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeResponsavel">Nome completo</label>
              <span className='inputNomeResponsavel' id="inputNomeResponsavel">{formData.nomeResponsavel}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputCpfResponsavel">CPF</label>
              <span className='inputCpfResponsavel' id="inputCpfResponsavel">{formData.cpfResponsavel}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputRgResponsavel">RG</label>
              <span className='inputRgResponsavel' id="inputRgResponsavel">{formData.rgResponsavel}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputOrgao">Órgão expedidor</label>
              <span className='inputOrgao' id="inputOrgao">{formData.orgao}</span>
            </div>
            <div className="campo">
              <label htmlFor="selectUf">UF</label>
              <span className='selectUf' id="selectUf">{formData.uf}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputTelefone">Telefone residencial</label>
              <span className='inputTelefone' id="inputTelefone">{formData.telefoneResidencial}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputComercial">Telefone comercial</label>
              <span className='inputComercial' id="inputComercial">{formData.telefoneComercial}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputCelular">Celular</label>
              <span className='inputCelular' id="inputCelular">{formData.celular}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <span className='inputEmail' id="inputEmail">{formData.email}</span>
            </div>
            <div className="campo">
              <label htmlFor="inputProfissao">Profissão</label>
              <span className='inputProfissao' id="inputProfissao">{formData.profissao}</span>
            </div>
          </div>

          <div className="button">
            <button className='btn-voltar' onClick={handlleCloseModal}>Voltar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalVisualizar;
