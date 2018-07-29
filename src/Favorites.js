export default class Likes {
    constructor() {
        this.favorites = [];
    }

    addFavorite(id, title, contains) {
        const favorite = {id, title, contains};
        this.favorites.push(favorite);
        return favorite;
    }

    deleteFavorite(id) {
        const index = this.favorites.findIndex(el => el.id === id);
        this.favorites.splice(index, 1);
    }
}