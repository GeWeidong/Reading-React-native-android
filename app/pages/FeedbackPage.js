import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';
import ToastUtil from '../util/ToastUtil';

export default class FeedbackPage extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: '建议',
	    tabBarIcon: ({ tintColor }) => (
	    	<Icon name="md-thumbs-up" size={25} color={tintColor} />
	    ),
	    headerRight:(
	    	<Icon.Button
		    	name="md-checkmark"
		    	backgroundColor="transparent"
		        underlayColor="transparent"
		        activeOpacity={0.8}
		        onPress={()=>navigation.state.params.handleback()}
	    	/>
	    )
	});

	constructor(props) {
		super(props);
		this.state = {
			inputText: ''
		};
		// 这是不能省略的
		this.handleback = this.handleback.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput 
					ref={(ref) => {
			            this.textInput = ref;
			        }}
					style={styles.textInput}
					placeholder="请写下您宝贵的意见或建议，与iReading一起进步！"
			        placeholderTextColor="#aaaaaa"
			        underlineColorAndroid="transparent"
			        numberOfLines={200}
			        multiline   // 如果为true，文本框中可以输入多行文字,默认值为false。
			        autoFocus   // 如果为true，在componentDidMount后会获得焦点。默认值为false
			        onChangeText={(text) => {
			        	this.setState({
			        		inputText: text
			        	})
			        }}
			        value={this.state.inputText}
				/>
			</View>
		)
	}

	componentDidMount() {
		this.props.navigation.setParams({
			// 设置参数为一个函数
			handleback: this.handleback
		})
	}

	handleback() {
		if(!this.state.inputText || this.state.inputText.replace(/\s+/g, '') === ''){
			ToastUtil.showShort('请填写内容~');
		}else{
			ToastUtil.showShort('您的内容已经反馈，谢谢配合！');
			this.setState({
				inputText: ''
			});
			Keyboard.dismiss();   // 把弹出的键盘收回去

		}
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor:'#fff'
	},
	textInput:{
		flex:1,
		fontSize: 18,
        padding: 15,
        textAlignVertical:'top'
	}
})