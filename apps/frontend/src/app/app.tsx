import {Identity} from "@ory/client"
import {useSession} from "../utils/hooks/sessionHook";

function App() {
    const {isLoading, context} = useSession()
    const getUserName = (identity?: Identity) =>
        identity?.traits.email || identity?.traits.username || 'guest'

    if(isLoading){
        return <div>Loading...</div>
    }
    if(!context){
        return <div>Oops</div>
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={'favicon.ico'} className="App-logo" alt="logo" />
                <p>
                    Welcome to Ory,{" "}
                    {
                        getUserName(context.session?.identity)
                    }
                    .
                </p>
                {
                    // Our logout link
                    <a href={context.logoutUrl}>Logout</a>
                }

                {
                    !context.session && <a href={'http://localhost:4000/.ory/ui/login'}> Login </a>
                }
            </header>
        </div>
    )
}
export default App;
