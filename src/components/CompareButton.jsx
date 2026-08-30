function CompareButton({ onAdd, onReset, canAdd }) {
  return (
    <div className="w-full max-w-3xl flex gap-3">
      {canAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg py-3 transition-colors"
        >
          + Agregar opción
        </button>
      )}
      <button
        type="button"
        onClick={onReset}
        className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg py-3 transition-colors"
      >
        Reiniciar
      </button>
    </div>
  )
}

export default CompareButton
