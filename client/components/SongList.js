import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';

class SongList extends Component {

    handleOnDelete(songId) {
        console.log('aaa ', songId)
        this.props.mutate({
            variables: {
                id: songId
            },
            refetchQueries: [{ query }]
        })
    }

    renderSongs() {
        return this.props.data.songs.map(s => {
          return (
            <li key={s.id}>{s.title} <span style={{marginLeft: '40px'}} onClick={() => this.handleOnDelete(s.id)}> X </span> </li>
          )
        })
    }

    render() {
        console.log('list props ', this.props)
        if (this.props.data.loading) return <div>loading</div>;
        return (
            <div>

                {this.renderSongs()}
                <Link to='/song/new'> Add new </Link>
            </div>
        );
    }
}

// Apollo does not support binding two queries/mutuors with one `graphql` call.
export default graphql(deleteSong)(graphql(query)(SongList))