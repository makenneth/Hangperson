import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createGame } from 'redux/modules/games';
import { fetchUsers, getUserSuggestions, clearUserQuery } from 'redux/modules/users_query';
import './styles.scss';

@connect(
  ({ userQuery, auth: { user }, userSuggestions: { suggestions, isLoading } }) =>
  ({
    userQuery,
    isLoading,
    user,
    suggestions: suggestions.filter(s => !user || s.username !== user.username),
  }),
  { fetchUsers, createGame, getUserSuggestions, clearUserQuery }
)
export default class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      direction: 'next',
      currentLocation: 0,
      dropdownOpen: false,
      selectedOpponent: null,
      selected: false,
    };
  }

  componentDidMount() {
    this.props.getUserSuggestions();
    document.addEventListener('click', this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userQuery !== nextProps.userQuery &&
      nextProps.userQuery.length > 0 && !this.state.dropdownOpen) {
      this.setState({ dropdownOpen: true });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick = (ev) => {
    if (this.state.dropdownOpen) {
      if (!document.querySelector('.user-input-container').contains(ev.target)) {
        this.setState({ dropdownOpen: false });
      }
    }
  }

  startGame = () => {
    if (!this.state.selectedOpponent) {
      alert('You have to select a player first!');
    } else {
      this.props.createGame(this.state.selectedOpponent)
        .then((res) => {
          browserHistory.push(`/games/${res.data.id}`);
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  handleClear = () => {
    this.setState({
      name: '',
      selectedOpponent: null,
      dropdownOpen: false,
    });
    this.props.clearUserQuery();
  }

  handleSelect = (e) => {
    const user = JSON.parse(e.target.dataset.user);
    this.setState({
      name: user.nickname,
      selectedOpponent: user,
      selected: true,
      dropdownOpen: false,
    });
  }

  handleSelectSuggestion = (user) => {
    this.setState({
      name: user.nickname,
      selectedOpponent: user,
    }, this.startGame);
  }

  handleChange = (e) => {
    let timer;
    this.setState({
      name: e.target.value,
      selected: false,
    });

    clearTimeout(timer);
    timer = setTimeout(() => {
      this.props.fetchUsers(this.state.name);
    }, 700);
  }

  prev = () => this.setState({ currentLocation: this.state.currentLocation - 2 });

  next = () => this.setState({ currentLocation: this.state.currentLocation + 2 });

  listFoundUsers() {
    return (<ul
      onClick={this.handleSelect}
      className={`user-query-list ${!this.state.dropdownOpen ? 'not-show' : ''}`}
    >
      {
        function mapFoundUsers() {
          const users = [];
          const userQuery = this.props.userQuery;
          for (let i = 0; i < userQuery.length; i++) {
            const user = userQuery[i];
            if (user.id !== 1 && user.id !== this.props.user.id) {
              users.push(<li data-user={JSON.stringify(user)} key={user.id}>{user.nickname}</li>);
            }
          }
          return users;
        }.call(this)
      }
    </ul>);
  }

  render() {
    const { isLoading, suggestions } = this.props;
    const { currentLocation } = this.state;
    const showNext = currentLocation + 2 < suggestions.length;
    const showPrev = currentLocation > 0;
    return (<div className="new-game-container" ref="new-game-container">
      <div className="user-suggestions-container">
        <h3>Suggestions</h3>
        <div className="user-suggestions">
          <i
            className={`fa fa-chevron-left ${!showPrev && 'not-show'}`}
            onClick={this.prev}
          />
          {
            suggestions.slice(currentLocation, currentLocation + 2).map((suggestion, i) => {
              return (<div key={i}>
                <div className="name">{suggestion.nickname}</div>
                <div className="stats"><span>Wins: </span>{suggestion.wins}</div>
                <div className="stats"><span>Losses: </span>{suggestion.losses}</div>

                <button onClick={() => this.handleSelectSuggestion(suggestion)}>
                  Start Game
                </button>
              </div>);
            })
          }
          <i
            className={`fa fa-chevron-right ${!showNext && 'not-show'}`}
            onClick={this.next}
          />
          {
            isLoading && <div className="overlay">
              <div className="loader" />
            </div>
          }
        </div>
      </div>
      <div className="user-input-container">
        <h1>New Game</h1>
        <div className="user-input">
          <input
            type="text"
            placeholder="Enter the user name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <div onClick={this.handleClear}>&times;</div>
          {this.listFoundUsers()}
        </div>
        <button
          className="submit"
          onClick={this.startGame}
          disabled={!this.state.selectedOpponent}
        >
          <span className="chevron-right">></span>
          <span className="underscore">_</span>
          Start Game
        </button>
      </div>
    </div>);
  }
}
