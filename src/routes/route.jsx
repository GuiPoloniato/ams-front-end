import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import Estudantes from "../pages/estudantes/estudantes";
import Professores from "../pages/professores/professores";
import Turmas from "../pages/turmas/turmas";
import Disciplinas from "../pages/disciplinas/disciplinas";
import Permicoes from "../pages/permicoes/permicoes";
import Relatorios from "../pages/relatorios/relatorios";
// import Configuracao from "../pages/configuracoes/config";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/home/estudantes" element={<Estudantes />} />
                <Route path="/home/professores" element={<Professores />} />
                <Route path="/home/turmas" element={<Turmas />} />
                <Route path="/home/disciplinas" element={<Disciplinas />} />
                <Route path="/home/permicoes" element={<Permicoes />} />
                <Route path="/home/relatorios" element={<Relatorios />} />
                {/* <Route path="/home/configuracao" element={<Configuracao/>} /> */}
            </Routes>
        </BrowserRouter>
    );
}
export default Router;