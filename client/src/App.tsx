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
      <section className="tutorial-section">
        <h2>How to Use Friday with this Project</h2>
        <ol className="tutorial-steps">
          <li>
            Navigate to the repository: <code>cd /path/to/friday-tutorial</code>
          </li>
          <li>
            Review the Friday rules: <code>cat .fridayrules</code> to understand
            project requirements
          </li>
          <li>
            Start Friday in your terminal: <code>friday</code>
          </li>
          <li>
            Ask Friday to create a new guestbook entry. Describe what you want
            to say and what you want your icon to look like
          </li>
          <li>
            Follow Friday's guidance to complete your entry and submit a PR
          </li>
        </ol>
      </section>
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
