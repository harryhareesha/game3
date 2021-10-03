import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/AuthContext'
import styles from '../styles/Guides.module.css'
import Image from 'next/dist/client/image'


export default function Guides() {
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)
  const { user, login, authReady } = useContext(AuthContext)
  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides', user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
        .then(res => {
          if (!res.ok) {
            login()
            throw Error('You must be logged in to view this content')
          }
          return res.json()
        })
        .then(data => {
          setGuides(data)
          setError(null)
        })
        .catch(err => {
          setError(err.message)
          setGuides(null)
        })
    }
  }, [user, authReady])
  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading ....</div>}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      {guides && guides.map(guide => (
        <div className={styles.card} key={guide.title}>
          <h3>{guide.title}</h3>
          <h4>given by {guide.author}</h4>
          <p>{guide.snippet}</p>
         
          <Image src={`/ref/${guide.img}.PNG`} height={700} width={960} />
          <p><a>{guide.img}</a></p>
        </div>
      ))}
    </div>
  )
}