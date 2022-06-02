const getStateOfLot = (lot) => {
	let color = "";
	if (lot == "Disponible") {
		color = "white";
	} else if (lot == "Vendido") {
		color = "rgb(34, 197, 94)";
	} else {
		color = "rgb(239,68,68)";
	}
	return color;
};

export default getStateOfLot;
