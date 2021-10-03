import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/AuthContext'
import styles from '../styles/Guides.module.css'


export default function Guides() {
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)
  const { user, authReady } = useContext(AuthContext)
  useEffect(() => {
    if (authReady) {
      fetch('/.netlify/functions/guides',user && {
        headers: {
          Authorization: 'Bearer ' + user.token.access_token
        }
      })
        .then(res => {
          if( !res.ok) throw Error("something wrong...")
          return res.json()
        })
        .then(data =>{
            setGuides(data)
            setError(null)
        } )
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
<h4>Written by {guide.author}</h4>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quasi quisquam officia quae hic doloribus magni nisi, quas vel illum quia necessitatibus quis at molestiae sapiente, voluptates esse fugit sunt.</p>
       </div>
     ))}
    </div>
  )
}