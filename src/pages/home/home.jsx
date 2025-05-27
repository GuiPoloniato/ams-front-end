import React, {useState} from 'react';
import SideBar from '../../components/sideBar/sideBar';
import { BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import NovoEstudanteModal from '../../components/cadastrar/estudante/novoEstudante';
import NovoProfessorModal from '../../components/cadastrar/professor/novoProfessor';
import NovaTurmaModal from '../../components/cadastrar/turma/novaTruma';
import { PieChart, Pie, Cell } from 'recharts';
import './style.css'

function Home() {
    const [ modalOpen, setModalOpen ] = useState(false);

    const handlleCloseModal = () => {
        setModalOpen(false)
    }

    const data = [
        { nome: "Infantil 4", alunos: 30 },
        { nome: "Infantil 5", alunos: 15 },
        { nome: "1° ano", alunos: 25 },
        { nome: "2° ano", alunos: 10 },
        { nome: "3° ano", alunos: 13 },
        { nome: "4° ano", alunos: 28 },
        { nome: "5° ano", alunos: 22 },
    ];

    const mediasPorTurma = [
        // { nome: "Infantil 4", media: 7.5 },
        // { nome: "Infantil 5", media: 6.8 },
        { nome: "1° ano", media: 8.2 },
        { nome: "2° ano", media: 5.9 },
        { nome: "3° ano", media: 6.3 },
        { nome: "4° ano", media: 7.8 },
        { nome: "5° ano", media: 8.5 },
    ];

    const cores = ["#6A97B366", "#6A97B3", "#6A97B399", "#6a97b3", "#6a97b369", "#6a97b340", "#6a97b3ea"];


        
    return(
        <div className="body-home">
            <SideBar />
            <div className="content-home">
                <h2 className='h2-route'>Home</h2>
                <h1 className='h1-welcome'>Bem vindo(a) de volta, João</h1>
                <div className="acoes-rapidas">
                    <p>Ações rápidas</p>
                    <div className="acoes">
                        <button onClick={() => setModalOpen('estudante')}>Novo estudante</button>
                        <button onClick={() => setModalOpen('professor')}>Novo professor</button>
                        <button onClick={() => setModalOpen('turma')}>Nova turma</button>
                    </div>
                </div>
                <div className="visao-geral">
                    <p>Visão Geral</p>
                    <div className="cards">
                        <div className="card">
                            <span className='name-card'>Estudantes</span>
                            <div className="numbers">
                                <span className='span-number'>100</span>
                                <div className="porcentagem">
                                    <span className='span-porcentagem span-porcentagem-positivo'>+5%</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Professores</span>
                            <div className="numbers">
                                <span className='span-number'>1</span>
                                <div className="porcentagem">
                                    {/* <span className='span-porcentagem'>+5%</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Disciplinas</span>
                            <div className="numbers">
                                <span className='span-number'>10</span>
                                <div className="porcentagem">
                                    <span className='span-porcentagem span-porcentagem-positivo'>+1%</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className='name-card'>Turmas</span>
                            <div className="numbers">
                                <span className='span-number'>15</span>
                                <div className="porcentagem">
                                    <span className='span-porcentagem span-porcentagem-negativo'>-3%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="performance-academica">
                    <p className='p-performance'>Performance Acadêmica</p>
                    <div className="cards-deshboards">
                        <div className="card-deshboard grafico-barra">
                            <p>Número de Alunos por Turma</p>
                            <span>Número de Alunos</span>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart
                                    data={data}
                                    barCategoryGap="20%" 
                                >
                                    <XAxis dataKey="nome" hide/>
                                    <Tooltip />
                                    {/* <CartesianGrid /> */}
                                    {/* <Legend align="right"/> */}
                                    <Bar dataKey="alunos" fill="#6A97B3BF" />
                                </BarChart>
                            </ResponsiveContainer>
                            <span className='span-legend'>Turmas</span>
                        </div>
                        <div className="card-deshboard grafico-pizza">
                            <p>Distribuição de Notas</p>
                            <span>Percentual</span>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                <Pie
                                    data={mediasPorTurma}
                                    dataKey="media"
                                    nameKey="nome"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    labelLine={false}
                                >
                                    {mediasPorTurma.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value}`, `Média - ${name}`]} />    
                                </PieChart>
                            </ResponsiveContainer>
                            <span className='span-legend'>Notas</span>
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen === 'estudante' && (<NovoEstudanteModal handlleCloseModal={handlleCloseModal}/>)}
            {modalOpen === 'professor' && (<NovoProfessorModal handlleCloseModal={handlleCloseModal}/>)}
            {modalOpen === 'turma' && (<NovaTurmaModal handlleCloseModal={handlleCloseModal}/>)}
        </div>
    )
}
export default Home;