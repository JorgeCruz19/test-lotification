import { Link } from "react-router-dom";

const List = ({ uri, name }) => {
	return (
		<Link
			to={`${uri}`}
			className="flex justify-start cursor-pointer text-gray-700 hover:text-teal-500 hover:bg-teal-100 rounded-md px-2 py-2 my-2"
		>
			<span className="bg-teal-500 h-2 w-2 m-2 rounded-full"></span>
			<div className="flex-grow font-medium px-2 capitalize">{name}</div>
		</Link>
	);
};

export default List;
