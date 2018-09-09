import React                                                          from 'react';
import {connect}                                                      from "react-redux";
import {doRedirectAction, setLoadingAction, setLoadingMessagesAction} from "App/store/action/app";
import { toast }                                                      from 'react-toastify';
import { Redirect }                                                   from 'react-router-dom';

function Page(Component) {
    class PageHOC extends React.Component {
        constructor(props) {
            super(props);

            this.ident = this.props.location.pathname + Math.floor(Math.random() * 100);
        }

        componentWillUnmount() {
            this.unmounted = true;
        }

        shouldComponentUpdate(prevProps, prevState) {
            if (prevProps.match !== this.props.match && JSON.stringify(prevProps.match) === JSON.stringify(this.props.match)) {
                return false;
            }

            return true;
        }

        redirect( url ) {
            this.props.RedirectToUrl( url );
        }

        render() {

            return (
                <Component { ...this.props } setLoading={ this.setLoading.bind( this ) } redirect={ this.redirect.bind( this ) } />
            );
        }
    }

    const mapDispatchToProps = dispatch => ({
        RedirectToUrl: redirect => dispatch(doRedirectAction(redirect)),
    });

    return connect(null, mapDispatchToProps)(PageHOC);
}

export default Page;