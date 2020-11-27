// Available patterns
var patterns = [
	'square',
	'swastika',
	'triangle',
	'diamond',
	'asterisk'
];
var symbols = [
	'#', '*', '₹', '=', '0'
];
const DEFAULT_SIZE = 4;

// Validate and return fill
function getFill() {
	let fill = $('#fill').val();
	if (fill.length < 1) {
		$('#fill').prop('selectedIndex', 0);
		return $('#fill').val();
	}
	if (fill.length > 1)
		fill = fill[0];
	return fill;
}

// Validate and set size
function setSize(size) {
	try {
		size = parseInt(size, 10);
		if (size > 999)
			size = 999;
		if (size < 1)
			size = 1;
		$('#size').val(size);
	} catch(e) { }
}

// Validate and return size
function getSize() {
	let size = $('#size').val();
	try {
		size = parseInt(size, 10);
		if (size > 999)
			size = 999;
		if (size < 1)
			size = 1;
		$('#size').val(size);
		return size;
	} catch(e) {
		$('#size').val(DEFAULT_SIZE);
		return DEFAULT_SIZE;
	}
}

// Validate and return pattern-type
function getPatternType() {
	let patternType = $('#patternType').prop('selectedIndex');
	if (0 <= patternType && patternType < symbols.length)
		return patterns[patternType];
	return patterns[0];
}

// Generate the pattern
function generatePattern() {
	let fill = getFill(),
		size = getSize(),
		patternType = getPatternType();
	let patternText = window.pattern(fill, size, patternType);
	$('#patternOutput').text(patternText);
	$('#patternOutput')[0].style.height = '';
	$('#patternOutput')[0].style.height = $('#patternOutput')[0].scrollHeight + 'px';
}

// Handle WASM module initialization
Module = {
	onRuntimeInitialized: () => {
		window.pattern = Module.cwrap('pattern', 'string', ['string', 'number', 'string']); // Load the wrapper for the C Pattern function
		// console.log('Runtime initialized');

		// After loading
		$(function() {
			// Generate the pattern upon loading
			generatePattern();

			// Handle changing of parameters
			$('#fill').on('change', function() {
				if ($(this).val() === 'Custom...' && $(this).prop('selectedIndex') == symbols.length) {
					let newFill = prompt('Enter a customized fill: ');
					if (newFill.length > 0) {
						$(this).removeClass('selectpicker');
						$(this).children('option').last().remove();
						$(this).append($('<option></option>').text(newFill));
						$(this).append($('<option></option>').text('Custom...'));
						symbols.push(newFill);
						$(this).prop('selectedIndex', symbols.length - 1);
						$(this).selectpicker('refresh');
					} else {
						$(this).prop('selectedIndex', 0);
					}
				}
				generatePattern();
			});
			$('#size').on('keydown', function(e) { e.preventDefault(); });
			$('#size').on('input', function() {
				if (isNaN($('#size').val()))
					$('#size').val(DEFAULT_SIZE);
				generatePattern();
				$('#size').val(getSize());
			});
			$('#patternType').on('change', generatePattern);

			// Generate tooltips
			window.smileyTooltip = new Tooltip($('.blink span'), {
				placement: 'bottom',
				trigger: 'hover',
				offset: '60px, 5px',
				title: 'WebAssembly is the portable binary-code format I used to compile and run a C application in this webpage.',
				template: '<div style="opacity: 1; width: 14em;" class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
			});
			window.swastikaTooltip = new Tooltip($('.swastika'), {
				placement: 'left',
				trigger: 'hover',
				offset: '0, 5px',
				title: 'Although infamously known in the West due to its use by Nazis, the Swastika is considered a sacred symbol of prosperity and good fortune in India since way back.',
				template: '<div style="opacity: 1; width: 14em;" class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
			});
			$('.swastika').on({
				mouseenter: function() { $(this).text('卐'); },
				mouseleave: function() { $(this).text('?'); },
				click: function() {
					$('#patternType').prop('selectedIndex', 1).selectpicker('refresh');
					generatePattern();
				}
			});

			// Handle size increment and decrement
			$('#size-inc').on('click', () => {
				let size = $('#size').val();
				setSize(parseInt(size, 10) + 1);
				generatePattern();
			});
			$('#size-dec').on('click', () => {
				let size = $('#size').val();
				setSize(parseInt(size, 10) - 1);
				generatePattern();
			});
		});
	}
};

