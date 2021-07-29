import React from 'react';

class PlayerItem extends React.Component {
    render() {
        if (this.props.player) {
            return (
                <li className='player'>
                    <span style={{flex: '1'}}>#{this.props.rank}</span>
                    <span style={{flex: '5'}}>{this.props.name} (YOU)</span>
                    <span style={{flex: '3'}}>Points: {this.props.score}</span>
                </li>
            );
        }
        else {
            return (
                <li>
                    <span style={{flex: '1'}}>#{this.props.rank}</span>
                    <span style={{flex: '5'}}>{this.props.name}</span>
                    <span style={{flex: '3'}}>Points: {this.props.score}</span>
                </li>
            );
        }
    }
}

class Scoreboard extends React.Component {

    render() {
        return (
            <div className='scoreContainer'>
                <div className='infoTop'>
                    <div className='timeLeft'>
                        {this.props.game.timeLeft}
                    </div>
                    <div className='roundTracker'>
                        <span>
                            Round {this.props.game.round}/{this.props.game.roundsPerGame}
                        </span>
                    </div>
                </div>
                <ul className='leaderboard'>
                    {this.props.game.players.sort((a, b) => b.score - a.score).map((player, index) => 
                        <PlayerItem
                            rank={index + 1}
                            name={player.name}
                            key={player.name}
                            player={player.name === this.props.player.name}
                            score={player.score}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export { Scoreboard };