import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sideBar/sideBar';
import { BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import NovoEstudanteModal from '../../components/cadastrar/estudante/novoEstudante';
import NovoProfessorModal from '../../components/cadastrar/professor/novoProfessor';
import NovaSalaModal from '../../components/cadastrar/sala/novaSala';
import { PieChart, Pie, Cell } from 'recharts';
import './style.css'

function Home() {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [professores, setProfessores] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [salas, setSalas] = useState([]);

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    const token = localStorage.getItem("token"); 

    useEffect(() => {
        const fetchDados = async (endpoint, setState) => {
            try {
                const res = await fetch(`http://localhost:3000/${endpoint}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.sucesso) setState(data.dados || []);
                else setState([]);
            } catch (err) {
                console.error(`Erro ao buscar ${endpoint}:`, err);
                setState([]);
            }
        };

        fetchDados("alunos", setAlunos);
        fetchDados("professores", setProfessores);
        fetchDados("disciplinas", setDisciplinas);
        fetchDados("salas", setSalas);
    }, []);

    const alunosPorSala = salas.map(sala => {
        const quantidadeAlunos = alunos.filter(a => a.turma_id === sala.id).length;
        return {
            nome: sala.nomeSala,
            alunos: quantidadeAlunos || sala.capacidade || 0
        }
    });
        
    return(
        <div className="body-home">
            <SideBar />
            <div className="content-home">
                <h2 className='h2-route'>Home</h2>
                <h1 className='h1-welcome'>Bem vindo(a) de volta</h1>
                <div className="acoes-rapidas">
                    <p>Ações rápidas</p>
                    <div className="acoes">
                        <button onClick={() => setModalOpen('estudante')}>Novo estudante</button>
                        <button onClick={() => setModalOpen('professor')}>Novo professor</button>
                        <button onClick={() => setModalOpen('salas')}>Nova salas</button>
                    </div>
                </div>
                <div className="visao-geral">
                    <p>Visão Geral</p>
                    <div className="cards">
                        <div className="card">
                            <span className='name-card'>Estudantes</span>
                            <div className="numbers">
                                <span className='span-number'>{alunos.length}</span>
                                <div className="porcentagem">
                                    {/* <span className='span-porcentagem span-porcentagem-positivo'>+5%</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Professores</span>
                            <div className="numbers">
                                <span className='span-number'>{professores.length}</span>
                                <div className="porcentagem">
                                    {/* <span className='span-porcentagem'>+5%</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Disciplinas</span>
                            <div className="numbers">
                                <span className='span-number'>{disciplinas.length}</span>
                                <div className="porcentagem">
                                    {/* <span className='span-porcentagem span-porcentagem-positivo'>+1%</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Salas</span>
                            <div className="numbers">
                                <span className='span-number'>{salas.length}</span>
                                <div className="porcentagem">
                                    {/* <span className='span-porcentagem span-porcentagem-negativo'>-3%</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="performance-academica">
                    <p className='p-performance'>Performance Acadêmica</p>
                    <div className="cards-deshboards">
                        <div className="card-deshboard grafico-barra">
                            <p>Número de Alunos por Sala</p>
                            <span>Número de Alunos</span>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={alunosPorSala}
                                    barCategoryGap="20%" 
                                >
                                    <XAxis dataKey="nome" hide/>
                                    <Tooltip />
                                    <Bar dataKey="alunos" fill="#6A97B3BF" />
                                </BarChart>
                            </ResponsiveContainer>
                            <span className='span-legend'>salas</span>
                        </div>
                        <div className="card-deshboard grafico-pizza">
                            <p>Proporção de Alunos por Turno</p>
                            <span>Percentual</span>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { nome: "Matutino", valor: alunos.filter(a => a.turno?.toLowerCase() === "matutino").length },
                                            { nome: "Vespertino", valor: alunos.filter(a => a.turno?.toLowerCase() === "vespertino").length },
                                            { nome: "Noturno", valor: alunos.filter(a => a.turno?.toLowerCase() === "noturno").length },
                                        ].filter(item => item.valor > 0)} 
                                        dataKey="valor"
                                        nameKey="nome"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        labelLine={false}
                                        label={({ nome, percent }) => `${nome}: ${(percent * 100).toFixed(1)}%`}
                                    >
                                        {["#6A97B3", "#A7C7E7", "#355C7D"].map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name) => [`${value} alunos`, `${name}`]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <span className='span-legend'>Turnos</span>
                        </div>

                    </div>
                </div>
            </div>
            {modalOpen === 'estudante' && (<NovoEstudanteModal handlleCloseModal={handlleCloseModal}/>)}
            {modalOpen === 'professor' && (<NovoProfessorModal handlleCloseModal={handlleCloseModal}/>)}
            {modalOpen === 'salas' && (<NovaSalaModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Home;