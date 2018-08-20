function check(form){
	if(form.userId.value=='111'&&form.password.value=='111') {
		alert("正确！");
		form.userId.focus();
		form.password.focus();
		return true;
	}else if(form.password.value==''){
		alert("登录密码输入为空，请重新输入！");
		form.password.focus();
		return false;
	}else if(form.userId.value==''){
		alert("用户帐号输入为空!");
		form.userId.focus();
		return false;
	}else if(form.userId.value=='111'&&form.password.value!='111'){
		alert("登录密码输入错误，请重新输入！");
		form.userId.focus();
		form.password.focus();
		return false;
	}else if(from.userId.value!='111'&&from.password.value=='111'){
		alert("用户帐号输入错误，请重新输入！");
		form.userId.focus();
		form.password.focus();
		return false;
	}else if(from.userId.value==''&&from.password.value=='111'){
		alert("用户帐号输入为空，请重新输入！");
		form.userId.focus();
		from.password.focus();
		return false;
	}else if(from.userId.value=='111'&&from.password.value==''){
		alert("登录密码输入为空，请重新输入！");
		form.userId.focus();
		from.password.focus();
		return false;
	}
	return true;
}
