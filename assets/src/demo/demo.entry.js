import "./css/demo.less";
import $ from 'jquery';
import react from 'react';

$(function (){
	console.log($);
	console.log(react);
	$('.signIn').click(function (){
		$.ajax({
			type:"POST",
			url:"/live/app/login.do",
			data:{'mobile':18325527323,"password":111111},
			success:function (data) {
				console.log(data)
			}
		})
	});
	$('.signOut').click(function (){
		$.ajax({
			type:"POST",
			url:"/live/app/logout.do",
			data:{'uid':18325527323},
			success:function (data) {
				console.log(data)
			}
		})
	});
	$('.test').click(function (){
		$.ajax({
			type:"POST",
			url:"/live/api/mait/queryMaltRecordManageList.do",
			data:{'pageSize':10,"page":1},
			success:function (data) {
				console.log($.parseJSON(data))
			}
		})
	});
	$('.change').click(function (){
		$.ajax({
			type:"POST",
			url:"/live/app/auth/18325527323/bind.do",
			data:{'pageSize':10,"page":1},
			success:function (data) {
				console.log(data)
			}
		})
	})
});