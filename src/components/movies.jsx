import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import {getGenres} from '../services/fakeGeneService';

class Movies extends Component {
    state = { 
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1
     };

     componentDidMount{
         this.setState({movies:getMovies(),genre: getGenres()});
     }

     handleLike = (movie) =>
     {
         const movies = [...this.state.movies];
         const index = movies.indexOf(movie);
         movies[index] = {...movie};
         movies[index].liked = !movies[index].liked;
         this.setState({movies});

     }
     handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({movies});
     };

     handlePageChange = page => {
       this.setState({currentPage:page});
     };

     handleGenreSelect = genre => {
         console.log(genre);
     }

    render() { 
        const {length: count} = this.state.movies;
        const {pageSize,currentPage, movies: allMovies} = this.state;
        if(count === 0) 
            return <p>There are no movies in the database.</p>

        const movies = paginate(allMovies,currentPage,pageSize);

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup items={this.state.genres} onItemSelect={this.hanleGenreSelect}></ListGroup>
                </div>
                <div className="col">
                                <p>Showing {count} movies in the database</p> 
                            <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map(movie => 
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like liked={movie.liked} onClick={() => 
                                        this.handleLike(movie)}></Like></td>
                                    <td><button onClick={() => this.handleDelete(movie)}
                                        className="btn btn-danger btn-sm">Delete</button></td>
                                </tr>)}
                                
                            </tbody>
                        </table>
                        <Pagination itemsCount = {count} pageSize = {pageSize}
                        onPageChange = {this.handlePageChange} currentPage={currentPage}
                        />
                </div>
            
           </div className="row">
         );
    }
}
 
export default Movies;