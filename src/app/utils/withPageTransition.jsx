import React from 'react';

function withPageTransition(Component) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        goBack() {
            window.navDirection = 'back';
            this.props.history.goBack();
        }

        render() {
            return (
                <Component goBack={this.goBack.bind(this)} {...this.props} />
            )
        }
    };
}

export default withPageTransition;