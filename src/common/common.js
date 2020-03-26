! function(root, factory) {
	if (typeof exports == 'object' && typeof module != 'undefined') {
		module.exports = factory()
	} else if (typeof define == 'function' && define.amd) {
		define(factory)
	} else {
		// 5+ 兼容
		document.addEventListener('plusready', function(){
		// 修改此处为插件命名
		var moduleName = 'plugintest';
		// 挂载在plus下
		root.plus[moduleName] = factory()
		},false);
	}
}(this, function() {
	//在此处定义自己的方法
	
	var _BARCODE = 'Back';
	var Back = {
		BackFunction: function(url, successCallback, errorCallback) {
			// var success = typeof successCallback !== 'function' ? null : function(args) {
			// 		successCallback(args);
			// 	},
			// 	fail = typeof errorCallback !== 'function' ? null : function(code) {
			// 		errorCallback(code);
			// 	};
			console.log("back")
			/* uni.navigateTo({
			    delta: 2
			}); */
			uni.navigateBack({
				delta: 1,
				animationType: 'pop-out',
				animationDuration: 200
			});
			//return plus.bridge.exec(_BARCODE, "PluginTestFunction", [callbackID, Argus1, Argus2, Argus3, Argus4]);
		},

	};
	return Back;
})


function communications(parm){
	//获取宿主上下文
	var main = plus.android.runtimeMainActivity();
	//通过反射获取Android的Intent对象
	var Intent = plus.android.importClass("android.content.Intent");
	//通过宿主上下文创建 intent
	var intent = new Intent(main.getIntent());
	//设置要开启的Activity包类路径  com.HBuilder.integrate.MainActivity换掉你自己的界面
	intent.setClassName(main, "com.HBuilder.integrate.MainActivity");
	//开启新的任务栈 （跨进程）
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

	// 参数传递
	intent.putExtra("data", parm);

	//开启新的界面
	main.startActivity(intent);
}
