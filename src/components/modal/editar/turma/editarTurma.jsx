import React, {useState, useEffect} from 'react';
import './style.css';

function ModalEditarTurma({ handleCloseModal, editarSelecionado }) {
    const [ formData, setFormData ] = useState({
        nomeIdentificacao: '',
        anoLetivo: '',
        tipoEnsino: '',
        turno: ''
    })

    useEffect(() => {
        if (editarSelecionado) {
          setFormData(editarSelecionado);
        }
      }, [editarSelecionado]);

  return (
    <div className="body-modalEditarTurma">
      <div className="modal-content">
        <h1 className='title-modalEditarTurma'>Editar turma</h1>
        <hr />
        <div className="formulario">
          <div className="linha-flex">
            <div className="campo">
              <label htmlFor="inputNomeIdentificacao">Nome da identificação</label>
              <input type="text" className='inputNomeIdentificacao' id="inputNomeIdentificacao" value={formData.nomeIdentificacao} 
                onChange={(e) => setFormData({ ...formData, nomeIdentificacao: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="inputAno">Ano letivo</label>
              <input type="date" className='inputAno' id="inputAno" value={formData.anoLetivo} 
                onChange={(e) => setFormData({ ...formData, anoLetivo: e.target.value })}/>
            </div>
            <div className="campo">
              <label htmlFor="selectTipoEnsino">Tipo de Ensino</label>
              <select className='selectTipoEnsino' id="selectTipoEnsino" value={formData.tipoEnsino} 
                onChange={(e) => setFormData({ ...formData, tipoEnsino: e.target.value })}></select>
            </div>
            <div className="campo">
              <label htmlFor="selectTurno">Ano Letivo</label>
              <select className='selectTurno' id="selectTurno" value={formData.anoLetivo} 
                onChange={(e) => setFormData({ ...formData, anoLetivo: e.target.value })}></select>
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

export default ModalEditarTurma;
