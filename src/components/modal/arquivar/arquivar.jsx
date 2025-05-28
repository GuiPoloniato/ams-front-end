import './style.css';

function ModalArquivar({ handlleCloseModal }) {

  return (
    <div className="body-modalArquivar">
      <div className="modal-content">
        <h1 className='title-modalArquivar'>Tem certeza que deseja arquivar este estudante?</h1>
        <hr />
        <p className='p-modalArquivar'>Ao arquivar este estudante, ele será desativado e não poderá mais ser utilizado em nenhuma funcionalidade do sistema. Para utilizá-lo novamente, será necessário reativá-lo manualmente.</p>
        <div className="buttons">
            <button className='btn-cancelar' onClick={handlleCloseModal}>Cancelar</button>
            <button className='btn-continuar'>Continuar</button>
          </div>
      </div>
      
    </div>
  );
}

export default ModalArquivar;
