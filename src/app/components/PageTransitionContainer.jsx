import React from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


class PageTransitionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { height: 0 };
    }

    componentDidMount() {
        this.checkHeight();
    }

    componentDidUpdate() {
        // this is a hack fix to enable us to change the animation direction when a page transitions
        window.navDirection = 'forward';

        this.checkHeight();
    }

    shouldComponentUpdate(prevProps, prevState) {
        if (prevProps.location === this.props.location && prevProps.height === this.state.height) {
            return false;
        }

        return true;
    }

    checkHeight() {
        let newHeight = findDOMNode(this.ref).children[0].clientHeight;

        if (this.state.height !== newHeight) {
            this.setState( { height: newHeight } );
        }
    }

    render() {
        return (
            <TransitionGroup style={ { minHeight: (this.state.height) + 'px' } } appear={true} className={"page-transition-container"} ref={(ref) => this.ref = ref} childFactory={child => React.cloneElement(
                child,
                {classNames: "page-transition-slide-" + (window.navDirection || 'forward')}
            )} >
                <CSSTransition key={this.props.location.key} className={"page-transition"} classNames={"page-transition-slide"} timeout={1000}>
                    <div>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default PageTransitionContainer;