import { combineReducers } from "redux"

import vendors from "./vendorsReducer"
import products from "./productsReducer"
import invoices from "./invoicesReducer"
import loginUser from "./loginReducer"
import invoiceDetailes from "./invoiceDetailesReducer"
import invoiceDetailesList from "./List"
import registerUser from "./registerReducer"

export default combineReducers({
  vendors,
  products,
  invoices,
  loginUser,
  registerUser,
  invoiceDetailes,
  invoiceDetailesList
})
