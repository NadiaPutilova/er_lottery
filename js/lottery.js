let qtyLot = 10
let maxNumber = 15
let qtyNumber = 5
let result = []

const numberGenerate = () => {
	let number = Math.ceil(Math.random() * maxNumber)
	return number
}

const lotteryGenerate = () => {
	for (var i = 0; i < qtyLot; i++) {
		result[i] = []
		let temp = []

		for (var j = 0; j < qtyNumber; j++) {
			let number = numberGenerate()
			if (temp.includes(number)) {
				j--
			}
			else {
				temp.push(number)
			}
		}
		temp.sort((a,b) => a-b)

		if (result.some(el => {
			return JSON.stringify(el) === JSON.stringify(temp)
		})) {
			console.log(temp, i)
			i--
			continue
		}

		result[i] = temp
	}
}

const resultsGenerate = () => {
	let str = ``
	for (var i = 0; i < qtyLot; i++) {
		str += `<div class="result"><span class="result-count">${i+1}.</span>`
		for (var j = 0; j < qtyNumber; j++) {
			str += `<span class="result-number">${result[i][j]}</span>`
		}
		str += `</div>`
	}
	return(str)
}

document.querySelector('.lottery-button').addEventListener('click', (e) => {
	e.preventDefault()

	qtyLot = document.querySelector('.lottery-qty').value
	if (qtyLot > 300) {
		qtyLot = 300
		document.querySelector('.lottery-qty').value = 300 
	}

	lotteryGenerate()

	document.querySelector('.lottery-results').innerHTML = resultsGenerate()

	document.querySelectorAll('.result').forEach(el => {
		el.addEventListener('click', (e) => {
			el.classList.add('strike')
		})
	})
	
})



