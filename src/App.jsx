import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CardsDB } from "./components/CardsDB"
import { Admin } from "./components/Admin"
import { CreateCardForm } from "./components/CreateCardForm"
import { Home } from "./pages/Home"
import { Header } from "./components/Header"
import { Library } from "./components/Library"
import { SearchPage } from './components/SearchPage'
import { CardDetail } from "./components/CardDetail"
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Login } from "./components/Login";

export const App = () => {
  return (
    <div className="app mb-2">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/card-detail/:id" element={<CardDetail />} />
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} > //ruta anidada
            <Route path="CardsDB" element={<CardsDB />} />
            <Route path="cards/create" element={<CreateCardForm />}/>
            <Route path="cards/edit/:id" element="the page to edit an existent card"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}