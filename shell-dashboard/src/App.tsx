import {useAuth} from "./context/AuthContext.tsx";
import {Dashboard} from "./components/Dashboard.tsx";
import {Button} from "@/components/ui/button.tsx";

function App() {
    const {user, login, logout} = useAuth();

    return (
        <div className={"flex flex-col min-h-screen w-full justify-center items-center"}>
            {user
                ? <Dashboard user={user} logout={logout}/>
                : <div>Please log in <Button onClick={() => login("test user")}>Login</Button></div>}
        </div>
      )
}

export default App
