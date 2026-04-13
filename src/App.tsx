import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BestiaryPage } from "./pages/BestiaryPage";
import { CharacterWorkshopPage } from "./pages/CharacterWorkshopPage";
import { ReadAloudPage } from "./pages/ReadAloudPage";
import { WritingToolsPage } from "./pages/WritingToolsPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<WritingToolsPage />} />
        <Route path="/bestiary" element={<BestiaryPage />} />
        <Route path="/character-workshop" element={<CharacterWorkshopPage />} />
        <Route path="/read-aloud" element={<ReadAloudPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
