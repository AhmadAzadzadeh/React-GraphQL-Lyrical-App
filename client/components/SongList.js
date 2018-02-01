import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";

class SongList extends Component {
	onSongDelete(id) {
		this.props
			.mutate({
				variables: { id }
			})
			.then(() => {
				this.props.data.refetch();
			});
	}

	renderSongs() {
		const { songs } = this.props.data;
		return songs.map(({ id, title }) => {
			return (
				<li key={id} className="collection-item">
					<Link to={`/songs/${id}`}>{title}</Link>
					<i
						className="right"
						onClick={() => this.onSongDelete(id)}
						className="material-icons"
					>
						delete
					</i>
				</li>
			);
		});
	}
	render() {
		if (this.props.data.loading) {
			return <div>Loading ...</div>;
		}
		// console.log(this.props);
		return (
			<div>
				<ul className="collection">this.renderSongs()</ul>
				<Link className="btn-floating btn-large red right" to="/songs/new">
					<i className="material-icons">add</i>
				</Link>
			</div>
		);
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`;

export default graphql(mutation)(query(SongList));
