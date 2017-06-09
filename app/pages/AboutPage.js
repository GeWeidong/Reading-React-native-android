import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Button from '../components/Button';

const READING_URL = 'https://github.com/attentiveness/reading';
const SHOW_API = 'https://www.showapi.com';
const aboutLogo = require('../images/about_logo.png');

import Storage from '../util/Storage';

export default class AboutPage extends Component {
	static navigationOptions = {
		title: '关于',
	    tabBarIcon: ({ tintColor }) => (
	    	<Icon name="md-information-circle" size={25} color={tintColor} />
	    ),
	    headerRight: (
	    	<Icon.Button 
	    		name="logo-github"
	    		backgroundColor='transparent'
	    		underlayColor='transparent' // 当触摸或者点击控件的时候显示出的颜色
	    		onPress={()=>Linking.openURL(READING_URL)}
	    		// Linking提供了一个通用的接口来与传入和传出的App链接进行交互
	    	/>
	    )
    };

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.center}>
					<Image style={styles.logo} source={aboutLogo} />
					<Text style={styles.version}>
						V2.1
					</Text>
					<Text style={styles.title}>
		              iReading
		            </Text>
		            <Text style={styles.subtitle} onPress={() => this.clearStorage()}>
		              让生活更精彩
		            </Text>
				</View>
				<View style={styles.bottomContainer}>
					<Text style={styles.disclaimer}>免费声明：所有内容均来自：</Text>
					<Button text={SHOW_API} textStyle={[styles.disclaimer],{color:'#3e9ce9'}} onPress={()=>alert(SHOW_API)}/>
				</View>
			</View>
		)
	}

	clearStorage() {
		Storage.remove('isInit');
		Storage.remove('typeIds');
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'#fff',
		flex:1,
	},
	center:{
		flex:1,   // 可以把最下面的两行字顶到下面去
		alignItems:'center'
	},
	logo:{
		width: 110,
		height: 110,
		marginTop:50
	},
	version:{
		fontSize:16,
		color:'#aaaaaa',
		marginTop:10
	},
	title:{
		fontSize:28,
		marginTop:10,
		color:'#313131'
	},
	subtitle:{
		fontSize:18,
		color:'#4e4e4e'
	},
	bottomContainer:{
		alignItems:'center'
	},
	disclaimer:{
		fontSize:14,
		color:'#999999'
	}
})