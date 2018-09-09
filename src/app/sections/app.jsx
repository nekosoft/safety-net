import React                             from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import {
    HOME,
}                                        from "App/routes";
import { connect }                       from 'react-redux';
import { MuiThemeProvider }    from '@material-ui/core/styles';
import { appTheme }            from 'Utils/Themes';
import BodyClassName           from 'react-body-classname';
import Card                    from '@material-ui/core/Card';
import PageTransitionContainer from 'Components/PageTransitionContainer';
import withPageTransition      from 'Utils/withPageTransition';
import Page                    from 'Utils/Page';
import Home                    from 'Components/Home';


class AppSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider theme={appTheme}>
                <BodyClassName className={"main"}>
                    <div className="content-wrapper">
                        <Card style={ { padding: '20px' } } style={ { background: 'transparent' }}>
                            <PageTransitionContainer location={this.props.location}>
                                <Switch location={this.props.location}>
                                    <Route exact path={ HOME } component={ withPageTransition(Page(Home, true)) } />
                                    <Redirect to={ '/' } />
                                </Switch>
                            </PageTransitionContainer>
                        </Card>
                    </div>
                </BodyClassName>
            </MuiThemeProvider>
        );
    }
}


const mapStateToProps = state => ({
    hideHeader: state.app.hideHeader,
});

export default connect(mapStateToProps)(AppSection);
