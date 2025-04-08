import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import { useContext, useEffect } from "react";
import { globalContext } from "./components/Context/Context";
import Header from "./components/Header";
import AllBooks from "./components/AllBooks";
import MyBooks from "./components/MyBooks";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Profile from "./components/Profile";
import Dashboard from  './AdminComponent/Dashboard'
import { Navigate } from "react-router-dom";
import AddBook from './AdminComponent/AddBook'
import AdminHeader from "./AdminComponent/AdminHeader";
import BorrowedBook from "./AdminComponent/BorrowedBook";
function App() {

  const {authorized ,isClick, user } =   useContext(globalContext)

 
    
  return (
    <>
      <div className="App">
      {authorized &&  user?.role=="admin" ? <>
      <AdminHeader /> 
      </>:
       authorized && user?.role=="student" ?   <>
       <Header />
       <Profile />
       </>: 
        <Navigate to='/register' />
        }
  
      </div>
      <Routes>
     
        <Route path="/register" element={ <Register />}
        />
        <Route
          path="/home" element={<PrivateRoute><Home /></PrivateRoute>}
        />
        <Route path="/allbooks" element={ <PrivateRoute> <AllBooks /></PrivateRoute>
          }
        />
        <Route
          path="/mysection"  element={<PrivateRoute> <MyBooks /></PrivateRoute>}
        />
         <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
         <Route path="/addBook" element={<PrivateRoute> <AddBook /></PrivateRoute>} />
         <Route path="/allBook" element={<PrivateRoute> <AllBooks /></PrivateRoute>} />
         <Route path="/borrowBook"  element={<PrivateRoute> <BorrowedBook /></PrivateRoute>} />
         <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
