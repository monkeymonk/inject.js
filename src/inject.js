window.inject = inject = function(files, cb){
	if(typeof files === 'string')	files = files.replace(/\s/g, '').split(',')
	else if(files instanceof Array)	files = files
	else return false
	
	var inject = this.inject
	, file
	, node
	, i = files.length
	, head
	, load = function(){
		if(i === 0)	cb() || function(){}
	};
	
	if(/in/.test(document.readyState) || setTimeout('inject', 9)){
		head = document.getElementsByTagName('head')[0]
		
		while(file = files[--i]){
			if(/\.css$/.test(file)){
				node = document.createElement('link')
				node.rel = 'stylesheet'
				node.href = file
			} else {
				node = document.createElement('script')
				node.async = true
				node.src = file
			}
			node.onreadystatechange = function(){
				if(this.readyState == 'complete')	load()
			};
			node.onload = load()
			head.appendChild(node)
		}
	}
} // window.inject, inject by Stéphan Zych (monkeymonk.be)
// use: window.inject('test.js, test.css', function(){alert('all files are loaded!');});