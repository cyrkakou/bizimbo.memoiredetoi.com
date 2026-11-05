class PictureWall {
  constructor(root, options = {}) {
    this.root = typeof root === 'string' ? document.querySelector(root) : root;
    this.dataUrl = options.dataUrl || 'gpt_picture-wall.json';
    this.modal = options.modal || document.querySelector('[data-picture-wall-modal]');
    this.items = [];
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async init() {
    if (!this.root) throw new Error('PictureWall: élément racine introuvable.');
    const response = await fetch(this.dataUrl);
    if (!response.ok) throw new Error(`PictureWall: impossible de charger ${this.dataUrl}.`);
    const collection = await response.json();
    this.items = collection.frames || [];
    this.root.style.backgroundImage = `url("${collection.background}")`;
    this.render();
    this.root.addEventListener('click', this.onClick);
    if (this.modal) this.modal.addEventListener('click', this.onClose);
    return this;
  }

  render() {
    this.root.replaceChildren();
    const layout = document.createElement('div');
    layout.className = 'picture-wall-layout';
    this.items.forEach((item) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `picture-wall-frame picture-wall-frame--${item.style || 'gold'}`;
      button.dataset.frameId = item.id;
      button.setAttribute('aria-label', `Ouvrir ${item.title || 'le souvenir'}`);
      button.style.left = `${item.x}%`;
      button.style.top = `${item.y}%`;
      button.style.width = `${item.width}%`;
      button.style.aspectRatio = item.ratio;
      button.dataset.photoBox = JSON.stringify(item.photoBox || {});
      if (item.image) {
        const preview = document.createElement('img');
        preview.src = item.image;
        preview.alt = item.title || '';
        preview.className = 'picture-wall-photo';
        button.appendChild(preview);
      }
      layout.appendChild(button);
    });
    this.root.appendChild(layout);
  }

  onClick(event) {
    const frame = event.target.closest('.picture-wall-frame');
    if (!frame || !this.modal) return;
    const item = this.items.find((entry) => entry.id === frame.dataset.frameId);
    if (!item) return;
    const image = this.modal.querySelector('[data-picture-wall-image]');
    const title = this.modal.querySelector('[data-picture-wall-title]');
    const description = this.modal.querySelector('[data-picture-wall-description]');
    if (image) {
      image.hidden = !item.image;
      image.src = item.image || '';
      image.alt = item.title || '';
    }
    if (title) title.textContent = item.title || 'Souvenir';
    if (description) description.textContent = item.description || 'Photo et description à associer.';
    if (typeof this.modal.showModal === 'function') this.modal.showModal();
  }

  onClose(event) {
    if (event.target === this.modal || event.target.matches('[data-picture-wall-close]')) this.modal.close();
  }

  destroy() {
    this.root?.removeEventListener('click', this.onClick);
    this.modal?.removeEventListener('click', this.onClose);
  }
}

window.PictureWall = PictureWall;
