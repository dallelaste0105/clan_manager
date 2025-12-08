export default function IslandInteraction({
  id,
  close
}: {
  id: string;
  close: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        left: 40,
        padding: 20,
        background: "white",
        border: "1px solid #000",
        borderRadius: 8
      }}
    >
      <h1>Interaja com a cidade/porto: {id}</h1>

      <button onClick={close}>Fechar</button>

      <button
        onClick={() => {
          console.log("Atacar", id);
        }}
      >
        Atacar
      </button>

      <button
        onClick={() => {
          console.log("Ver info", id);
        }}
      >
        Ver informações
      </button>
    </div>
  );
}
