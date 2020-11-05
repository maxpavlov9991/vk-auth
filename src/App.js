import { useEffect, useState } from 'react'
import './App.css';

function App() {

  const client_id = 7652488
  const default_redirect_uri = `https://oauth.vk.com/blank.html`
  const redirect_uri = 'http://localhost:3000'
  const version = '5.52'
  const auth_url = `https://oauth.vk.com/authorize?client_id=${client_id}&display=page&redirect_uri=${redirect_uri}&scope=friends&response_type=token&v=5.52`

  useEffect(() => {
    let params = getUrlParams()
    if (!params.access_token) {
      window.location.replace(auth_url)
    } else {
      fetch(`https://api.vk.com/method/users.get?user_ids=${params.user_id}&access_token=${params.access_token}&v=${version}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('response fail')
        }
      }).then(data => {
        const { first_name, last_name } = data.response[0]
        setName({
          first_name,
          last_name
        })
      }).catch(error => {
        console.error(error)
      })
    }
  }, [])

  const [name, setName] = useState({
    first_name: '',
    last_name: '',
  })

  const getUrlParams = () => {
    if (!window.location.hash) {
      return {}
    }
    const access_token = window.location.hash.match(/access_token=([^&=]+)/)
    const user_id = window.location.hash.match(/user_id=([^&=]+)/)
    return {
      access_token: access_token && access_token[1],
      user_id: user_id && user_id[1]
    }
  }


  return (
    <h1>
      {name.first_name} {name.last_name}
    </h1>
  );
}

export default App;
