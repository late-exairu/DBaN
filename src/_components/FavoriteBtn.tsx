type FavoriteBtnProps = {
  id: number;
  className?: string;
};

export default function FavoriteBtn(props: FavoriteBtnProps) {
  const {} = props;

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="ml-auto mt-1 inline-flex size-6 shrink-0 md:size-8 lg:size-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0V0z" style={{ fill: "none" }} />
        <path
          d="M16.5 3c-1.7 0-3.4.8-4.5 2.1C10.9 3.8 9.2 3 7.5 3 4.4 3 2 5.4 2 8.5c0 3.8 3.4 6.9 8.6 11.5l1.4 1.3 1.4-1.3c5.2-4.7 8.6-7.8 8.6-11.5C22 5.4 19.6 3 16.5 3zm-4.4 15.5-.1.1-.1-.1C7.1 14.2 4 11.4 4 8.5 4 6.5 5.5 5 7.5 5c1.5 0 3 1 3.6 2.4H13C13.5 6 15 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.9-3.1 5.7-7.9 10z"
          style={{ fill: "#010202" }}
        />
      </svg>
    </button>
  );
}
