import { BrowserRouter, Routes, Route } from "react-router-dom"
import {CardsDB} from "./components/CardsDB"
import {Admin} from "./components/Admin"
import {CreateCardForm} from "./components/CreateCardForm"
import {Header} from "./components/Header"
import { Library } from "./components/Library"
import { SearchPage } from './components/SearchPage'
import { CardDetail } from "./components/CardDetail"
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./components/Login";

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element="The main page"></Route>
          <Route path="/library" element = { <Library/> } />
          <Route path="/card-detail/:id" element= { <CardDetail/> } />
          <Route path="/search" element= {<SearchPage/>}></Route>
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin/*" element= { <ProtectedRoute><Admin /></ProtectedRoute> } />
          <Route path="/admin/CardsDB" element = { <ProtectedRoute><CardsDB /></ProtectedRoute> } />
          <Route path="/admin/cards/create" element={ <ProtectedRoute><CreateCardForm /></ProtectedRoute> }></Route>
          <Route path="/admin/cards/edit:id" element="the page to edit an existent card"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}