document.querySelector('#login-form').addEventListener('submit', event => {
	event.preventDefault()

	const [email, password] =
		[].map.call(document.querySelectorAll('input'), node => node.value)

	fetch('http://localhost:4567/login', {
		method: 'post',
		body: JSON.stringify({email, password})
	}).then(response => {
		if (response.status === 200) notify('success', 'Logged in successfully.')
		else if (response.status === 401) notify('error', 'You are not authorized.')
		else notify('error', 'A surprising error occurred.')
	})
})

document.addEventListener('invalid', event => {
	event.preventDefault()

	event.target.parentNode.querySelector('.validation-message').innerText =
		event.target.validationMessage
}, true)

function notify(severity, message) {
	const notice = document.querySelector('#notice')
	notice.classList.remove('success', 'error')
	notice.innerText = message
	notice.classList.add(severity)
	notice.classList.remove('hidden')
}
