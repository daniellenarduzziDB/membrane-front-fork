import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import context
import ThemeContext from './context/ThemeContext';

//import lib
import Utils from './lib/utils';

//import views
import Splash from './views/Splash';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'dark'
    };
  }

  componentDidMount = () => {
    Utils.logAppVersion();
  };

  toggleTheme = () => {
    this.setState(
      prevState => ({
        theme: prevState.theme === 'dark' ? 'light' : 'dark'
      }),
      () => {
        let htmlElement = document.body.parentElement;
        htmlElement.dataset.theme = this.state.theme;
      }
    );
  };

  render() {
    const { theme } = this.state;

    return (
      <React.Fragment>
        <ThemeContext.Provider
          value={{ current: theme, toggleTheme: this.toggleTheme }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Splash} />
            </Switch>
          </Router>
        </ThemeContext.Provider>
      </React.Fragment>
    );
  }
}
