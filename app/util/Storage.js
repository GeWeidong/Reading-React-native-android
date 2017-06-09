import {
  AsyncStorage
} from 'react-native';

const Storage = {
	save(key,value) {
        try {
            return AsyncStorage.setItem(key, JSON.stringify(value), ()=>{
                console.log("save success with key:value => ",key, value);
            });
        } catch(e) {
            console.log(e);
        }
    },

    remove(key) {
        try {
            return AsyncStorage.removeItem(key, ()=>{
                console.log("remove value for key: ",key);
            });
        } catch(e) {
            console.log(e);
        }
    },

    getValueForKey(key) {
        try {
            return AsyncStorage.getItem(key, ()=>{
                console.log("trying to get value with key :", key);
            }).then((value)=>{
                return JSON.parse(value);
            },
            (e) => {
                console.log(e);
            });
        } catch(e) {
            console.log(e);
        }
    },

    update(key, value) {
	     try{
	          return Storage.getValueForKey(key).then((item) => {
	             value = typeof value === 'string' ? value : Object.assign({}, item, value);
	             return AsyncStorage.setItem(key, JSON.stringify(value));
	         });
	    }catch(e){
	      console.log(e);
	    }   
	},
}

export default Storage;