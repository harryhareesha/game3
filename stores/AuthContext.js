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
        netlifyIdentity.on('logout', () => {
            setUser(null)
            console.log('logout event');
        })
        netlifyIdentity.on('init', (user) => {
            setAuthReady(true)
            setUser(user)
            console.log('initialized');
        })
        // initi netlify identity connection
        netlifyIdentity.init()

        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }

    }, [])
    const login = () => {
        netlifyIdentity.open()
    }
    const logout = () => {
        netlifyIdentity.logout()
    }

    const context = { user, login, logout, authReady }
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}
