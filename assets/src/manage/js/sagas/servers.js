/**
 * Created by Administrator on 2016/12/23.
 */
import fetch from 'isomorphic-fetch'
import {default as _} from "lodash"
var handleRequest = (url,method,data)=> {
	function fetchApi(resolve, reject) {
		try {
			fetch(url,{
				method:config.method,
				data:config.data
			})
				.then(response => resolve(response.json()))
		}catch (err){
			reject(err)
		}
	}
	if (method&&!data&&(method.toString().toLocaleUpperCase()!=="GET"||method.toString().toLocaleUpperCase()!=="POST")){
		data=method;
		method="GET"
	}
	data = data || {};
	method = method || "GET";
	var config = {
		method:method,
		url:url
	};
	if("POST"===method){
		config.data = data;
	}else if("GET" === method){
		config.url += "?";
		_.forIn(data,(key,value)=>{
			config.url += `${key}=${value}`;
		});
	}
	return new Promise(function (resolve,reject) {
		fetchApi(resolve, reject)
	});
};

export default handleRequest;
