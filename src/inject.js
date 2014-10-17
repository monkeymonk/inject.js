/**
 * inject() by Stéphan Zych (monkeymonk.be)
 * @use inject('test.js, test.css', function(){alert('all files are loaded!')});
 */

(function (window, document) {
	window.inject = function (files, cb){
		if (typeof files !== 'string')	{
			return false;
		}
		
		files = files.replace(/\s/g, '').split(',');
		
		var i = files.length, 
		    file, node, head, 
		    load = function () {
			    if (i === 0) {
					cb.call(this) || function () {}
				}
			};
		
		if (!/in/.test(document.readyState) || !!setTimeout(function () {inject(files, cb)}, 9)) {
			head = document.getElementsByTagName('head')[0];
			
			while (file = files[--i]) {
				if (/\.css$/i.test(file)) {
					node = document.createElement('link');
					node.rel = 'stylesheet';
					node.href = file;
				} else if (/\.js$/i.test(file)) {
					node = document.createElement('script');
					node.src = file;
				} else {
					break;
				}
				
				node.onreadystatechange = function () {
					if (this.readyState === 'complete') {
						load.call(this);
					}
				};
				
				node.onload = load;
				
				head.appendChild(node);
			}
		}
	};
}) (window, document);
