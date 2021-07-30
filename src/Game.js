import React from 'react';
import { Guesses } from './Guesses.js';
import { Keyboard } from './Keyboard.js';
import { Lives } from './Lives.js';
import { io } from 'socket.io-client';
import { Scoreboard } from './Scoreboard.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        
        //Connect to Socket.IO server
        this.serverIP = 'Hangman-Server.delaminer.repl.co'
        
        this.socket = io(this.serverIP);

        //There are many events that send the same data (they just occur as different events), 
        // so loop through each one and handle it the same way
        const basicEvents = ['addPlayer', 'removePlayer', 'timeUpdate', 'scoreUpdate'];

        basicEvents.forEach(event => {
            this.socket.on(event, message => {
                //Create an object that will hold all changes in state, so the actual state only has to be changed once
                let newState = { ready: true };
                newState.game = JSON.parse(message);

                //Update the state
                this.setState(newState);
            });
        });

        //Complex events
        const complexEvents = ['join', 'start', 'newRound', 'guessResult', 'gameEnd'];

        complexEvents.forEach(event => {
            this.socket.on(event, message => {
                //Parse the message only once
                let messageData = JSON.parse(message);

                //Create an object that will hold all changes in state, so the actual state only has to be changed once
                let newState = { ready: true };
                //Get the game
                newState.game = messageData.game;
                //Get the player
                newState.player = messageData.player;
                //Get the custom hint (if in game)
                if (newState.game.round > 0)
                    newState.hint = messageData.customHint.split('').join(' ');
                else
                    newState.hint = '';

                //Update the state
                this.setState(newState);
            });
        });

        //Game close is special
        this.socket.on('gameClose', msg => {
            //Reconnect
            this.socket = io(this.serverIP);
        });


        //Set a dummy state so nothing is rendered before data is received
        this.state = {
            ready: false,
        }
    }

    makeGuess(letter) {
        //Make sure the player hasn't aready guessed this letter, or they can't guess right now (already won/lost)
        if (this.state.player.correct.includes(letter) || 
            this.state.player.incorrect.includes(letter) || 
            this.state.player.status !== 0 || 
            this.state.player.lives <= 0) 
            return;

        this.socket.emit('guess', JSON.stringify({
            guess: letter,
        }));
    }

    render() {
        if (!this.state.ready) return 'Loading...'
        let message = '';
        let bg = 'white';
        if (this.state.player.status === 1) {
            message = 'You won!';
            bg = 'lightgreen';
        }
        if (this.state.player.status === 2) {
            message = 'You lost!';
            bg = 'lightpink';
        }

        let gameDisplay = (
            <div className='gameContainer' style={{backgroundColor: bg}}>
                {/* <div style={{flex: '2'}}>
                    <div className='status'>
                        {message}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <button 
                            className='restart' 
                            onClick={() => this.restart()}
                            hidden={this.state.status === 0}
                        >
                            Play Again
                        </button>
                    </div>
                </div> */}
                <div style={{flex: '8'}}>
                    <Lives 
                        lives={this.state.player.lives}
                    />
                </div>
                <div style={{flex: '2'}}>
                    <Guesses 
                        hint={this.state.hint}
                        // correct={this.state.player.correct}
                    />
                </div>
                <div style={{flex: '5'}}>
                    <Keyboard 
                        onClick={letter => this.makeGuess(letter)} 
                        correct={this.state.player.correct}
                        incorrect={this.state.player.incorrect}
                    />
                </div>
            </div>
        );

        return (
            <div className='container' style={{backgroundColor: bg}}>
                <div className='left'>
                    <Scoreboard 
                        game={this.state.game}
                        player={this.state.player}
                        gameEnd={this.state.gameEnd}
                    />
                </div>
                <div className='right'>
                    {/* <div className='gameContainer'>

                    </div> */}
                    {gameDisplay}
                </div>
            </div>
        );
    }

    renderGame() {
        if (!this.state.ready) return 'Loading...'
        let message = '';
        let bg = 'white';
        if (this.state.status === 1) {
            message = 'You won!';
            bg = 'lightgreen';
        }
        if (this.state.status === 2) {
            message = 'You lost!';
            bg = 'lightpink';
        }

        return (
            <div className='gameContainer' style={{backgroundColor: bg}}>
                <div style={{flex: '3'}}>
                    <div className='status'>
                        {message}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <button 
                            className='restart' 
                            onClick={() => this.restart()}
                            hidden={this.state.status === 0}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
                <div style={{flex: '5'}}>
                    <Lives 
                        lives={this.state.lives}
                    />
                </div>
                <div style={{flex: '2'}}>
                    <Guesses 
                        word={this.state.word} 
                        guesses={this.state.guesses}
                        status={this.state.status}
                    />
                </div>
                <div style={{flex: '5'}}>
                    <Keyboard 
                        onClick={letter => this.makeGuess(letter)} 
                        word={this.state.word} 
                        guesses={this.state.guesses} 
                    />
                </div>
            </div>
        );
    }
}

export { Game };