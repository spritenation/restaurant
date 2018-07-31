export default class Favorites {
    constructor() {
        this.favorites = [];
    }

    addFavorite(id, title, contents) {
        const favorite = {id, title, contents};
        this.favorites.push(favorite);

        this.persistData();

        return favorite;
    }

    deleteFavorite(id) {
        const index = this.favorites.findIndex(el => el.id === id);
        this.favorites.splice(index, 1);

        this.persistData();
    }

    isFavorite(id) {
        let result = false;
        this.favorites.findIndex(el => el.id === id ? result = true : result = false);
        return result;
    }

    getNumFavorites() {
        return this.favorites.length;
    }

    persistData() {
        localStorage.setItem('favoriteData', JSON.stringify(this.favorites));
    }
}