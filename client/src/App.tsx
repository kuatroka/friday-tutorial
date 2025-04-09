import React from "react";
import "./App.css";
import GuestbookWall from "./components/GuestbookWall";
import AnimatedGuestbook from "./components/AnimatedGuestbook";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="ascii-art">
            {`
      ███████╗██████╗ ██╗██████╗  █████╗ ██╗   ██╗
      ██╔════╝██╔══██╗██║██╔══██╗██╔══██╗╚██╗ ██╔╝
      █████╗  ██████╔╝██║██║  ██║███████║ ╚████╔╝
      ██╔══╝  ██╔══██╗██║██║  ██║██╔══██║  ╚██╔╝
      ██║     ██║  ██║██║██████╔╝██║  ██║   ██║
      ╚═╝     ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝
`}
          </div>
          <AnimatedGuestbook />
        </div>
      </header>
      <main>
        <GuestbookWall />
      </main>
      <footer>
        <p>
          Friday Tutorial - Virtual Guestbook | Sign the book by submitting a PR
        </p>
      </footer>
    </div>
  );
};

export default App;
