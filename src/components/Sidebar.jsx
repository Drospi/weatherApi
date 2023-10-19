

export const Sidebar = (e) => {
  return (
    <div className={e.disable}>
      <h1 onClick={()=>e.setDisable('Sidebar disable')}>x</h1>
      <div className="buscar">
      <span className="material-symbols-outlined">search</span>
      <input placeholder="search location" type="text" name="search" id="search" />
      <button>Search</button>
      </div>
      <div className="cities">
      <button onClick={()=>e.setCity('barcelona')} className="city">
          <p>Barcelona</p>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
        <button onClick={()=>e.setCity('london')} className="city">
          <p>London</p>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
        <button onClick={()=>e.setCity('lima')} className="city">
          <p>Lima</p>
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

      </div>
    </div>
  )
}
