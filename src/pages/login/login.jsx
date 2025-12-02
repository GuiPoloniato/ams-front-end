import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../contexts/authContext';
import { useSnackbar } from '../../hooks/useSnackbar';
import ImgEclipse1 from "../../assets/eclipse1-login.svg";
import ImgEclipse2 from "../../assets/eclipse2-login.svg";
import './style.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { snackbar, showError, hideSnackbar } = useSnackbar();

    const handleLogin = async () => {
        if (!email || !senha) {
            showError('Por favor, preencha email e senha');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('Email inválido');
            return;
        }

        setLoading(true);
        
        try {
            const sucesso = await login(email, senha);
            if (sucesso) {
                navigate("/home");
            } else {
                showError("Email ou senha incorretos");
            }
        } catch (error) {
            showError("Erro ao conectar ao servidor. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                                onKeyPress={handleKeyPress}
                                disabled={loading}
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
                                onKeyPress={handleKeyPress}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="button">
                        <button 
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? 'Acessando...' : 'Acessar'}
                        </button>
                    </div>
                </div>
                <div className="footer-box-login">
                    <p>Ainda não tem uma conta?</p>
                    <span>Acesse nosso site e conheça nossos planos</span>
                </div>
            </div>
            <img className='ImgEclipse2' src={ImgEclipse2} alt="" />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={hideSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={hideSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;