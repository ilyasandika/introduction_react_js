import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "../contexts.jsx";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  return (
    <div className="index">
      <div className="index-brand">
        <h1>Ristorante Pizza</h1>
        <p>{t("home")}</p>
      </div>
      <ul>
        <li>
          <Link to="/order">Order</Link>
        </li>
        <li>
          <Link to="/past">Order History</Link>
        </li>
        {/* tambahkan beberapa link lagi */}
      </ul>
    </div>
  );
}
