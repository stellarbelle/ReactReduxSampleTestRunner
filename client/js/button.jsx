import React from 'react';

export default class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			done: false
		};
	}

	runTests() {
		console.log("starting tests");
	}

	_renderComplete() {
		if(this.state.done) {
			return(
				<div>
					<h3>Complete!</h3>
				</div>
			)
		} else {
			return null;
		}
	}

	render() {
		return (<div>
				  <button type="button" onClick={this.props.onClick} >Start Tests</button>
				  {this._renderComplete()}
			    </div>);
	}
}