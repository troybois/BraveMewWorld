function on_load() {
	var key = [];
	key.push.apply(key, ['0','1','2','3','4','5','6','7','8','9']);
	key.push.apply(key, ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
	key.push.apply(key, ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']);
	var SEED = (new Date()) >>> 0;
	var text = document.getElementById("seed");

	function int_to_seed(temp_seed) {
		var key_length = key.length;
		var seed_text;
			if(temp_seed == 0) 
				seed_text = "0";
					while(temp_seed > 0) {
						seed_text += key[temp_seed % key_length];
						temp_seed /= key_length;
						temp_seed |= 0;
					}
			return seed_text;
	}

	text.innerHTML = int_to_seed(SEED);

	var seed_button = document.getElementById("set"), seed_input = document.getElementById("seed-input");

	function set_seed(e) {
		SEED = 0;
		var seed_text = seed_input.value;
		var key_length = key.length;
			for(var i = 0; i < seed_text.length; i ++) {
				SEED += Math.pow(key_length, i) * key.indexOf(seed_text[i]);
			}
		SEED = SEED >>> 0;
		text.innerHTML = seed_text;
		console.log(SEED);
	}

	seed_button.addEventListener("mousedown", set_seed);

	var linear;

	function math_rand() {
		return ((Math.random() * 0xFFFFFFFF) | 0) >>> 0;
	}

	function linear_rand() {
		linear = (linear * 177 + 13) % 0xFF4;
		return linear >>> 0;
	}

	function init_rand() {
		linear = SEED;
	}

	window.next_rand = linear_rand;

	function play() {
		init_rand();

		var bass = new Tone.PolySynth().toDestination();
		var chords = [["G2", "C3", "F3"], ["A2", "D3", "G3"], ["C3", "F3", "A3"], ["D3", "G3", "C4"]];
		var held = 0;
		var last_chord = -1;
		var chord = 0;
		var bass_elapsed = 0;

		function play_bass(time) {
			if(bass_elapsed == 0) {
				if(held == 0) {
					last_chord = chord;
					chord = (next_rand() % chords.length) | 0;
						while(chord == last_chord) 
							chord = (next_rand() % chords.length) | 0;
				}
				voice.triggerAttackRelease(chords[chord], "16n", time);
				held = (held + 1) % 8;
			}
			bass_elapsed = (bass_elapsed + 1) % 2;
		}
		var settings = {};
		var voice = new Tone.PolySynth().toDestination();	
		var vnotes = [["C4"], ["D4"], ["E4"], ["G4"], ["A4"], ["C5"]];
		var needs = 1;
		var elapsed = needs;

		function play_voice(time) {
			var num = (next_rand() % vnotes.length) | 0;
				if(elapsed == needs) {
					var note = next_rand() % 3;
					elapsed = 0;
						switch(note) {
							case 0:
								needs = 1;
								voice.triggerAttackRelease(vnotes[num], "16n", time);
								break;
							case 1:
								needs = 2;
								voice.triggerAttackRelease(vnotes[num], "8n", time);
								break;
							case 2:
								needs = 4;
								voice.triggerAttackRelease(vnotes[num], "4n", time);
								break;
						}
			}
			++ elapsed;
		}

		var loop = new Tone.Loop(function(time){
			play_bass(time);
			play_voice(time);
		}, "8n");

		loop.start(0).stop('1000m')
		Tone.Transport.toggle();
	}

	document.getElementById("start").addEventListener("click", function() {
		play();
	});
}

window.addEventListener("load", on_load);