// Define Track Playlist
var track_list = [
	['audio/production/embers.mp3', 'TABFH - Embers'],
	['audio/production/ewdangerousroads.mp3', 'Dangerous Roads'],
	['audio/IASMM.mp3', 'In A Sentimental Mood'],
	['audio/production/tabfh/1_messenger.mp3', 'TABFH - Messenger'],
	['audio/production/roseglasses.mp3', 'Rose Glasses'],
	['audio/production/ddls/5_Sueno.mp3', 'Sue&ntilde;o'],
	['audio/production/tryme.mp3', 'Try Me'],
	['audio/production/helium.mp3', 'TABFH - Helium'],
	['audio/production/dbsd/3_backhome.mp3', 'Lyell - Back Home'],
	['audio/production/ddls/9_Fear.mp3', 'Fear'],
	['audio/bodyandsoul.mp3', 'Body and Soul']
];

// Set Current Playlist
var current_set = 'intro';

// Initialize Audio Playlist
var audio = new Array();
var track_count = track_list.length;
for (var i = 0; i < track_count; i++){
	audio.push(document.createElement('audio'));
	audio[i].preload = false;
	audio[i].src = track_list[i][0];
	audio[i].title = track_list[i][1];
}

audio[0].load();

// Define Selected Track
var current_track = 0;
var current_time = 0;
var current_duration = audio[0].duration;

// Start Audio
function audio_play() {
	current_duration = audio[current_track].duration;
	audio[current_track].play();

	audio[current_track].addEventListener('ended',next_track);
	audio[current_track].addEventListener('timeupdate',audio_progress_update);
	document.getElementById('audio-play-button').style.display = "none";
	document.getElementById('audio-pause-button').style.display = "inline";

	var t_l_out = convert_time(parseInt(current_duration - current_time));

	if (t_l_out != 'NaN:NaN') {
		document.getElementById('audio-time-left').innerHTML = t_l_out;
		document.getElementById('audio-current-time').innerHTML = '<i>buffering...</i>';
	}
	else {
		document.getElementById('audio-time-left').innerHTML = '&nbsp;&nbsp;&nbsp;';
	}

	document.getElementById('audio-current-song').innerHTML = audio[current_track].title;

	// Progress Bar Seek
	document.getElementById('audio-seekbar').addEventListener('click', function (e) {

	   	var x = e.pageX - this.offsetLeft;

	    // Convert width 
	    x = x/document.getElementById('audio-seekbar').offsetWidth;

	    // Convert to proportion of track length
	    current_time = x * current_duration;

	    //Update progress bar
	    document.getElementById('audio-seekbar').value = x;

	    //Update audio
	    audio[current_track].currentTime = current_time;
	    //audio_play();
	});

	// Preload next track
	if (current_track < track_count) {
		if(audio[current_track+1].readyState != 4) {
			audio[current_track+1].load();
		}
	}
}

// Update Progress Bar and Seek Times
function audio_progress_update () {

	current_time = audio[current_track].currentTime;

	//Handle Buffering
	try { current_duration = audio[current_track].duration }
	catch(err) { current_duration = 0; }
	try { document.getElementById('audio-seekbar').value = current_time / current_duration; }
	catch(err) { document.getElementById('audio-seekbar').value = 0; }

	var t_l_out = convert_time(parseInt(current_duration - current_time));

	//If buffering hide unknown track length value
	if (t_l_out != 'NaN:NaN') {
		document.getElementById('audio-time-left').innerHTML = t_l_out;
		document.getElementById('audio-current-time').innerHTML = convert_time(current_time);
	}
	else {
		document.getElementById('audio-time-left').innerHTML = '&nbsp;&nbsp;&nbsp;';
		document.getElementById('audio-current-time').innerHTML = '<i>buffering...</i>';
	}
}

// Convet milliseconds to readable time
function convert_time (seconds) {
	var date = new Date(seconds * 1000);
	var mm = date.getUTCMinutes();
	var ss = date.getSeconds();

	if (mm < 10) {mm = "0"+mm;}
	if (ss < 10) {ss = "0"+ss;}

	if (mm < 10) {
		return (mm+":"+ss).slice(1);
	}
	else {
		return mm+":"+ss;
	}
}

// Pause Audio
function audio_pause() {
	audio[current_track].pause();
	document.getElementById('audio-pause-button').style.display = "none";
	document.getElementById('audio-play-button').style.display = "inline";
}

// Go to previous track
function previous_track() {

	// Pause audio
	audio_pause();

	// Reset audio to beginning
	audio[current_track].currentTime = 0;

	// Go to previous track
	if (current_track > 0) {
		current_track --;
	}
	else {
		current_track = track_count - 1;
	}

	// Play audio
	audio_play();

	// Update Playlist
	write_playlist();
}

// Go to next track
function next_track() {

	// Pause audio
	audio_pause();

	// Reset audio to beginning
	audio[current_track].currentTime = 0;

	// Go to next track
	if (current_track < (track_count - 1)) {
		current_track ++;
	}
	else {
		current_track = 0;
	}

	// Check load state

	if (audio[current_track].readState != 4) {
		audio[current_track].load();
	}

	// Play audio
	audio_play();

	// Update Playlist
	write_playlist();
}

function add_to_playlist (src, name) {

	var old_trackcount = audio.length;

	audio.push(document.createElement('audio'));
	audio[old_trackcount].src = src;
	audio[old_trackcount].title = name;
}

function change_track (tracknumber) {
	current_time = 0;
	current_track = tracknumber;
	current_duration = audio[current_track].duration;
}

function set_play (set,tracknumber) {
	switch (set) {
		case "intro":
			current_set = 'intro';
			track_list = [
				['audio/production/embers.mp3', 'TABFH - Embers'],
				['audio/IASMM.mp3', 'In A Sentimental Mood'],
				['audio/production/5_Sueno.mp3', 'Sue&ntilde;o'],
				['audio/production/ewdangerousroads.mp3', 'Dangerous Roads'],
				['audio/production/tabfh/1_messenger.mp3', 'TABFH - Messenger'],
				['audio/production/roseglasses.mp3', 'Rose Glasses'],
				['audio/production/tryme.mp3', 'Try Me'],
				['audio/production/helium.mp3', 'TABFH - Helium'],
				['audio/production/dbsd/3_backhome.mp3', 'Lyell - Back Home'],
				['audio/production/ddls/9_Fear.mp3', 'Fear'],
				['audio/bodyandsoul.mp3', 'Body and Soul']
			];
		case "production":
			current_set = 'production';
			track_list = [
				['audio/production/helium.mp3', 'TABFH - Helium'],
				['audio/production/embers.mp3', 'TABFH - Embers'],
				['audio/production/tryme.mp3', 'Try Me'],
				['audio/production/tabfh/1_messenger.mp3', 'TABFH - Messenger'],
				['audio/production/roseglasses.mp3', 'Rose Glasses']
			];
			break;
		case "solo":
			current_set = 'solo';
			track_list = [
				['audio/IASMM.mp3', 'In A Sentimental Mood'],
				['audio/bodyandsoul.mp3', 'Body and Soul'],
				['audio/sueno.mp3', 'Sue&ntilde;o'],
				['audio/nocturne.mp3', 'Nocturne']
			];
			break;
		case "dbsd":
			current_set = 'dbsd';
			track_list = [
				['audio/production/dbsd/1_6-7.mp3', 'Lyell - 6-7 (Beginning)'],
				['audio/production/dbsd/2_roseglasses.mp3', 'Lyell - Rose Glasses'],
				['audio/production/dbsd/3_backhome.mp3', 'Lyell - Back Home'],
				['audio/production/dbsd/4_workonyourself.mp3', 'Lyell - Work on Yourself'],
				['audio/production/dbsd/5_behindthewheel.mp3', 'Lyell - Behind the Wheel'],
				['audio/production/dbsd/6_thevamp.mp3', 'Lyell - The Vamp'],
				['audio/production/dbsd/7_tryme.mp3', 'Lyell - Try Me'],
				['audio/production/dbsd/8_LA.mp3', 'Lyell - L.A.']
			];
			break;
		case "ddls":
			current_set = 'ddls';
			track_list = [
				['audio/production/ddls/1_Hope.mp3', 'Hope'],
				['audio/production/ddls/2_Rain.mp3', 'Rain'],
				['audio/production/ddls/3_Light.mp3', 'Light'],
				['audio/production/ddls/4_Nocturne.mp3', 'Nocturne'],
				['audio/production/ddls/5_Sueno.mp3', 'Sue&ntilde;o'],
				['audio/production/ddls/6_Spots.mp3', 'Spots'],
				['audio/production/ddls/7_ElFantasma.mp3', 'El Fantasma'],
				['audio/production/ddls/8_Stillness.mp3', 'Stillness'],
				['audio/production/ddls/9_Fear.mp3', 'Fear']
			];
			break;
		case "tabfh":
			current_set = 'tabfh';
			track_list = [
				['audio/production/tabfh/1_messenger.mp3', 'TABFH - Messenger'],
				['audio/production/tabfh/2_overflown.mp3', 'TABFH - Overflown'],
				['audio/production/tabfh/3_flashflood.mp3', 'TABFH - Flashflood'],
			];
		default:
			console.log('Error: no set with name ' + set + ' found.')
			break;
			return;
	}
	// Handle Buffering
	document.getElementById('audio-current-time').innerHTML = '<i>buffering...</i>';

	// Reinitialize Audio Playlist
	audio[current_track].pause();
	audio = [];
	track_count = track_list.length;
	for (var i = 0; i < track_count; i++){
		audio.push(document.createElement('audio'));
		audio[i].src = track_list[i][0];
		audio[i].title = track_list[i][1];
	} 
	change_track(tracknumber);
	audio_play();
}

function write_playlist () {

	document.getElementById("audio-playlist").innerHTML = "";


	for (var i = current_track - 1; i >= 0; i--){
		var newItem = document.createElement("LI");       // Create a <li> node
		var textnode = document.createTextNode(audio[i].title);  // Create a text node
		newItem.appendChild(textnode);                    // Append the text to <li>
		var list = document.getElementById("audio-playlist");    // Get the <ul> element to insert a new node
		list.insertBefore(newItem, list.childNodes[0]);
	}
	for (var i = track_count - 1; i >= current_track; i--){
		var newItem = document.createElement("LI");       // Create a <li> node
		var textnode = document.createTextNode(audio[i].title);  // Create a text node
		newItem.appendChild(textnode);                    // Append the text to <li>
		var list = document.getElementById("audio-playlist");    // Get the <ul> element to insert a new node
		list.insertBefore(newItem, list.childNodes[0]);
	}

	var list = document.getElementById("audio-playlist");
	list.childNodes[0].style.fontWeight = '300';
}

window.onload = function() {
	document.getElementById('audio-current-song').innerHTML = audio[current_track].title;
};