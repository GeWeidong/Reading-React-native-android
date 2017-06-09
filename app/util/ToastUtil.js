import { Alert, ToastAndroid, Platform } from 'react-native';

const showShort = (content) => {
	if(!content){
		return ;
	}
	ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
}

const showLong = (content) => {
	if(!content){
		return ;
	}
	ToastAndroid.show(content.toString(), ToastAndroid.LONG);
}

export default {
	showShort,
	showLong
}