import React, { useState, useEffect } from 'react';
import './style.css';

function ModalVisualizarEstudante({ handleCloseModal, visualizarSelecionado }) {
  const [formData, setFormData] = useState({
    id: '',
    matricula: '',
    nome: '',
    nascimento: '',
    naturalidade: '',
    raca: '',
    turno: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    cep: '',
    serie: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    rgResponsavel: '',
    orgaoExpedidor: '',
    uf: '',
    telefoneResidencial: '',
    telefoneComercial: '',
    celular: '',
    email: '',
    profissao: '',
    parentesco: ''
  });

  const formatValue = (valor) => valor ? valor : 'NAO INFORMADO';

  useEffect(() => {
    if (visualizarSelecionado) {
      const aluno = visualizarSelecionado;
      const endereco = aluno.endereco || {};
      const responsavel = aluno.responsavel || {};

      setFormData({
        id: aluno.id || 'NAO INFORMADO',
        matricula: aluno.matricula || 'NAO INFORMADO',
        nome: aluno.nome || 'NAO INFORMADO',
        nascimento: aluno.nascimento || 'NAO INFORMADO',
        naturalidade: aluno.naturalidade || 'NAO INFORMADO',
        raca: aluno.raca || 'NAO INFORMADO',
        turno: aluno.turno || 'NAO INFORMADO',
        serie: aluno.turma || 'NAO INFORMADO',
        logradouro: endereco.logradouro || 'NAO INFORMADO',
        numero: endereco.numero || 'NAO INFORMADO',
        bairro: endereco.bairro || 'NAO INFORMADO',
        cidade: endereco.cidade || 'NAO INFORMADO',
        estado: endereco.uf || 'NAO INFORMADO',
        pais: endereco.pais || 'NAO INFORMADO',
        cep: endereco.cep || 'NAO INFORMADO',
        nomeResponsavel: responsavel.nome || 'NAO INFORMADO',
        cpfResponsavel: responsavel.cpf || 'NAO INFORMADO',
        rgResponsavel: responsavel.rg || 'NAO INFORMADO',
        orgaoExpedidor: responsavel.orgaoExpedidor || 'NAO INFORMADO',
        uf: responsavel.uf || 'NAO INFORMADO',
        telefoneResidencial: responsavel.telefoneResidencial || 'NAO INFORMADO',
        telefoneComercial: responsavel.telefoneComercial || 'NAO INFORMADO',
        celular: responsavel.celular || 'NAO INFORMADO',
        email: responsavel.email || 'NAO INFORMADO',
        profissao: responsavel.profissao || 'NAO INFORMADO',
        parentesco: responsavel.parentesco || 'NAO INFORMADO'
      });
    }
  }, [visualizarSelecionado]);

  return (
    <div className="body-modalVisualizarEstudante">
      <div className="modal-content">
        <h1 className='title-modalVisualizarEstudante'>Visualizar estudante</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais'>Informações pessoais</h2>
          <div className="linha-flex">
            <div className="campo">
              <label>Matrícula</label>
              <span className='spanMatricula'>{formatValue(formData.matricula)}</span>
            </div>
            <div className="campo">
              <label>Nome completo</label>
              <span className='spanName'>{formatValue(formData.nome)}</span>
            </div>
            <div className="campo">
              <label>Data de nascimento</label>
              <span className='spanNascimento'>{formatValue(formData.nascimento)}</span>
            </div>
            <div className="campo">
              <label>Naturalidade</label>
              <span className='spanNaturalidade'>{formatValue(formData.naturalidade)}</span>
            </div>
            <div className="campo">
              <label>Raça</label>
              <span className='spanRaca'>{formatValue(formData.raca)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>CEP</label>
              <span className='spanCep'>{formatValue(formData.cep)}</span>
            </div>
            <div className="campo">
              <label>Bairro</label>
              <span className='spanBairro'>{formatValue(formData.bairro)}</span>
            </div>
            <div className="campo">
              <label>Logradouro</label>
              <span className='spanLogradouro'>{formatValue(formData.logradouro)}</span>
            </div>
            <div className="campo">
              <label>Número</label>
              <span className='spanNumero'>{formatValue(formData.numero)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>País</label>
              <span className='spanPais'>{formatValue(formData.pais)}</span>
            </div>
            <div className="campo">
              <label>Estado</label>
              <span className='spanEstado'>{formatValue(formData.estado)}</span>
            </div>
            <div className="campo">
              <label>Cidade</label>
              <span className='spanCidade'>{formatValue(formData.cidade)}</span>
            </div>
            <div className="campo">
              <label>Turno</label>
              <span className='spanTurno'>{formatValue(formData.turno)}</span>
            </div>
          </div>

          <h2 className='h2-responsavel'>Responsável</h2>
          <div className="linha-flex">
            <div className="campo">
              <label>Nome completo</label>
              <span className='spanNomeResponsavel'>{formatValue(formData.nomeResponsavel)}</span>
            </div>
            <div className="campo">
              <label>CPF</label>
              <span className='spanCpfResponsavel'>{formatValue(formData.cpfResponsavel)}</span>
            </div>
            <div className="campo">
              <label>RG</label>
              <span className='spanRgResponsavel'>{formatValue(formData.rgResponsavel)}</span>
            </div>
            <div className="campo">
              <label>Órgão expedidor</label>
              <span className='spanOrgao'>{formatValue(formData.orgaoExpedidor)}</span>
            </div>
            <div className="campo">
              <label>UF</label>
              <span className='spanUf'>{formatValue(formData.uf)}</span>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label>Telefone residencial</label>
              <span className='spanTelefone'>{formatValue(formData.telefoneResidencial)}</span>
            </div>
            <div className="campo">
              <label>Telefone comercial</label>
              <span className='spanComercial'>{formatValue(formData.telefoneComercial)}</span>
            </div>
            <div className="campo">
              <label>Celular</label>
              <span className='spanCelular'>{formatValue(formData.celular)}</span>
            </div>
            <div className="campo">
              <label>Email</label>
              <span className='spanEmail'>{formatValue(formData.email)}</span>
            </div>
            <div className="campo">
              <label>Profissão</label>
              <span className='spanProfissao'>{formatValue(formData.profissao)}</span>
            </div>
            <div className="campo">
              <label>Parentesco</label>
              <span className='spanParentesco'>{formatValue(formData.parentesco)}</span>
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

export default ModalVisualizarEstudante;
