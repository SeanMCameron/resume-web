import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <h1>Hello, I'm Sean Cameron.</h1>
      <h2>Data Analyst</h2>
      <h2>
        Read more
        <Link to="resume-web/About" className="blue">
          {" "}
          about me{" "}
        </Link>
        ,
        <Link to="resume-web/Contact" className="red">
          {" "}
          contact me{" "}
        </Link>{" "}
        or look at my
        <Link to="resume-web/Dashboard" className="yellow">
          {" "}
          example dashboard.
        </Link>
      </h2>
    </div>
  );
}

export default Home;
