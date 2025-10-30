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
import PrivateRoute from "../contexts/privateRoute";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
                <Route path="/home/estudantes" element={<PrivateRoute><Estudantes /></PrivateRoute>}/>
                <Route path="/home/professores" element={<PrivateRoute><Professores /></PrivateRoute> } />
                <Route path="/home/salas" element={<PrivateRoute><Salas /></PrivateRoute> } />
                <Route path="/home/disciplinas" element={<PrivateRoute><Disciplinas /></PrivateRoute> } />
                <Route path="/home/permissoes" element={<PrivateRoute><Permissoes /></PrivateRoute> } />
                <Route path="/home/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute> } />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;