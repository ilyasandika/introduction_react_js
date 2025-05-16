import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import { CartContext, useLanguage } from "./contexts";

export default function Header() {
  const [cart] = useContext(CartContext);
  const { lang, setLang } = useLanguage();

  return (
    <nav>
      <div className="lang-btn">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="id">ID Indonesia</option>
          <option value="en">EN English</option>
        </select>
      </div>

      <Link to="/">
        <h1 className="logo">Ristorante Pizza</h1>
      </Link>

      <div className="nav-cart">
        🛒<span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}
