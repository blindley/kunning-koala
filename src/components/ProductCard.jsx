const getProduct = (productId) => {
  const colors = ["red", "green", "blue", "cyan", "orange", "yellow"];
  // const numProducts = 26 * colors.length;
  const upperIndex = Math.trunc(productId / colors.length) + 65;
  const upperLetter = String.fromCharCode(upperIndex);
  const lowerLetter = String.fromCharCode(upperIndex + 32);
  const colorIndex = productId % colors.length;
  const color = colors[colorIndex];
  const imageFile = "/dummy-data/alphabet/" + lowerLetter + "-" + color + ".png";
  const productName = "The letter " + upperLetter + " (" + color + ")";
  const price = 10;
  return { productName, imageFile, price };
};

const formatPrice = (price) => {
  return "$" + price.toFixed(2);
};

export const ProductCard = ({ productId }) => {
  const { productName, imageFile, price } = getProduct(productId);
  return (
    <div className="productCard">
      <img src={imageFile} />
      <div className="productDescription">
        <p>
          <b>{productName}</b>
        </p>
        <p>{formatPrice(price)}</p>
      </div>
    </div>
  );
};
