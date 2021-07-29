import React from 'react';
// import { Text, View } from 'react-native';

//Show blanks and what you have guessed correctly ( A _ _ L _ )
class Guesses extends React.Component {

    render() {
        return (
            <div 
                className='guesses'
                style={{paddingLeft: 5, paddingRight: 5}}
            >
                {this.props.hint}
            </div>
        );
    }
}

export { Guesses };