import React from 'react';

class PlayerItem extends React.Component {
    render() {
        let status = 'playing';
        if (this.props.status === 1) {
            status = 'won';
        }
        else if (this.props.status === 2) {
            status = 'lost';
        }

        if (this.props.player) {
            return (
                <li className={'player ' + status}>
                    <span style={{flex: '1'}}>#{this.props.rank}</span>
                    <span style={{flex: '5'}}>{this.props.name} (YOU)</span>
                    <span style={{flex: '3'}}>Points: {this.props.score}</span>
                </li>
            );
        }
        else {
            return (
                <li className={status}>
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

        let roundMessage = this.props.game.round > this.props.game.roundsPerGame ? 
        'Game Over' : 
        `Round ${this.props.game.round}/${this.props.game.roundsPerGame}`;
        

        return (
            <div className='scoreContainer'>
                <div className='infoTop'>
                    <div className='timeLeft'>
                        {this.props.game.timeLeft}
                    </div>
                    <div className='roundTracker'>
                        <span>
                            {roundMessage}
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
                            status={player.status}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export { Scoreboard };