function demo() {
const synth = new Tone.Synth().toMaster();
const now = Tone.now()
synth.triggerAttackRelease("D3", "2n", now);
synth.triggerAttackRelease("Gb3", "2n", now + 0.5);
synth.triggerAttackRelease("Ab3", "2n", now + 1);
synth.triggerAttackRelease("B3", "2n", now + 1.5);
synth.triggerAttackRelease("A3", "2n", now + 2);
synth.triggerAttackRelease("Ab3", "2n", now + 2.5);
synth.triggerAttackRelease("A3", "2n", now + 3);
synth.triggerAttackRelease("Ab3", "1n", now + 3.5);

synth.triggerAttackRelease("D4", "2n", now + 4);
synth.triggerAttackRelease("Gb4", "2n", now + 4.5);
synth.triggerAttackRelease("Ab4", "2n", now + 5);
synth.triggerAttackRelease("B4", "2n", now + 5.5);
synth.triggerAttackRelease("A4", "2n", now + 6);
synth.triggerAttackRelease("Ab4", "2n", now + 6.5);
synth.triggerAttackRelease("A4", "2n", now + 7);
synth.triggerAttackRelease("Ab4", "2n", now + 7.5);

synth.triggerAttackRelease("D4", "2n", now + 8);
synth.triggerAttackRelease("Gb4", "2n", now + 8.5);
synth.triggerAttackRelease("Ab4", "2n", now + 9);
synth.triggerAttackRelease("B4", "2n", now + 9.5);
synth.triggerAttackRelease("A4", "2n", now + 10);
synth.triggerAttackRelease("Ab4", "2n", now + 10.5);
synth.triggerAttackRelease("A4", "2n", now + 11);
synth.triggerAttackRelease("Ab4", "2n", now + 11.5);

synth.triggerAttackRelease("E3", "2n", now + 12);
synth.triggerAttackRelease("Ab3", "2n", now + 12.5);
synth.triggerAttackRelease("B3", "2n", now + 13);
synth.triggerAttackRelease("C4", "2n", now + 13.5);
synth.triggerAttackRelease("B3", "2n", now + 14);
synth.triggerAttackRelease("A3", "2n", now + 14.5);
synth.triggerAttackRelease("B3", "2n", now + 15);
synth.triggerAttackRelease("A3", "1n", now + 15.5);

synth.triggerAttackRelease("E4", "2n", now + 16);
synth.triggerAttackRelease("Ab4", "2n", now + 16.5);
synth.triggerAttackRelease("B4", "2n", now + 17);
synth.triggerAttackRelease("C5", "2n", now + 17.5);
synth.triggerAttackRelease("B4", "2n", now + 18);
synth.triggerAttackRelease("A4", "2n", now + 18.5);
synth.triggerAttackRelease("B4", "2n", now + 19);
synth.triggerAttackRelease("A4", "2n", now + 19.5);

synth.triggerAttackRelease("E4", "2n", now + 20);
synth.triggerAttackRelease("Ab4", "2n", now + 20.5);
synth.triggerAttackRelease("B4", "2n", now + 21);
synth.triggerAttackRelease("C5", "2n", now + 21.5);
synth.triggerAttackRelease("B4", "2n", now + 22);
synth.triggerAttackRelease("A4", "2n", now + 22.5);
synth.triggerAttackRelease("B4", "2n", now + 23);
synth.triggerAttackRelease("A4", "2n", now + 23.5);

const synth1 = new Tone.Synth().toMaster();
const now1 = Tone.now()
synth1.triggerAttackRelease("D4", "2n", now1);
synth1.triggerAttackRelease("Gb4", "2n", now1 + 0.5);
synth1.triggerAttackRelease("Ab4", "2n", now1 + 1);
synth1.triggerAttackRelease("B4", "2n", now1 + 1.5);
synth1.triggerAttackRelease("A4", "2n", now1 + 2);
synth1.triggerAttackRelease("Ab4", "2n", now1 + 2.5);
synth1.triggerAttackRelease("A4", "2n", now1 + 3);
synth1.triggerAttackRelease("Ab4", "2n", now1 + 3.5);

synth1.triggerAttackRelease("E4", "2n", now1 + 12);
synth1.triggerAttackRelease("Ab4", "2n", now1 + 12.5);
synth1.triggerAttackRelease("B4", "2n", now1 + 13);
synth1.triggerAttackRelease("C5", "2n", now1 + 13.5);
synth1.triggerAttackRelease("B4", "2n", now1 + 14);
synth1.triggerAttackRelease("A4", "2n", now1 + 14.5);
synth1.triggerAttackRelease("B4", "2n", now1 + 15);
synth1.triggerAttackRelease("A4", "2n", now1 + 15.5);
}

document.getElementById( "start" ).addEventListener( "click", demo );