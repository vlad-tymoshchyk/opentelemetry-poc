import { useState, useEffect } from 'react';
import { getSessionId, submit } from './api';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [authnToken, setAuthnToken] = useState('');
  const [store, setStore] = useState({ username: '' });

  useEffect(() => {
    getSessionId().then((id) => setSessionId(id));
  }, [setSessionId]);

  const handleChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    submit(store).then((token) => setAuthnToken(token));
  };

  return (
    <div className="App">
      <div>session ID: {sessionId}</div>
      <div>
        <input
          type="text"
          name="username"
          value={store.username}
          onChange={handleChange}
          disabled={!sessionId}
        />
        <button onClick={onSubmit} disabled={!sessionId}>
          {sessionId ? 'Submit username' : 'Creating session'}
        </button>
      </div>
      <div>authnToken: {authnToken}</div>
    </div>
  );
}

export default App;
