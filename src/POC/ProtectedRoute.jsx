import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2Icon } from "lucide-react";


function ProtectedRoute(props){
    const isLoggedIn=props.isLoggedIn;
    const children=props.children;
    const{userData, loading}=useAuth();

    if(loading){
        return <div className="w-screem h-screen  flex items-center justify-center bg-[#eff2f2
        ]">
            <Loader2Icon className="w-8 h-8 animate-spin"/>
        </div>
    }
    if(userData){
        return children
    }

    else{
        return <Navigate to="/login"/>
    }
}

export default ProtectedRoute;