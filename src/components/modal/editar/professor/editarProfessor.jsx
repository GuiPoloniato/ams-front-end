import React, {useState, useEffect} from 'react';
import './style.css';

function ModalEditarProfessor({ handleCloseModal, editarSelecionado }) {
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
        if (editarSelecionado) {
          setFormData(editarSelecionado);
        }
      }, [editarSelecionado]);

  return (
    <div className="body-modalEditarProfessor">
      <div className="modal-content">
        <h1 className='title-modalEditarProfessor'>Editar professor</h1>
        <hr />
        <div className="formulario">
          <h2 className='h2-informacoes-pessoais' >Informações pessoais</h2>

          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputName">Nome completo</label>
              <input type="text" className='inputName' id="inputName" value={formData.nomeCompleto} 
                onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputTelefone">Telefone</label>
              <input type="date" className='inputTelefone' id="inputTelefone" value={formData.telefone} 
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputFormacao">Formacao</label>
              <input type="text" className='inputFormacao' id="inputFormacao" value={formData.formacao} 
                onChange={(e) => setFormData({ ...formData, formacao: e.target.value })}/>
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

          <div className="buttons-submit">
            <button className='btn-cancelar' onClick={handleCloseModal}>Cancelar</button>
            <button className='btn-salvar'>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditarProfessor;
