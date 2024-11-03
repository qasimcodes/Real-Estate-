export const priceFormatter = (p) => {
    return p?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}