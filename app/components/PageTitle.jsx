import { Link } from "react-router";

export default function PageTitle({ title, description, current, backgroundImage }) {
  return (
    <div
      className="page-title dark-background"
      data-aos="fade"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container position-relative">
        <h1>{title}</h1>
        <p>{description}</p>
        <nav className="breadcrumbs">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="current">{current}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
