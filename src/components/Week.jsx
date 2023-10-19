

export const Week = (e) => {
  return (
    <div className="card">
        <p>{e.fecha}</p>
        <img src={e.img} alt="" />
        <div>
            <p>{e.max}</p>
            <p>{e.min}</p>
        </div>
    </div>
  )
}
