import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeshboardIcon from '../../assets/sideBar/deshboard-icon.svg';
import DeshboardIconWhite from '../../assets/sideBar/iconsWhite/deshboard-iconWhite.svg';
import EstudProfIcon from '../../assets/sideBar/estud-prof-icon.svg';
import EstudProfIconWhite from '../../assets/sideBar/iconsWhite/estud-prof-iconWhite.svg';
import TurmaDisciIcon from '../../assets/sideBar/turm-disc-icon.svg';
import TurmaDisciIconWhite from '../../assets/sideBar/iconsWhite/turm-disc-iconWhite.svg';
import PermissoesIcon from '../../assets/sideBar/permissoes-icon.svg';
import PermissoesIconWhite from '../../assets/sideBar/iconsWhite/permissoes-iconWhite.svg';
import RelatoriosIcon from '../../assets/sideBar/relatorios-icon.svg';
import RelatoriosIconWhite from '../../assets/sideBar/iconsWhite/relatorios-iconWhite.svg';
import ConfigIcon from '../../assets/sideBar/config-icon.svg';
import SairIcon from '../../assets/sideBar/sair-icon.svg';
import './style.css'

function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [itemActive, setItemActive] = useState(location.pathname);
    const [isHoverBox, setIsHoverBox] = useState(false);

    const handleItemClick = (path) => {
        setItemActive(path);
        setIsHoverBox(false);
        navigate(path);
    }

    return(
        <div className={`body-sideBar ${isHoverBox ? 'expandir' : ''}`}>
            <div 
                className="box-vertical"
                onMouseEnter={() => setIsHoverBox(true)}
                onMouseLeave={() => setIsHoverBox(false)}
            >
                <h1 className='ams-title'>AMS</h1>
                {isHoverBox && <p className='school-name'>Escola Augustus</p>}
                <div className="icons-sideBar">
                    <div className={`icon-select ${itemActive === '/home' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home')}>
                        <img src={itemActive === '/home' ? DeshboardIconWhite : DeshboardIcon} alt="Icon Deshboard" />
                        {isHoverBox && <span>Dashboard</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/estudantes' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/estudantes')}>
                        <img src={itemActive === '/home/estudantes' ? EstudProfIconWhite : EstudProfIcon} alt="Icon Percon" />
                        {isHoverBox && <span>Estudantes</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/professores' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/professores')}>
                        <img src={itemActive === '/home/professores' ? EstudProfIconWhite : EstudProfIcon} alt="Icon Book" />
                        {isHoverBox && <span>Professores</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/turmas' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/turmas')}>
                        <img src={itemActive === '/home/turmas' ? TurmaDisciIconWhite : TurmaDisciIcon} alt="Icon Cadeado" />
                        {isHoverBox && <span>Turmas</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/disciplinas' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/disciplinas')}>
                        <img src={itemActive === '/home/disciplinas' ? TurmaDisciIconWhite : TurmaDisciIcon} alt="Icon Relatorio" />
                        {isHoverBox && <span>Disciplinas</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/permissoes' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/permissoes')}>
                        <img src={itemActive === '/home/permissoes' ? PermissoesIconWhite : PermissoesIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>Permissões</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/relatorios' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/relatorios')}>
                        <img src={itemActive === '/home/relatorios' ? RelatoriosIconWhite : RelatoriosIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>Relatórios</span>}
                    </div>
                    <div className="icon-select icon-select-desable">
                        <img src={ConfigIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>
                            Configurações
                        </span>}
                    </div>
                    {/* <div className={`icon-select ${itemActive === '/home/configuracao' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/configuracao')}>
                        <img src={ConfigIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>
                            Configurações
                        </span>}
                    </div> */}
                </div>
                <div className="sair-inicio">
                    {isHoverBox ? <span>Desconectar</span> : <img src={SairIcon} alt="Icon Sair" />}
                </div>
            </div>
        </div>
    )
}
export default SideBar;