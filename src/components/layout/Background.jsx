export const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <img
        src="/Background.png"
        alt="background image"
        className="w-full h-full object-cover opacity-40 fixed"
      />
      <div className="absolute inset-0" />
    </div>
  );
};
