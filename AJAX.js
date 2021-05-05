class AJAX {
	get(url, responseType, handler){
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = responseType;
		xhr.send();
		xhr.onload = () => {
			if(xhr.status == 200)
				handler(xhr.response);
			else {
				console.log("Error");
			}
		}
		
	}
	post(url, object){
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.send();
		xhr.onload = () => {
            if(xhr.status == 200){
                console.log(`${object.userName} ${object.text} was posted`);
            } else {
				console.log("Error");
			}
			
		}
	}
}