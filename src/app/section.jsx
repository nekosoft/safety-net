// @flow
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {doRedirectAction, emptyStoreAction, setDebugInfoAction, setUserInfoAction} from "./store/action/app";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import AppSection from './sections/app';
import './section.scss';
import { baseTheme, appTheme } from 'Utils/Themes';
import { ToastContainer }      from 'react-toastify';
import JssProvider             from 'react-jss/lib/JssProvider';


const generateClassName = createGenerateClassName({
    productionPrefix: 'c',
});


class Section extends React.Component {
    constructor(props) {
        super(props);

        this.props.history.listen((location, action) => {
            window.scrollTo(0, 0);
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== this.props.redirectUrl && this.props.redirectUrl !== undefined && this.props.redirectUrl !== '') {
            console.info('########## Section: doing redirect', prevProps.redirectUrl, this.props.redirectUrl);
            this.props.RedirectToUrl( undefined );
            this.props.history.push( this.props.redirectUrl );
        }
    }


    clearStore() {
        this.props.emptyStore();
    }

    render() {

        var content;

        content = (
            <Switch location={this.props.location}>
                <Route path="/" component={AppSection} />
            </Switch>
        )

        return (
            <div>
                <CssBaseline />
                <ToastContainer className='toast-container' />

                <JssProvider generateClassName={generateClassName}>
                    <MuiThemeProvider theme={baseTheme}>
                        <MuiThemeProvider theme={appTheme}>
                            { content }
                        </MuiThemeProvider>
                    </MuiThemeProvider>
                </JssProvider>
            </div>
        );
    }
}



const mapDispatchToProps = dispatch => ({
    emptyStore: placeholder => dispatch(emptyStoreAction(placeholder)),
    RedirectToUrl: redirectUrl => dispatch(doRedirectAction(redirectUrl))
});

const mapStateToProps = state => ({
    redirectUrl: state.app.redirectUrl
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Section));
