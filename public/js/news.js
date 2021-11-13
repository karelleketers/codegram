const news = {
  init() {
    this.cacheElements();
    this.editBgImages();
    this.parseDate();
  },
  cacheElements() {
    this.$bgImageContainers = document.querySelectorAll('.card--header.card--blog__header');
    this.$dateObjectHolders = document.querySelectorAll('.score');
  },
  editBgImages() {
    this.$bgImageContainers.forEach(el => {
      const id = el.dataset.id;
      el.style.backgroundImage = `url('http://placeimg.com/640/480/${id}')`
    });
  },
  parseDate() {
    this.$dateObjectHolders.forEach(el => {
      const d = el.dataset.date;
      const dateData = d.split('-');
      const [year, month, day] = dateData;
      el.innerHTML = `${day}/${month}/${year}`
    })
  }
}

news.init();