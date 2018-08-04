import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router'
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            // Sets variable  to the mutation
            variables: {
                title: this.state.title
            },
            // Used to update any previously fetched queries
            refetchQueries: [{query: fetchSongs}]
        })
        .then(() => hashHistory.push('/'))
        .catch((error) => console.log('fails', error));
    }

    render() {
        // if (this.props.data.loading) return <div>loading</div>;
        return (
            <div>
                <Link to='/'> Home </Link>
                <h3>Create new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song title: </label>
                    <input
                        onChange={ event => this.setState({title: event.target.value})}
                        value={this.state.title}
                        />
                    <button type='submit'> Add new song</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id,
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);