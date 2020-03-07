import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './DropDown.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
 
const element = <FontAwesomeIcon icon={faCoffee} />
 


export default class DropDown extends React.Component {
	render() {
		const menuItems = [
			{
				label: 'Edit',
				icon: 'fa fa-clone',
				onClick: () => alert('Clone')
			},
			{
				label: 'Share',
				icon: 'fa fa-bullhorn',
				onClick: () => alert('Share')
			},
			{
				label: 'Delete',
				icon: 'fa fa-trash-o',
				onClick: () => alert('Deleted')
			}
		];
		return (
			<div className="card">
				<DropdownMenu items={menuItems} />
			</div>
		);
	}
}

class DropdownMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};

		this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
	}

	toggle() {
		this.setState(previous => ({
			active: !previous.active
		}));
	}
  
  close() {
    this.setState({
       active: false
    });
  }

	render() {
		const items = this.props.items;
		const active = this.state.active;

		return (
			<div className="dropdown-menu" tabIndex="0" onBlur={this.close}>
				<div className={`toggle ${active ? 'active' : ''}`} onClick={this.toggle}>
					<span>
						<i className="fa fa-ellipsis-v" />
					</span>
				</div>
				<div className={`menu ${active ? 'expanded' : 'collapsed'}`}>
					<ul>
						{items.map((i,index) => (
							<li key={index} onClick={i.onClick}>
								<span>
									<i className={i.icon} />
								</span>
								<span className="label">{i.label}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

//ReactDOM.render(<App />, document.getElementById('root'));

