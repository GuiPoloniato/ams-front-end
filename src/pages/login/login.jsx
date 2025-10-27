import {useContext,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import ImgEclipse1 from "../../assets/eclipse1-login.svg";
import ImgEclipse2 from "../../assets/eclipse2-login.svg";
import './style.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // <- must be lowercase
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async () => {
        setErro('');
        const sucesso = await login(email, senha);
        if (sucesso) {
        navigate("/home");
        } else {
        setErro("Email ou senha incorretos");
        }
    };


    return (
        <div className="body-login">
            <img className='ImgEclipse1' src={ImgEclipse1} alt="" />
            <div className="box-login">
                <div className="logo-title">
                    <h1>AMS</h1>
                    <h2>Academic Management System</h2>
                </div>
                <h2 className='h2-acessar'>Acessar a sua conta</h2>
                <div className="form-login">
                    <div className="linha-flex">
                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className='inputEmail'
                                id="inputEmail"
                                placeholder='example@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="linha-flex">
                        <div className="campo">
                            <div className="sobre-senha">
                                <label htmlFor="senha">Senha</label>
                                <span>Esqueceu?</span>
                            </div>
                            <input
                                type="password"
                                className='inputSenha'
                                id="inputSenha"
                                placeholder='Insira a sua senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>
                    {erro && <p style={{ color: 'red', marginTop: '5px' }}>{erro}</p>}
                    <div className="button">
                        <button onClick={handleLogin}>Acessar</button>
                    </div>
                </div>
                <div className="footer-box-login">
                    <p>Ainda não tem uma conta?</p>
                    <span>Acesse nosso site e conheça nossos planos</span>
                </div>
            </div>
            <img className='ImgEclipse2' src={ImgEclipse2} alt="" />
        </div>
    );
}

export default Login;
