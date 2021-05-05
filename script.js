window.onload = () => {
	let ajax = new AJAX();

	ajax.get('/header.txt', 'text', (response) => {
		setHeader(response);
	});
	ajax.get('/comments.json', 'json', (response) => {
		let comments = response;
		for(let comment of comments){
			insertComment(comment);
		}
	});

	let btnComment = document.getElementById('btPostComment');
	let form = document.getElementById('commentForm');
	let btnChangeColor = document.getElementById('btChangeColor');
	let btnBorder = document.getElementById('btCommentsBorder');

	btnComment.onclick = () => {
		if(form.checkValidity()){
			let userNameInput = document.getElementById('userNameInput');
			let commentTextInput = document.getElementById('commentTextInput');
			let data = {
				userName: userNameInput.value,
				text: commentTextInput.value
			};
			new AJAX().post('/new_comments.json', data);
			insertComment(data);
		}
	};

	form.onsubmit = () => {
		userNameInput.value = "";
		commentTextInput.value="";
		return false;
	};

	btnChangeColor.onclick = () => {
		let comments = document.querySelectorAll('.comment');
		for (let comment of comments) {
			comment.style.backgroundColor = 'aquamarine';
		}
	};

	btnBorder.onclick = () => {
		let commentsDiv = document.querySelector('.users-comments');
		commentsDiv.classList.toggle('no-border');
	};

};

function setHeader(headerText) {
	let header = document.querySelector('.main-header');
	header.innerHTML = headerText;
}

function insertComment(comment) {
	let existingCommentDiv = document.querySelector('.comment');
	let newCommentDiv = existingCommentDiv.cloneNode(true);

	let userNameH = newCommentDiv.querySelector('.user-name');
	userNameH.innerHTML = comment.userName;

	let commentTextP = newCommentDiv.querySelector('.comment-text');
	commentTextP.innerHTML = comment.text;

	newCommentDiv.classList.remove('invisible');

	existingCommentDiv.before(newCommentDiv);

	let number = document.getElementById('comments-number');
	number.innerHTML = Number(number.innerHTML) + 1;
}