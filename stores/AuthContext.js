import React, { createContext, useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
export const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    authReady: false
})
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)
    useEffect(() => {
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            netlifyIdentity.close()  // to close the model
            console.log('login event');
        })
        netlifyIdentity.on('login', (user) => {
            setUser(user)
            console.log('logout event');
        })
        // initi netlify identity connection
        netlifyIdentity.init()
    }, [])
    const login = () => {
        netlifyIdentity.open()
    }
    const logout = () => {
        netlifyIdentity.close()
    }

    const context = {user, login, logout, authReady}
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
