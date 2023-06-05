import { createContext, useState } from "react";

const AuthContext = createContext({});


//Children sont tous les composants encapsulés dans le AuthProvider
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;