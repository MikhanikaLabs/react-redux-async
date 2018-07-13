import React, { Fragment } from "react";
import { connect } from "react-redux";
import Api from './Api.js';
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const RepoSearch = props => {
	console.log("props.authParam.login:", props.authParam.login);
	console.log("props.authParam.password:", props.authParam.password);
	if (props.isLoading) {
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
						Title
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
				</form>
				<ul>
					{props.repos.map(repo => {
						return (
							<li key={repo.name}>
								<a href={repo.html_url}>{repo.name}</a>
							</li>
						);
					})}
				</ul>
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
		repos: state.repos,
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
			console.log("DIALOG_OPEN");
			dispatch({
				type: "DIALOG_OPEN",
				payload: false
			});
		},
		handleSubmit: (e, authParam) => {
			console.log(
				"login",
				authParam.login,
				"password",
				authParam.password
			);
			e.preventDefault();
			Api.getConnection(dispatch, authParam);
		}
	};
};


export default connect(MapStateToProps, MapDispatchToProps)(RepoSearch);
