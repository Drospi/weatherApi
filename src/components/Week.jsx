

export const Week = (e) => {
  return (
    <div className="card">
        <p>{e.fecha}</p>
        <img src={e.img} alt="" />
        <div className="temp_m">
            <p>{e.max}°{e.grade=='&units=imperial'?'F':'C'}</p>
            <p>{e.min}°{e.grade=='&units=imperial'?'F':'C'}</p>
        </div>
    </div>
  )
}
