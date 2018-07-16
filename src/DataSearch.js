import React, { Fragment } from "react";
import { connect } from "react-redux";
import Api from "./Api.js";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TableView from './TableView';

const DataSearch = props => {
	if (props.isLoading) {
		return (
			<Fragment>
				<AppBar position="static">
					<Typography variant="title" color="inherit">
						API to myfxbook (Loading...)
					</Typography>
				</AppBar>
				<form noValidate autoComplete="off">
					<TextField
						id="id-Login"
						label="E-mail"
						placeholder="E-mail"
						margin="normal"
						onChange={props.handleLoginChange}
					/>
					<TextField
						id="id-Password"
						label="Password"
						placeholder="Password"
						type="password"
						margin="normal"
						onChange={props.handlePasswordChange}
					/>

					<Button
						variant="contained"
						color="primary"
						onClick={e => props.handleSubmit(e, props.authParam)}
					>
						Submit
					</Button>
				</form>
				<img
					src="https://media1.tenor.com/images/db85ba00c6073b451a8f05156a66524e/tenor.gif?itemid=9856796"
					alt=""
				/>
			</Fragment>
		);
	} else
		return (
			<Fragment>
				<AppBar position="static">
					<Typography variant="title" color="inherit">
						API to myfxbook
					</Typography>
				</AppBar>

				<form noValidate autoComplete="off">
					<TextField
						id="id-Login"
						label="E-mail"
						placeholder="E-mail"
						margin="normal"
						onChange={props.handleLoginChange}
					/>
					<TextField
						id="id-Password"
						label="Password"
						placeholder="Password"
						type="password"
						margin="normal"
						onChange={props.handlePasswordChange}
					/>{" "}
					<Button
						variant="contained"
						color="primary"
						onClick={e => props.handleSubmit(e, props.authParam)}
					>
						Submit
					</Button>
					<TableView />
				</form>				
				<Dialog
					open={props.dialogOpen}
					keepMounted
					onClose={props.handleOpenDialog}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="simple-dialog-title">
						Error Connection
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{props.authData.message}
						</DialogContentText>
					</DialogContent>
					<Button
						onClick={props.handleOpenDialog}
						color="primary"
						autoFocus
					>
						Close
					</Button>
				</Dialog>
			</Fragment>
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

const MapDispatchToProps = dispatch => {
	return {
		handleInputChange: e => {
			dispatch({
				type: "SEARCH_INPUT_CHANGE",
				payload: e.target.value
			});
		},
		handleLoginChange: e => {
			dispatch({
				type: "LOGIN_INPUT_CHANGE",
				payload: e.target.value
			});
		},
		handlePasswordChange: e => {
			dispatch({
				type: "PASSWORD_INPUT_CHANGE",
				payload: e.target.value
			});
		},
		handleOpenDialog: () => {
			dispatch({
				type: "DIALOG_OPEN",
				payload: false
			});
		},
		handleSubmit: (e, authParam) => {			
			e.preventDefault();
			Api.getConnection(dispatch, authParam);
		}
	};
};

export default connect(MapStateToProps, MapDispatchToProps)(DataSearch);

/*
<TableCell numeric>
											{n.calories}
										</TableCell>
										<TableCell numeric>{n.fat}</TableCell>
										<TableCell numeric>{n.carbs}</TableCell>
										<TableCell numeric>
											{n.protein}
										</TableCell>

										<ul>
					{props.extData.map(data => {
						return (
							<li key={data.name}>
								<a href={data.html_url}>{data.name}</a>
							</li>
						);
					})}
				</ul>

										*/