import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetUsersQuery } from './dummyQuery.generated';

function App() {
  const { data, loading, error } = useGetUsersQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data?.users) {
    return <div>none</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sqoopify
        </a>
        <div>
          <div>{data.users[0]}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
