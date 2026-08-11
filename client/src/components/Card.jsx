function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    width: "220px",
    height: "130px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Card;