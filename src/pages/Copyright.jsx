const Copyright = () => {
  const year = new Date().getFullYear();
  return (
    <main className="section container">
      <h2 className="gradient-text">Авторское право</h2>
      <p>Все материалы, дизайн, игры и изображения защищены авторским правом. © {year} Ислам. Любое несанкционированное использование запрещено.</p>
    </main>
  );
};
export default Copyright;
