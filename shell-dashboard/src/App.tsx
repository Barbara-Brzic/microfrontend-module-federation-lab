import {useAuth} from "./context/AuthContext.tsx";
import {Dashboard} from "./components/Dashboard.tsx";

function App() {
    const {user, login, logout} = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            {user
                ? <Dashboard user={user} logout={logout}/>
                : <div>Please log in <button onClick={() => login("test user")}>Login</button></div>}
        </div>
      )
}

export default App
