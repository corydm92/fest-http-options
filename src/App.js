import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import FormFields from "./FormFields";

class App extends Component {
	componentDidMount() {
		console.log(this.props);
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<nav>
						<ul>
							<li>
								<Link to='/char_example'>Character Example</Link>
							</li>
							<li>
								<Link to='/integer_example'>Integer Example</Link>
							</li>
							<li>
								<Link to='/date_example'>Date Example</Link>
							</li>
							<li>
								<Link to='/many_example'>Many Example</Link>
							</li>
						</ul>
					</nav>

					<Switch>
						<Route path='/char_example'>{({ match }) => <FormFields match={match} />}</Route>
						<Route path='/integer_example'>{({ match }) => <FormFields match={match} />}</Route>
						<Route path='/date_example'>{({ match }) => <FormFields match={match} />}</Route>
						<Route path='/many_example'>{({ match }) => <FormFields match={match} />}</Route>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
