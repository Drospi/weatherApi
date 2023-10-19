

export const Highlights = (e) => {
  return (
    <div className="card_high">
        <p>{e.title}</p>
        <h1>{e.num}{e.m}</h1>
        <div id="bar" className={e.clase}></div>
    </div>
  )
}
