import { BrowserRouter, Routes, Route } from "react-router-dom"
import {CardsDB} from "./components/CardsDB"
import {Admin} from "./components/Admin"
import {CreateCardForm} from "./components/CreateCardForm"
import {Header} from "./components/Header"
import { Library } from "./components/Library"
import { CardDetail } from "./components/CardDetail"

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element="The main page"></Route>
          <Route path="/library" element = { <Library/> } />
          <Route path="/card-detail/:id" element= { <CardDetail/> } />
          <Route path="/search" element="the page to make different kind of searchs"></Route>
          <Route path="/admin/" element= { <Admin/> } />
          <Route path="/admin/CardsDB" element = { <CardsDB/> } />
          <Route path="/admin/cards/create" element={ <CreateCardForm/> }></Route>
          <Route path="/admin/cards/edit:id" element="the page to edit an existent card"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}