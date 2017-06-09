import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  InteractionManager,
  ScrollView,
  Alert,
  Image,
  ListView,
} from 'react-native';

export default class GridView extends Component {
	

	constructor(props){
		super(props);
		this.state = {
			dataSource: null
		}
	}

	componentDidMount() {

	}

	render() {
		const { items } = this.props;
		const ds = new ListView.DataSource({
		    rowHasChanged: (r1, r2) => r1 !== r2
		});

		return (
				<ListView 
					contentContainerStyle={this.props.contentContainerStyle}
					dataSource={ds.cloneWithRows(items)}
					renderRow={this.props.renderItem.bind(this)}
				/>
		)
	}

	
}