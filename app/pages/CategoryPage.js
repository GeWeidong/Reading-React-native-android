import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  InteractionManager,
  ScrollView,
  Alert,
  Image,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../util/NavigationUtil';
import Storage from '../util/Storage';
import Button from '../components/Button';
import GridView from '../components/GridView';
import ToastUtil from '../util/ToastUtil';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const types = ['体育迷', '段子手', '养生堂', '八卦精', '爱生活', '私房话'];
// 标签的ID数组
let tempTypeIds = [];
let maxCategory = 5; // 默认最多5个类别

export default class CategoryPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			typeIds: tempTypeIds
		}
	}

	static navigationOptions = ({ navigation }) => ({

		title: '分类',
	    tabBarIcon: ({ tintColor }) => (
	    	<Icon name="md-pricetags" size={25} color={tintColor} />
	    ),
	    headerRight: navigation.state.params !== undefined && navigation.state.params.isFirst
	    ? null
	    : (
	    	<Icon.Button
		    	name="md-checkmark"
		    	backgroundColor="transparent"
		        underlayColor="transparent"
		        activeOpacity={0.8}
		        onPress={()=>this.onActionSelected()}
	    	/>
	    )
	    
	});

	render() {
		const { params } = this.props.navigation.state;
		
		if(params && params.isFirst){
			return (
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={[styles.btnStyle,{color:'#000'}]}>
							初次见面，请选择您感兴趣的1-5个类别
						</Text>
					</View>
					{this.renderGridView()}
					<Button 
						viewStyle={styles.sureBtn}
						text="确定"
						textStyle={styles.btnStyle}
						onPress={()=>this.onSelectCatagory()}
					/>
				</View>
			)
		}else{
			return (
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={[styles.btnStyle,{color:'#000'}]}>
							请选择您感兴趣的1-5个类别
						</Text>
					</View>
					{this.renderGridView()}
				</View>
			)
		}
		
	}
	// 渲染各种标签
	renderGridView() {
		return (
			<ScrollView
				horizontal={false}
				style={styles.base}
			>
				<View style={styles.gridLayout}>
					<GridView items={types} contentContainerStyle={styles.contentContainerStyle} renderItem={this.renderItem.bind(this)}/>
				</View>
			</ScrollView>
		)
	}
	// 渲染每个标签按钮
	renderItem(rowData) {
		const isSelected = Array.from(this.state.typeIds).indexOf(rowData) !== -1; // 表示没有
		return (
			<Button 
				viewStyle={styles.cateBtnStyle}
				textStyle={[styles.btnStyle],{color:'#000', backgroundColor: isSelected? '#3e9ce9':'#fcfcfc'}}
				onPress={()=>this.onPress(rowData)}
				text={rowData}
			/>
		)
	}
	// 点击右上角√的事件
	onActionSelected() {	
		if(tempTypeIds.length >= maxCategory){
			ToastUtil.showShort(`不要超过${maxCategory}个标签哦`);
			return ;
		}
		if (tempTypeIds.length < 1) {
	      ToastUtil.showShort('不要少于1个类别哦');
	    }

	    const { navigate } = this.props.navigation;
	    InteractionManager.runAfterInteractions(() => {
	    	Storage.getValueForKey('typeIds').then((typeIds) => {
	    		if(typeIds.sort().toString() === tempTypeIds.sort().toString()){
	    			navigate('MainPage');
	    			return ;
	    		}
	    	})
	    })

	    Storage.save('typeIds', this.state.typeIds).then(this.routeMain);
	}
	// 如果重新选择了选项卡，那么也要回到首页，并且要重置选项卡
	routeMain() {
		const { navigate } = this.props.navigation;
		navigate('MainPage');
	}

	onPress(rowData) {
		const pos = tempTypeIds.indexOf(rowData);
		if(pos == -1){
			tempTypeIds.push(rowData);
		}else{
			tempTypeIds.splice(pos, 1);
		}

		this.setState({
			typeIds: tempTypeIds
		})
	}
	// 第一次进入选择好后，点击确定按钮的事件
	onSelectCatagory() {
		if (this.state.typeIds.length === 0) {
	      Alert.alert('提示', '您确定不选择任何分类吗？', [
	        { text: '取消', style: 'cancel' },
	        {
	          text: '确定',
	          onPress: () => {
	            Storage.save('typeIds', this.state.typeIds);
	            NavigationUtil.reset(this.props.navigation, 'Home');
	          }
	        }
	      ]);
	    } else {
	      Storage.save('typeIds', this.state.typeIds);
	      Storage.save('isInit', true);
	      NavigationUtil.reset(this.props.navigation, 'Home');
	    }
	}
	// 组件预加载的时候，查找收藏的标签
	componentWillMount() {
		// const { params } = this.props.navigation.state;
		// console.log(params)
		// // if(!params.isFirst){
		// 	Storage.getValueForKey('typeIds').then((typeIds) => {
		// 		tempTypeIds = typeIds;
		// 		this.setState({
		// 			typeIds
		// 		})
		// 	})
		// // }
	}

	componentDidMount() {
		console.log(2,this.props.navigation)
	}
}

const styles = StyleSheet.create({
	base: {
	},
	container:{
		flex: 1,
		backgroundColor: '#fff'
	},
	header:{
		padding: 10,
		backgroundColor:'#fcfcfc'
	},
	btnStyle:{
		fontSize:16,
		color:'#fff',
		textAlign:'center'
	},
	sureBtn:{
		padding:10,
		margin:10,
		borderRadius: 10,
    	backgroundColor: '#3e9ce9'
	},
	gridLayout:{
		justifyContent:'space-around',
		backgroundColor:'#f2f2f2',
		marginLeft: 70,
		width: screenWidth-140
	},
	cateBtnStyle:{
		margin: 10,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor:'#dddddd',
		backgroundColor:'#fff',
	},
	contentContainerStyle:{
		// 改变主轴的方向  
        flexDirection:'row',  
        // 多行显示  
         flexWrap:'wrap',  
        // 侧轴方向  
        alignItems:'center', // 必须设置,否则换行不起作用  
        justifyContent:'space-around'
	}
})