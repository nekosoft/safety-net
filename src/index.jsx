// @flow
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import history from 'Utils/History';
import Section from 'App/section'
import {APP_CONTAINER_SELECTOR, SPACING_UNIT_BASE} from 'App/config'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { PersistGate } from 'redux-persist/integration/react'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { Router } from 'react-router-dom';
import { store, persistor } from 'Utils/Store';
import { hot } from 'react-hot-loader';
import log from 'log-with-style';


window.log = log;


// a super simple function to calculate spacing based off the base spacing unit
window.sp = (multiplier) => SPACING_UNIT_BASE * multiplier + 'px';


class ErrorBoundary extends React.Component {
    componentDidCatch(error, info) {
        console.error('ERROR', error);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}



const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={ reduxStore }>
      <PersistGate loading={null} persistor={persistor}>
            <Router history={ history }>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ErrorBoundary>
                        <Section />
                    </ErrorBoundary>
                </MuiPickersUtilsProvider>
            </Router>
      </PersistGate>
  </Provider>;



ReactDOM.render(wrapApp(Section, store), rootEl);

