import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Storage from '../util/Storage';

export default class MainPage extends Component {
	static navigationOptions = {
		title: '首页',
	    tabBarIcon: ({ tintColor }) => (
	    	<Icon name="md-home" size={25} color={tintColor} />
	    )
    };

	render() {
		return (
			<Text {...this.props} onPress={()=>{
				Storage.getValueForKey('isInit').then((data) => {console.log(data)});

				Storage.remove('isInit');
			}}>MainPage</Text>
		)
	}
}