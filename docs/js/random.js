function init_music() {
	var key = [];
	key.push.apply(key, ['0','1','2','3','4','5','6','7','8','9']);
	key.push.apply(key, ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']);
	key.push.apply(key, ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']);

	var seed_text = "CAT";
	var key_length = key.length;
	var SEED = 0;
		for(var i = 0; i < seed_text.length; i ++) {
			SEED += Math.pow(key_length, i) * key.indexOf(seed_text[i]);
		}
	SEED = SEED >>> 0;

	var linear;

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

		loop.start(0);
		Tone.Transport.toggle();
	}

	window.play_music = play;
}

init_music();