// ModalArquivar.jsx
import './style.css';

function ModalArquivar({ handleCloseModal, nameTitulo, textoArquivar, onConfirm }) {
  return (
    <div className="body-modalArquivar">
      <div className="modal-content">
        <h1 className='title-modalArquivar'>Tem certeza que deseja arquivar {nameTitulo}?</h1>
        <hr />
        <p className='p-modalArquivar'>{textoArquivar}</p>
        <div className="buttons">
          <button className='btn-cancelar' onClick={handleCloseModal}>Cancelar</button>
          <button className='btn-continuar' onClick={onConfirm}>Continuar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalArquivar;