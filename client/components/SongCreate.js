import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";

class SongCreate extends Component {
	constructor(props) {
		super(props);
		this.state = { title: "" };
	}
	onSubmit(event) {
		event.preventDefault();
		this.props
			.mutate({
				variables: { title: this.state.title },
				refetchQueries: [{ query }]
			})
			.then(() => hashHistory.push("/"));
	}
	render() {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>Create New Song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Song Title: </label>
					<input
						value={this.state.title}
						onChange={event => this.setState({ title: event.target.value })}
					/>
					<button className="btn-large green" type="submit">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			title
		}
	}
`;

export default graphql(mutation)(SongCreate);
