import { Routes, Route } from "react-router";
import { Navbar } from "@/layouts/Navbar";
import { Book } from "@/pages/Book";
import { Compare } from "@/pages/Compare";
import { Discover } from "@/pages/Discover";
import { Home } from "@/pages/Home";
import { Profile } from "@/pages/Profile";
import { Detail } from "@/pages/Detail";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/dicover" element={<Discover />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/book" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
