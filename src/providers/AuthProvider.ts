import React, { useState } from "react"
import app from "../../RealmApp"

const AuthContext = React.createContext(null)
const [User, setUser] = useState(null)

const signIn =async (email:string, password:string) => {
    const creds = Realm.Credentials.emailPassword(email,password)
    const newUser = await app.logIn(creds)
    setUser(newUser)
}

const signUp =async (data: {email:string, password: string, fullname: string, username: string}) => {
    await app.emailPasswordAuth.registerUser(data)
    
}