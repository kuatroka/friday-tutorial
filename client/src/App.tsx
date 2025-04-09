import React from 'react';
import './App.css';
import GuestbookWall from './components/GuestbookWall';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Friday's Virtual Guestbook</h1>
        <p>Leave your mark with a custom icon and a friendly message</p>
      </header>
      <main>
        <GuestbookWall />
      </main>
      <footer>
        <p>Friday Tutorial - Virtual Guestbook | Sign the book by submitting a PR</p>
      </footer>
    </div>
  );
}

export default App;
