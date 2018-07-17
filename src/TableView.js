import React from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const copyKey = obj => {
	var copy = [];
	var i = 0;
	for (var key in obj) {
		copy[i] = key;
		i++;
	}
	return copy;
};
const TableView = props => {
	let clone = copyKey(props.extData[0]);
	let tableCeil;
	return (
		<Table>
			<TableHead>
				{clone.map((prop, id) => {
					return <TableCell key={id}>{prop}</TableCell>;
				})}
			</TableHead>
			<TableBody>
				{props.extData.map((data, id) => {
					{
						let tableStr = [];
						clone.map(prop => {
							if (typeof data[prop] === "number") {
								tableCeil = (
									<TableCell numeric>{data[prop]}</TableCell>
								);
							} else if (typeof data[prop] === "string") {
								tableCeil = (
									<TableCell component="th" scope="row">
										{data[prop]}
									</TableCell>
								);
							}
							return tableStr.push(tableCeil);
						});
						return <TableRow key={id}>{tableStr}</TableRow>;
					}
				})}
			</TableBody>
		</Table>
	);
};

const MapStateToProps = state => {
	return {
		authParam: state.authParam,
		extData: state.extData,
		isLoading: state.itemsIsLoading,
		isFailed: state.itemsIsFailed,
		dialogOpen: state.dialogOpen,
		authData: state.authData
	};
};

export default connect(MapStateToProps)(TableView);
