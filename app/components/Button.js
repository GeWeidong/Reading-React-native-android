import React, { Component, PropTypes } from 'react';
import {
  Text,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native';

export default class Button extends Component {
	static propTypes = {
		textStyle: Text.propTypes.style,  // 表示text的样式类型声明
		viewStyle: ViewPropTypes.style,   // 表示view的样式类型声明
		text: PropTypes.string.isRequired,    
		onPress: PropTypes.func.isRequired,
		activeOpacity: PropTypes.number,
		disabled: PropTypes.bool
	};

	render() {
		return (
			<TouchableOpacity
				style={this.props.viewStyle}
				onPress={this.props.onPress}
				disabled={this.props.disabled}
				activeOpacity={this.props.activeOpacity}
			>
				<Text style={this.props.textStyle}>{this.props.text}</Text>
			</TouchableOpacity>
		)
	}
}