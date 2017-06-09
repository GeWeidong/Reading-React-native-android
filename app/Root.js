import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';
import Splash from './pages/Splash';

import {StackNavigator, TabNavigator} from 'react-navigation';

const TabContainer = TabNavigator(
		{
			MainPage: {screen: MainPage},
			CategoryPage: {screen: CategoryPage},
			FeedbackPage: {screen: FeedbackPage},
			AboutPage: {screen: AboutPage}
		},
		{
			tabBarPosition: 'bottom',  // 标签栏的位置可以是“顶部”或“底部”
			swipeEnabled:false,
			tabBarOptions: {
				lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作
				activeTintColor: '#1C93F5',    // 活动标签的标签和图标颜色
				inactiveTintColor: '#999999',   // 非活动标签的标签和图标颜色
				showIcon: true,        // 是否显示标签的图标，默认为false
				style: {    // 标签栏的样式对象
			        backgroundColor: '#fff',
			    },
			    indicatorStyle: {    // 标签指示器的样式对象（选项卡底部的行）opacity=0表示没有指示器吧
			        opacity: 1
			    },
			    tabStyle: {
			    	// 标签栏的样式
			    	padding: 0,  // 有默认的padding值
			    },
			    pressOpacity: 0.7    // 按压标签的不透明度
			}
		}
)

const App = StackNavigator(
	{
		Splash: {
			screen: Splash
		},
		CategoryPage: {
			screen: CategoryPage,
			navigationOptions: {
				headerLeft: null
			}
		},
		Home: {
			screen: TabContainer,
			navigationOptions: {
				headerLeft: null
			}
		},

	},
	{
		headerMode: 'screen',  // 每个屏幕都有一个标题，标题与屏幕一起淡入淡出,这是Android上的常见模式
		navigationOptions: {  // 用于屏幕的默认导航选项
			headerStyle: {
				backgroundColor:'#3e9ce9',
			},
			headerTitleStyle: {
				color:'#fff',
				fontSize: 20,
				fontWeight: 'normal'
			},
			headerTintColor: '#fff'    // 标题颜色
		}
	}
)

export default App;