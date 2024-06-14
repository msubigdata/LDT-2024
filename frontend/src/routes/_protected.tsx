import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";

export const Route = createFileRoute("/_protected")({
  component: () => <ProtectedLayoutComponent />,
});

function ProtectedLayoutComponent() {
  return (
    <div className="flex">
      <div>
        <EyeIcon />

        <nav className="flex flex-1">
          <ul>
            <li>
              <Link to="/view">Просмотр</Link>
            </li>

            <li>
              <Link to="/hub">Файлы</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col">
        <div>
          <div>Account</div>
          <button type="button">Выйти</button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
