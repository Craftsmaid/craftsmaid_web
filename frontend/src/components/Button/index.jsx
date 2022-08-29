import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import "./button.scss";

const Button = (props) => {
	const { title, color } = props;
	return (
		color === "white" ? (
			<div
				className={`flex rounded-full app__button shadow-xl  py-2 px-5 justify-between items-center`}
			>
				<p className="flex-1 text-black  text-lg">{title}</p>
				<div className="">
					<BsArrowRightCircleFill size="30" />
				</div>
			</div>
		) : (
			<div
				className={`flex rounded-full app__button shadow-xl goldbg py-2 px-5 justify-between items-center`}
			>
				<p className="flex-1 text-white  text-lg">{title}</p>
				<div className="">
					<BsArrowRightCircleFill size="30" color="white" />
				</div>
			</div>
    )
	);
};

export default Button;
