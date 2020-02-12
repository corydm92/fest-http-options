import React, { Component } from "react";
import axios from "axios";

class FormFields extends Component {
	state = {
		currentPath: null
	};

	componentDidMount() {
		this.setState({ currentPath: this.props.match.path });
		this.optionsRequest();
	}

	optionsRequest() {
		let apiEndpoint = "https://http-options.herokuapp.com/api/http_options";
		let path = this.props.match.path + "/";

		axios
			.options(apiEndpoint + path)
			.then(res => {
				// console.log(res);
				this.setState({ optionsRequest: res.data.actions.POST }, () => this.setPutRequestEndpoints());
			})
			.catch(err => console.log(err));

		this.setState({ currentPath: this.props.match.path });
	}

	setPutRequestEndpoints() {
		let { optionsRequest } = this.state;

		let outObj = {};

		for (let input in optionsRequest) {
			outObj[input] = null;
		}

		this.setState({ postRequest: outObj });
	}

	render() {
		if (this.props.match.path !== this.state.currentPath) {
			this.optionsRequest();
		}

		if (this.state.optionsRequest) {
			let { optionsRequest } = this.state;

			var inputJsx = {
				string: [],
				boolean: [],
				date: [],
				float: [],
				integer: [],
				choice: [],
				field: {
					owner: [],
					project: [],
					source: [],
					membership: [],
					measurement: [],
					samples: []
				}
			};

			for (let input in optionsRequest) {
				switch (optionsRequest[input].type) {
					case "string":
						inputJsx.string.push(
							<>
								<input type='text' placeholder={optionsRequest[input].label} />
								<label>{optionsRequest[input].required ? " (Required)" : null}</label>
							</>
						);
						break;
					case "integer":
						if (input !== "id") {
							inputJsx.integer.push(
								<>
									<input type='number' required={true} placeholder={optionsRequest[input].label} />
									<label>{optionsRequest[input].required ? " (Required)" : null}</label>
								</>
							);
						}
						break;
					case "date":
						inputJsx.date.push(
							<>
								<input type='date' placeholder='date' />
								<label>{optionsRequest[input].required ? " (Required)" : null}</label>
							</>
						);
						break;
					default:
						break;
				}
			}
		}

		let formElements = [];
		for (let label in inputJsx) {
			switch (label) {
				case "field":
					for (let fieldLabel in inputJsx[label]) {
						if (inputJsx.field[fieldLabel].length > 0) {
							formElements.push(<div className={`row ${fieldLabel}`}>{inputJsx.field[fieldLabel]}</div>);
						}
					}
					break;
				default:
					if (inputJsx[label].length > 0) {
						formElements.push(<div className={`row ${label}`}>{inputJsx[label]}</div>);
					}
					break;
			}
		}

		// console.log(this.state);

		return (
			<div>
				{formElements}
				<button onClick={() => console.log(this.state)}>Show State</button>
			</div>
		);
	}
}

export default FormFields;

