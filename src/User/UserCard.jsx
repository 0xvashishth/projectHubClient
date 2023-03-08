export default function UserCard(props){ 
        <div className='col'>
        <div className='card mb-3'>
        <h3 className="card-header">Project: {props.id}</h3>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle text-muted">Email: {props.email}</h6>
        </div>
        <img src="https://avatars.githubusercontent.com/u/76911582?s=400&u=e5b8cd698ee7fb315ac23049a56bb03ac4149f86&v=4" />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Twitter: {props.twitter}</li>
          <li className="list-group-item">Linkedin: {props.linkedin}</li>
          <li className="list-group-item">Github: {props.github}</li>
        </ul>
        <div className="card-body">
          <a href="#like" className="card-link">Like User</a>
          <a href="#report" className="card-link">Report User</a>
        </div>
        <div className="card-footer text-muted">
          Points: {props.points}
        </div>
      </div>
      </div>
}