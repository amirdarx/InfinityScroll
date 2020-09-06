const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5 ;
// const apiKey = '-QMnPVutSoxPKNpv_tGlQr8XrHcMhnZggC2tqDolxEE';
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	// if all the images were loaded completely do this
	if(imagesLoaded === totalImages){
		ready = true;
		loader.hidden = true;
		count = 30;
	}
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes){
	for (const key in attributes){
		element.setAttribute(key, attributes[key]);
	}
}


// Create Elements for links and photos, Add to DOM
function displayPhotos(){
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach((photox) => {

		
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photox.links.html,
			target: '_blank',
		});

		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photox.urls.regular,
			alt: photox.alt_description,
			title: photox.alt_description,
		});

		// Create <button> for photo
		const button = document.createElement('button');
		button.className = "downloadLink";
		button.src = `https://unsplash.com/photos/${photox.id}/download?force=true&amp;w=1920`;
		const downLoad = document.createElement('a'); 
		setAttributes(downLoad , {
			href:`https://unsplash.com/photos/${photox.id}/download?force=true&amp;w=1920`, 
			rel:"nofollow", 
			download:"", 
			role:"link",
		});
		downLoad.textContent = 'DOWNLOAD';
		button.appendChild(downLoad);

		// Event Listeners , check when is finished loading
		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a> , then put both inside imageContainer
		item.appendChild(img);
		item.appendChild(button);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos(){
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch(e) {
		console.log(e);
	}
}

// Check to see if scrolling near bottom of page , load more photos
window.addEventListener('scroll', () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		getPhotos();
		ready = false;
	}
});

// On Load
getPhotos();