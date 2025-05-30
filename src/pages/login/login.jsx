import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImgEclipse1 from "../../assets/eclipse1-login.svg";
import ImgEclipse2 from "../../assets/eclipse2-login.svg";
import './style.css';

function Login() {
    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
    }

    return(
        <div className="body-login">
            <img className='ImgEclipse1' src={ImgEclipse1} alt="" />
            <div className="box-login">
                <div className="logo-title">
                    <h1>AMS</h1>
                    <h2>Academic Management  System</h2>
                </div>
                <h2 className='h2-acessar'>Acessar a sua conta</h2>
                <div className="form-login">
                    <div className="linha-flex">
                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='inputEmail' id="inputEmail" placeholder='example@gmail.com' />
                        </div>
                    </div>
                    <div className="linha-flex">
                        <div className="campo">
                            <div className="sobre-senha">
                                <label htmlFor="senha">Senha</label>
                                <span>Esqueceu ?</span>
                            </div>
                            <input type="password" className='inputSenha' id="inputSenha" placeholder='Insira a sua senha'/>
                        </div>
                    </div>
                    <div className="button">
                        <button onClick={() => handleItemClick('/home')}>Acessar</button>
                    </div>
                </div>
                <div className="footer-box-login">
                    <p>Ainda não tem uma conta ?</p>
                    <span>Acesse nosso site e conheça nosso planos</span>
                </div>
            </div>
            <img className='ImgEclipse2' src={ImgEclipse2} alt="" />

        </div>
    )
}

export default Login;