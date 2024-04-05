import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import FindRoommate from "../Page/FindRoommate/FindRoommate";
import FlatDetails from "../Page/FindFlat/FlatDetails";
import RoommateDetails from "../Page/FindRoommate/RoommateDetails";
import FlatListForm from "../Page/Form/FlatListForm/FlatListForm";
import RoommateListForm from "../Page/Form/RoommateListForm/RoommateListForm";
import Wishlist from "../Page/Wishlist/Wishlist";
import MyAccount from "../Page/MyAcount/MyAccount";
import PrivateRouter from "./PrivateRouter";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element:  <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path:"/findRoommate",
        element:<FindRoommate/>
      },
      {
        path:"/flatDetails/:id",
        element:<PrivateRouter><FlatDetails/></PrivateRouter>
      },
      {
        path:"/roommateDetails/:id",
        element:<PrivateRouter><RoommateDetails/></PrivateRouter>
      },
      {
        path:"/createFlatList",
        element:<PrivateRouter><FlatListForm/></PrivateRouter>
      },
      {
        path:"/createRoommateList",
        element:<PrivateRouter><RoommateListForm/></PrivateRouter>
      },
      {
        path:"/wishlist",
        element: <PrivateRouter><Wishlist/></PrivateRouter>
      },
      {
        path:"/myAccount",
        element:<MyAccount/>
      }
    ],
  },
]);
