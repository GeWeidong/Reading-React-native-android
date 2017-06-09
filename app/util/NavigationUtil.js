

import { NavigationActions } from 'react-navigation';
// 跳转到具体路由栈，
const reset = (navigation, routeName) => {
	const resetAction = NavigationActions.reset({
	  index: 0,
	  actions: [
	    NavigationActions.navigate({ routeName: routeName})
	  ]
	});

	navigation.dispatch(resetAction);
};

export default {
	reset  // 用{}扩起来的目的就是，reset方法只是NavigationUtil其中的一个方法而已，在其他组件中使用方式为：NavigationUtil.reset
};

/* 

1.navigate方法

进入指定的路由栈
routeName
params
action

2.reset方法

reset方法指的是导航复位操作，将会擦除所有的路由栈，然后重新规划路由
index 索引参数用于指定当前的活动路由

下面例子中给出了两个组件，Setting和Profile，index设置为1，则表示Setting组件将会处于Profile组件顶层

```
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'}),
    NavigationActions.navigate({ routeName: 'Settings'})
  ]
})
this.props.navigation.dispatch(resetAction);

```

3.back方法

就是返回指定的路由页面

```
import { NavigationActions } from 'react-navigation'

const backAction = NavigationActions.back({
  key: 'Profile'
})
this.props.navigation.dispatch(backAction)

```

4.setParams方法

```
import { NavigationActions } from 'react-navigation'

const setParamsAction = NavigationActions.setParams({
  params: { title: 'Hello' },    // 新的参数将被合并到现有的路线参数中
  key: 'screen-123',
})
this.props.navigation.dispatch(setParamsAction)
```

*/
