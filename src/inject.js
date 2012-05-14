window.inject = inject = function(files, cb){
<<<<<<< HEAD
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
=======
	if(typeof files === 'string')	files = files.replace(/\s/g, '').split(',');
	else return false;
	
	var i = files.length
		, file
		, node
		, head
		, load = function(){
			if(i === 0)	cb() || function(){};
		};
>>>>>>> Cleaning
	
	if(/in/.test(document.readyState) || setTimeout('inject', 9)){
		head = document.getElementsByTagName('head')[0]
		
		while(file = files[--i]){
<<<<<<< HEAD
			if(/\.css$/.test(file)){
				node = document.createElement('link')
				node.rel = 'stylesheet'
				node.href = file
			} else {
				node = document.createElement('script')
				node.async = true
				node.src = file
=======
			if(/\.css$/i.test(file)){
				node = document.createElement('link');
				node.rel = 'stylesheet';
				node.href = file;
			}
			else if(/\.js$/i.test(file)){
				node = document.createElement('script');
				node.src = file;
>>>>>>> Cleaning
			}
			else	break;
			node.onreadystatechange = function(){
<<<<<<< HEAD
				if(this.readyState == 'complete')	load()
=======
				if(this.readyState === 'complete')	load();
>>>>>>> Cleaning
			};
			node.onload = load()
			head.appendChild(node)
		}
	}
} // window.inject, inject by Stéphan Zych (monkeymonk.be)
// use: window.inject('test.js, test.css', function(){alert('all files are loaded!');});