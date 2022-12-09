import Login from "../../Login/Login";
import Signup from "../../Login/Signup";
import AddContact from "../AddContact/AddContact";
import AllContact from "../AllContact/AllContact";
import ContactDetails from "../ContactDetails/ContactDetails";
import ContactEdit from "../ContactEdit/ContactEdit";
// import HomeMain from "../Home/HomeMain/HomeMain";
const { default: Home } = require("../Home/Home");

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        children: [
            // {
            //     path: '/',
            //     element: <HomeMain></HomeMain>
            // },
            {
                path: '/',
                element: <AllContact></AllContact>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/addcontact',
                element: <AddContact></AddContact>
            },
            {
                path: '/contactEdit/:id',
                element: <ContactEdit></ContactEdit>,
                // loader: ({ params }) => fetch(`http://localhost:5000/contact/${params.id}`)
            },
            {
                path: '/contactDetails/:id',
                element: <ContactDetails></ContactDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/contact/${params.id}`)
            }
        ]
    }
])

export default router;