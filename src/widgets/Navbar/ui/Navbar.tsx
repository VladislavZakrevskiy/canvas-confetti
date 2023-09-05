import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={classes.navbar}>
			<Link className={classes.link} to={"/firework"}>
				Firework
			</Link>
			<Link className={classes.link} to={"/parad"}>
				Parad
			</Link>
			<Link className={classes.link} to={"/realistic"}>
				Realistic
			</Link>
			<Link className={classes.link} to={"/snow"}>
				Snow
			</Link>
		</nav>
	);
};

export default Navbar;
