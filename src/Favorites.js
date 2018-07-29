export default class Favorites {
    constructor() {
        this.favorites = [];
    }

    addFavorite(id, title, contents) {
        const favorite = {id, title, contents};
        this.favorites.push(favorite);
        return favorite;
    }

    deleteFavorite(id) {
        const index = this.favorites.findIndex(el => el.id === id);
        this.favorites.splice(index, 1);
    }

    isFavorite(id) {
        return this.favorites.findIndex(el => el.id === id);
    }

    getNumFavorites() {
        return this.favorites.length;
    }
}