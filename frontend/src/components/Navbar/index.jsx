import React from "react";
import "./navbar.scss";

import images from "../../constants/images";

const index = () => {
	return (
		<div className="app__navbar flex flex-row justify-between items-center bg-transparent">
			<div className="app__navbar-logo flex flex-row justify-between items-center">
				<img src={images.Logo} alt="logo" />

				<nav className="flex sm:justify-center space-x-4">
					{[
						["About", "#about"],
						["Menu", "#menu"],
						["Contact", "#contact"],
					].map(([title, url]) => (
						<a
							key={title}
							href={url}
							className="app__navbar-link rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-white"
						>
							{title}
						</a>
					))}
				</nav>
			</div>

			<div></div>
		</div>
	);
};

export default index;
