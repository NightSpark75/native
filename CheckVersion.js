import React from 'react';
import { NativeModules } from 'react-native';
import FileTransfer from 'react-native-file-transfer';
import Zip from 'react-native-zip';

class CheckVersion
{
	// 省略其它代码
	componentDidMount()
	{
        const version = 100123004;
		fetch('http://172.17.100.51/native/pad/bundle/version')
		.then((response) => response.json())
		.then((json) => 
		{
			if(json.result && (json.version > version))
			{
                let url = 'http://172.17.100.51/native/pad/bundle/download'
				Epg.tip('检测到省流量更新文件，开始自动下载！');
				NativeModules.hotupdate.download(url, 'bundle.zip')
				.then((e) => alert('下载成功：'+e.result+'，下次重启时生效！'))
				.catch((error) => alert('下载失败:'+error));
			}
		})
		.catch((error) => alert('检测更新失败:'+error));
	}

	download() {
		let fileTransfer = new FileTransfer();
		fileTransfer.onprogress = (progress) => {
		  console.log(parseInt(progress.loaded * 100 / progress.total))
		};
		// url：新版本bundle的zip的url地址
		// bundlePath：存在新版本bundle的路径
		// unzipJSZipFile：下载完成后执行的回调方法，这里是解压缩zip
		fileTransfer.download(url, bundlePath, unzipJSZipFile, (err) => {
			console.log(err);
		  }, true
		);
	}

	unzipJSZipFile() {
		// zipPath：zip的路径
	   // documentPath：解压到的目录
		Zip.unzip(zipPath, documentPath, (err)=>{
		  if (err) {
			// 解压失败
		  } else {
			// 解压成功，将zip删除
			fs.unlink(zipPath).then(() => {
			  // 通过解压得到的补丁文件生成最新版的jsBundle
			});
		  }
		});
	  }
}