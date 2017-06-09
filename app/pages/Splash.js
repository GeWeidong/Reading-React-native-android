import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SplashImg = require('../images/splash.png');

import Storage from '../util/Storage';
import NavigationUtil from '../util/NavigationUtil';

export default class Splash extends Component {
	constructor(props){
		super(props);
		this.state = {
			bounceValue: new Animated.Value(1)
		}
	}

	componentDidMount() {
		const { navigate } = this.props.navigation;
		Animated.timing(this.state.bounceValue, {
			toValue: 1.3,
			duration: 1000
		}).start();

		this.timer = setTimeout(() => {
			Storage.getValueForKey('isInit').then((data) => {
				if(!data){
					// 如果是第一次进入APP，那么直接跳转到标签页让用户选择标签
					navigate('CategoryPage', {isFirst: true});
				}else{
					NavigationUtil.reset(this.props.navigation, 'Home');
				}
			})
			
		}, 1000);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() {
		return (
			<View>
				<Animated.Image 
					source={SplashImg}
					style={{width: screenWidth, height: screenHeight,transform: [{scale: this.state.bounceValue}]}}
					// transform: [{scale: this.state.bounceValue}]}注意写法，放在数组中[]
				/>

			</View>
		)
	}
}