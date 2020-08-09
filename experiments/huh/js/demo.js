function demo() {
const synth = new Tone.Synth().toMaster();
const now = Tone.now();
var notes = ["D3", "D4", "Gb3", "Gb4", "Ab3", "Ab4", "A3", "A4", "B3", "B4"];
prng("modular",10,7);
var loop = new Tone.Loop(function(now){
	synth.triggerAttackRelease(notes[prng("modular",10,null)], "2n", now);
}, "4n" );
loop.start(0).stop('1000m')
Tone.Transport.toggle();
}

document.getElementById( "start" ).addEventListener( "click", demo );