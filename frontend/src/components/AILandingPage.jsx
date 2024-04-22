import { Link } from "react-router-dom";

export default function AILandingPage() {
  return (
    <>
      <Link to="/chat-gpt">Chat GPT</Link>
      <Link to="/text-completion">Text Completion</Link>
    </>
  );
}
