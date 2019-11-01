import React, { useEffect } from 'react';
import frog from './icons/frograin.png';
import './App.css';
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)
const icons: Array<{ name: string }> = [{
  name: "frograin"
}, {
  name: "varg"
}]
const twitch = window.Twitch.ext;
const Icon: React.SFC<{ name: string }> = (props) => {
  return (
    <div className="icon-container">
      <img className="action-flag" src="/miscs/flag.png" />
      <img className="action-icon" src={`/icons/${props.name}.png`} />
      <span className="counter">{randomBetween(1, 25)}</span>
    </div>
  )

}
const App: React.FC = () => {
  let token: string = "";

  twitch.onContext((context) => console.log("context: ", context))
  twitch.onAuthorized((auth) => token = auth.token)
  twitch.listen('broadcast', (target, contentType, data) => {
    console.log('Received broadcast ', JSON.parse(data));

  });

  const sendDataToServer = async (e: any) => {
    try {
      await fetch("https://14b2278f.ngrok.io/frog", {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })

    } catch (e) {
      console.log(e)
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <Icon name="frograin" />
        <Icon name="varg" />
        <Icon name="nightmares" />
        <Icon name="treeguard" />
      </header>
    </div>
  );
}

export default App;