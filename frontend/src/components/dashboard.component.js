import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v1 as uuid } from 'uuid'
import { Delete } from '../styles/js/components/index';


class Dashboard extends Component {
    state = {
    	//example data
        flowers: [
        { id: uuid, name:"Sunflower"},
        { id: uuid, name:"Dill"}
        ]
    }

    render() {
    	//extract data from 
    	const { flowers } = this.state;
    	return (
    		<div className="container dashContainer padding">
    			<div className="dashBack">
    				<button className="buttonW b1" type="submit" value="login" onClick={() => {
    					const name = prompt('Enter Plant');
    					if(name) {
    						this.setState(state => ({
    							flowers: [...state.flowers, { id: uuid(), name }]
    						}))
    					}
    				}}>Add plant</button>
    				<div className="plantList">
	    				<ul>
		    				<li className="plants">
		    					{flowers.map(({ id, name }) => (
		    						<p><Delete/>{name}</p>
		    					))}
		    				</li>
	    				</ul>
    				</div>
    			</div>
    		</div>
		);
    }

}

export default Dashboard;