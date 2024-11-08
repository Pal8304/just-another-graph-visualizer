import { ThemeToggle } from "./theme/toggle";

export default function Navbar() {
  return (
    <div className="absolute right-2 top-2">
      <ThemeToggle />
    </div>
  );
}
