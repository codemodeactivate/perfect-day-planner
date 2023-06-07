function setRandomImageUrls() {
    const imageUrls = [
        'https://source.unsplash.com/random/800x800/?img=1',
        'https://source.unsplash.com/random/800x800/?img=2',
        'https://source.unsplash.com/random/800x800/?img=3',
        'https://source.unsplash.com/random/800x800/?img=4',
        'https://source.unsplash.com/random/800x800/?img=5',
        'https://source.unsplash.com/random/800x800/?img=6',
        'https://source.unsplash.com/random/800x800/?img=7',
        'https://source.unsplash.com/random/800x800/?img=8',
        'https://source.unsplash.com/random/800x800/?img=9',
        'https://source.unsplash.com/random/800x800/?img=10',
        'https://source.unsplash.com/random/800x800/?img=11',
        'https://source.unsplash.com/random/800x800/?img=12',
        'https://source.unsplash.com/random/800x800/?img=13',
        'https://source.unsplash.com/random/800x800/?img=14',
        'https://source.unsplash.com/random/800x800/?img=15',
        'https://source.unsplash.com/random/800x800/?img=16',
        'https://source.unsplash.com/random/800x800/?img=17',
        'https://source.unsplash.com/random/800x800/?img=18',
        'https://source.unsplash.com/random/800x800/?img=19',
        'https://source.unsplash.com/random/800x800/?img=20',
    ];
  
    const images = document.querySelectorAll('.cardFront img, .cardBack img');
    const emptyImageIndexes = [];
  
    images.forEach((image, index) => {
      if (!image.getAttribute('src')) {
        emptyImageIndexes.push(index);
      }
    });
  
    emptyImageIndexes.forEach((emptyIndex) => {
      const randomImageUrl = getRandomImageUrl(imageUrls);
      images[emptyIndex].setAttribute('src', randomImageUrl);
    });
  }
  
  function getRandomImageUrl(imageUrls) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }
  
  setRandomImageUrls();