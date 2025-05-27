import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DeshboardIcon from '../../assets/sideBar/deshboard-icon.svg';
import EstudProfIcon from '../../assets/sideBar/estud-prof-icon.svg';
import TurmaDisciIcon from '../../assets/sideBar/turm-disc-icon.svg';
import PermicoesIcon from '../../assets/sideBar/permicoes-icon.svg';
import RelatoriosIcon from '../../assets/sideBar/relatorios-icon.svg';
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
                        <img src={DeshboardIcon} alt="Icon Deshboard" />
                        {isHoverBox && <span>Dashboard</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/estudantes' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/estudantes')}>
                        <img src={EstudProfIcon} alt="Icon Percon" />
                        {isHoverBox && <span>Estudantes</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/professores' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/professores')}>
                        <img src={EstudProfIcon} alt="Icon Book" />
                        {isHoverBox && <span>Professores</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/turmas' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/turmas')}>
                        <img src={TurmaDisciIcon} alt="Icon Cadeado" />
                        {isHoverBox && <span>Turmas</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/disciplinas' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/disciplinas')}>
                        <img src={TurmaDisciIcon} alt="Icon Relatorio" />
                        {isHoverBox && <span>Disciplinas</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/permicoes' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/permicoes')}>
                        <img src={PermicoesIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>Permições</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/relatorios' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/relatorios')}>
                        <img src={RelatoriosIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>Relatórios</span>}
                    </div>
                    <div className={`icon-select ${itemActive === '/home/configuracao' ? 'ativo' : ''}`} onClick={() => handleItemClick('/home/configuracao')}>
                        <img src={ConfigIcon} alt="Icon Configuracao" />
                        {isHoverBox && <span>Configurações</span>}
                    </div>
                </div>
                <div className="sair-inicio">
                    {isHoverBox ? <span>Desconectar</span> : <img src={SairIcon} alt="Icon Sair" />}
                </div>
            </div>
        </div>
    )
}
export default SideBar;