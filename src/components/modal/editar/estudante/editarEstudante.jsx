import React, {useState, useEffect} from 'react';
import './style.css';

function ModalEditarEstudante({ handleCloseModal, editarSelecionado }) {
    const [ formData, setFormData ] = useState({
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
    })

    useEffect(() => {
        if (editarSelecionado) {
          setFormData(editarSelecionado);
        }
      }, [editarSelecionado]);

  return (
    <div className="body-modalEditarEstudante">
      <div className="modal-content">
        <h1 className='title-modalEditarEstudante'>Editar estudante</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais' >Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputMatricula">Matrícula</label>
              <input type="number" className='inputMatricula' id="inputMatricula" value={formData.matricula} 
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputName">Nome completo</label>
              <input type="text" className='inputName' id="inputName" value={formData.nomeCompleto} 
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="dataInput">Data de nascimento</label>
              <input type="date" className='dataInput' id="dataInput" value={formData.dataNascimento} 
                onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputNaturalidade">Naturalidade</label>
              <input type="text" className='inputNaturalidade' id="inputNaturalidade" value={formData.naturalidade} 
                onChange={(e) => setFormData({ ...formData, naturalidade: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="selectRaca">Raça</label>
              <select className='selectRaca' id="selectRaca" value={formData.raca} 
                onChange={(e) => setFormData({ ...formData, raca: e.target.value })}></select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputCep">CEP</label>
              <input type="text" className='inputCep' id="inputCep" value={formData.cep} 
                onChange={(e) => setFormData({ ...formData, cep: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputBairro">Bairro</label>
              <input type="text" className='inputBairro' id="inputBairro" value={formData.bairro} 
                onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputLogradouro">Logradouro</label>
              <input type="text" className='inputLogradouro' id="inputLogradouro" value={formData.logradouro} 
                onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputNumber">Número</label>
              <input type="number" className='inputNumber' id="inputNumber" value={formData.numero} 
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}/>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="selectPais">País</label>
              <select className='selectPais' id="selectPais" value={formData.pais} 
                onChange={(e) => setFormData({ ...formData, pais: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectEstado">Estado</label>
              <select className='selectEstado' id="selectEstado" value={formData.estado} 
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectCidade">Cidade</label>
              <select className='selectCidade' id="selectCidade" value={formData.cidade} 
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Turno</label>
              <select className='selectTurno' id="selectTurno" value={formData.turno} 
                onChange={(e) => setFormData({ ...formData, turno: e.target.value })}></select>
            </div>
          </div>

          <h2 className='h2-responsavel'>Responsável 1</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeResponsavel">Nome completo</label>
              <input type="text" className='inputNomeResponsavel' id="inputNomeResponsavel" value={formData.nomeResponsavel} 
                onChange={(e) => setFormData({ ...formData, nomeResponsavel: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputCpfResponsavel">CPF</label>
              <input type="number" className='inputCpfResponsavel' id="inputCpfResponsavel" value={formData.cpfResponsavel} 
                onChange={(e) => setFormData({ ...formData, cpfResponsavel: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputRgResponsavel">RG</label>
              <input type="number" className='inputRgResponsavel' id="inputRgResponsavel" value={formData.rgResponsavel} 
                onChange={(e) => setFormData({ ...formData, rgResponsavel: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputOrgao">Órgão expedidor</label>
              <input type="text" className='inputOrgao' id="inputOrgao" value={formData.orgao} 
                onChange={(e) => setFormData({ ...formData, orgao: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="selectUf">UF</label>
              <select className='selectUf' id="selectUf" value={formData.uf} 
                onChange={(e) => setFormData({ ...formData, uf: e.target.value })}></select>
            </div>
          </div>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputTelefone">Telefone residencial</label>
              <input type="number" className='inputTelefone' id="inputTelefone" value={formData.telefoneResidencial} 
                onChange={(e) => setFormData({ ...formData, telefoneResidencial: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputComercial">Telefone comercial</label>
              <input type="number" className='inputComercial' id="inputComercial" value={formData.telefoneComercial} 
                onChange={(e) => setFormData({ ...formData, telefoneComercial: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputCelular">Celular</label>
              <input type="number" className='inputCelular' id="inputCelular" value={formData.celular} 
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" className='inputEmail' id="inputEmail" value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputProfissao">Profissão</label>
              <input type="text" className='inputProfissao' id="inputProfissao" value={formData.profissao} 
                onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}/>
            </div>
          </div>

          <button className="button-responsavel">Adicionar responsável</button>

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handleCloseModal}>Cancelar</button>
            <button className='btn-salvar'>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarEstudante;
