import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { AuthContext } from '../stores/AuthContext'

export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext)
  console.log(user);
  return (
    <div className="container">
      <nav>
        <Image src="/siteLogo-lg.png" width={50} height={48} />
        <h1>What they say...</h1>
        {authReady && (
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/references"><a>References</a></Link></li>
            {!user && <li onClick={login} className="btn">Login/Signup</li>}
            {user && <li>{user.email}</li>}
            {user && <li onClick={logout} className="btn">Logout</li>}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  )
}
