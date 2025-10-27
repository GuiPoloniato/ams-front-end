import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Estudantes from "../pages/estudantes/estudantes";
import Professores from "../pages/professores/professores";
import Salas from "../pages/salas/salas";
import Disciplinas from "../pages/disciplinas/disciplinas";
import Permissoes from "../pages/permissoes/permissoes";
import Relatorios from "../pages/relatorios/relatorios";
// import Configuracao from "../pages/configuracoes/config";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/estudantes" element={<Estudantes />} />
                <Route path="/home/professores" element={<Professores />} />
                <Route path="/home/salas" element={<Salas />} />
                <Route path="/home/disciplinas" element={<Disciplinas />} />
                <Route path="/home/permissoes" element={<Permissoes />} />
                <Route path="/home/relatorios" element={<Relatorios />} />
                {/* <Route path="/home/configuracao" element={<Configuracao/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}
export default Router;