

export const Highlights = (e) => {
  return (
    <div className="card_high">
        <p>{e.title}</p>
        <h1>{e.num}{e.m}</h1>
        <div id="bar" className={e.clase}></div>
        <h2>{e.deg?<p><span className="material-symbols-outlined coord">navigation</span> {e.dir}</p>:('')}</h2>
    </div>
  )
}
